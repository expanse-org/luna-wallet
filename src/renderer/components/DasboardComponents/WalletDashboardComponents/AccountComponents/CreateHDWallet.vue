<template>
    <div id="create-HD-account">
        <form>
            <div class="row description">
                HD wallets are hierarchical deterministic wallets which automatically generates a hierarchical tree-like structure of private/public
                addresses
            </div>
            <div class="row">
                <p v-if="ValidMnemonic" class="error-message invalidmnemonic-req-error">Valid Mnemonic Phrase is Required</p>
                <p v-if="invalidMnemonic"class="error-message invalidmnemonic-error">Invalid mnemonic</p>
                <input type="hidden" class="invalidmnemonic-val-error" />
                <span class="input input--nao" id="mnemonics">
                    <textarea class="phrase input__field input__field--nao textarea" id="phrase" v-model="mnemonicsTextarea" @focus="handleFocus"></textarea>
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
                <div @click="generateHandle" class="buttons gen">
                    <button @click="generateHandle" class="inner-btn ok generate" id="ge_1">Generate / Paste </button>
                </div>
            </div>
            <div class="row">
                <input id="bip44-path" v-model="derivation_path" placeholder="Derivation Path" type="hidden" disabled>
                <span class="input input--nao">
                    <input class="input__field input__field--nao derivation_path" v-model="derivation_path" @focus="handleFocus"
                           placeholder="Derivation Path" type="text" disabled>
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
                <span class="input input--nao" id="address">
                    <input type="text" class="derived_address input__field input__field--nao" v-model="derived_address" @focus="handleFocus" disabled>
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
                <span class="input input--nao" id="privateKey">
                    <input type="text" class="derived_private_key input__field input__field--nao" v-model="privateKey" @focus="handleFocus" disabled>
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
                <span class="input input--nao" id="publicKey">
                    <input type="text" class="derived_public_key input__field input__field--nao" v-model="publicKey" @focus="handleFocus" disabled>
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
                <p v-if="hd_wallet_passwordError" class="error-message hd_wallet_password-error">Password Length must be at least 8 </p>
                <span class="input input--nao">
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
                <p v-if="hd_wallet_repasswordError" class="error-message hd_wallet_repassword-error">Password do not Match</p>
                <span class="input input--nao">
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
    // import bip32 from 'bip32';
    import Raven from 'raven';
    import {startConnectWeb} from '../../../../../main/libs/config';
    import {getRandomColor} from '../../../AccountsData/commonFunc';
    import {db} from '../../../../../../lowdbFunc';
    import * as $ from 'jquery';
    import '../../../../assets/js/bip39-Node/js/bitcoinjs-1-5-7';
    import '../../../../assets/js/bip39-Node/js/bitcoinjs-extensions';
    import '../../../../assets/js/bip39-Node/js/sjcl-bip39';
    import '../../../../assets/js/bip39-Node/js/networks';
    import '../../../../assets/js/bip39-Node/js/sha3';
    import '../../../../assets/js/bip39-Node/js/wordlist_english';
    import '../../../../assets/js/bip39-Node/js/index';
    export default {
        name: 'CreateHDWallet',
        data() {
            return{
                mnemonicsTextarea: '',
                derivation_path: 'm/44\'/40\'/0\'/0',
                derived_address: '',
                privateKey: '',
                publicKey: '',
                hd_wallet_password: '',
                hd_wallet_repassword: '',
                mnemonicsTextareaError: false,
                derivation_pathError: false,
                derived_addressError: false,
                hd_wallet_passwordError: false,
                hd_wallet_repasswordError: false,
                passType: 'password',
                ValidMnemonic: false,
                invalidMnemonic: false,
                success: false,
                error: false,
            };
        },
        components:{
        },
        created(){
            // let node = bip32.fromBase58('xprv9s21ZrQH143K3QTDL4LXw2F7HEK3wJUD2nW2nRk4stbPy6cq3jPPqjiChkVvvNKmPGJxWUtg6LnF5kejMRNNU3TGtRBeJgk33yuGBxrMPHi')
            // let child = node.derivePath('m/44/40/0/0');
            // console.log(bip32)
            // console.log(node)
            // console.log(child)
        },
        methods: {
            handleFocus(){
                this.mnemonicsTextareaError = false;
                this.derivation_pathError = false;
                this.derived_addressError = false;
                this.hd_wallet_passwordError = false;
                this.hd_wallet_repasswordError = false;
            },
            CreateHDWallet(e){
                e.preventDefault();
                if(this.mnemonicsTextarea && this.derivation_path && this.derived_address && this.privateKey && this.publicKey && this.hd_wallet_password && this.hd_wallet_repassword){
                    try {
                        let account_address = web3.personal.importRawKey(key, password);

                        let color = getRandomColor();
                        db.get('accounts').push({
                            accountTitle: "",
                            hash: account_address,
                            isHd: true,
                            color: color
                        }).write();
                        db.get('hdWallets').push({
                            key: keymain,
                            public_key: public_key,
                            index: index,
                            phrase: phrase,
                            address: account_address,
                            derivationPath: derivationPath,
                            color: color
                        }).write();
                        $('.alert-sucess').show(300).delay(5000).hide(330);
                        listAccounts();
                        $('form').trigger("reset");

                    } catch (err) {
                        console.log("Execption Error" + err.message);
                        Raven.captureException(err);
                    }
                } else {
                    if(!this.mnemonicsTextarea){
                        this.mnemonicsTextareaError = true;
                    }
                    if(!this.derivation_path){
                        this.derivation_pathError = true;
                    }
                    if(!this.derived_address){
                        this.derived_addressError = true;
                    }
                    if(!this.hd_wallet_password){
                        this.hd_wallet_passwordError = true;
                    }
                    if(!this.hd_wallet_repassword){
                        this.hd_wallet_repasswordError = true;
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

            }
        }
    }
</script>

<style>
</style>
