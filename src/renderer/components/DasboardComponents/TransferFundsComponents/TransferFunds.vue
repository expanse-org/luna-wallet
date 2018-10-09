<template>
    <div class="main-container">
        <div class="send tabcontent" id="send">
            <div class="content">
                <div class="funds">
                    <h1>
                        <button class="back-btn button   active" type="button" id="back_btn" data-val="0" @click="mainMenu()">
                            <img class="button__icon" src="../../../assets/img/back-btn.svg">

                        </button>Send Funds</h1>

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
                                            <multiselect name="SendFunds" track-by="text" :loading="loading" :allow-empty="false" @select="handlechangeFunds(fundsFrom)" label="text" :show-labels="false" placeholder="Select From Account"  v-model="fundsFrom" :options="optionFrom">
                                                <template slot="singleLabel" slot-scope="props">
                                                    <img class="option__image" src="../../../assets/img/selectbg2.png" /><img class="option__image setImg" src="../../../assets/img/selectkey.png" /><span class="option__title">{{ props.option.text }}</span>
                                                </template>
                                                <template slot="option" slot-scope="props">
                                                    <img class="option__image" src="../../../assets/img/selectbg2.png" /><img class="option__image setImg" src="../../../assets/img/selectkey.png" /><span class="option__title">{{ props.option.text }}</span>
                                                </template>
                                            </multiselect>
                                            <!--<select name="SendFunds" @focus="handleFocus" v-model="fundsFrom" class="sendFunds sl_allAccounts" v-on:change="handlechangeFunds">-->
                                                <!--<option v-if="fromArray" v-for="(account, index) in fromArray" class="selectbg1" :value="account.hash">{{account.accountTitle}} - ({{account.balance}} EXP)</option>-->
                                                <!--&lt;!&ndash; <option class="selectbg1" selected value="selectbg2" style="background-image: url('assets/img/selectbg2.png'), url('assets/img/selectkey.png');">Eve - 22441 USD (9.00 ETHER)</option>-->
                                                <!--<option class="selectbg1" selected value="selectbg3" style="background-image: url('assets/img/selectbg2.png'), url('assets/img/selectkey.png');">Eve - 312 USD (9.00 ETHER)</option> &ndash;&gt;-->
                                            <!--</select>-->
                                        </div>
                                    </div>
                                </div>
                                <div class="to">
                                    <div class="error-label">
                                        <label>To</label>
                                        <p v-if="fundsToError" class=" error-message send_to_error">{{fundsToError}}</p>
                                    </div>
                                    <div class="fundsTo">
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="43px"
                                                    height="43px" viewBox="0 0 43 43" style="enable-background:new 0 0 43 43;"
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
                                        <input name="sendTo" @focus="handleFocus" type="text" v-model="fundsTo" selected="fundsTo"  class="sendTo" data-err=".send_to_error" />
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
                                        <multiselect name="accountCurruencies" :loading="loading1" track-by="text" :allow-empty="false" label="text" :show-labels="false" placeholder="Select Currency"  v-model="currencyHash" :options="optionCurrency">
                                            <template slot="singleLabel" slot-scope="props">
                                                <img class="option__image" src="../../../assets/img/selectbg2.png" /><img class="option__image setImg" src="../../../assets/img/selectkey.png" /><span class="option__title">{{ props.option.text }}</span>
                                            </template>
                                            <template slot="option" slot-scope="props">
                                                <img class="option__image" src="../../../assets/img/selectbg2.png" /><img class="option__image setImg" src="../../../assets/img/selectkey.png" /><span class="option__title">{{ props.option.text }}</span>
                                            </template>
                                        </multiselect>
                                        <!--<select name="accountCurruencies" @focus="handleFocus" v-model="currencyHash" class="accountCurrencies">-->
                                            <!--<option v-if="currentArray" v-for="(account) in currentArray" class="selectbg1" selected >{{account.accountTitle}} - ({{account.balance}} EXP)</option>-->
                                            <!--<option v-if="currentArray && currentArray[0].tokens" v-for="(acc_token, index) in currentArray && currentArray[0].token_icons" class="selectbg1" :value="acc_token.tokenHash">{{acc_token.token_name}} - ({{acc_token.balance}})</option>-->
                                        <!--</select>-->
                                    </div>
                                </div>
                            </div>

                            <div class="fundsInner">
                                <div class="row">
                                    <div class="checkbox">
                                        <label class="filter__value send_everything">
                                            <input class="filter__mark send_everthing_chkbox" @focus="handleFocus" v-model="sendAllCheck" type="checkbox">
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
                                                This is the most amount of money that might be used to process this transaction. Your transaction will be mined probably
                                                within 30 seconds.
                                            </p>
                                        </div>
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="data hide">
                                        <label>Data</label>
                                        <textarea rows="4" v-model="sendFundsData" @focus="handleFocus" class="sendFundsData"></textarea>
                                        <p>You can add extra data to send along with your transaction. If you don't
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
                price: '93',
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
            };
        },
        components:{
            'sendTransaction': SendTransaction,
            'multiselect': Multiselect,
        },
        computed: {
            accounts() {
                this.accountsArray = this.$store.state.allAccounts;
                return this.accountsArray;
            },
        },
        created(){
            this.optionFrom = [];
            this.intervalid1 = setInterval(() => {
                if (this.$store.state.allAccounts.length > 0) {
                    this.total_balance = this.$store.state.total_balance;
                    this.$store.state.allAccounts.map((val) => {
                        if(val.balance > 0){
                            console.log(val.balance);
                            console.log(val);
                            var data = { value:val.hash ,text: val.accountTitle + '- ('+ val.balance+' EXP)'};
                            this.optionFrom.push(data);
                            this.loading= false;
                            this.fromArray.push(val);
                        }
                    });
                    clearInterval(this.intervalid1)
                }
            }, 100);
        },
        methods: {
            show () {
                this.$modal.show('sendtransactionmodal');
            },
            hide () {
                this.$modal.hide('sendtransactionmodal');
            },
            handleAmount(){
                setTimeout(() => {
                    var price = '0.00'+this.price;
                    this.total_coins = parseFloat(this.amount) + parseFloat(price);
                }, 200)
            },
            handlepriceChange(){
                var price = '0.00'+this.price;
                this.total_coins = parseFloat(this.amount) + parseFloat(price);
            },
            handlechangeFunds(){
                this.loading1= true;
                setTimeout(() => {
                    console.log(this.fundsFrom,"handlechangeFunds");
                    this.optionCurrency = [];
                    if(this.fromArray.length === 1) {
                        this.currentArray = this.fromArray;
                        let defaultCurr = {value: this.fromArray[0].hash ,text : this.fromArray[0].accountTitle + '- ('+ this.fromArray[0].balance+' EXP)'};
                        this.optionCurrency.push(defaultCurr);
                        this.fromArray[0].token_icons.map((acc_token) => {
                            var data = {value: acc_token.token_name , text: acc_token.token_name + ' - ( ' +acc_token.balance + ' )'};
                            this.optionCurrency.push(data);
                            this.loading1= false;
                        })
                    } else if(this.fromArray.length > 1){
                        this.fromArray.map((account) => {
                            if(account.hash === this.fundsFrom.value ) {
                                this.currentArray = account;
                                let defaultCurr = {value: account.hash ,text : account.accountTitle + '- ('+ account.balance+' EXP)'};
                                this.optionCurrency.push(defaultCurr);
                                account.token_icons.map((acc_token) => {
                                    var data = {value: acc_token.tokenHash , text: acc_token.token_name + ' - ( ' +acc_token.balance + ' )'};
                                    this.optionCurrency.push(data);
                                    this.loading1= false;
                                })
                            }
                        })
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
                console.log(this.fundsFrom , this.fundsTo, " this.modalArray && this.modalArray.fundsFrom");
                if(this.fundsFrom && this.fundsTo && this.amount && this.currencyHash ){
                    if (!ethereum_address.isAddress(this.fundsTo )) {
                        this.fundsToError = 'Invalid Address';
                    }
                    console.log(this.total_balance > this.amount, "this.total_balance > this.amount")
                    console.log(this.total_balance , this.amount, "this.total_balance, this.amount")
                    if(this.total_balance > this.amount){
                        if(this.fundsFrom === this.fundsTo){
                            this.fundsToError = 'Invalid Address';
                        }else {
                            this.modalArray = {
                                currentArray: this.currentArray,
                                fundsFrom: this.fundsFrom,
                                fundsTo: this.fundsTo,
                                amount: this.amount,
                                currencyHash: this.currencyHash,
                                price: this.price,
                                total_coins: this.total_coins,
                            };
                            this.show();
                        }
                    } else {
                        this.amountError = 'Seems You dont have sufficient Amount To send';

                    }
                }else if(!this.fundsFrom) {
                    this.fundsFromError = true;
                }else if(!this.fundsTo) {
                    this.fundsToError = 'To is required';
                }else if(!this.amount) {
                    this.amountError = 'Amount is required';
                }else if(!this.currencyHash) {
                    this.currencyHashError = true;
                }

            },
        }
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>

    .tmodal .v--modal {
        top: 20% !important;;
        left: 25% !important;;
        max-width: 670px !important;
        min-width: 320px !important;
        height: auto !important;
        position: fixed !important;
        border-radius: 10px !important;
        box-sizing: border-box !important;
        border-radius: 10px !important;
        width: 80vw !important;
        padding:0 !important;
        z-index: 2000;
    }

    .tmodal .v--modal .popup {
        width: 91% !important;
    }
    .send .content .funds .contentInner .sentDetails .fundTransfer .drop-down {
        padding: 0px;
    }

    .fundsFrom .multiselect--active .multiselect__select , .currencies_dropdown .multiselect--active .multiselect__select  {
        height: 50px!important;
    }

    .fundsFrom  .multiselect__select , .currencies_dropdown  .multiselect__select  {
        height: 47px!important;
    }

    .fundsFrom .multiselect__tags, .currencies_dropdown .multiselect__tags {
        width: 100%!important;
        border: none!important;
        padding: 6px 40px 0px 8px!important;
    }

    .fundsFrom .multiselect__content-wrapper, .currencies_dropdown .multiselect__content-wrapper {
        background: none;
        height: auto!important;
        max-height: auto!important;
    }

    .multiselect__content-wrapper {
        margin-top: 3px;
    }

    .fundsFrom .multiselect__option--selected .multiselect__option--highlight, .currencies_dropdown .multiselect__option--selected .multiselect__option--highlight {
        background: #ffffff;
        color: #000;
    }

    .fundsFrom .multiselect__option--highlight, .currencies_dropdown .multiselect__option--highlight{
        background: #ffffff;
        color: #000;
    }

    .fundsFrom .multiselect__element, .currencies_dropdown .multiselect__element{
        background: #ffffff;
        color: #000;
    }

    .fundsFrom  .multiselect__single, .currencies_dropdown .multiselect__single{
        padding-left: 15px!important;
        margin-bottom: 0px!important;
        line-height: 43px;
        height: 10px;
    }

    .fundsFrom  .multiselect__spinner:after, .multiselect__spinner:before, .currencies_dropdown .multiselect__spinner:after, .multiselect__spinner:before {
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