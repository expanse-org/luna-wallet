<template>
    <div class="tokenlab">
        <div class="main-container" v-if="!validMail">
            <div class="create-acccount">
                <div class="account-field">
                    <div class="inner">
                        <img src="../../../assets/img/logo-luna.png" class="logo-luna " alt="Luna Expanse Wallet">
                        <h1>In order to proceed with it, please provide us your email address registered with Tokenlab.</h1>
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
                        </form>

                        <div class="alert-sucess hide">
                            <p>Sweet! Email registered successfully.</p>
                        </div>
                        <div class="alert-unsucess hide">
                            <p>ERROR</p>
                        </div>

                        <div class="buttons">
                            <button @click="handleCreateAcc" class=" ok createSimpleAccount button button--shikoba md-close">
                                <img class="button__icon" src="../../../assets/img/create.svg">
                                <span>Enter Email</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="validMail" class="dashboard tabcontent" id="dashboard" v-bind:style="{display: 'block',zIndex: '0'}">
            <div class="content">
                <div class="top-heading">
                    <h1>TOKENLAB</h1>
                </div>
            </div>
            <tokens />
        </div>
    </div>
</template>

<script>
    import Tokens from "./Components/Tokens";
    import CryptoJS from "crypto-js";
    import * as $ from 'jquery';

    export default {
        components: {'tokens':Tokens},
        name: 'TokenlabComponent',
        data() {
            return{
                accountName: '',
                validMail: false,
                accountNameError: '',
            };
        },
        created(){
            if(localStorage.getItem('lunamail')) {
                this.validMail = true;
            }
        },
        methods: {
            handleFocus(){
                this.successAlert = false;
                this.alert = false;
                this.error = false;
                this.accountNameError = '';
            },
            handleCreateAcc(){
                if(this.accountName){
                    var ciphertext = CryptoJS.AES.encrypt(this.accountName, 'luna');
                    localStorage.setItem('lunamail', ciphertext);
                    $('.alert-sucess').show(400).delay(5000).hide(330);
                    setTimeout(() => {
                        this.validMail = true;
                    }, 2000)
                } else {
                    this.accountNameError = "Email Address required"
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


</style>
