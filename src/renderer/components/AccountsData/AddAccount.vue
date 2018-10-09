<template>
    <div class="main-container">
        <div class="create-acccount">
            <div class="account-field">
                <div class="inner">
                    <img src="../../assets/img/logo-luna.png" class="logo-luna " alt="Luna Expanse Wallet">
                    <h1>Accounts are password protected keys that can hold Expanse and Expanse-based tokens. </h1>
                    <form id="create-new-account">
                        <div class="row">
                            <p class="error-message accountName-error error" v-if="accountNameError">{{ accountNameError }}</p>
                            <span :class="accountName? 'input input--nao input--filled': 'input input--nao'">
                                <input class="accountName input__field input__field--nao" name="accountName" v-model="accountName" @focus="handleFocus"
                                       type="text" id="input-1"/>
                                <label class="input__label input__label--nao" for="input-1">
                                    <span class="input__label-content input__label-content--nao">Title
                                        <span class="mandatory">*</span><span class="details">This is Title of your Account </span>
                                    </span>
                                </label>
                                <svg class="graphic graphic--nao" width="300%" height="100%"
                                     viewBox="0 0 1200 60" preserveAspectRatio="none">
                                    <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"
                                    />
                                </svg>
                            </span>
                        </div>

                        <div class="row">
                            <p class="error-message password-error error" v-if="passError">{{ passError }}</p>
                            <span :class="pass? 'input input--nao input--filled': 'input input--nao'">
                                <input class="passwor input__field input__field--nao password" name="password" v-model="pass" @focus="handleFocus"
                                       :type="passType"/>
                                <label class="input__label input__label--nao" for="input-1">

                                    <span class="input__label-content input__label-content--nao">Enter Password
                                        <span class="mandatory">*</span><span class="details">Password Length must be at least 8</span>
                                    </span>
                                </label>
                                <svg class="graphic graphic--nao" width="300%" height="100%"
                                     viewBox="0 0 1200 60" preserveAspectRatio="none">
                                    <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"
                                    />
                                </svg>
                            </span>
                        </div>
                        <div class="row">
                            <p class="error-message retype-password-error error" v-if="rePassError">{{rePassError}}</p>
                            <span :class="rePass? 'input input--nao input--filled': 'input input--nao'">
                                <input class="passwor input__field input__field--nao retype-password" v-model="rePass" @focus="handleFocus"
                                       name="retype-password" :type="passType"/>
                                <label class="input__label input__label--nao" for="input-1">

                                    <span class="input__label-content input__label-content--nao">Re Type Password
                                        <span class="mandatory">*</span><span class="details">Retype your password here </span>
                                    </span>
                                </label>
                                <svg class="graphic graphic--nao" width="300%" height="100%"
                                     viewBox="0 0 1200 60" preserveAspectRatio="none">
                                    <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"
                                    />
                                </svg>
                            </span>
                        </div>

                        <div class="label row">

                        </div>

                        <div class="chexboxes">
                            <div class="checkbox perform">
                                <label class="filter__value">
                                    <input class="filter__mark showPass" type="checkbox" data-target=".retype-password" @click="showPass"
                                           data-type="password">
                                    <i class="filter__mark"></i>
                                    <span class="filter__text">Show Password</span>
                                </label>
                            </div>
                        </div>
                    </form>

                    <div class="alert-sucess hide">
                        <p>Sweet! Account successfully Created.</p>
                    </div>
                    <div class="alert-unsucess hide">
                        <p>ERROR</p>
                    </div>

                    <div class="buttons">
                        <button @click="handleBack" class=" primery back_to_create_account button button--shikoba md-close">
                            <img class="button__icon" src="../../assets/img/back.png">
                            <span>Back</span>
                        </button>
                        <button @click="handleCreateAcc" class=" ok createSimpleAccount button button--shikoba md-close">
                            <img class="button__icon" src="../../assets/img/create.svg">
                            <span>create account</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Raven from 'raven';
    import classie from '../../assets/js/classie';
    import modalEffects from '../../assets/js/modalEffects';
    import {web3} from '../../../main/libs/config';
    import {getRandomColor} from './commonFunc';
    import {db} from '../../../../lowdbFunc';
    import {downloadGexp} from '../../../common/gexpfunc';
    import {ipcRenderer} from 'electron';
    import * as $ from 'jquery';


    export default {
        name: 'Add-Account',
        data() {
            return {
                successAlert: false,
                alert: false,
                error: false,
                accountName: '',
                pass: '',
                rePass: '',
                accountNameError: '',
                passError: '',
                rePassError: '',
                passType: 'password',
            };
        },
        created(){
            // (function () {
            //     [].slice.call(document.querySelectorAll('input.input__field')).forEach(function (inputEl) {
            //         // in case the input is already filled..
            //         if (inputEl.value.trim() !== '') {
            //             classie.add(inputEl.parentNode, 'input--filled');
            //         }
            //         // events:
            //         inputEl.addEventListener('focus', onInputFocus);
            //         inputEl.addEventListener('blur', onInputBlur);
            //     });
            //
            //     function onInputFocus(ev) {
            //         classie.add(ev.target.parentNode, 'input--filled');
            //     }
            //     function onInputBlur(ev) {
            //         if (ev.target.value.trim() === '') {
            //             classie.remove(ev.target.parentNode, 'input--filled');
            //         }
            //     }
            // })();
        },
        methods: {
            handleBack(){
                $('.account-field').toggle("slide");
                $('.luna-upload').toggle("slide");
                this.$router.push({
                    path: '/createaccount'
                });
                $('form').trigger("reset");
                this.error= false;

            },
            handleFocus(){
                this.successAlert = false;
                this.alert = false;
                this.error = false;
                this.accountNameError = '';
                this.passError = '';
                this.rePassError = '';
            },
            handleCreateAcc(){
                this.error = false;
                var that = this;
                if(this.accountName && this.pass && this.rePass){
                    if(this.pass.length >= 8 ){
                        if(this.pass === this.rePass){
                            try{
                                that.createSimpleAccount(this.accountName , this.pass);
                                $('form').trigger("reset");
                            } catch (err) {
                                console.log("Execption Error" + err.message);
                                Raven.captureException(err);
                            }
                        }else {
                            this.rePassError = "Password Do not match";
                        }
                    }else if(this.pass.length < 8 ){
                        this.passError = "Error : Password length must be Atleast 8";
                    }
                }else if(!this.accountName){
                    this.accountNameError = 'Name is required';
                }else if(!this.pass){
                    this.passError = "Error : Password length must be Atleast 8";
                }else if(!this.rePass){
                    this.rePassError = "Password Do not match";
                }

            },
            createSimpleAccount(acName , pass) {
                var that = this;
                try{
                    console.log(web3,"web3Account");
                    web3.eth.personal.newAccount(pass, function(err, hash){
                        console.log("error 02: "+err);
                        if(err){
                            console.log("Error Creating Account :",err);
                            $('.alert-unsucess').show(400).delay(5000).hide(330);

                        }else{
                            let color = getRandomColor();
                            // On Success Enter hash and Account Code in database
                            // Add a Accounts
                            db.get('accounts')
                                .push({ accountTitle: acName, hash : hash, color:color, archive: false, isHd: false})
                                .write();
                            $('.alert-sucess').show(300).delay(5000).hide(330);
                            that.launchApplication();
                        }
                    });
                } catch (err) {
                    console.log("Execption Error" + err.message);
                    Raven.captureException(err);
                }
            },
            launchApplication(){
                let that = this;
                try{
                    web3.eth.getAccounts(function (error, accounts) {
                        console.log("Accounts",accounts.length);
                        if(accounts.length > 0){
                            that.$router.push({
                                path: '/walletdashboard'
                            })
                        }
                    });
                }catch(e){
                    Raven.captureException(e);
                    console.log(e, "Raven")
                }
            },
            showPass(){
                if(this.passType === "password")
                    this.passType = "text";
                else
                    this.passType = "password";
            }
        }
    }
</script>

<style>

</style>

