<template>
    <div class="main-container">
        <div class="send tabcontent" id="send">
            <div class="content">
                <div class="funds">
                    <h1>
                        <button class="back-btn button   active" type="button" id="back_btn" data-val="0" @click="mainMenu()">
                            <img class="button__icon" src="../../../assets/img/back-btn.svg">
                        </button>Send Funds
                    </h1>
                    <div class="contentInner">
                        <div class="sentDetails">
                            <div class="fundTransfer">
                                <div class="from">
                                    <div class="error-label">
                                        <label>From</label>
                                        <p v-if="fundsFromError" class="error-message send_from_error">From is Required</p>
                                    </div>
                                    <div class="fundsFrom">
                                        <div class="drop-down accounts_dropdown">
                                            <multiselect :searchable="false" name="SendFunds" track-by="text" :loading="loading" :allow-empty="false" @select="handlechangeFunds" label="text" :show-labels="false" placeholder="Select From Account"  v-model="fundsFrom" :options="optionFrom">
                                                <template slot="singleLabel" slot-scope="props">
                                                    <img class="option__image" src="../../../assets/img/selectbg2.png" /><img class="option__image setImg" src="../../../assets/img/selectkey.png" /><span class="option__title">{{ props.option.text }}</span>
                                                </template>
                                                <template slot="option" slot-scope="props">
                                                    <img class="option__image" src="../../../assets/img/selectbg2.png" /><img class="option__image setImg" src="../../../assets/img/selectkey.png" /><span class="option__title">{{ props.option.text }}</span>
                                                </template>
                                            </multiselect>
                                        </div>
                                    </div>
                                </div>
                                <div class="to">
                                    <div class="error-label">
                                        <label>To</label>
                                        <p v-if="fundsToError" class=" error-message send_to_error">{{fundsToError}}</p>
                                    </div>
                                    <div class="fundsTo">
                                       <svg version="1.1" class="svg-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="43px" height="43px"
                                            viewBox="0 0 43 43" v-bind:style="{enableBackground:'new 0 0 43 43',fill:getRandomColor}" xml:space="preserve">
                                           <defs>
                                           </defs>
                                           <circle class="st012" cx="21.5" cy="21.5" r="21.5"></circle>
                                           <rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4"></rect>
                                           <rect x="28.9" y="9.2" class="st125" width="4.9" height="4.8"></rect>
                                           <rect x="14.3" y="15.6" class="st125" width="14.6" height="8"></rect>
                                           <rect x="1.2" y="18.7" class="st125" width="6.5" height="6.4"></rect>
                                           <rect x="6.1" y="26.7" class="st125" width="9.7" height="9.6"></rect>
                                           <rect x="17.5" y="25.1" class="st125" width="8.1" height="15.9"></rect>
                                           <rect x="27.3" y="26.7" class="st125" width="9.7" height="9.6"></rect>
                                       </svg>
                                        <input name="sendTo" @focus="handleFocus" type="text" v-model="fundsTo" placeholder="Enter Recipient Address" class="sendTo" />
                                    </div>
                                </div>
                                <div class="currencyAmount">
                                    <div class="error-label">
                                        <label>AMOUNT</label>
                                        <p v-if="amountError" class=" error-message send_amount_error">{{amountError}}</p>
                                    </div>
                                    <div class="amount">
                                        <div class="fundsTo">
                                            <input type="number" @focus="handleFocus" min="0" value="0" v-model="amount" v-on:change="handleAmount" name="sendAmount" class="sendAmount input_number" data-err=".send_amount_error" />
                                        </div>
                                    </div>

                                </div>
                                <div class="amount">
                                    <div class="error-label">
                                        <label>Currency</label>
                                        <p v-if="currencyHashError" class=" error-message send_amount_currency_error">Amount is Required</p>
                                    </div>
                                    <div class="drop-down currencies_dropdown">
                                        <multiselect :searchable="false" name="accountCurruencies" :loading="loading1" track-by="text" :allow-empty="false" label="text" :show-labels="false" placeholder="Select Currency"  @select="handlecurrchange" v-model="currencyHash" :options="optionCurrency">
                                            <template slot="singleLabel" slot-scope="props">
                                                <img class="option__image" src="../../../assets/img/selectbg2.png" /><img class="option__image setImg" src="../../../assets/img/selectkey.png" /><span class="option__title">{{ props.option.text }}</span>
                                            </template>
                                            <template slot="option" slot-scope="props">
                                                <img class="option__image" src="../../../assets/img/selectbg2.png" /><img class="option__image setImg" src="../../../assets/img/selectkey.png" /><span class="option__title">{{ props.option.text }}</span>
                                            </template>
                                        </multiselect>
                                    </div>
                                </div>
                            </div>

                            <div class="fundsInner">
                                <div class="row">
                                    <div class="checkbox">
                                        <label class="filter__value send_everything">
                                            <input class="filter__mark send_everthing_chkbox" @click="handlesendall" @focus="handleFocus" v-model="sendAllCheck" type="checkbox">
                                            <i class="filter__mark"></i>
                                            <span class="filter__text">Send All</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="amountdetails">
                                        <label class="sendAmount">You want to send
                                            <span class="send_every_thing">{{ amount }}</span> Exp</label>
                                        <h2>SELECT FEE</h2>
                                        <label id="result">0.00{{price}} EXP </label>
                                        <div class="progressBar">
                                            <input id="price" @change="handlepriceChange" v-model="price" @focus="handleFocus" type="range" min="53" max="212"/>
                                            <div class="ranges">
                                                <span>CHEAPER</span>
                                                <span>FASTER</span>
                                            </div>
                                            <p>
                                                <label class="settextwid">
                                                    This is the most amount of money that might be used to process this transaction. Your transaction will be mined probably
                                                    {{timeText}}
                                                </label>
                                            </p>
                                        </div>
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="data hide">
                                        <label>Data</label>
                                        <textarea rows="4" v-model="sendFundsData" @focus="handleFocus" class="sendFundsData"></textarea>
                                        <p> You can add extra data to send along with your transaction. If you don't
                                            know what this is then don't touch it or bad things may happen.

                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="totalAmount">
                            <div>
                                <label class="amountheading">Total</label>
                                <p class=" tooltip send_coin_error hide">From is Required</p>
                            </div>
                            <div class="inner">
                                <div class="coins">
                                    <input class="total_coins" @focus="handleFocus" v-model="total_coins" type="text" disabled>
                                </div>
                                <div class="buttons">
                                    <button class="ok button button--shikoba" @click="handleSendFund" type="submit" id="send-transaction">
                                        <img class="button__icon" src="../../../assets/img/send.svg">
                                        <span>Send</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <modal class="tmodal" name="sendtransactionmodal">
            <sendTransaction :modalArray="modalArray" ></sendTransaction>
        </modal>
    </div>
