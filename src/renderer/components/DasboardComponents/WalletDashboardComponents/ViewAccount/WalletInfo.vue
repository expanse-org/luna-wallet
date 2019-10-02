<template>
    <div class="popup popup1 md-content ">
        <a href="#" @click="hide" class="btn-close md-close"></a>
        <h1>Wallet Information</h1>
        <div class="row">
            <div class="row-3">
                <span>Address</span>
                <div class="value publicAddress">{{publicAddress}}</div>
                <input type="hidden" v-model="publicAddress" class="publicAddress-inp" />
                <div class="tooltip3 copytext" @click="copy(publicAddress,'pubadd')" data-val=".publicAddress-inp">
                    <img src="../../../../assets/img/copy.svg" />
                    <span v-if="copiedtip" class="tooltiptext2">Copied</span>
                </div>
            </div>
        </div>

        <div class="row priv_password non-hd ">
            <form>
                <div class="row-3">
                    <p v-if="privateKeyPassError" class="error-message priv-password-error">Invalid Password</p>
                    <span>Password</span>
                    <span class="input input--nao">
                    <input type="password" v-model="privateKeyPass" @focus="handleFocus" name="privateKey-inp-pass" class="privateKey-inp-pass input__field input__field--nao"
                           placeholder="Enter Password of Account to see Private Key" />
                    <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                    </svg>
                </span>
                </div>
                <div class="buttons">
                    <button @click="handleUnlock" :disabled="btndisable" id="contract_transactions_btn" type="submit" class="ok button button--shikoba">
                        <img v-if="loading" class="outer-wheel button__icon" src="../../../../assets/img/innerCricle.svg"/>
                        <img v-if="!loading"  class="button__icon" src="../../../../assets/img/submit.svg">
                        <span>Unlock</span>
                    </button>
                </div>
            </form>
        </div>
        <div v-if="privateKeyhide" class="row hd p_key">
            <div class="row-3">
                <span>Private Key</span>
                <div class="value privateKey">{{privateKey}}</div>
                <input type="hidden" v-model="privateKey" class="privateKey-inp" />
                <div class="tooltip3 copytext" @click="copy(privateKey, 'pkey')" data-val=".privateKey-inp">
                    <img src="../../../../assets/img/copy.svg" />
                    <span v-if="copiedtipk" class="tooltiptext2">Copied</span>
                </div>
            </div>
        </div>
        <div v-if="hidedata" class="row hd">
            <div class="row-3">
                <span>Public Key</span>
                <div class="value publicKey"></div>
                <input type="hidden" v-model="publicKey" class="publicKey-inp" />
                <div class="tooltip3 copytext" @click="copy(publicKey)" data-val=".publicKey-inp">
                    <img src="../../../../assets/img/copy.svg" />
                    <span class="tooltiptext2">Copied</span>
                </div>
            </div>
        </div>

        <div class="buttons">

        </div>
    </div>
</template>

<script>
    import Accounts from '../Accounts';
    import { clipboard, remote } from 'electron';
    import * as $ from 'jquery';
    import os from 'os';
    import * as Raven from 'raven-js';
    import keythereum from 'keythereum';
    const app = remote.app;

    export default {
        name: 'WalletInfo',
        props: ['accountHash'],
        data() {
            return{
                menemonicPharase: '',
                derivationPath: '',
                publicAddress: '',
                privateKeyPassError: false,
                privateKeyPass: '',
                privateKey: '',
                publicKey: '',
                hidedata: false,
                privateKeyhide: false,
                copiedtip: false,
                copiedtipk: false,
                loading: false,
                btndisable: false,
            };
        },
        components:{
            'accounts': Accounts,
        },
        created(){
            // console.log(this.accountHash,"accountHash");
            this.publicAddress = this.accountHash;
        },
        methods: {
            hide () {
                // console.log("close wallet_info")
                this.$modal.hide('wallet_info');
            },
            handleFocus(){
                this.privateKeyPassError = false;
            },
            copy(data, tab){
                var copyText = data;
                if (copyText) {
                    clipboard.writeText(copyText, 'selected');
                }
                switch(tab){
                    case 'pubadd':
                        this.copiedtip = true;
                        break;
                    case 'pkey':
                        this.copiedtipk = true;
                        break;
                }
                setTimeout(() => {
                    this.copiedtip = false;
                    this.copiedtipk = false;
                },2000);
            },
            handleUnlock(e){
                e.preventDefault();
                let osType = os.type();
                let datadir = "";
                if(this.publicAddress && this.privateKeyPass){
                    this.loading = true;
                    this.btndisable = true;
                    this.privateKeyPassError = false;
                    switch(osType) {
                        case "Linux":
                            datadir = app.getPath('home')+'/.expanse';
                            break;
                        case "Darwin":
                            datadir = app.getPath('home')+'/Library/Expanse';
                            break;
                        case "Windows_NT":
                            datadir = `${app.getPath('appData')}\\Expanse`;
                            break;
                    }
                    // console.log("datadir",datadir);
                   setTimeout( () => {
                       var keyObject = keythereum.importFromFile(this.publicAddress, datadir);
                       try{
                           var privateKey = keythereum.recover(this.privateKeyPass, keyObject);
                           // console.log("privateKey",privateKey);
                           privateKey = privateKey.toString('hex');
                           this.privateKeyhide = true;
                           this.loading = false;
                           this.btndisable = false;
                           this.privateKey = privateKey;
                       }catch(e){
                           Raven.captureException(e);
                           this.privateKeyPassError = true;
                       }
                   },1000)

                }else {
                    this.loading = false;
                    this.btndisable = false;
                    if (!this.privateKeyPass) {
                        this.privateKeyPassError = true;
                    }
                }
            }
        }
    }
</script>

<style scoped>

    .error-message {
        top: -25px;
    }

    .privateKey-inp-pass::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #aaa;
        opacity: 1; /* Firefox */
    }

    .privateKey-inp-pass:-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #aaa;
    }

    .privateKey-inp-pass:-ms-input-placeholder { /* Microsoft Edge */
        color: #aaa;
    }
</style>
