<template>
        <div class="sendtransaction ">
            <div class="popup md-content">
                <a href="#" @click="hide" class="btn-close md-close"></a>
                <div class="transaction">
                    <div class="sendtransaction-inner">
                        <h1>Send Transaction</h1>
                        <div class="addresses">
                            <div class="sender">
                                <span class="tooltiptext2">{{modalArray.fundsFrom}}</span>
                                <div class="svg">
                                    <svg version="1.1" class="svg-red" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                                        y="0px" width="43px" height="43px" viewBox="0 0 43 43" style="enable-background:new 0 0 43 43;"
                                        xml:space="preserve">
                                        <defs>
                                        </defs>
                                        <circle class="st012" cx="21.5" cy="21.5" r="21.5" />
                                        <rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4" />
                                        <rect x="28.9" y="9.2" class="st125" width="4.9" height="4.8" />
                                        <rect x="14.3" y="15.6" class="st125" width="14.6" height="8" />
                                        <rect x="9.4" y="9.2" class="st125" width="4.9" height="4.8" />
                                        <rect x="1.2" y="18.7" class="st125" width="6.5" height="6.4" />
                                        <rect x="6.1" y="26.7" class="st125" width="9.7" height="9.6" />
                                        <rect x="17.5" y="25.1" class="st125" width="8.1" height="15.9" />
                                        <rect x="27.3" y="26.7" class="st125" width="9.7" height="9.6" />
                                    </svg>
                                </div>
                                <p class="send_trx_from">{{modalArray.fundsFrom}}</p>
                            </div>
                            <div class="exp">
                                <p>EXP</p>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="13px" height="9px">
                                    <path fill-rule="evenodd" d="M12.823,4.065 L8.954,0.169 C8.718,-0.069 8.336,-0.069 8.099,0.169 C7.863,0.407 7.863,0.792 8.099,1.030 L10.936,3.887 L0.604,3.887 C0.271,3.887 -0.000,4.159 -0.000,4.495 C-0.000,4.831 0.271,5.104 0.604,5.104 L10.936,5.104 L8.100,7.961 C7.863,8.199 7.863,8.584 8.100,8.822 C8.218,8.941 8.372,9.000 8.527,9.000 C8.682,9.000 8.836,8.941 8.954,8.822 L12.823,4.926 C13.059,4.688 13.059,4.303 12.823,4.065 Z"
                                    />
                                </svg>
                                <p v-if="modalArray.is_contract" class="function_name">{{modalArray.contract_function}}</p>
                            </div>
                            <div class="sender">
                                <span class="tooltiptext2">{{modalArray.fundsTo}}</span>
                                <div class="svg">
                                    <svg version="1.1" class="svg-green" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                                        y="0px" width="43px" height="43px" viewBox="0 0 43 43" style="enable-background:new 0 0 43 43;"
                                        xml:space="preserve">
                                        <defs>
                                        </defs>
                                        <circle class="st012" cx="21.5" cy="21.5" r="21.5" />
                                        <rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4" />
                                        <rect x="28.9" y="9.2" class="st125" width="4.9" height="4.8" />
                                        <rect x="14.3" y="15.6" class="st125" width="14.6" height="8" />
                                        <rect x="9.4" y="9.2" class="st125" width="4.9" height="4.8" />
                                        <rect x="1.2" y="18.7" class="st125" width="6.5" height="6.4" />
                                        <rect x="6.1" y="26.7" class="st125" width="9.7" height="9.6" />
                                        <rect x="17.5" y="25.1" class="st125" width="8.1" height="15.9" />
                                        <rect x="27.3" y="26.7" class="st125" width="9.7" height="9.6" />
                                    </svg>
                                </div>
                                <p class="send_trx_to">{{modalArray.fundsTo}}</p>

                            </div>
                        </div>
                        <div class="content">
                            <div class="transaction-fail hide">
                                <p>It seems this transaction will fail. If you submit it, it may consume all the gas you
                                    provide.
                                </p>
                            </div>
                            <div class="props">
                                <div class="name">
                                    <div class="hide row">
                                        <p>Estimated fee consumption</p>
                                        <p contenteditable="true" @blur="changecontent($event,'egas')" class="error-p p-right "> {{estimatedGas}}</p>
                                    </div>
                                    <div class="row">
                                        <p>Provide maximum fee</p>
                                        <p contenteditable="true" @blur="changecontent($event,'expgas')"  class="p-right">exp ({{maximumfee}} gas)</p>
                                    </div>
                                    <div class="row">
                                        <p>Gas price</p>
                                        <p @blur="changecontent($event,'gasp')" contenteditable="true" class=" p-right gas_price">{{gasPrice}}</p>
                                    </div>
                                    <div class="row">
                                        <p>Amount</p>
                                        <p @blur="changecontent($event,'amount')"  contenteditable="true" class="p-right amount_transfer">{{amount}}</p>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div class="form">
                            <div v-if="rawdata" class="form-heading">
                                <div class="rawData">
                                    <div class="heading">RAW DATA
                                        <a href="#">TRY TO DECODE DATA</a>
                                    </div>
                                    <div class="raw_data">
                                        <strong>{{raw_dataToken}}</strong>
                                    </div>
                                </div>

                            </div>

                            <form id="final_transfer_form"  method="#">
                                <input type="hidden" name="from" />
                                <input type="hidden" name="to" />
                                <input type="hidden" name="estimatedGas" />
                                <input type="hidden" name="amount" />
                                <input type="hidden" name="fee" />
                                <input type="hidden" name="final_transfer_form" />
                                <input type="hidden" name="is_contract" />
                                <input type="hidden" name="currency_hash" />
                                <input type="hidden" name="contract_function" />

                                <div class="row">
                                        <span :class="password? 'input input--nao input--filled': 'input input--nao'">
                                            <p v-if="passwordError" class="error-message sendFundPassword-error ">{{passwordError}}</p>
                                            <input class="account_password input__field input__field--nao" v-model="password" @focus="handleFocus" name="account_password" type="password" />
                                            <label class="input__label input__label--nao" >
                                                <span class="input__label-content input__label-content--nao">Password
                                                    <span class="mandatory">*</span>
                                                </span>
                                            </label>
                                            <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                                                <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"
                                                />
                                            </svg>
                                        </span>
                                </div>
                                <div class="buttons">
                                    <button @click="hide" class="back button button--shikoba md-close" type="button" >
                                        <img class="button__icon" src="../../../assets/img/cancel.svg">
                                        <span>Close</span>
                                    </button>
                                    <button @click="sendTransaction" id="contract_transactions_btn" type="submit" class="ok button button--shikoba">
                                        <img v-if="loading" class="outer-wheel button__icon" src="../../../assets/img/innerCricle.svg"/>
                                        <img v-if="!loading"  class="button__icon" src="../../../assets/img/send.svg">
                                        <span>Send Transaction</span>
                                    </button>

                                </div>
                            </form>

                        </div>
                        <div class="alert-sucess trx_alert-sucess hide">
                            <p>Transaction Completed successfully</p>
                        </div>
                        <div class="alert-unsucess trx_alert-unsucess hide">
                            <p>Transaction Failed</p>
                        </div>

                        <div class="alert-unsucess" style="display: none;">
                            <p>ERROR</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