</template>

<script>
    import {web3} from '../../../../main/libs/config';
    import ethereum_address from 'ethereum-address';
    import SendTransaction from './SendTransaction';
    import Multiselect from 'vue-multiselect'
    import { getRandomColor } from '../../AccountsData/commonFunc';
    import  * as $ from 'jquery';
    // var web3 = startConnectWeb();

    export default {
        name: 'TransferFunds',
        data() {
            return {
                fundsFrom: '',
                fundsTo: '',
                amount: 0,
                currencyHash: '',
                sendAllCheck: '',
                price: '118',
                sendFundsData: '',
                total_coins: 0,
                fundsFromError: false,
                fundsToError: false,
                amountError: false,
                currencyHashError: false,
                total_coinsError: false,
                total_balance: 0,
                accountsArray: '',
                fromArray: [],
                currentArray: '',
                modalArray: '',
                optionFrom: [],
                optionCurrency: [],
                defaultoptionCurrency: '',
                loading: true,
                loading1: false,
                timeText: 'usually within a minute.',
                getRandomColor,
            };
        },
        components:{
            'sendTransaction': SendTransaction,
            'multiselect': Multiselect,
        },
        watch: {
            price: function (val) {
                if(this.price>=170) {
                   this.timeText='within 30 seconds.';
                }
                if(this.price>=130 && this.price<170) {
                   this.timeText='usually within a minute.';
                }
                if(this.price <130 && this.price>53) {
                   this.timeText='likely within a few minutes.';
                }
                this.handlepriceChange();
            },
            amount: function (val) {
                this.handleAmount();
            },
        },
        computed: {
            accounts() {
                this.accountsArray = this.$store.state.allAccounts;
                return this.accountsArray;
            },
            totalBalanceData: function(){
                let tb = this.$store.state.total_balance;
                return tb;
            },
        },
        created(){
            var hash = this.$router.history.current.query.hash;
            // console.log(hash);
            if(hash) {
                this.intervalid1 = setInterval(() => {
                    if (this.accounts.length > 0) {
                        this.accounts.map((val) => {
                            if(val.hash == hash) {
                                this.fundsFrom = { value : val.hash ,text: val.accountTitle + '- ('+ val.balance+' EXP)'}
                                this.handlechangeFunds();
                            }
                            if(val.balance > 0 || val.tokens){
                                // console.log(val.balance);
                                // console.log(val);
                                var data = { value:val.hash ,text: val.accountTitle + '- ('+ val.balance+' EXP)'};
                                this.optionFrom.push(data);
                                this.loading= false;
                                this.fromArray.push(val);
                            }
                        });
                        clearInterval(this.intervalid1)
                    }
                }, 100);
            } else {
                this.optionFrom = [];
                this.intervalid1 = setInterval(() => {
                    if (this.accounts.length > 0) {
                        this.total_balance = this.totalBalanceData;
                        this.accounts.map((val) => {
                            if(val.balance > 0 || val.tokens){
                                // console.log(val.balance);
                                // console.log(val);
                                this.fundsFrom = { value : val.hash ,text: val.accountTitle + '- ('+ val.balance+' EXP)'}
                                this.handlechangeFunds();
                                var data = { value:val.hash ,text: val.accountTitle + '- ('+ val.balance +' EXP)'};
                                this.optionFrom.push(data);
                                this.loading= false;
                                this.fromArray.push(val);
                            }
                        });
                        clearInterval(this.intervalid1)
                    }
                }, 100);
            }
        },
        methods: {
            show () {
                this.$modal.show('sendtransactionmodal');
            },
            hide () {
                this.$modal.hide('sendtransactionmodal');
            },
            handleAmount(){
                // console.log("dsadsadas")
                setTimeout(() => {
                    var price = '0.00'+this.price;
                    if(this.currencyHash && this.sendAllCheck) {
                        this.amount = parseFloat(this.currencyHash.text.split("(")[1].split(" ")[0]) - parseFloat("0.00"+this.price);
                        this.total_coins = this.currencyHash.text.split("(")[1].split(" ")[0];
                    } else {
                        this.total_coins = parseFloat(this.amount) + parseFloat(price);
                    }
                }, 200)
            },
            handlepriceChange(){
                var price = '0.00'+this.price;
                if(this.currencyHash && this.sendAllCheck) {
                    this.amount = parseFloat(this.currencyHash.text.split("(")[1].split(" ")[0]) - parseFloat("0.00"+this.price);
                    this.total_coins = this.currencyHash.text.split("(")[1].split(" ")[0];
                } else {
                    this.total_coins = parseFloat(this.amount) + parseFloat(price);
                }
            },
            handlesendall(){
                if(this.currencyHash && this.currencyHash.text) {
                    this.amount = parseFloat(this.currencyHash.text.split("(")[1].split(" ")[0]) - parseFloat("0.00"+this.price);
                }
                this.handleAmount();
            },
            handlecurrchange(){
                // console.log("handlecurrchange");
                setTimeout(() => {
                    if(this.currencyHash && this.currencyHash.text && this.sendAllCheck) {
                        this.amount = parseFloat(this.currencyHash.text.split("(")[1].split(" ")[0]) - parseFloat("0.00"+this.price);
                        this.handleAmount();
                    }
                }, 200)
            },
            handlechangeFunds(){
                this.loading1= true;
                setTimeout(() => {
                    // console.log(this.fundsFrom,"handlechangeFunds");
                    this.optionCurrency = [];
                    this.currencyHash = '';
                    if(this.fromArray.length == 1) {
                        this.currentArray = this.fromArray;
                        let defaultCurr = {value: this.fromArray[0].hash ,text : this.fromArray[0].accountTitle + '- ('+ this.fromArray[0].balance+' EXP)'};
                        this.currencyHash = {value: this.fromArray[0].hash ,text : this.fromArray[0].accountTitle + '- ('+ this.fromArray[0].balance+' EXP)'};
                        this.optionCurrency.push(defaultCurr);
                        this.fromArray[0].token_icons.map((acc_token) => {
                            var data = {value: acc_token.tokenHash , text: acc_token.token_name + ' - (' +acc_token.balance + ' )'};
                            this.optionCurrency.push(data);
                            this.loading1= false;
                        })
                    } else if(this.fromArray.length > 1){
                        this.fromArray.map((account, index) => {
                            if(account.hash == this.fundsFrom.value ) {
                                this.currentArray = account;
                                let defaultCurr = {value: account.hash ,text : account.accountTitle + '- ('+ account.balance +' EXP)'};
                                this.currencyHash = {value: account.hash ,text : account.accountTitle + '- ('+ account.balance +' EXP)'};
                                this.optionCurrency.push(defaultCurr);
                                account.token_icons.map((acc_token) => {
                                    var data = {value: acc_token.tokenHash , text: acc_token.token_name + ' - (' +acc_token.balance + ' )'};
                                    this.optionCurrency.push(data);
                                    this.loading1= false;
                                })
                            }
                        })
                    }
                    this.amount = 0;
                    if(this.currencyHash && this.currencyHash.text && this.sendAllCheck) {
                        this.amount = parseFloat(this.currencyHash.text.split("(")[1].split(" ")[0]) - parseFloat("0.00"+this.price);
                        this.handleAmount();
                    }
                }, 200)
            },
            mainMenu(){
                this.$router.push({
                    path: '/walletdashboard',
                });
            },
            handleFocus(){
                this.fundsFromError= false;
                this.fundsToError= false;
                this.amountError= false;
                this.currencyHashError= false;
                this.total_coinsError= false;
            },
            handleSendFund(){
                // console.log(this.fundsFrom.value, this.currencyHash.value , this.fundsTo, " this.modalArray && this.modalArray.fundsFrom");
                if(this.fundsFrom.value && this.fundsTo && this.amount && this.currencyHash.value ){
                    if (!ethereum_address.isAddress(this.fundsTo )) {
                        this.fundsToError = 'Invalid Address';
                    } else{
                        //console.log(this.currencyHash.text.split("(")[1].split(" ")[0] >= this.amount, this.currencyHash.text.split("(")[1].split(" ")[0] , this.amount, "===================*******")
                        if(parseFloat(this.currencyHash.text.split("(")[1].split(" ")[0]) >= parseFloat(this.amount)){
                            if(this.fundsFrom.value == this.fundsTo){
                                this.fundsToError = 'Invalid Address';
                            }else {
                                this.modalArray = {
                                    currentArray: this.currentArray,
                                    fundsFrom: this.fundsFrom.value,
                                    fundsTo: this.fundsTo,
                                    amount: this.amount,
                                    currencyHash: this.currencyHash.value,
                                    price: this.price,
                                    total_coins: this.total_coins,
                                };
                                this.show();
                            }
                        } else {
                            this.amountError = 'Seems You dont have sufficient Amount To send';

                        }
                    }
                }else {
                    if(!this.fundsFrom.value) {
                        this.fundsFromError = true;
                    }
                    if(!this.fundsTo) {
                        this.fundsToError = 'To is required';
                    }
                    if(!this.amount) {
                        this.amountError = 'Amount is required';
                    } if(!this.currencyHash.value) {
                        this.currencyHashError = true;
                    }
                }

            },
        }
    }
