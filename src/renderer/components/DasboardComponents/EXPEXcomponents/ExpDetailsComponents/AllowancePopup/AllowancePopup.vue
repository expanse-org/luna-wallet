<template>
    <div class="sendtransaction ">
        <div class="popup md-content">
            <a href="#" @click="hide" class="btn-close md-close"></a>
            <div class="Allowance-popup">
                <div class="allowance-header">
                    <h1>{{popupHeading}}</h1>
                </div>
                <div class="allowance-content">
                    <div class="all-form">
                        <label>Amount</label>
                        <div class="all-input">
                            <input type="number" v-model="amount" placeholder="Amount"/>
                            <span>{{amountCurrency}}</span>
                        </div>
                    </div>
                    <div class="all-form">
                        <label>Gas Limit</label>
                        <div class="all-input">
                            <input type="number" v-model="gasLimit"  placeholder="Gas Limit"/>
                            <span>Units</span>
                        </div>
                    </div>
                    <div class="all-form">
                        <label>Gas Price</label>
                        <div class="progressBar">
                            <input id="gasprice" v-model="gasprice" type="range" min="53" max="212"/>
                            <div class="ranges">
                                <span>Cheaper</span>
                                <span>Faster</span>
                            </div>
                            <p>{{gasprice}} gwei</p>
                        </div>
                    </div>
                    <div class="all-fee">
                        <p>FEE= {{gasLimit * (gasprice/1000000000)}} EXP</p>
                    </div>
                    <div class="all-form">
                        <label>Password</label>
                        <div class="all-input">
                            <p v-if="passwordError" class="error-message sendFundPassword-error ">{{passwordError}}</p>
                            <input type="password" v-model="password" placeholder="Enter Password"/>
                        </div>
                    </div>
                </div>
                <div class="all-btn">
                    <button :disabled="btndisable" @click="sendTransaction" id="contract_transactions_btn" type="submit" class="ok button button--shikoba">
                        <img v-if="loading" class="outer-wheel button__icon" src="../../../../../assets/img/innerCricle.svg"/>
                        <img v-if="!loading"  class="button__icon" src="../../../../../assets/img/send.svg">
                        <span>Confirm</span>
                    </button>
                </div>
                <div class="alert-sucess trx_alert-sucess hide">
                    <p>Transaction Completed successfully</p>
                </div>
                <div class="alert-unsucess trx_alert-unsucess hide">
                    <p>Transaction Failed</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {web3, tokenInterface} from '../../../../../../main/libs/config';
    import { clipboard,remote } from 'electron';
    const app = remote.app;
    import * as Raven from 'raven-js';
    import * as $ from 'jquery';
    import os from 'os';
    import  Tx from 'ethereumjs-tx';
    import  keythereum from 'keythereum';
    import  lodash from 'lodash';
    import shortid from 'shortid';
    import {db} from '../../../../../../../lowdbFunc';

    const Gwei = 1000000000;
    var currentDate = new Date();
    export default {
        name: 'AllowancePopup',
        props:['modalArray'],
        data() {
            return{
                web3,
                amount: '',
                amountCurrency: 'WEXP',
                nonce: 87,
                gasprice: 87,
                gasLimit: 900000,
                password: '',
                popupHeading: 'Allowance Calculation',
                passwordError: '',
                btndisable: false,
                loading: false,
                toAddress: '0x270ff59e03e69db4600900a2816587e7cd3e2f11',
                expexAddress: '0xD3627766D0584Ed23f8D1acd2E493F8c281C9EF9',
            };
        },
        components:{
        },
        watch: {

        },
        created(){
            if(this.$router.history.current.path === '/expexdetails') {
                this.popupHeading = 'Allowance Calculation';
            } else {
                this.popupHeading = 'Exchange Now';
            }
            if(this.modalArray && this.modalArray.amount) {
                console.log(this.modalArray)
                this.amount = this.modalArray.amount;
                this.amountCurrency = this.modalArray.currency;

                web3.eth.getTransactionCount(this.modalArray.fromAddress).then((count)=>{
                    this.nonce = count;
                });

                // web3.eth.estimateGas({from: this.modalArray.fromAddress, to: this.toAddress, amount: web3.utils.toWei(this.modalArray.amount.toString(), "ether")}, (err, res) => {
                //     console.log(res, err,  "estimatedgass response")
                //     this.gasLimit = res
                // })

                var trans_nonce;
                var latest_transaction = db.get('transactions').filter({from: this.modalArray && this.modalArray.fromAddress}).value();

                if(latest_transaction.length > 0){
                    latest_transaction = lodash.orderBy(latest_transaction, ['nonce'], ['desc']);
                    trans_nonce = latest_transaction[0].nonce;
                    this.nonce = this.nonce > trans_nonce ? this.nonce : trans_nonce + 1;
                }
            }
            var contract = new web3.eth.Contract(tokenInterface, this.expexAddress);
            console.log(contract);
            contract.methods.allowance(this.modalArray.fromAddress, this.expexAddress).call().then((res) => {
                console.log(res, "allowance");
            });

        },
        methods: {
            hide () {
                this.$modal.hide('allowancePopup');
                this.$modal.hide('exchangeNow');
            },
            sendTransaction(){
                if(this.$router.history.current.path === '/expexdetails') {

                }
                else {
                    if (this.password) {
                        this.loading = true;
                        try {
                            web3.eth.personal.unlockAccount(this.modalArray && this.modalArray.fromAddress, this.password, 3000)
                                .then((response) => {
                                    if (response) {
                                        console.log("response", response);
                                        try {
                                            // console.log("sendTransaction ", this.gasLimit,this.gasprice, web3.utils.toWei(this.modalArray.amount.toString(), "ether"), this.modalArray && this.modalArray.fromAddress, this.nonce);
                                            if (this.amountCurrency === 'EXP') {
                                                web3.eth.sendTransaction({
                                                    from: this.modalArray && this.modalArray.fromAddress,
                                                    to: this.toAddress,
                                                    value: web3.utils.toWei(this.modalArray.amount.toString(), "ether"),
                                                    gasPrice: parseInt(this.gasprice) * 1000000000,
                                                    gas: this.gasLimit,
                                                    nonce: this.nonce
                                                }, (error, txHash) => {
                                                    console.log("Error", error, txHash);
                                                    if (error) {
                                                        console.log(error);
                                                        this.loading = false;
                                                        this.btndisable = false;
                                                        $('.trx_alert-unsucess').show(300).delay(5000).hide(330);
                                                        return false;
                                                    }
                                                    // console.log("transaction Hash", txHash, shortid.generate(), this.modalArray && this.modalArray.fromAddress , this.nonce, currentDate.getTime());
                                                    db.get('transactions').push({
                                                        id: shortid.generate(),
                                                        from: this.modalArray && this.modalArray.fromAddress,
                                                        transactionHash: txHash,
                                                        nonce: this.nonce,
                                                        timeStamp: currentDate.getTime()
                                                    }).write();
                                                    this.loading = false;
                                                    this.btndisable = false;
                                                    $('.trx_alert-sucess p').text("Your Transaction Completed Successfully. Hash:" + txHash + " Copied to clipboard");
                                                    $('form').trigger('reset');
                                                    clipboard.writeText(txHash, 'selected');
                                                    $('.trx_alert-sucess').show(300).delay(5000).hide(330);
                                                    setTimeout(() => {
                                                        this.$router.push({
                                                            path: '/marketconverter'
                                                        });
                                                    }, 5000);
                                                });
                                            }
                                            else {
                                                var abiArray = tokenInterface; // From Config file
                                                var contractAddress = this.toAddress;

                                                var contract = new web3.eth.Contract(abiArray, contractAddress);

                                                this.raw_dataToken = contract.methods.transfer(this.toAddress, web3.utils.toWei(this.modalArray && this.modalArray.amount.toString(), "ether")).encodeABI();

                                                // console.log("contractAddress",contractAddress,"this.raw_dataToken",this.raw_dataToken);
                                                // console.log("this.gasPrice",this.gasPrice,"this.gasLimit",this.gasLimit);
                                                var rawTransaction = {
                                                    "from": this.modalArray && this.modalArray.fromAddress,
                                                    "nonce": this.nonce,
                                                    gasPrice: parseInt(this.gasprice) * 1000000000,
                                                    gas: this.gasLimit,
                                                    "to": contractAddress,
                                                    "data": this.raw_dataToken,
                                                    "chainId": 0x02
                                                };
                                                let osType = os.type();
                                                var appData = app.getPath('appData');

                                                var datadir = "";
                                                switch (osType) {
                                                    case "Linux":
                                                        datadir = app.getPath('home') + '/.expanse';
                                                        break;
                                                    case "Darwin":
                                                        datadir = app.getPath('home') + '/Library/Expanse';
                                                        break;
                                                    case "Windows_NT":
                                                        datadir = `${app.getPath('appData')}\\Expanse`;
                                                        break;
                                                }

                                                var address = this.modalArray.fromAddress;

                                                var keyObject = keythereum.importFromFile(address, datadir);
                                                var privateKey = keythereum.recover(this.password, keyObject);

                                                privateKey = privateKey.toString('hex');
                                                var privKey = new Buffer(privateKey, 'hex');
                                                // console.log('transaction',rawTransaction);
                                                var tx = new Tx(rawTransaction);

                                                tx.sign(privKey);

                                                var serializedTx = `0x${tx.serialize().toString('hex')}`;

                                                web3.eth.sendSignedTransaction(serializedTx).then((res) => {
                                                    if (res) {
                                                        console.log("res", res);
                                                        this.loading = false;
                                                        this.btndisable = false;
                                                        $('.trx_alert-sucess p').text("Your Transaction Completed Successfully. Hash:" + JSON.stringify(res.transactionHash));
                                                        $('.trx_alert-sucess p').css({color: '#ffffff'});
                                                        $('.trx_alert-sucess').show(300).delay(5000).hide(330);
                                                        db.get('transactions').push({
                                                            id: shortid.generate(),
                                                            from: this.modalArray.fromAddress,
                                                            transactionHash: res.transactionHash,
                                                            nonce: this.nonce,
                                                            timeStamp: currentDate.getTime()
                                                        }).write();
                                                        setTimeout(() => {
                                                            this.$router.push({
                                                                path: '/marketconverter'
                                                            });
                                                        }, 5000);
                                                    }
                                                }, (err) => {
                                                    console.log(err);
                                                    this.loading = false;
                                                    this.btndisable = false;
                                                    $('.trx_alert-unsucess').show(300).delay(5000).hide(330);
                                                });
                                            }

                                        } catch (e) {
                                            console.log(e)
                                            // Raven.captureException(e);
                                            this.loading = false;
                                            this.btndisable = false;
                                            this.passwordError = "Invalid Password";
                                            return false;
                                        }
                                    }
                                }).catch((error) => {
                                console.log(error)
                                // Raven.captureException(error);
                                this.loading = false;
                                this.btndisable = false;
                                this.passwordError = "Invalid Password";
                                return false;
                            });
                        } catch (err) {
                            console.log(err)
                        }
                    }
                    else {
                        this.loading = false;
                        this.btndisable = false;
                        this.passwordError = "Password is required";
                    }
                }
            }
        }
    }
</script>

<style>
</style>
