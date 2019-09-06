<template>
    <div class="tokenlab">
        <div class="main-container" v-if="!validMail">
            <div class="create-acccount">
                <div class="account-field">
                    <div class="inner">
                        <img src="../../../assets/img/logo-luna.png" class="logo-luna " alt="Luna Expanse Wallet">
                        <h1 class="lunainttxt">Luna integration with Tokenlab.</h1>
                        <h1>Please provide your Tokenlab login credentials here.</h1>
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
                                    <input class="passwor input__field input__field--nao password" name="password" v-model="pass" @focus="handleFocus"
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
                            <p>Login successfull!</p>
                        </div>
                        <div class="alert-unsucess hide">
                            <p>ERROR</p>
                        </div>
                        <div class="buttons">
                            <button @click="handleCreateAcc" :disabled="btndisable" id="contract_transactions_btn" type="submit" class="ok button button--shikoba">
                                <img v-if="loading" class="outer-wheel button__icon" src="../../../assets/img/innerCricle.svg"/>
                                <img v-if="!loading"  class="button__icon" src="../../../assets/img/create.svg">
                                <span>Log In</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="validMail" class="dashboard tabcontent" id="dashboard" v-bind:style="{display: 'block',zIndex: '0'}">
            <div class="content tokentexts">
                <div class="top-heading">
                    <h1><img class="tokenlab-img" src="../../../assets/img/tokenlab.svg"/>TOKENLAB</h1>
                </div>
                <div class="logout-btn" @click="handlelogout">
                    <h1><img class="logout-img" src="../../../assets/img/logout.svg"/>Log Out</h1>
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
    import { db } from '../../../../../lowdbFunc';

    export default {
        components: {'tokens':Tokens},
        name: 'TokenlabComponent',
        data() {
            return{
                accountName: '',
                pass: '',
                passType: 'password',
                validMail: false,
                loading: false,
                btndisable: false,
                accountNameError: '',
                passError: '',
            };
        },
        created(){
            if(localStorage.getItem('lunamail') && localStorage.getItem('lunatoken')) {
                this.validMail = true;
            } else {
                this.validMail = false;
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
                let bytes1  = CryptoJS.AES.decrypt(localStorage.getItem('lunatoken'), 'luna');
                let plaintext1 = bytes1.toString(CryptoJS.enc.Utf8);
                const config = { headers: { "Content-Type": "application/json", "Authorization": plaintext1} };
                let bytes  = CryptoJS.AES.decrypt(localStorage.getItem('lunamail'), 'luna');
                let plaintext = bytes.toString(CryptoJS.enc.Utf8);
                // console.log(plaintext, "plainText");
                let url = apiurl + `/contracts/email/${plaintext}`;
                axios.get(url, config ).then((response)  =>  {
                    // console.log(response.data.data);
                    this.contractdata = response.data.data;
                    response.data.data.map((token) => {
                        if(token.step >= 4 && token.paid && !token.archived) {
                            // console.log(token);
                            let token1 = db.get('tokens').find({ token_address: token.token && token.token.addr }).value();
                            if(token1)
                            {
                                db.get('tokens').remove({ token_address: token.token && token.token.addr}).write();
                            }
                            const config1 = { headers: { "Content-Type": "application/json"} };
                            var url1 = apiurl + `/contract/standard/${token.std}`;
                            axios.get(url1, config1 ).then((response)  =>  {
                                // console.log( response.data.data, "getAddress 1");
                                if(token.balances.addr) {
                                    let contract1 = db.get('contracts').find({
                                        contract_address: token.balances.addr
                                    }).value();
                                    if(contract1) {
                                        db.get('contracts').remove({ contract_address: token.balances && token.balances.addr}).write();
                                    }
                                }
                                if(token.admin.addr) {
                                    let contract1 = db.get('contracts').find({
                                        contract_address: token.admin.addr
                                    }).value();
                                    if(contract1) {
                                        db.get('contracts').remove({ contract_address: token.admin && token.admin.addr}).write();
                                    }
                                }
                            }, (error)  =>  {
                                console.log(error)
                            });
                        }
                    })
                }, (error)  =>  {
                    console.log(error)
                });
                localStorage.removeItem('lunamail');
                localStorage.removeItem('lunatoken');
                this.validMail = false;
            },
            handleCreateAcc(){
                this.loading = true;
                this.btndisable = true;
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
                                this.loading = false;
                                this.btndisable = false;
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
                                this.loading = false;
                                this.btndisable = false;
                                $('.alert-unsucess').show(400).delay(5000).hide(330);
                                setTimeout(() => {
                                    this.validMail = false;
                                }, 2000)
                            }
                        }, (error)  =>  {
                            this.loading = false;
                            this.btndisable = false;
                            $('.alert-unsucess').show(400).delay(5000).hide(330);
                            setTimeout(() => {
                                this.validMail = false;
                            }, 2000)
                            console.log(error);
                        })
                } else {
                    this.loading = false;
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

    .tokenlab .lunainttxt{
        font-size: 30px!important;
        margin-top: 10px;
        margin-bottom: 20px;
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

    .tokenlab .logout-img{
        width: 20px;
        margin-right: 8px;
        vertical-align: bottom;
    }

    .tokenlab .tokenlab-img{
        width: 30px;
        margin-right: 3px;
        vertical-align: bottom;
    }

    .alert-unsucess{
        padding: 7px 20px;
    }


</style>
