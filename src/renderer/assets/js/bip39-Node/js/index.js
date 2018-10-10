var jQuery = require("jquery");
var $ = jQuery;
// require("bootstrap")
let bitcoin = require('bitcoinjs-lib')
const keccak = require('./sha3.js')

import {db} from '../../../../../../lowdbFunc';

var PBKDF2_ROUNDS = 2048;
var RADIX = 2048;
var StartLength = 0;
var totalLength = 1;
var coinInfo = {
    phrase: "",
    bip32RootKey: "",
    bip32ExtendedPublicKey: "",
    bip32ExtendedPrivateKey: ""
}
var hmacSHA512 = function(key) {
    var hasher = new sjcl.misc.hmac(key, sjcl.hash.sha512);
    this.encrypt = function() {
        return hasher.encrypt.apply(hasher, arguments);
    };
};


import md5 from 'md5';
var sjcl = require("./sjcl-bip39.js");

// require("sha3");
var WORDSLIST = require("./wordlist_english.js");
var networks = require('./networks')
var wordlist = [];
var jsonDataArray = new Array();
var bip32RootKey, bip32ExtendedKey;
var networkData = networks.networks;
var network;
var passphrase = "";
wordlist = WORDLISTS["english"];
// if (wordlist.length != RADIX) {
//     console.error('Wordlist should contain ' + RADIX + ' words, but it contains ' + wordlist.length + ' words.');
//     return;
// }

var args = process.argv;



let derivationPath;
export const generateStart = () => {

    if (args) {
        // console.log("ff1")
        let obj = networkData.find((o, i) => {
            // console.log(obj, "obj");
            // console.log(o, i, "o, i");
            if (o.name == "Expanse") {
                return true; // stop searching
            }
        });

        network = obj.network.network;
    }

    derivationPath = setBip44DerivationPath();

    generateRandomPhrase();
};

export const generatePhraseStart = (phrase) => {

    if (args) {
        // console.log("ff1")
        let obj = networkData.find((o, i) => {
            // console.log(obj, "obj");
            if (o.name == "Expanse") {
                return true; // stop searching
            }
        });

        network = obj.network.network;
    }

    derivationPath = setBip44DerivationPath();

    phrase_hash = md5(phrase);
    calcBip32Seed(phrase, passphrase, derivationPath);
};

var Mnemonic = require("./jsbip39.js");

var mnemonic = new Mnemonic("english");

var getRandomValues = require('get-random-values');
var phrase_hash;

function generateRandomPhrase() {
    // console.log('f3')
    var numWords = parseInt(12);
    var strength = numWords / 3 * 32;
    strength = strength || 128;

    var r = strength % 32;

    var buffer = new Uint8Array(strength / 8);

    var data = getRandomValues(buffer); //generates some random values
    var a = toMnemonic(data);
    // a="circle sun twelve one earth abstract cheap anchor mystery stone chest rebuild"
    // coinInfo.phrase.push(a.toString());
    // console.log("Phrase : " + a);
    if (a) {
        coinInfo.phrase = a;
        $('.phrase').val(a);

        phrase_hash = md5(a);
        calcBip32Seed(a, passphrase, derivationPath);
    }
}

function toMnemonic(byteArray) {

    if (byteArray.length % 4 > 0) {
        console.error('Data length in bits should be divisible by 32, but it is not (' + byteArray.length + ' bytes = ' + byteArray.length * 8 + ' bits).');
    }

    //h = hashlib.sha256(data).hexdigest()
    var data = byteArrayToWordArray(byteArray);

    var hash = sjcl.hash.sha256.hash(data);

    var h = sjcl.codec.hex.fromBits(hash);


    // b is a binary string, eg '00111010101100...'
    //b = bin(int(binascii.hexlify(data), 16))[2:].zfill(len(data) * 8) + \
    //    bin(int(h, 16))[2:].zfill(256)[:len(data) * 8 / 32]
    //
    // a = bin(int(binascii.hexlify(data), 16))[2:].zfill(len(data) * 8)
    // c = bin(int(h, 16))[2:].zfill(256)
    // d = c[:len(data) * 8 / 32]
    var a = byteArrayToBinaryString(byteArray);
    var c = zfill(hexStringToBinaryString(h), 256);

    var d = c.substring(0, byteArray.length * 8 / 32);

    // b = line1 + line2
    var b = a + d;

    var result = [];
    var blen = b.length / 11;

    for (var i = 0; i < blen; i++) {

        var idx = parseInt(b.substring(i * 11, (i + 1) * 11), 2);

        result.push(wordlist[idx]);
    }
    return result.join(' ');
}


