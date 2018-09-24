(function() {

    var mnemonic = new Mnemonic("english");
    var bip32RootKey = null;
    var bip32ExtendedKey = null;
    var network = bitcoin.networks.expanse;
    var addressRowTemplate = $("#address-row-template");

    var showIndex = true;
    var showAddress = true;
    var showPubKey = true;
    var showPrivKey = true;

    var phraseChangeTimeoutEvent = null;

    var DOM = {};
    DOM.network = $(".network");
    DOM.phraseNetwork = $("#network-phrase");
    DOM.phrase = $(".phrase");
    DOM.passphrase = $(".passphrase");
    DOM.generate = $(".generate");
    DOM.rootKey = $(".root-key");
   // DOM.rootKeyQr = $("#root-key-qr");
    DOM.extendedPrivKey = $(".extended-priv-key");
    DOM.extendedPubKey = $(".extended-pub-key");
    DOM.extendedPrivKeyQr = $("#extended-priv-key-qr");
    DOM.extendedPubKeyQr = $("#extended-pub-key-qr");
    DOM.bip32tab = $("#bip32-tab");
    DOM.bip44tab = $("#bip44-tab");
    DOM.bip32panel = $("#bip32");
    DOM.bip44panel = $("#bip44");
    DOM.bip32path = $("#bip32-path");
    DOM.bip44path = $("#bip44-path");
    DOM.bip44purpose = $("#bip44 .purpose");
    DOM.bip44coin = $("#bip44 .coin");
    DOM.bip44account = $("#bip44 .account");
    DOM.bip44change = $("#bip44 .change");
    DOM.addresses = $(".addresses");
    DOM.rowsToAdd = $(".rows-to-add");
    DOM.more = $(".more");
    DOM.feedback = $(".feedback");
    DOM.tab = $(".derivation-type a");
    DOM.indexToggle = $(".index-toggle");
    DOM.addressToggle = $(".address-toggle");
    DOM.publicKeyToggle = $(".public-key-toggle");
    DOM.privateKeyToggle = $(".private-key-toggle");

    var derivationPath = DOM.bip44path.val();
    // var derivationPath = "m/44'/40'/0'/0";
    // console.log("derivationPath",derivationPath);

    function init() {
        // Events
        // DOM.network.on("change", networkChanged);
        DOM.phrase.on("input", delayedPhraseChanged);
        DOM.passphrase.on("input", delayedPhraseChanged);
        DOM.generate.on("click", generateClicked);
        DOM.more.on("click", showMore);
        DOM.bip32path.on("input", bip32Changed);
        DOM.bip44purpose.on("input", bip44Changed);
        DOM.bip44coin.on("input", bip44Changed);
        DOM.bip44account.on("input", bip44Changed);
        DOM.bip44change.on("input", bip44Changed);

        DOM.indexToggle.on("click", toggleIndexes);
        DOM.addressToggle.on("click", toggleAddresses);
        DOM.publicKeyToggle.on("click", togglePublicKeys)
        DOM.privateKeyToggle.on("click", togglePrivateKeys);
        disableForms();
        hidePending();
        hideValidationError();
        populateNetworkSelect();
    }

    // Event handlers

    // function networkChanged(e) {
    //     var network = e.target.value;
    //     networks[network].onSelect();
    //     setBip44DerivationPath();
    //     delayedPhraseChanged();
    // }

    function delayedPhraseChanged() {
        hideValidationError();
        showPending();
        if (phraseChangeTimeoutEvent != null) {
            clearTimeout(phraseChangeTimeoutEvent);
        }
        phraseChangeTimeoutEvent = setTimeout(phraseChanged, 400);
    }
    
    function phraseChanged() {
        console.log('phraseChanged');
        console.log("derivationPath",derivationPath);

        var phrase = DOM.phrase.val();
        // var  hdAccounts = db.get('hdWallets').find({ phrase: phrase }).value();
        
        showPending();
        hideValidationError();
        // Get the mnemonic phrase
        
        var passphrase = '';
        console.log(passphrase);
        var errorText = findPhraseErrors(phrase);
        if (errorText) {
            showValidationError(errorText);
            return;
        }
        // Get the derivation path
        var errorText = findDerivationPathErrors();
        if (errorText) {
            showValidationError(errorText);
            return;
        }
        // Calculate and display
        calcBip32Seed(phrase, passphrase, derivationPath);
        displayBip32Info();
        hidePending();
    }

    function generateClicked() {
        console.log('generateClicked');
        clearDisplay();
        showPending();
        setTimeout(function() {
            var phrase = generateRandomPhrase();
            if (!phrase) {
                return;
            }
            phraseChanged();
        }, 50);
    }

    // function tabClicked(e) {
    //     var activePath = $(e.target.getAttribute("href") + " .path");
    //     derivationPath = activePath.val();
    //     derivationChanged();
    // }

    function derivationChanged() {
        delayedPhraseChanged();
    }

    function bip32Changed() {
        derivationPath = DOM.bip32path.val();
        derivationChanged();
    }

    function bip44Changed() {
        setBip44DerivationPath();
        derivationChanged();
    }

    function toggleIndexes() {
        showIndex = !showIndex;
        $("td.index span").toggleClass("invisible");
    }

    function toggleAddresses() {
        showAddress = !showAddress;
        $("td.address a").toggleClass("invisible");
    }

    function togglePublicKeys() {
        showPubKey = !showPubKey;
        $("td.pubkey span").toggleClass("invisible");
    }

    function togglePrivateKeys() {
        showPrivKey = !showPrivKey;
        $("td.privkey a").toggleClass("invisible");
    }

    // Private methods

    function generateRandomPhrase() {
        if (!hasStrongRandom()) {
            var errorText = "This browser does not support strong randomness";
            showValidationError(errorText);
            return;
        }
        var numWords = 12;
        console.log(numWords);
        var strength = numWords / 3 * 32;
        console.log(strength);
        var words = mnemonic.generate(strength);
        console.log(words);
        DOM.phrase.val(words);
        return words;
    }

    function calcBip32Seed(phrase, passphrase, path) {
        console.log(phrase, passphrase, path);
        var seed = mnemonic.toSeed(makeProperPhrase(phrase), passphrase);
        bip32RootKey = bitcoin.HDNode.fromSeedHex(seed, network);
        bip32ExtendedKey = bip32RootKey;
        // Derive the key from the path
        var pathBits = path.split("/");
        for (var i=0; i<pathBits.length; i++) {
            var bit = pathBits[i];
            var index = parseInt(bit);
            if (isNaN(index)) {
                continue;
            }
            var hardened = bit[bit.length-1] == "'";
            if (hardened) {
                bip32ExtendedKey = bip32ExtendedKey.deriveHardened(index);
            }
            else {
                bip32ExtendedKey = bip32ExtendedKey.derive(index);
            }
            console.log(bip32ExtendedKey)
        }
    }

    function showValidationError(errorText) {
        DOM.feedback
            .text(errorText)
            .show();
    }

    function hideValidationError() {
        DOM.feedback
            .text("")
            .hide();
        $('.invalidmnemonic-error').css({visibility: "hidden"});
        $('.invalidmnemonic-error').hide();
        $('.invalidmnemonic-val-error').val(1);
    }

    function makeProperPhrase(phrase) {
        // TODO make this right
        // Preprocess the words
        phrase = mnemonic.normalizeString(phrase);
        var parts = phrase.split(" ");
        var proper = [];
        for (var i=0; i<parts.length; i++) {
            var part = parts[i];
            if (part.length > 0) {
                // TODO check that lowercasing is always valid to do
                proper.push(part.toLowerCase());
            }
        }
        // TODO some levenstein on the words
        return proper.join(' ');
    }

    function findPhraseErrors(phrase) {
        properPhrase = makeProperPhrase(phrase);
        // Check the words are valid
        var isValid = mnemonic.check(properPhrase);
        if (!isValid) {
            console.log("Invalid mnemonic");
            $('.invalidmnemonic-error').css({visibility: "visible"});
            $('.invalidmnemonic-error').show();
            $('.invalidmnemonic-val-error').val(0)
            return "Invalid mnemonic";
        }
        return false;
    }

    function findDerivationPathErrors(path) {
        // TODO
        return false;
    }

    function displayBip32Info() {
        // Display the key
        console.log('displayBip32Info');
        var rootKey = bip32RootKey.toBase58();
        console.log(rootKey);
        DOM.rootKey.val(rootKey);
        var phrase = DOM.phrase.val();
        //DOM.rootKeyQr.html("")
        //DOM.rootKeyQr.qrcode(rootKey);
        var extendedPrivKey = bip32ExtendedKey.toBase58();
        DOM.extendedPrivKey.val(extendedPrivKey);
        // DOM.extendedPrivKeyQr.html("")
        // DOM.extendedPrivKeyQr.qrcode(extendedPrivKey);
        var extendedPubKey = bip32ExtendedKey.toBase58(false);
        DOM.extendedPubKey.val(extendedPubKey);
        // DOM.extendedPubKeyQr.html("")
        // DOM.extendedPubKeyQr.qrcode(extendedPubKey);
        // Display the addresses and privkeys
        clearAddressesList();
        var  hdAccounts = db.get('hdWallets').chain().filter({ phrase: phrase }).value()
        // return false
        console.log("hdAccounts",hdAccounts);
        var start = 0;
        var stop = 1;
        var index = index = Object.keys(hdAccounts).length ;
        if(index > 0){
            index = Object.keys(hdAccounts).length ;
            $('.derived_address_index').val(index);
            $(".derivation_path").val("m/44'/40'/0'/0/"+index); 
           start = index;
        }else{$(".derivation_path").val("m/44'/40'/0'/0/0");}
        console.log("index",index);
        displayAddresses(start, 1);
    }

    function displayAddresses(start, total) {
        for (var i=0; i<total; i++) {
            var index = i + start;
            new TableRow(index);
        }
    }

    function TableRow(index) {

        function init() {
            calculateValues();
        }

        function calculateValues() {
            setTimeout(function() {
                var key = bip32ExtendedKey.derive(index);
                var address;
                if (!network.ethereum) {
                    address = key.getAddress().toString();
                }
                else {
                    var pubData = new bitcoin.ECKey(key.privKey.d, false).pub.toHex();
                    var buffer = new ArrayBuffer(64);
                    var view = new Uint8Array(buffer);
                    var offset = 0;
                    for (var i=2; i<pubData.length; i += 2) {
                        view[offset++] = parseInt(pubData.substr(i, 2), 16);
                    }
                    var addressHex = keccak_256(buffer).substr(24).toLowerCase();
                    var checksum = keccak_256(addressHex)
                    var address = "0x";
                    for (var i = 0; i < addressHex.length; i++) {
                        if (parseInt(checksum[i], 16) >= 8) {
                          address += addressHex[i].toUpperCase()
                        } else {
                          address += addressHex[i]
                        }
                    }
                }
                var privkey;

                var pubkey = key.pubKey.toHex();
                if (!network.ethereum) {
                    privkey = key.privKey.toWIF(network);
                }
                else {
                    privkey = "0x" + key.privKey.d.toString(16);
                    pubkey = "0x" + pubkey;
                }
                addAddresstoFields(address, pubkey, privkey);
            }, 50)
        }

        init();

    }

    function addAddresstoFields( address, pubkey, privkey)
    {
        console.log( "ADDRESS",address, pubkey, privkey)

        $('.derived_address').val(address);
        $('.derived_private_key').val(privkey);
        $('.derived_public_key').val(pubkey);   
    
    }

    function showMore() {
        var start = DOM.addresses.children().length;
        var rowsToAdd = parseInt(DOM.rowsToAdd.val());
        if (isNaN(rowsToAdd)) {
            rowsToAdd = 20;
            DOM.rowsToAdd.val("20");
        }
        if (rowsToAdd > 200) {
            var msg = "Generating " + rowsToAdd + " rows could take a while. ";
            msg += "Do you want to continue?";
            if (!confirm(msg)) {
                return;
            }
        }
        displayAddresses(start, rowsToAdd);
    }

    function clearDisplay() {
        clearAddressesList();
        clearKey();
        hideValidationError();
    }

    function clearAddressesList() {
        DOM.addresses.empty();
    }

    function clearKey() {
        DOM.rootKey.val("");
        DOM.extendedPrivKey.val("");
        DOM.extendedPubKey.val("");
    }

    function addAddressToList(index, address, pubkey, privkey) {
        var row = $(addressRowTemplate.html());
        // Elements
        var indexCell = row.find(".index span");
        var addressCell = row.find(".address a");
        var pubkeyCell = row.find(".pubkey a");
        var privkeyCell = row.find(".privkey a");
        // Content
        var indexText = derivationPath + "/" + index;
        indexCell.text(indexText);
        addressCell.text(address);
        addressCell.on("click",createQR);
        pubkeyCell.text(pubkey);
        pubkeyCell.on("click",createQR);
        privkeyCell.text(privkey);
        privkeyCell.on("click",createQR);
        // Visibility
        if (!showIndex) {
            indexCell.addClass("invisible");
        }
        if (!showAddress) {
            addressCell.addClass("invisible");
        }
        if (!showPubKey) {
            pubkeyCell.addClass("invisible");
        }
        if (!showPrivKey) {
            privkeyCell.addClass("invisible");
        }
        DOM.addresses.append(row);
    }
    function createQR(event){
        var target = event.target;
        var address = target.innerText;
        var parent = target.parentNode;
        if($("#"+address).length){
            $("#"+address).remove()
        }else {
            var div = $("<div/>")

            div.attr("id",address);
            div.qrcode(address);
            div.appendTo(parent)
        }
    }
    function hasStrongRandom() {
        return 'crypto' in window && window['crypto'] !== null;
    }

    function disableForms() {
        $("form").on("submit", function(e) {
            e.preventDefault();
        });
    }

    function setBip44DerivationPath() {
      console.log('setBip44DerivationPath')
        var purpose = 44;
        var coin = 40;
        var account = 0;
        var change = 0;
        var path = "m/";
        path += purpose + "'/";
        path += coin + "'/";
        path += account + "'";
        if (!network.ethereum) {
            path += "/" + change;
        }
        DOM.bip44path.val(path);
        console.log(path)
       derivationPath = DOM.bip44path.val();
    }

    

    function showPending() {
        DOM.feedback
            .text("Calculating...")
            .show();
    }

    function hidePending() {
        DOM.feedback
            .text("")
            .hide();
    }



    function populateNetworkSelect() {
        networks = networks.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );

        for (var i=0; i<networks.length; i++) {
            var network = networks[i];
            var option = $("<option>");
            option.attr("value", i);
            option.text(network.name);
            DOM.phraseNetwork.append(option);
        }
    }

    var networks = [

        {
            name: "Expanse",
            onSelect: function() {
                network = bitcoin.networks.expanse;
                DOM.bip44coin.val(40);
            },
        }
    ]

    init();

})();