</script>

<style>
    @import "../../../../../static/modalcomponent.css";
    @import "../../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";
</style>

<style>

    .settextwid {
        display: inline;
    }

    .send .content .funds .contentInner .sentDetails .fundTransfer .drop-down {
        padding: 0px;
    }

    .fundsFrom .multiselect--active .multiselect__select , .currencies_dropdown .multiselect--active .multiselect__select  {
        height: 50px!important;
    }

    .fundsFrom  .multiselect__select , .currencies_dropdown  .multiselect__select  {
        height: 41px!important;
    }

    .fundsFrom .multiselect__tags, .currencies_dropdown .multiselect__tags {
        width: 100%!important;
        border: none!important;
        padding: 6px 40px 0px 8px!important;
    }

    .fundsFrom .multiselect__content-wrapper, .currencies_dropdown .multiselect__content-wrapper {
        background: none;
    }

    .fundsFrom .multiselect__content, .currencies_dropdown .multiselect__content {
        margin: 15px 0px 0px 0px;
    }

    .multiselect__content-wrapper {
        margin-top: 3px;
    }

    .currencies_dropdown .multiselect__placeholder {
        line-height: 37px!important;
        text-indent: 8px!important;
    }

    .fundsFrom .multiselect__option--selected .multiselect__option--highlight, .currencies_dropdown .multiselect__option--selected .multiselect__option--highlight {
        background: #ffffff!important;
        color: #000!important;
    }

    .fundsFrom .multiselect__option--highlight, .currencies_dropdown .multiselect__option--highlight{
        background: #ffffff!important;
        color: #000!important;
    }

    .fundsFrom .multiselect__element, .currencies_dropdown .multiselect__element{
        background: #ffffff!important;
        color: #000!important;
    }

    .fundsFrom  .multiselect__single, .currencies_dropdown .multiselect__single{
        padding-left: 15px!important;
        margin-bottom: 0px!important;
        line-height: 43px;
        height: 10px;
    }

    .fundsFrom  .multiselect__spinner:after,.fundsFrom  .multiselect__spinner:before, .currencies_dropdown .multiselect__spinner:after, .currencies_dropdown .multiselect__spinner:before {
        border-color: #000000 transparent transparent!important;
        margin-top: -1px;

    }

    .fundsFrom  .multiselect__single .setImg , .currencies_dropdown .multiselect__single .setImg {
        margin: 8px 5px!important;
    }

    .fundsFrom  .multiselect__single .option__title, .currencies_dropdown .multiselect__single .option__title {
        vertical-align: top!important;
        line-height: 47px!important;
    }

    .fundsFrom  .multiselect__option .setImg , .currencies_dropdown .multiselect__option .setImg {
        margin: 8px 5px!important;
    }

    .fundsFrom  .multiselect__option .option__title , .currencies_dropdown .multiselect__option .option__title {
        vertical-align: top!important;
        line-height: 47px!important;
    }

    .fundsFrom   .multiselect__input, .fundsFrom   .multiselect__single ,.currencies_dropdown   .multiselect__input, .currencies_dropdown   .multiselect__single {
        padding: 0px 0px 0px 15px!important;
    }

</style>