function byteArrayToWordArray(data) {
    var a = [];
    for (var i = 0; i < data.length / 4; i++) {

        let  v = 0;
        v += data[i * 4 + 0] << 8 * 3;

        v += data[i * 4 + 1] << 8 * 2;
        v += data[i * 4 + 2] << 8 * 1;
        v += data[i * 4 + 3] << 8 * 0;
        a.push(v);

    }
    return a;
}

function zfill(source, length) {
    source = source.toString();
    while (source.length < length) {

        source = '0' + source;
    }
    return source;
}

function hexStringToBinaryString(hexString) {
    let binaryString = "";
    for (var i = 0; i < hexString.length; i++) {
        binaryString += zfill(parseInt(hexString[i], 16).toString(2), 4);
    }
    return binaryString;
}

function byteArrayToBinaryString(data) {
    var bin = "";
    for (var i = 0; i < data.length; i++) {

        bin += zfill(data[i].toString(2), 8); //toString(2) means convert it to binary
    }
    return bin;
}

function binaryStringToWordArray(binary) {
    var aLen = binary.length / 32;
    var a = [];
    for (var i = 0; i < aLen; i++) {
        var valueStr = binary.substring(0, 32);
        var value = parseInt(valueStr, 2);
        a.push(value);
        binary = binary.slice(32);
    }
    return a;
}

function calcBip32Seed(phrase, passphrase, path) {
    // var network = networks.networks[0];

    // console.log("calcBip32Seed",network)
    var seed = toSeed(makeProperPhrase(phrase), passphrase);
    bip32RootKey = bitcoin.HDNode.fromSeedHex(seed, network);
    // console.log("KEEEEYYY",bip32RootKey)
    bip32ExtendedKey = bip32RootKey;
    // Derive the key from the path
    var pathBits = path.split("/");
    for (var i = 0; i < pathBits.length; i++) {
        var bit = pathBits[i];
        var index = parseInt(bit);
        if (isNaN(index)) {
            continue;
        }
        var hardened = bit[bit.length - 1] == "'";
        if (hardened) {
            bip32ExtendedKey = bip32ExtendedKey.deriveHardened(index);
        } else {
            bip32ExtendedKey = bip32ExtendedKey.derive(index);
        }
    }

    displayBip32Info(bip32RootKey, bip32ExtendedKey);
}

function makeProperPhrase(phrase) {
    // TODO make this right
    // Preprocess the words
    phrase = mnemonic.normalizeString(phrase);
    var parts = phrase.split(" ");
    var proper = [];
    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        if (part.length > 0) {
            // TODO check that lowercasing is always valid to do
            proper.push(part.toLowerCase());
        }
    }
    // TODO some levenstein on the words
    return proper.join(' ');
}

function toSeed(mnemonic, passphrase) {
    passphrase = passphrase || '';
    mnemonic = normalizeString(mnemonic)
    passphrase = normalizeString(passphrase)
    passphrase = "mnemonic" + passphrase;
    var mnemonicBits = sjcl.codec.utf8String.toBits(mnemonic);
    var passphraseBits = sjcl.codec.utf8String.toBits(passphrase);
    var result = sjcl.misc.pbkdf2(mnemonicBits, passphraseBits, PBKDF2_ROUNDS, 512, hmacSHA512);
    var hashHex = sjcl.codec.hex.fromBits(result);
    return hashHex;
}

function normalizeString(str) {
    if (typeof str.normalize == "function") {
        return str.normalize("NFKD");
    } else {
        // TODO decide how to handle this in the future.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
        return str;
    }
}