</template>

<script>
    import {web3,tokenInterface} from '../../../../main/libs/config';
    import {db} from '../../../../../lowdbFunc';
    import shortid from 'shortid';
    import { clipboard,remote } from 'electron';
    const app = remote.app;
    import  Raven from 'raven';
    import  lodash from 'lodash';
    import  Tx from 'ethereumjs-tx';
    import  keythereum from 'keythereum';
    import  * as $ from 'jquery';
    import os from 'os';

    var currentDate = new Date();

    export default {
        name: 'SendTransaction',
        props: [
            'modalArray'
        ],
        data() {
            return{
                rawdata: false,
                sendToken: false,
                tokenData: '',
                password: '',
                passwordError: '',
                gasPrice: '',
                gasLimit: 900000,
                estimatedGas : 100000,
                nonce: 0,
                raw_dataToken: 0,
                amount: 0,
                maximumfee: 21000,
                loading: false,
            };
        },
        components:{
        },
        created(){
            web3.eth.getGasPrice().then((price)=>{
                this.gasPrice = price;
            });
            web3.eth.getTransactionCount(this.modalArray && this.modalArray.fundsFrom).then((count)=>{
                this.nonce = count;
            });

            web3.eth.estimateGas({from: this.modalArray && this.modalArray.fundsFrom, to: this.modalArray && this.modalArray.fundsTo, amount: web3.utils.toWei(this.modalArray && this.modalArray.amount, "ether")}, (res, err) => {
                console.log(res, err, "estimatedgass response")
            })
            console.log(this.modalArray , this.estimatedGas, "this.modalArray.currencyHash");

            if(this.modalArray && this.modalArray.is_contract) {
                this.gasPrice = this.modalArray.gasPrice;
                this.nonce = this.modalArray.nonce;
                this.amount = this.modalArray.amount;
            } else {
                this.amount = this.modalArray.total_coins;
            }
            var abiArray = tokenInterface; // From Config file
            var contractAddress = this.modalArray.currencyHash;

            var contract = new web3.eth.Contract(abiArray, contractAddress);

            this.raw_dataToken =  contract.methods.transfer(this.modalArray && this.modalArray.fundsTo, web3.utils.toWei(this.modalArray && this.modalArray.amount, "ether")).encodeABI();

            var trans_nonce;
            var latest_transaction = db.get('transactions').filter({from: this.modalArray && this.modalArray.fundsFrom}).value();
            latest_transaction = lodash.orderBy(latest_transaction, ['nonce'], ['desc']);
            console.log("From Nonce:",this.nonce);
            console.log("latest_transaction",latest_transaction);


            if(latest_transaction.length > 0){
                console.log("transactiopn recoerd found");
                trans_nonce = latest_transaction[0].nonce;
                console.log("trans_nonce:",trans_nonce);
                this.nonce = this.nonce > trans_nonce ? this.nonce : trans_nonce + 1;
            }

            console.log(this.modalArray, this.modalArray.currencyHash, "this.modalArray.currencyHash");
            if(this.modalArray && this.modalArray.currencyHash && !this.modalArray.is_contract){
                if(this.modalArray.currentArray.length === 1)
                {
                    this.modalArray.currentArray[0].token_icons.map((data) => {
                        if(data.tokenHash === this.modalArray.currencyHash )
                        {
                            console.log(data.tokenHash , this.modalArray.currencyHash, " this.rawdata");
                            this.tokenData = this.modalArray.currentArray[0].token_icons;
                            this.rawdata= true;
                            this.sendToken= true;
                        }
                    });
                }else
                {
                    this.modalArray.currentArray.token_icons.map((data) => {
                        if(data.tokenHash === this.modalArray.currencyHash )
                        {
                            console.log(data.tokenHash , this.modalArray.currencyHash, " this.rawdata");
                            this.tokenData = this.modalArray.currentArray.token_icons;
                            this.rawdata= true;
                            this.sendToken= true;
                        }
                    });
                }
                if(!this.rawdata){
                    this.sendToken= false;
                }
            }
            if(this.modalArray && this.modalArray.is_contract) {
                this.gasPrice = this.modalArray.gasPrice;
                this.gasPrice = this.modalArray.gasPrice;
                this.raw_dataToken = this.modalArray.raw_data;
                this.rawdata = true;
                this.amount = this.modalArray.amount;
            }else {
                this.amount = this.modalArray.total_coins;
            }
        },
        methods: {
            hide () {
                this.$modal.hide('sendtransactionmodal');
                this.$modal.hide('sendTransactions');
            },
            handleFocus(){
                this.passwordError = '';
            },
            changecontent(evt, text){
                console.log( evt, text)
                switch(text)
                {
                    case 'egas':
                        console.log( evt.target.innerText, text)
                        this.estimatedGas = evt.target.innerText;
                    break;

                    case 'expgas':
                        var data = evt.target.innerText.split('(');
                        var dataText = data[1].split(')');
                        data = dataText[0].split(" ");
                        console.log(data,"Data");
                        this.maximumfee = data[0];
                    break;

                    case 'gasp':
                        console.log( evt.target.innerText, text)
                        this.gasPrice = evt.target.innerText;
                    break;

                    case 'amount':
                        console.log( evt.target.innerText, text)
                        this.amount = evt.target.innerText;
                    break;

                }
            },
            sendTransaction(e){
                e.preventDefault();
                console.log("From Nonce:",this.estimatedGas, this.gasPrice, this.amount);
                if(this.password){
                    try {
                    this.loading = true;
                        var trans_nonce;
                        var latest_transaction = db.get('transactions').filter({from: this.modalArray && this.modalArray.fundsFrom}).value();
                        latest_transaction = lodash.orderBy(latest_transaction, ['nonce'], ['desc']);
                        console.log("From Nonce:",this.nonce);
                        console.log("latest_transaction",latest_transaction);


                        if(latest_transaction.length > 0){
                            console.log("transactiopn recoerd found");
                            trans_nonce = latest_transaction[0].nonce;
                            console.log("trans_nonce:",trans_nonce);
                            this.nonce = this.nonce > trans_nonce ? this.nonce : trans_nonce + 1;
                        }

                        web3.eth.personal.unlockAccount(this.modalArray && this.modalArray.fundsFrom, this.password , 3000)
                            .then((response) => {
                                console.log(response);
                            }).catch((error) => {
                            // console.log(error);
                            this.loading = false;
                            this.passwordError = "Invalid Password";
                            return false;
                        });
                        if(!this.sendToken) {
                            try{
                                console.log("transaction Hash", this.gasPrice,this.estimatedGas, web3.utils.toWei(this.modalArray.amount, "ether"), this.modalArray.fundsTo, shortid.generate(), this.modalArray && this.modalArray.fundsFrom , this.nonce);
                                web3.eth.sendTransaction({
                                    from: this.modalArray && this.modalArray.fundsFrom,
                                    to: this.modalArray.fundsTo,
                                    value: web3.utils.toWei(this.modalArray.amount, "ether"),
                                    gasPrice: this.gasPrice,
                                    gas: this.estimatedGas,
                                    nonce : this.nonce
                                }, (error, txHash) => {
                                    console.log("Error", error);
                                    if(error){
                                        console.log(error);
                                        this.loading = false;
                                        return false;
                                    }
                                    // console.log("transaction Hash", txHash, shortid.generate(), this.modalArray && this.modalArray.fundsFrom , this.nonce, currentDate.getTime());
                                    db.get('transactions').push({
                                        id : shortid.generate(),
                                        from: this.modalArray && this.modalArray.fundsFrom,
                                        transactionHash: txHash,
                                        nonce : this.nonce,
                                        timeStamp : currentDate.getTime()
                                    }).write();
                                    this.loading = false;
                                    $('.trx_alert-sucess p').text("Your Transaction Completed Successfully. Hash:"+txHash+" Copied to clipboard");
                                    $('#contract_transactions_btn').hide();
                                    $('form').trigger('reset');
                                    clipboard.writeText(txHash, 'selected');
                                    $('.trx_alert-sucess').show(300).delay(5000).hide(330);
                                    setTimeout(() => {
                                        this.$router.push({
                                            path: '/walletdashboard'
                                        });
                                    }, 5000);
                                });
                            }catch(e){
                            this.loading = false;
                                this.passwordError = "Invalid Password";
                                return false;
                                Raven.captureException(e);
                            }
                        } else {
                            try{
                            this.loading = true;
                                console.log(tokenInterface);
                                var abiArray = tokenInterface; // From Config file
                                var contractAddress = this.modalArray.currencyHash;

                                var contract = new web3.eth.Contract(abiArray, contractAddress);

                                this.raw_dataToken =  contract.methods.transfer(this.modalArray.fundsTo, web3.utils.toWei(this.modalArray && this.modalArray.amount, "ether")).encodeABI();

                                if(this.modalArray && this.modalArray.is_contract) {
                                    this.gasPrice = this.modalArray.gasPrice;
                                    this.raw_dataToken = this.modalArray.raw_data;
                                    this.amount = this.modalArray.amount;
                                    this.rawdata = true;
                                }else {
                                    this.amount = this.modalArray.total_coins;
                                }
                                console.log("contractAddress",contractAddress,"this.raw_dataToken",this.raw_dataToken);
                                console.log("this.gasPrice",this.gasPrice,"this.gasLimit",this.gasLimit);
                                var rawTransaction = {
                                    "from": this.modalArray && this.modalArray.fundsFrom,
                                    "nonce": this.nonce,
                                    "gasPrice": web3.utils.toHex(this.gasPrice),
                                    "gasLimit": web3.utils.toHex(this.gasLimit),
                                    "to": contractAddress,
                                    "data": this.raw_dataToken,
                                    "chainId": 0x02
                                };
                                let osType = os.type();
                                var appData = app.getPath('appData');

                                var datadir = "";
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

                                var address = this.modalArray.fundsFrom;

                                var keyObject = keythereum.importFromFile(address, datadir);
                                var privateKey = keythereum.recover(this.password, keyObject);

                                privateKey = privateKey.toString('hex');
                                var privKey = new Buffer(privateKey, 'hex');
                                console.log('transaction',rawTransaction);
                                var tx = new Tx(rawTransaction);

                                tx.sign(privKey);

                                var serializedTx =`0x${tx.serialize().toString('hex')}`;

                                web3.eth.sendSignedTransaction(serializedTx).then((res) => {
                                    if(res){
                                        console.log("res",res);
                                        this.loading = false;
                                        $('.trx_alert-sucess p').text("Your Transaction Completed Successfully. Hash:" + JSON.stringify(res.transactionHash));
                                        $('.trx_alert-sucess p').css({color:'#ffffff'});
                                        $('.trx_alert-sucess').show(300).delay(5000).hide(330);
                                        db.get('transactions').push({
                                            id : shortid.generate(),
                                            from: this.modalArray.fundsFrom,
                                            transactionHash: res.transactionHash,
                                            nonce : this.nonce,
                                            timeStamp : currentDate.getTime()
                                        }).write();
                                        setTimeout(() => {
                                            this.$router.push({
                                                path: '/walletdashboard'
                                            });
                                        }, 5000);
                                    }
                                }, (err) => {
                                    console.log(err);
                                    this.loading = false;
                                    $('.trx_alert-unsucess').show(300).delay(5000).hide(330);
                                });
                            }catch(e){
                                console.log(e);
                                this.loading = false;
                                this.passwordError = "Invalid Password";
                                Raven.captureException(e);
                            }
                        }
                    } catch(e) {
                        console.log("Exception",e);
                        this.loading = false;
                        this.passwordError = "Invalid Password";
                        return false;
                    }

                }else if(!this.password) {
                    this.loading = false;
                    this.passwordError = "Enter Password";
                    // this.passwordError = "Invalid Password";
                }
            }
        }
    }
</script>
