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
                                            <select name="SendFunds" @focus="handleFocus" v-model="fundsFrom" selected="fundsFrom" class="sendFunds sl_allAccounts">
                                                <!-- <option class="selectbg1" selected value="selectbg1" style="background-image: url('assets/img/selectbg2.png'), url('assets/img/selectkey.png');">Eve - 423 (9.00 ETHER)</option>
                                                    <option class="selectbg1" selected value="selectbg2" style="background-image: url('assets/img/selectbg2.png'), url('assets/img/selectkey.png');">Eve - 22441 USD (9.00 ETHER)</option>
                                                    <option class="selectbg1" selected value="selectbg3" style="background-image: url('assets/img/selectbg2.png'), url('assets/img/selectkey.png');">Eve - 312 USD (9.00 ETHER)</option> -->
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="to">
                                    <div class="error-label">
                                        <label>To</label>
                                        <p v-if="fundsToError" class=" error-message send_to_error">To is Required</p>
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
                                        <p v-if="amountError" class=" error-message send_amount_error">Amount is Required</p>
                                    </div>
                                    <div class="amount">
                                        <div class="fundsTo">
                                            <input type="number" @focus="handleFocus" min="0" value="0" v-model="amount" name="sendAmount" class="sendAmount input_number" data-err=".send_amount_error" />
                                        </div>
                                        <!-- <div class="buttons">
                                                    <button class="fas fa-minus-circle"></button>
                                                    <button class="fa fa-plus-circle"></button>
                                                </div> -->
                                    </div>

                                </div>
                                <div class="amount">

                                    <div class="error-label">
                                        <label>Currency</label>
                                        <p v-if="acountCurencyError" class=" error-message send_amount_currency_error">Amount is Required</p>
                                    </div>
                                    <div class="drop-down currencies_dropdown">
                                        <div class="error-label">
                                            <label>Currency</label>
                                        </div>
                                        <select name="accountCurruencies" @focus="handleFocus" v-model="acountCurency" selected="acountCurency" class="accountCurrencies">
                                            <!-- <option class="selectbg1" selected="selected" value="selectbg1d" style="background-image: url('assets/img/selectbg1.png'), url('assets/img/selectkey.png');">EXPANSE - 8.91 USD (9.00 EXP )2</option> -->
                                        </select>
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
                                            <span class="send_every_thing">0</span> Exp</label>
                                        <h2>SELECT FEE</h2>
                                        <label id="result">0.00093 EXP </label>
                                        <div class="progressBar">
                                            <input id="price" v-model="price" @focus="handleFocus" type="range" min="53" max="212"/>
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
    </div>
</template>

<script>
    import {startConnectWeb} from '../../../../main/libs/config';
    var web3 = startConnectWeb();
    export default {
        name: 'TransferFunds',
        data() {
            return {
                fundsFrom: '',
                fundsTo: '',
                amount: '',
                acountCurency: '',
                sendAllCheck: '',
                price: '93',
                sendFundsData: '',
                total_coins: 0,
                fundsFromError: false,
                fundsToError: false,
                amountError: false,
                acountCurencyError: false,
                total_coinsError: false,
                total_balance: 0,
            };
        },
        created(){
        },
        methods: {
            mainMenu(){
                this.$router.push({
                    path: '/walletdashboard'
                });
            },
            handleFocus(){
                this.fundsFromError= false;
                this.fundsToError= false;
                this.amountError= false;
                this.acountCurencyError= false;
                this.total_coinsError= false;
            },
            handleSendFund(){
                if(this.fundsFrom && this.fundsTo && this.amount && this.acountCurency ){

                }else if(!this.fundsFrom) {
                    this.fundsFromError = true;
                }else if(!this.fundsTo) {
                    this.fundsToError = true;
                }else if(!this.amount) {
                    this.amountError = true;
                }else if(!this.acountCurency) {
                    this.acountCurencyError = true;
                }

            },
        }
    }
</script>

<style>

</style>
