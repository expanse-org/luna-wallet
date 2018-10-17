<template>
    <div class="main-container">
        <div class="create-acccount">
            <div class="luna-upload">
                <div class="upload-file">
                    <img src="../../assets/img/logo-luna.png" class="logo-luna" alt="Luna Expanse Wallet">
                    <h1>Do you have a wallet file?</h1>
                    <h2>Move any wallet file here to import.</h2>
                    <div id="file-upload">
                        <div class="display_pic-upload">
                            <input type="file" id="pic" class="import-account-file" v-on:change='openFile($event)'>
                            <label for="pic">
                                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    viewBox="0 0 357.576 357.576" style="enable-background:new 0 0 357.576 357.576;" xml:space="preserve">
                                    <path d="M300.807,88.652l-94.111-77.447C198.805,4.712,185.562,0,175.206,0h-108.5C53.471,0,42.703,10.602,42.703,23.636
                                                    c0.002,3.121,0.167,312.155,0.167,313.775c0,11.805,8.258,20.05,20.082,20.05c7.5,0,228.892,0.115,228.892,0.115
                                                    c12.914,0,23.029-10.502,23.029-23.909V119.673C314.873,108.403,308.957,95.356,300.807,88.652z M175.206,1c0.003,0,0.007,0,0.01,0
                                                    C175.212,1,175.209,1,175.206,1L175.206,1z M240.622,229.454c-1.19,2.289-3.653,3.546-6.587,3.546h-32.162v76.729
                                                    c0,4.963-3.887,9.271-8.85,9.271h-27.622c-4.963,0-8.528-4.308-8.528-9.271V233h-32.477c-2.933,0-5.395-1.255-6.586-3.543
                                                    c-1.19-2.288-0.897-5.033,0.785-7.435l54.232-77.378c1.551-2.213,3.88-3.469,6.39-3.469c2.512,0,4.841,1.277,6.391,3.49
                                                    l54.227,77.349C241.519,224.417,241.813,227.166,240.622,229.454z M204.833,113.959c0.462,0.025,0.934,0.041,1.424,0.041h0
                                                    C205.769,114,205.294,113.986,204.833,113.959z M206.257,113c-15.924,0-16.384-14.751-16.384-16.433V30.96L293.844,113H206.257z"
                                    />

                                </svg>
                                <p>Choose file</p>
                            </label>
                            <div class="alert-sucess hide">
                                <p>Sweet! Account successfully Created.</p>
                            </div>
                            <p v-if="error" class="error-message2 not-valid-file error">Not a Valid Account File</p>
                        </div>
                        <div class="buttons">
                            <button @click="skipbutton" class=" cancel button button--shikoba md-close skip_upload">
                                <img class="button__icon" src="../../assets/img/skip.svg">
                                <span>Skip</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {web3, startConnectWeb} from '../../../main/libs/config';
    import {getClientInfo} from '../../../common/clientInfo';
    import moment from 'moment';
    import fs from 'fs';
    import * as $ from 'jquery';
    import {getRandomColor} from './commonFunc';
    import {db} from '../../../../lowdbFunc';
    import Raven from 'raven';

    export default {
        name: 'Create-Account',
        data() {
            return {
                error: false,
            };
        },
        created(){
            this.error= false;
        },
        methods: {
            skipbutton(){
                $('.luna-upload').toggle("slide");
                $('.account-field').toggle("slide");
                this.$router.push({
                    path: '/addaccount'
                });
                $('form').trigger("reset");
                this.error= false;
            },
            openFile() {
                console.log('openFile');
                var input = event.target;
                var clientInfo = getClientInfo();
                var reader = new FileReader();
                // console.log('res reader',reader);
                reader.onload =  () => {
                    var res = reader.result;
                    // console.log('res reader.result',res);
                    let json_res;
                    try {
                        json_res = JSON.parse(res)
                        console.log('json_res',json_res);
                    } catch (e) {
                        console.log('Not a valid json Account File');
                        this.error= true;
                        return false;
                    }

                    if (json_res.address !== undefined) {
                        try{
                            this.error= false;
                            const fileName = moment().format('UTC--YYYY-MM-DD-hh-mm-ss') + '--' + json_res.address;

                            var keyStore = clientInfo.keyStore;

                            let color = getRandomColor();

                            db.get('accounts').push({ accountTitle: "", hash : json_res.address,color:color, archive: false, isHd: false}).write();

                            let path = keyStore+'/'+fileName;
                            // path = "./binaries/testfile.txt";
                            let that = this;
                            fs.writeFile(path, res, { flag: 'wx' }, function (err) {
                                if (err) throw err;
                                console.log("It's saved!");
                                $('.alert-sucess').show(300).delay(5000).hide(330);
                                that.launchApplication();
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
            launchApplication(){
                try{
                    if (typeof web3 !== 'undefined') {
                        web3.eth.getAccounts( (error, accounts) => {
                            if(accounts.length > 0){
                                this.$router.push({
                                    path: '/walletdashboard'
                                })
                            }
                        });
                    } else {
                        // set the provider you want from Web3.providers
                        startConnectWeb();
                        this.intervalid1 = setInterval(() => {
                            if(typeof web3 !== 'undefined' ){
                                web3.eth.getAccounts( (error, accounts) => {
                                    console.log("Accounts",accounts.length);
                                    if(accounts.length > 0){
                                        this.$router.push({
                                            path: '/walletdashboard'
                                        })
                                    }
                                });
                                clearInterval(this.intervalid1)
                            }
                        }, 100);
                    }
                }catch(e){
                    Raven.captureException(e);
                    console.log(e, "Raven")
                }

            },

        }
    }
</script>

<style>

</style>
