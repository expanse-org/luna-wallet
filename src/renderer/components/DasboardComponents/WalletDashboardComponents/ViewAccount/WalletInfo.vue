<template>
    <div class="popup popup1 md-content ">
        <a href="#" class="btn-close md-close"></a>
        <h1>Wallet Information</h1>
        <div class="row hd">
            <span class="row-3 ">
                <span>Phrase</span>
                <div class="value menemonicPharase"></div>
                <input type="hidden" v-model="menemonicPharase" class="menemonicPharase-inp /">
                <div class="tooltip3 copytext" @click="copy(menemonicPharase)" data-val=".menemonicPharase-inp">
                    <img src="../../../../assets/img/copy.svg" />
                    <span class="tooltiptext2">Copied</span>
                </div>
            </span>
        </div>
        <div class="row hd">
            <div class="row-3">
                <span>Derivation Path </span>
                <div class="value derivation_path"></div>
                <input type="hidden" v-model="derivationPath" class="derivation_path-inp" />
                <div class="tooltip3 copytext"  @click="copy(derivationPath)" data-val=".derivation_path-inp">
                    <img src="../../../../assets/img/copy.svg" />
                    <span class="tooltiptext2">Copied</span>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="row-3">
                <span>Address</span>
                <div class="value publicAddress"></div>
                <input type="hidden" v-model="publicAddress" class="publicAddress-inp" />
                <div class="tooltip3 copytext" @click="copy(publicAddress)" data-val=".publicAddress-inp">
                    <img src="../../../../assets/img/copy.svg" />
                    <span class="tooltiptext2">Copied</span>
                </div>
            </div>

        </div>

        <div class="row priv_password non-hd ">
            <form>
                <div class="row-3">
                    <p class="error-message priv-password-error">Invalid Password</p>
                    <span>Password</span>
                    <span class="input input--nao">
                    <input type="password" v-model="privateKeyPass" name="privateKey-inp-pass" class="privateKey-inp-pass input__field input__field--nao" placeholder="Enter Password of Account to see Private Key" />
                    <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                    </svg>
                </span>


                </div>
                <div class="buttons gen">
                    <button class="ok get_private_key_pass">Unlock</button>
                </div>
            </form>
        </div>
        <div class="row hd p_key">
            <div class="row-3">
                <span>Private Key</span>
                <div class="value privateKey"></div>
                <input type="hidden" v-model="privateKey" class="privateKey-inp" />
                <div class="tooltip3 copytext" @click="copy(privateKey)" data-val=".privateKey-inp">
                    <img src="../../../../assets/img/copy.svg" />
                    <span class="tooltiptext2">Copied</span>
                </div>
            </div>
        </div>
        <div class="row hd">
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
    import {reOrderAccountsbyBalance} from '../walletcommon';
    import Accounts from '../Accounts';
    import { clipboard } from 'electron';
    import * as $ from 'jquery';

    export default {
        name: 'WalletInfo',
        props: ['accountHash'],
        data() {
            return{
                menemonicPharase: '',
                derivationPath: '',
                publicAddress: '',
                privateKeyPass: '',
                privateKey: '',
                publicKey: '',
            };
        },
        components:{
            'accounts': Accounts,
        },
        created(){
            console.log(this.accountHash,"accountHash");
            this.publicAddress = this.accountHash;
        },
        methods: {

            handleFocus(){

            },
            copy(data){
                var copyText = data;
                if (copyText) {
                    clipboard.writeText(copyText, 'selected');
                }
                var styles = {
                    visibility: "visible",
                    opacity: "1"
                };
                var styles2 = {
                    visibility: "hidden",
                    opacity: "0"
                };
                // $(this).children('.tooltiptext2').css(styles);
                // var t = $(this);
                // setTimeout(function () {
                //     t.children('.tooltiptext2').animate(styles2, 400);
                // }, 1000);
            }
        }
    }
</script>

<style>
</style>