function displayBip32Info(bipRootKey, extentedKey) {
    // Display the key

    var rootKey = bipRootKey.toBase58();
    coinInfo.bip32RootKey = rootKey;
    // console.log("Bip32RootKey", rootKey)
    var extendedPrivKey = extentedKey.toBase58();
    coinInfo.bip32ExtendedPrivateKey = extendedPrivKey;
    // console.log("Bip32Extended Private Key", extendedPrivKey)
    var extendedPubKey = extentedKey.toBase58(false);
    coinInfo.bip32ExtendedPublicKey = extendedPubKey;
    // console.log("Bip32Extended Public Key", extendedPubKey)
    // console.log(derivationPath)
    var  hdAccounts = db.get('hdWallets').chain().filter({ phrase_hash : phrase_hash }).value()
    console.log(hdAccounts, "hdAccounts");
    if(hdAccounts){
        var index = Object.keys(hdAccounts).length ;
        console.log(hdAccounts, index);
        StartLength = index ;
    } else {
        StartLength = 0;
    }

    displayAddresses(StartLength, totalLength);
    // console.log(coinInfo, "coinInfo");
    // console.log(jsonData)
    // bip32ExtendedKey
    // console.log(rootKey,extentedKey, extendedPrivKey);

    console.log("hdAccounts")



    // return false
    console.log("hdAccounts",hdAccounts);
    var start = 0;
    var stop = 1;
    var index = Object.keys(hdAccounts).length ;
    if(index > 0){
        index = Object.keys(hdAccounts).length ;
        console.log(index);
        $('.derived_address_index').val(index);
        $(".derivation_path").val("m/44'/40'/0'/0/"+index);
        start = index;
    }else
    {
        $(".derivation_path").val("m/44'/40'/0'/0/0");
    }
    // console.log("index",index);
}



function displayAddresses(start, total) {
    for (var i = 0; i < total; i++) {
        var index = i + start;
        new TableRow(index)
    }

    // console.log(jsonData)
}


function TableRow(index) {

    function init() {
        calculateValues();
    }

    function calculateValues() {
        var jsonData = {
            path: "",
            address: "",
            publicKey: "",
            privateKey: ""
        };
        setTimeout(function() {
            var key = bip32ExtendedKey.derive(index);
            var address;
            if (!network.ethereum) {
                address = key.getAddress().toString();
            } else {
                var pubData = new bitcoin.ECKey(key.privKey.d, false).pub.toHex();
                var buffer = new ArrayBuffer(64);
                var view = new Uint8Array(buffer);
                var offset = 0;
                for (var i = 2; i < pubData.length; i += 2) {
                    view[offset++] = parseInt(pubData.substr(i, 2), 16);
                }


                var addressHex = keccak.keccak_256(buffer).substr(24).toLowerCase();
                // x = keccak_256(buffer)
                var checksum = keccak.keccak_256(addressHex);
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
            } else {
                privkey = "0x" + key.privKey.d.toString(16);
                pubkey = "0x" + pubkey;
            }
            // console.log(JSON.stringify({"Address": address}));
            // console.log(index,address, pubkey, privkey)
            jsonData.path = derivationPath +'/'+ index;
            jsonData.address = address;
            jsonData.publicKey = pubkey;
            jsonData.privateKey = privkey;
            // addAddressToList(index, address, pubkey, privkey);
            console.log(jsonData, "DATA");

            $('.derived_address').val(address);
            $('.derived_private_key').val(privkey);
            $('.derived_public_key').val(pubkey)
            jsonDataArray.push(jsonData)
        }, 50)

        // console.log(jsonDataArray)
    }
    init();

}




function setBip44DerivationPath() {
    console.log('f2')
    var purpose = parseIntNoNaN(args[3], 44);
    var coin = parseIntNoNaN(args[4], 40);
    var account = parseIntNoNaN(args[5], 0);
    var change = parseIntNoNaN(args[6], 0);
    var path = "m/";
    path += purpose + "'/";
    path += coin + "'/";

    path += account + "'";
    if (!network.ethereum) {
        path += "/" + change;
    }
    // console.log(path)
    return "m/44'/40'/0'/0";
}

function parseIntNoNaN(val, defaultVal) {
    var v = parseInt(val);
    if (isNaN(v)) {
        return defaultVal;
    }
    return v;
}
