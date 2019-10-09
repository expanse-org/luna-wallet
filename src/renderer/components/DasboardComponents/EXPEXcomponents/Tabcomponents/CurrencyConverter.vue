<template>
    <div class="content">
        <div class="curconverter-Info">
            <div class="curve"></div>
            <div class="curconverter-content">
                <div class="curconverter-headings">
                    <h1>Currency Converter</h1>
                </div>
            </div>
        </div>
        <div class="curconverter-para">
            <p> In order to trade your expanse against tokens you need to have equivalent expanse (WEXP). They have same
                value as the expanse only wrapped in token form to make them tradeable. Convert below to trade with ease!
            </p>
        </div>
        <div class="curconverter-body">
            <div class="content">
                <div class="calculate-div">
                    <div class="send-div">
                        <h2> You Send: </h2>
                        <input type="number" @focus="handleFocus" v-model="sendValue" placeholder="0" />
                        <p v-if="sendValueError" class="error-message accountName-error">{{sendValueError}}</p>
                        <div @click="handleCurrChange" class="send-select slecth">
                           <div >{{sendCurr}}</div>
                        </div>
                    </div>
                    <div class="send-div">
                        <h2> You Receive: </h2>
                        <input type="number" v-model="sendValue" placeholder="0"  disabled="true"/>
                        <div @click="handleCurrChange" class="send-select slecth">
                           <div>{{receiveCurr}}</div>
                        </div>
                    </div>
                    <div class="exchange-btn">
                        <button @click="handleExchange">Exchange Now <img src="../../../../assets/img/Polygonwhitearrow.png"/></button>
                    </div>
                </div>
                <div class="partition-bar"></div>
                <div class="detail-div">
                    <div class="txt-div">
                        <h1>Exchange Rate</h1>
                        <p>1 EXP = 1 WEXP</p>
                    </div>
                    <!--<div class="txt-div">-->
                        <!--<h1>Exchange Fee</h1>-->
                        <!--<p>0.098 ETH1</p>-->
                    <!--</div>-->
                    <!--<div class="txt-div network-rate">-->
                        <!--<h1>Network Rate</h1>-->
                        <!--&lt;!&ndash;<p>0.098 ETH1</p>&ndash;&gt;-->
                        <!--<div class="progressBar">-->
                            <!--<input id="price" v-model="price" type="range" min="53" max="212"/>-->
                            <!--<div class="ranges">-->
                                <!--<span>53</span>-->
                                <!--<span>212</span>-->
                            <!--</div>-->
                            <!--<p>{{price}} EXP</p>-->
                        <!--</div>-->
                    <!--</div>-->
                </div>
            </div>
        </div>
        <modal class="tmodal" name="exchangeNow">
            <allowance-popup :modalArray="modalArray"></allowance-popup>
        </modal>
    </div>
</template>

<script>
    import AllowancePopup from '../ExpDetailsComponents/AllowancePopup/AllowancePopup'
    import {web3} from '../../../../../main/libs/config';
    export default {
        name: 'currencyConverter',
        props: ['fromAddress'],
        data() {
            return {
                initialPage: 1,
                forcePage: 1,
                sendValue: '',
                recieveValue: 0,
                totalcount: 100,
                gasLimit: 0,
                gasPrice: 0,
                price: 64,
                sendCurr: 'EXP',
                receiveCurr: 'WEXP',
                sendValueError: '',
                modalArray: {},
                web3
            };
        },
        components : {
            'allowance-popup': AllowancePopup,
        },
        created(){
        },
        computed: {
            accounts() {
                var expaccounts = this.$store.state.allAccounts;
                return expaccounts;
            },
        },
        methods: {
            show () {
                this.modalArray = {
                    fromAddress: this.fromAddress.value,
                    amount: this.sendValue,
                    currency: this.sendCurr,
                    gasLimit: this.gasLimit,
                }
                this.$modal.show('exchangeNow');
            },
            hide () {
                this.$modal.hide('exchangeNow');
            },
            clickCallback (pageNum) {
                console.log(pageNum)
            },
            handleFocus() {
                this.sendValueError = '';
            },
            handleCurrChange (){
                var temp = this.sendCurr;
                this.sendCurr = this.receiveCurr;
                this.receiveCurr = temp;

            },
            handleExchange() {
                this.sendValueError = "";
                if(this.sendValue !== 0 && this.sendValue) {
                    this.sendValueError = false;
                    if(this.fromAddress) {
                        if(this.receiveCurr === 'WEXP') {
                            if(this.fromAddress.text.split('(')[1].split(" ")[0] >= this.sendValue) {
                                web3.eth.estimateGas({from: this.fromAddress.value, to: '0x270ff59e03e69db4600900a2816587e7cd3e2f11', amount: web3.utils.toWei(this.sendValue.toString(), "ether")}, (err, res) => {
                                    // console.log(res, err,  "estimatedgass response");
                                    if(res > 1) {
                                        this.show();
                                    }
                                })
                            } else {
                                this.sendValueError = "Seems You don't have sufficient Amount To send";
                            }
                        } else {
                            this.accounts.map((acc) => {
                                if(acc.hash === this.fromAddress.value) {
                                    if(acc.tokens) {
                                        acc.token_icons.map((acc_token) => {
                                            // console.log(acc_token, acc_token.token_symbol === 'WEXP', "acc_token")
                                            if(acc_token.token_symbol === 'WEXP') {
                                                if(acc_token.balance >= this.sendValue) {
                                                    web3.eth.estimateGas({from: this.fromAddress.value, to: '0x270ff59e03e69db4600900a2816587e7cd3e2f11', amount: web3.utils.toWei(this.sendValue.toString(), "ether")}, (err, res) => {
                                                        // console.log(res, err,  "estimatedgass response");
                                                        if(res > 1) {
                                                            this.show();
                                                        }
                                                    })
                                                } else {
                                                    this.sendValueError = "Seems You don't have sufficient Token Amount To send";
                                                }
                                            }
                                        })
                                    } else {
                                        this.sendValueError = "Seems You don't have WEXP Token";
                                    }
                                }
                            })
                        }
                    } else {
                        this.sendValueError = "Seems You don't have sufficient Token Amount To send";
                    }
                } else {
                    this.sendValueError = "Please Enter Send Amount";
                }
            }
        }
    }
</script>

<style>

</style>
