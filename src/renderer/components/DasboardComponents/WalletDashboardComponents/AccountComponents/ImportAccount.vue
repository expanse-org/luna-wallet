<template>
    <div id="import-account">
        <div class="import-inner">
            <div class="import-btns h-hide">
                <button class="button--moema" @click="privatekey('private-key')">Import
                    <br/>Private Key</button>
                <button class="button--moema" @click="address('import-address')">Import Watch
                    <br/>Only Address</button>
                <button class="button--moema" @click="fileupload('import-account-file')">Import
                    <br/>Json File</button>
            </div>
            <div class="row">
                <div class="drop-down impoortAccounts_dropdown">
                    <div class="error-label">
                    </div>
                    <select name="tabs" class="accountCurrcies change_import_accounts_tabs">
                        <option value="private-key" data-target="fields-Privat-key" class="selectbg1" selected="selected" style="background-image: url('../../../../assets/img/key.svg'), url('../../../../assets/img/empty.png');">Import Private Key</option>
                        <option value="import-address" data-target="fields-address" class="selectbg1" style="background-image: url('../../../../assets/img/address.svg'), url('../../../../assets/img/empty.png');">Import Watch Only Address</option>
                        <option value="import-account-file" data-target="file-upload" class="selectbg1" style="background-image: url('../../../../assets/img/json.svg'), url('../../../../assets/img/empty.png');">Import Json File</option>
                    </select>
                </div>
            </div>
            <div v-if="importPrivateKeyTab" id="fields-Privat-key" class="importtabchange" >
                <form>
                    <div class="row description">
                        Enter any wallet private key here to import
                    </div>
                    <div class="row">
                        <p v-if="private_keyError" class="error-message imp-privatekey-error">Enter Valid Private Key</p>
                        <span class="input input--nao">
                            <textarea name="private-key" class="private-key input__field input__field--nao textarea" v-model="private_key" @focus="handleFocus" ></textarea>
                            <label class="input__label input__label--nao">
                                <span class="input__label-content input__label-content--nao">Import Private key
                                    <span class="details">Past your copied Private key </span>
                                </span>
                            </label>
                            <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                                <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                            </svg>
                        </span>
                    </div>
                    <div class="row">
                        <p v-if="private_key_passwordError" class="error-message private-key-password-error">Password Length must be at least 8</p>
                        <span class="input input--nao">
                            <input class="passwor input__field input__field--nao private-key-password" v-model="private_key_password" @focus="handleFocus"
                                   name="private-key-password" type="password" />
                            <label class="input__label input__label--nao">
                                <span class="input__label-content input__label-content--nao">Enter Password
                                    <span class="mandatory">*</span>
                                    <span class="details">Enter your password</span>
                                </span>
                            </label>
                            <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                                <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                            </svg>
                        </span>
                    </div>

                    <div class="row">
                        <p v-if="private_key_repasswordError" class="error-message private-key-repassword-error">Password Do not Match</p>
                        <span class="input input--nao">
                            <input class="passwor input__field input__field--nao private-key-repassword" v-model="private_key_repassword" @focus="handleFocus"
                                   name="private-key-repassword" type="password"
                            />
                            <label class="input__label input__label--nao">
                                <span class="input__label-content input__label-content--nao">Confirm Password
                                    <span class="mandatory">*</span>
                                    <span class="details">Retype your password here</span>
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
                                <input class="filter__mark showPass1" type="checkbox" @click="showPass" data-target1=".private-key-password" data-target2=".private-key-repassword"
                                       data-type="password" id="input-3">
                                <i class="filter__mark"></i>
                                <span class="filter__text">Show Password</span>
                            </label>
                        </div>
                    </div>
                    <div v-if="success" class="alert-sucess alert-private-key">
                        <p>Sweet! Account Created successfully.</p>
                    </div>
                    <div class="buttons">

                        <button @click="handleimportPrivateKey" class="ok button button--shikoba import-private-key">
                            <img class="button__icon" src="../../../../assets/img/submit.svg">
                            <span>Create</span>
                        </button>
                    </div>
                </form>
            </div>
            <div v-if="importWatchOnlyAddTab" id="fields-address" class="importtabchange">
                <form id="#">
                    <div class="row description">
                        Watch only address is any existing address which you import into your wallet as a watch-only address. It will incorporate
                        all of its incoming and outgoing transactions into your live transaction feed
                    </div>
                    <div class="row">
                        <span class="input input--nao">
                            <p v-if="accountNameError" class="error-message imp-accountName-error">Name already Exists</p>
                            <input type="text" class="import-address-name input__field input__field--nao" v-model="accountName" @focus="handleFocus" />
                            <label class="input__label input__label--nao">
                                <span class="input__label-content input__label-content--nao">Account Name
                                    <span class="mandatory">*</span>
                                    <span class="details">Type your Account name </span>
                                </span>
                            </label>
                            <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                                <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                            </svg>
                        </span>
                    </div>
                    <div class="row">
                        <span class="input input--nao">
                            <p v-if="import_addressError" class="error-message imp-import-watch-address-error">{{import_addressError}}</p>
                            <textarea class="import-address input__field input__field--nao input" v-model="import_address" @focus="handleFocus"></textarea>
                            <label class="input__label input__label--nao">
                                <span class="input__label-content input__label-content--nao">Import watch only address
                                    <span class="mandatory">*</span>
                                    <span class="details">Import watch only your token address </span>
                                </span>
                            </label>
                            <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                                <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                            </svg>
                        </span>
                    </div>
                    <div v-if="success" class="imp-address-alert-sucess" >
                        <p>Sweet! Account successfully created.</p>
                    </div>
                </form>
                <div class="buttons">
                    <button @click="watchOnlyAdd" class="import-address-btn ok button button--shikoba">
                        <img class="button__icon" src="../../../../assets/img/submit.svg">
                        <span>SUBMIT</span>
                    </button>
                </div>
            </div>
            <div v-if="importJSONfileTab" id="file-upload" class="importtabchange">
                <div class="row description2">
                    Move any wallet file here to import
                </div>
                <div class="display_pic-upload">
                    <input type="file" id="pic" class="import-account-file importFile" v-on:change="importAccFile">
                    <!-- importFile function is defined in global.js-->
                    <label for="pic">
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 357.576 357.576" style="enable-background:new 0 0 357.576 357.576;"
                            xml:space="preserve">
                            <path d="M300.807,88.652l-94.111-77.447C198.805,4.712,185.562,0,175.206,0h-108.5C53.471,0,42.703,10.602,42.703,23.636
                                   c0.002,3.121,0.167,312.155,0.167,313.775c0,11.805,8.258,20.05,20.082,20.05c7.5,0,228.892,0.115,228.892,0.115
                                   c12.914,0,23.029-10.502,23.029-23.909V119.673C314.873,108.403,308.957,95.356,300.807,88.652z M175.206,1c0.003,0,0.007,0,0.01,0
                                   C175.212,1,175.209,1,175.206,1L175.206,1z M240.622,229.454c-1.19,2.289-3.653,3.546-6.587,3.546h-32.162v76.729
                                   c0,4.963-3.887,9.271-8.85,9.271h-27.622c-4.963,0-8.528-4.308-8.528-9.271V233h-32.477c-2.933,0-5.395-1.255-6.586-3.543
                                   c-1.19-2.288-0.897-5.033,0.785-7.435l54.232-77.378c1.551-2.213,3.88-3.469,6.39-3.469c2.512,0,4.841,1.277,6.391,3.49
                                   l54.227,77.349C241.519,224.417,241.813,227.166,240.622,229.454z M204.833,113.959c0.462,0.025,0.934,0.041,1.424,0.041h0
                                   C205.769,114,205.294,113.986,204.833,113.959z M206.257,113c-15.924,0-16.384-14.751-16.384-16.433V30.96L293.844,113H206.257z"/>
                        </svg>
                        <p>Choose file</p>
                    </label>
                </div>
                <div v-if="success" class="imp-file-alert-sucess">
                    <p>Sweet! Account is Imported successfully.</p>
                </div>
                <p v-if="error" class="error-message2 not-valid-file">Not a Valid Account File</p>
                <div class="alert-unsucess">
                    <p>ERROR</p>
                </div>
                <div class="buttons">
                    <button class=" ok h-hide button button--shikoba md-close">
                        <img class="button__icon" src="../../../../assets/img/submit.svg">
                        <span>SUBMIT</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import  ethereum_address from 'ethereum-address';
    import {startConnectWeb} from '../../../../../main/libs/config';
    import {getClientInfo} from '../../../../../common/clientInfo';
    import moment from 'moment';
    import fs from 'fs';
    import * as $ from 'jquery';
    import {getRandomColor} from '../../../AccountsData/commonFunc';
    import {db} from '../../../../../../lowdbFunc';
    import Raven from 'raven';

    var web3 = startConnectWeb();
    export default {
        name: 'ImportAccount',
        data() {
            return{
                import_address: '',
                accountName: '',
                import_addressError: '',
                accountNameError: '',
                private_key_repassword: '',
                private_key_password: '',
                private_key: '',
                private_key_repasswordError: false,
                private_key_passwordError: false,
                private_keyError: false,
                importPrivateKeyTab: true,
                importWatchOnlyAddTab: true,
                importJSONfileTab: true,
                error: false,
                success: false,
            };
        },
        components:{
        },
        created(){
            this.success = false;
            this.error = false;
            console.log(web3, "web3")
            console.log(db, "db")
        },
        methods: {
            watchOnlyAdd(e){
                e.preventDefault();
                console.log("watchOnlyAdd");
              if(this.accountName && this.import_address){
                  if (ethereum_address.isAddress(this.import_address)) {
                      try {
                          let color = getRandomColor();
                          console.log(color,"account");
                          db.get('accountsAdresses').push({
                                  accountTitle: "Account Test",
                                  hash: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
                                  // hash: this.import_address,
                                  color: color
                              }).write();
                      } catch (err) {
                          console.log("ERROR:" + err.message);
                          Raven.captureException(err);
                      }
                  }else {
                      this.import_addressError = 'Address is not valid';
                  }
              }  else {
                  if (!this.accountName) {
                      this.accountNameError = true;
                  }
                  if (!this.import_address) {
                      this.import_addressError = 'Account Already Exits';
                  }
              }
            },
            handleimportPrivateKey(e){
                e.preventDefault();
                if(this.private_key && this.private_key_password && this.private_key_repassword){
                    if(this.private_key_password.length > 8){
                        if(this.private_key_password === this.private_key_repassword) {
                            let that = this;
                            let account = web3.eth.personal.importRawKey(this.private_key, this.private_key_password);
                            account.then((res) => {
                                console.log(account,"account");
                                let color = getRandomColor();
                                db.get('accounts').push({
                                    accountTitle: "",
                                    hash: res,
                                    isHd: false,
                                    color: color
                                }).write();
                                that.success = true;
                                $('.alert-private-key').show(300).delay(5000).hide(330);
                                // console.log(res," res)account");
                            }, (error)  =>  {
                                that.success = false;
                                that.private_keyError = true;
                                $('.imp-privatekey-error').show(300).delay(5000).hide(330);
                                // console.log(error," error)account")
                            })
                        }else {
                            this.private_key_repasswordError = true;
                        }
                    } else {
                        this.private_key_passwordError = true;
                    }
                }else {
                    if (!this.private_key) {
                        this.private_keyError = true;
                    }
                    if (!this.private_key_password) {
                        this.private_key_passwordError = true;
                    }
                    if (!this.private_key_repassword) {
                        this.private_key_repasswordError = true;
                    }
                }
            },
            handleFocus(){
                this.private_keyError = false;
                this.private_key_passwordError = false;
                this.private_key_repasswordError = false;
                this.import_addressError = false;
                this.accountNameError = false;
                this.success = false;
                this.error = false;
            },
            importAccFile(){
                console.log('openFile');
                var input = event.target;
                var clientInfo = getClientInfo();
                var reader = new FileReader();
                let that = this;
                console.log('res reader',reader);
                reader.onload = function () {
                    var res = reader.result;
                    console.log('res reader.result',res);
                    let json_res;
                    try {
                        json_res = JSON.parse(res)
                        console.log('json_res',json_res);
                    } catch (e) {
                        console.log('Not a valid json Account File');
                        that.error= true;
                        return false;
                    }

                    if (json_res.address !== undefined) {
                        try{
                            const fileName = moment().format('UTC--YYYY-MM-DD-hh-mm-ss') + '--' + json_res.address;

                            var keyStore = clientInfo.keyStore;

                            let color = getRandomColor();

                            db.get('accounts').push({ accountTitle: "", hash : json_res.address,color:color}).write();

                            let path = keyStore+'/'+fileName;
                            // path = "./binaries/testfile.txt";
                            fs.writeFile(path, res, { flag: 'wx' }, function (err) {
                                if (err) throw err;
                                that.error= false;
                                that.success= true;
                                console.log("It's saved!");
                            });
                        } catch (err) {
                            console.log("Execption Error" + err.message);
                            Raven.captureException(err);
                        }
                    } else {
                        this.error= true;
                    }

                };
                reader.readAsText(input.files[0]);
            },
            showPass(){

            }
        }
    }
</script>

<style>

</style>
