<template>
    <div class="tokenlab">
        <div class="main-container" v-if="!validMail">
            <div class="create-acccount">
                <div class="account-field">
                    <div class="inner">
                        <img src="../../../assets/img/logo-luna.png" class="logo-luna " alt="Luna Expanse Wallet">
                        <h1>In order to proceed with it, please provide us your login credentials to registered with Tokenlab.</h1>
                        <form id="create-new-account">
                            <div class="row">
                                <p class="error-message accountName-error error" v-if="accountNameError">{{ accountNameError }}</p>
                                <span :class="accountName? 'input input--nao input--filled': 'input input--nao'">
                                    <input class="accountName input__field input__field--nao" name="accountName" v-model="accountName" @focus="handleFocus"
                                           type="text" id="input-1"/>
                                    <label class="input__label input__label--nao" for="input-1">
                                        <span class="input__label-content input__label-content--nao">Email Address
                                            <span class="mandatory">*</span><span class="details">This is Email of your Tokenlab Account </span>
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
                                    <input class="passwor input__field input__field--nao password" name="password" v-model="pass" @focus="handleFocus" @keyup.enter="handleCreateAcc"
                                           :type="passType" id="input-2"/>
                                    <label class="input__label input__label--nao" for="input-2">
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
                            <p>Sweet! Login successfully.</p>
                        </div>
                        <div class="alert-unsucess hide">
                            <p>ERROR</p>
                        </div>

                        <div class="buttons">
                            <button @click="handleCreateAcc" class=" ok createSimpleAccount button button--shikoba md-close">
                                <img class="button__icon" src="../../../assets/img/create.svg">
                                <span>Login</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="validMail" class="dashboard tabcontent" id="dashboard" v-bind:style="{display: 'block',zIndex: '0'}">
            <div class="content tokentexts">
                <div class="top-heading">
                    <h1>TOKENLAB</h1>
                </div>
                <div class="logout-btn" @click="handlelogout">
                    <h1>Logout</h1>
                </div>
            </div>
            <tokens />
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import {apiurl} from "../../../../main/libs/config";
    import Tokens from "./Components/Tokens";
    import CryptoJS from "crypto-js";
    import * as $ from 'jquery';

    export default {
        components: {'tokens':Tokens},
        name: 'TokenlabComponent',
        data() {
            return{
                accountName: '',
                pass: '',
                passType: 'password',
                validMail: false,
                accountNameError: '',
                passError: '',
            };
        },
        created(){
            if(localStorage.getItem('lunamail')) {
                this.validMail = true;
            }
        },
        methods: {
            showPass(){
                if(this.passType == "password")
                    this.passType = "text";
                else
                    this.passType = "password";
            },
            handleFocus(){
                this.successAlert = false;
                this.alert = false;
                this.error = false;
                this.accountNameError = '';
                this.passError = '';
            },
            handlelogout(){
                localStorage.removeItem('lunamail');
                localStorage.removeItem('lunatoken');
            },
            handleCreateAcc(){
                if(this.accountName && this.pass) {
                    var loginData = {
                        email: this.accountName,
                        password: this.pass,
                    };
                    const data=JSON.stringify(loginData);
                    const config = { headers: { "Content-Type": "application/json" } };

                    var url = apiurl + '/login';
                    axios.post(url, data, config )
                        .then((response)  =>  {
                            if(response.data.success){
                                var ciphertext = CryptoJS.AES.encrypt(this.accountName, 'luna');
                                var ciphertext1 = CryptoJS.AES.encrypt(response.data.token, 'luna');
                                localStorage.setItem('lunamail', ciphertext);
                                localStorage.setItem('lunatoken', ciphertext1);
                                $('.alert-sucess').show(400).delay(5000).hide(330);
                                setTimeout(() => {
                                    this.validMail = true;
                                }, 2000)
                            }else
                            {
                                $('.alert-unsucess').show(400).delay(5000).hide(330);
                                setTimeout(() => {
                                    this.validMail = false;
                                }, 2000)
                            }
                        }, (error)  =>  {
                            $('.alert-unsucess').show(400).delay(5000).hide(330);
                            setTimeout(() => {
                                this.validMail = false;
                            }, 2000)
                            console.log(error);
                        })
                } else {
                    if(!this.accountName){
                        this.accountNameError = "Email Address is required"
                    }
                    else if (!this.pass) {
                        this.passError = "Password is required"
                    }
                }
            }
        }
    }
</script>


<style>
    .top-heading h1{
        font-size: 25px;
    }

    .accountName-error {
        padding: 10px 10px;
    }

    .tokenlab .create-acccount #create-new-account {
        margin-top: 40px;
    }

    .tokenlab {
        height: 89vh;
    }
    .tokenlab .main-container{
        height: 100%;
    }
    .tokenlab .txns_details{
        height: 40vh;
    }

    .tokenlab .txns_details .md-content{
        height: 100%;
    }

    .tokenlab .tokentexts{
        display: flex;
        justify-content: space-between;
    }

    .tokenlab .logout-btn{
        cursor: pointer;
        font-size: 18px;
    }

    .tokenlab .logout-btn:hover{
        color: #cb4d43;
    }


</style>
