<template>
    <div id="create-HD-account">
        <form>
            <div class="row description">
                HD wallets are hierarchical deterministic wallets which automatically generates a hierarchical tree-like structure of private/public
                addresses
            </div>
            <div class="row">
                <p v-if="accountNameError" class="error-message accountName-error">{{accountNameError}}</p>
                <span :class="accountName? 'input input--nao input--filled': 'input input--nao'">
                    <input class="accountName input__field input__field--nao" name="accountName" v-model="accountName" @focus="handleFocus"
                           type="text" id="input-1" />
                    <label class="input__label input__label--nao" for="input-1">
                        <span class="input__label-content input__label-content--nao">Title
                            <span class="mandatory">*</span>
                            <span class="details">This is Title of your Account </span>
                        </span>
                    </label>
                    <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                    </svg>
                </span>
            </div>
            <div class="row">
                <p v-if="ValidMnemonic" class="error-message invalidmnemonic-req-error">Valid Mnemonic Phrase is Required</p>
                <p v-if="invalidMnemonic" class="error-message invalidmnemonic-error">Invalid mnemonic</p>
                <input type="hidden" class="invalidmnemonic-val-error" />
                <span :class="fillinput? 'input input--nao input--filled': 'input input--nao'" id="mnemonics">
                    <textarea class="phrase input__field input__field--nao textarea" v-on:change="handlephrase" id="phrase"></textarea>
                    <label class="input__label input__label--nao" >
                        <span class="input__label-content input__label-content--nao">Enter mnemonic phrase of 12 digits
                            <span class="details">Mnemonic phrases are 12 words master key which stores all the information
                                that is needed at any point in time to recover your EXP or etc.</span>
                        </span>
                    </label>
                    <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                    </svg>
                </span>
                <div class="buttons gen">
                    <button @click="generateHandle" class="inner-btn ok generate" id="ge_1">Generate / Paste </button>
                </div>
            </div>
            <div class="row">
                <input id="bip44-path" v-model="derivation_path" placeholder="Derivation Path" type="hidden" disabled>
                <span :class="fillinput? 'input input--nao input--filled': 'input input--nao'">
                    <input class="input__field input__field--nao derivation_path"
                            type="text" disabled>
                    <label class="input__label input__label--nao" >
                        <span class="input__label-content input__label-content--nao">Derivation path
                        </span>
                    </label>
                    <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                    </svg>
                </span>
                <input type="hidden" class="derived_address_index" />
            </div>
            <div class="row">
                <span :class="fillinput? 'input input--nao input--filled': 'input input--nao'" id="address">
                    <input type="text" class="derived_address input__field input__field--nao" disabled>
                    <label class="input__label input__label--nao" >
                        <span class="input__label-content input__label-content--nao">Address
                        </span>
                    </label>
                    <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                    </svg>
                </span>
            </div>
            <div class="row">
                <span :class="fillinput? 'input input--nao input--filled': 'input input--nao'" id="privateKey">
                    <input type="text" class="derived_private_key input__field input__field--nao" disabled>
                    <label class="input__label input__label--nao" >
                        <span class="input__label-content input__label-content--nao">Private Key
                        </span>
                    </label>
                    <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                    </svg>
                </span>
            </div>
            <div class="row">
                <span :class="fillinput? 'input input--nao input--filled': 'input input--nao'" id="publicKey">
                    <input type="text" class="derived_public_key input__field input__field--nao" disabled>
                    <label class="input__label input__label--nao" >
                           <span class="input__label-content input__label-content--nao">Public Key
                        </span>
                    </label>
                    <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                    </svg>
                </span>
            </div>
            <div class="row">
                <p v-if="hd_wallet_passwordError" class="error-message hd_wallet_password-error">{{hd_wallet_passwordError}}</p>
                <span :class="hd_wallet_password? 'input input--nao input--filled': 'input input--nao'">
                    <input class="passwor input__field input__field--nao hd_wallet_password" name="hd_wallet_password" v-model="hd_wallet_password" @focus="handleFocus"
                           :type="passType" />
                    <label class="input__label input__label--nao" >
                        <span class="input__label-content input__label-content--nao">Enter Password
                            <span class="mandatory">*</span>
                            <span class="details"> Password Length must be at least 8</span>
                        </span>
                    </label>
                    <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                    </svg>
                </span>
            </div>

            <div class="row">
                <p v-if="hd_wallet_repasswordError" class="error-message hd_wallet_repassword-error">{{hd_wallet_repasswordError}}</p>
                <span :class="hd_wallet_repassword? 'input input--nao input--filled': 'input input--nao'">
                    <input class="passwor input__field input__field--nao hd_wallet_repassword" name="hd_wallet_repassword" v-model="hd_wallet_repassword" @focus="handleFocus"
                           :type="passType"  />
                    <label class="input__label input__label--nao" >
                        <span class="input__label-content input__label-content--nao">Confirm Password
                            <span class="mandatory">*</span>
                            <span class="details">Retype your password here </span>
                        </span>
                    </label>
                    <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                    </svg>
                </span>
            </div>
            <div class="chexboxes row">
                <div class="checkbox perform">
                    <label class="filter__value">
                        <input class="filter__mark showPass1" type="checkbox" @click="showPass" data-target1=".hd_wallet_password" data-target2=".hd_wallet_repassword"
                               data-type="password" id="input-3">
                        <i class="filter__mark"></i>
                        <span class="filter__text">Show Password</span>
                    </label>
                </div>
            </div>
            <div v-if="success" class="alert-sucess">
                <p>Sweet! Account successfully created.</p>
            </div>
            <div v-if="error" class="alert-unsucess">
                <p>ERROR</p>
            </div>
            <div class="buttons">
                <button @click="CreateHDWallet" class="create_hd_wallet ok button button--shikoba">
                    <img class="button__icon" src="../../../../assets/img/submit.svg">
                    <span>Create</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import {getAllAcounts} from '../walletcommon';
    import Raven from 'raven';
    import {web3} from '../../../../../main/libs/config';
    import {getRandomColor} from '../../../AccountsData/commonFunc';
    import {db} from '../../../../../../lowdbFunc';
    import * as $ from 'jquery';
    import {generateStart, generatePhraseStart}  from  '../../../../assets/js/bip39-Node/js/index';
    import md5  from  'md5';
    // var web3 = startConnectWeb();

    export default {
        name: 'CreateHDWallet',
        data() {
            return{
                mnemonicsTextarea: '',
                derivation_path: 'm/44\'/40\'/0\'/0',
                accountName: '',
                derived_address: '',
                derivedaddressindex: 0,
                privateKey: '',
                publicKey: '',
                hd_wallet_password: '',
                hd_wallet_repassword: '',
                mnemonicsTextareaError: false,
                derivation_pathError: false,
                derived_addressError: false,
                hd_wallet_passwordError: false,
                hd_wallet_repasswordError: false,
                accountNameError: '',
                passType: 'password',
                ValidMnemonic: false,
                invalidMnemonic: false,
                success: false,
                error: false,
                fillinput: false,
            };
        },
        computed: {
            hdaddress() {
                this.derived_address = $('.derived_address').val();
                return this.derived_address;
            },
            hdprivateKey() {
                this.privateKey = $('.derived_private_key').val();
                return this.privateKey;
            },
            hdpublicKey() {
                this.publicKey = $('.derived_public_key').val();
                return this.publicKey;
            },
            hdphrase() {
                this.mnemonicsTextarea = $('.phrase').val();
                return this.mnemonicsTextarea;
            },
            hdaddressIndex() {
                console.log("if HD wallet",  $('.derived_address_index').val());
                this.derivedaddressindex = $('.derived_address_index').val();
                return this.derivedaddressindex;
            },
            hdderivationpath() {
                this.derivation_path = $('.derivation_path').val();
                return this.derivation_path;
            },
        },
        components:{
        },
        created(){
            $('.derived_address').val('m/44\'/40\'/0\'/0');
        },
        methods: {
            handleFocus(){
                this.accountNameError = '';
                this.hd_wallet_passwordError = '';
                this.hd_wallet_repasswordError = '';
            },
            handlephrase() {
                this.mnemonicsTextarea = $('.phrase').val();
                this.fillinput = true;
                generatePhraseStart(this.mnemonicsTextarea);
            },
            CreateHDWallet(e){
                e.preventDefault();
                console.log("if HD wallet", this.hdaddressIndex);
                if(this.hdaddressIndex && this.accountName && this.hdderivationpath && this.hdphrase && this.hdaddress && this.hdprivateKey&& this.hdpublicKey && this.hd_wallet_password && this.hd_wallet_repassword){

                    console.log("if HD wallet", this.hd_wallet_password === this.hd_wallet_repassword);
                    if(this.hd_wallet_password === this.hd_wallet_repassword) {
                        try {
                            let account_address = web3.eth.personal.importRawKey(this.hdprivateKey.replace(/0x/g, ''), this.hd_wallet_password);
                            console.log("if HD wallet", account_address);
                            var phrase_hash = md5(this.hdphrase);
                            account_address.then((res) => {
                                console.log(res, "HD wallet");
                                let color = getRandomColor();
                                db.get('accounts').push({
                                    accountTitle: this.accountName,
                                    hash: res,
                                    isHd: true,
                                    color: color,
                                    archive: false
                                }).write();
                                db.get('hdWallets').push({
                                    public_key: this.hdpublicKey,
                                    index: this.hdaddressIndex,
                                    phrase_hash: phrase_hash,
                                    address: res,
                                    derivationPath: this.hdderivationpath,
                                    color: color
                                }).write();
                                this.success = true;
                                $('.alert-sucess').show(300).delay(5000).hide(330);
                                getAllAcounts();
                                $('form').trigger("reset");
                            }, (err) => {
                                console.log(err, "HD wallet")
                                this.accountNameError = "Title is already exists";
                            });

                        } catch (err) {
                            console.log("Execption Error" + err.message);
                            Raven.captureException(err);
                        }
                    } else {
                        this.hd_wallet_repasswordError = "Password unmatch";
                    }
                } else {
                    if(!this.accountName){
                        this.accountNameError = "Name is Required";
                    }
                    if(!this.hd_wallet_password){
                        this.hd_wallet_passwordError = "Password is Required";
                    }
                    if(!this.hd_wallet_repassword){
                        this.hd_wallet_repasswordError = "Repassword is Required";
                    }
                }
            },
            showPass(){
                if(this.passType === "password")
                    this.passType = "text";
                else
                    this.passType = "password";
            },
            generateHandle(e){
                e.preventDefault();
                this.fillinput = true;
                generateStart();

            }
        }
    }
</script>

<style>

</style>
