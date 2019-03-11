<template>
    <div id="create-new-account" class="tabchange">
        <div class="inner">
            <div class="row description">
                Accounts are password protected keys that can hold Expanse and Expanse-based tokens.
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
                <p v-if="passwordError" class="error-message password-error">{{passwordError}}</p>
                <span :class="password? 'input input--nao input--filled': 'input input--nao'">
                    <input class="passwor input__field input__field--nao accountPassword" name="password" v-model="password" @focus="handleFocus"
                           :type="passType" id="input-2" />
                    <label class="input__label input__label--nao" for="input-1">
                        <span class="input__label-content input__label-content--nao">Enter Password
                            <span class="mandatory">*</span>
                            <span class="details">Password Length must be at least 8</span>
                        </span>
                    </label>
                    <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"
                        />
                    </svg>
                </span>
            </div>
            <div class="label row">
            </div>
            <form>
                <div class="row">
                    <p v-if="retypePasswordError" class="error-message retype-password-error">{{retypePasswordError}}</p>
                    <span :class="retypePassword? 'input input--nao input--filled': 'input input--nao'">
                        <input class="retype-passwor input__field input__field--nao accountPassword" v-model="retypePassword" @focus="handleFocus"  @keyup.enter="createAccount"
                               name="retype-password" :type="passType" id="input-5"
                        />
                        <label class="input__label input__label--nao" for="input-1">
                            <span class="input__label-content input__label-content--nao">Confirm Password
                                <span class="mandatory">*</span>
                                <span class="details">Retype your password here </span>
                            </span>
                        </label>
                        <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                            <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"
                            />
                        </svg>
                    </span>
                </div>
                <div v-if="success" class="alert-sucess row">
                    <p>Sweet! Account successfully created.</p>
                </div>
                <div v-if="error" class="alert-unsucess row">
                    <p>ERROR</p>
                </div>
                <div class="chexboxes row">
                    <div class="checkbox perform">
                        <label class="filter__value">
                            <input class="filter__mark showPass" type="checkbox" @click="showPass" data-type="password" id="input-3">
                            <i class="filter__mark"></i>
                            <span class="filter__text">Show Password</span>
                        </label>
                    </div>
                </div>
                <div class="buttons">
                    <button @click="createAccount" class="ok button button--shikoba createAccount">
                        <img class="button__icon" src="../../../../assets/img/create.svg">
                        <span>Create</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import Raven from 'raven';
    import {web3} from '../../../../../main/libs/config';
    import {getRandomColor} from '../../../AccountsData/commonFunc';
    import {db} from '../../../../../../lowdbFunc';
    import * as $ from 'jquery';
    import {getAllAcounts} from '../walletcommon';

    // var web3 = startConnectWeb();
    export default {
        name: 'CreateAccount',
        data() {
            return{
                accountName: '',
                password: '',
                retypePassword: '',
                accountPassword: '',
                accountNameError: false,
                passwordError: false,
                retypePasswordError: false,
                passType: 'password',
                success: false,
                error: false,
            };
        },
        created(){

        },
        methods: {
            handleFocus(){
                this.accountNameError = false;
                this.passwordError = false;
                this.retypePasswordError = false;
                this.accountPasswordError = false;
                this.success = false;
            },
            createAccount(e){
                e.preventDefault();
                this.success = false;
                this.error = false;
                var that = this;
                if(this.accountName && this.password && this.retypePassword){
                    if(this.password.length >= 8 ){
                        if(this.password === this.retypePassword){
                            try{
                                that.success = true;
                                that.createSimpleAccount(this.accountName ,this.password );
                                setTimeout(() => {
                                    that.success = false;
                                    that.accountName = '';
                                    that.password = '';
                                    that.retypePassword = '';
                                    that.accountPassword = '';
                                }, 1000);
                                $('.alert-sucess').show(300).delay(5000).hide(330);
                            } catch (err) {
                                console.log("Execption Error" + err.message);
                                this.accountNameError = 'Title is already exists';
                                Raven.captureException(err);
                            }
                        }else {
                            this.retypePasswordError = "Password unmatch";
                        }
                    }else if(this.password.length <= 8 ){
                        this.passwordError = "Error : Password length must be Atleast 8";
                    }
                }else {
                    if(!this.accountName){
                        this.accountNameError = 'Name is required';
                    }
                    if(!this.password){
                        this.passwordError = "Error : Password length must be Atleast 8";
                    }
                    if(!this.retypePassword){
                        this.retypePasswordError = "Password is required";
                    }
                }
            },
            showPass(){
                if(this.passType === "password")
                    this.passType = "text";
                else
                    this.passType = "password";
            },
            createSimpleAccount(acName , pass) {
                var that = this;
                try{
                    console.log(web3,"web3Account");
                    web3.eth.personal.newAccount(pass, function(err, hash){
                        console.log("error 02: ", err);
                        console.log("error 02: ", hash);
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
                            getAllAcounts();
                        }
                    });
                } catch (err) {
                    console.log("Execption Error" + err.message);
                    Raven.captureException(err);
                }
            },
        }
    }
</script>

<style>

</style>
