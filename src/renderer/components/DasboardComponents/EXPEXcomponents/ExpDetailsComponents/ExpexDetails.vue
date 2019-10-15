<template>
    <div class="content">
        <div class="expexDetails-Info">
            <div class="curve"></div>
            <div class="expexDetails-content">
                <div class="expexDetails-headings">
                    <h1 v-if="tokenData">{{tokenData.betaSymbol}} - {{tokenData.alphaSymbol}}</h1>
                    <h1 v-else>EXP-ETH1</h1>
<!--                    <p>Ethereum 1</p>-->
                </div>
<!--                <div class="expHeadData">-->
<!--                    <p>$ 459.89</p>-->
<!--                    <p class="Red">EXP 0.000000087</p>-->
<!--                    <p>LAST</p>-->
<!--                </div>-->
<!--                <div class="expHeadData">-->
<!--                    <p>$ 459.89</p>-->
<!--                    <p class="Green">EXP 0.000000087</p>-->
<!--                    <p>BID</p>-->
<!--                </div>-->
<!--                <div class="expHeadData">-->
<!--                    <p>$ 459.89</p>-->
<!--                    <p class="Green">EXP 0.000000087</p>-->
<!--                    <p>ASK</p>-->
<!--                </div>-->
<!--                <div class="expHeadData">-->
<!--                    <p>$ 459.89</p>-->
<!--                    <p class="Red">EXP 0.000000087</p>-->
<!--                    <p>VOLUME</p>-->
<!--                </div>-->
<!--                <div class="expHeadData">-->
<!--                    <p>$ 459.89</p>-->
<!--                    <p class="Green">EXP 0.000000087</p>-->
<!--                    <p>24H HIGH</p>-->
<!--                </div>-->
<!--                <div class="expHeadData">-->
<!--                    <p>$ 459.89</p>-->
<!--                    <p class="Red">EXP 0.000000087</p>-->
<!--                    <p>24H LOW</p>-->
<!--                </div>-->
            </div>
        </div>
        <div class="expexchart-section">
            <div class="chart-content">
                <div class="head-text">
                    <div class="text-data">
                        <h1>MARKET CHART</h1>
<!--                        <div class="keyvalue">-->
<!--                            <div><p>PRICE:</p> 0.06763</div>-->
<!--                            <div><p>VOL:</p> 0.08763</div>-->
<!--                        </div>-->
<!--                        <div class="keyvalue">-->
<!--                            <div><p>OPEN:</p> 0.06763</div>-->
<!--                            <div><p>HIGH:</p> 0.08763</div>-->
<!--                        </div>-->
<!--                        <div class="keyvalue">-->
<!--                            <div><p>CLOSE:</p> 0.06763</div>-->
<!--                            <div><p>LOW:</p> 0.08763</div>-->
<!--                        </div>-->
                    </div>
                    <div class="btns">
                        <!--<button class="deposit-btn"><img src="../../../../assets/img/Polygonwhite2.png"/> DEPOSIT</button>-->
                        <!--<button class="withdraw-btn"><img src="../../../../assets/img/PolygonWhite3.png"/> WITHDRAW</button>-->
                    </div>
                </div>
                <div class="partition-chart"></div>
                <div class="chart-body">

                </div>
            </div>
        </div>
        <div class="buySell-Section">
            <div class="content">
                <div class="left-side">
                    <div class="left-side-table">
                        <div class="table-head">
                            <label>PRICE ({{tokenData.alphaSymbol}})</label>
                            <label>AMOUNT ({{tokenData.betaSymbol}})</label>
                            <label>TOTAL ({{tokenData.alphaSymbol}})</label>
                        </div>
                        <div class="table-partition"></div>
                        <div class="table-body">
                            <div v-if="sellTable.length > 0" v-for="data in sellTable" @click="handleRow((data.amountSell - data.amountSellFilled)/Math.pow(10, data.decimalSell), data.price,((data.price) * ((data.amountSell - data.amountSellFilled)/Math.pow(10, data.decimalSell))))" class="table-row">
                                <p>{{parseFloat(data.price).toFixed(5)}}</p>
                                <p>{{(data.amountSell - data.amountSellFilled)/Math.pow(10, data.decimalSell)}}</p>
                                <p class="Green">{{parseFloat((data.price) * ((data.amountSell - data.amountSellFilled)/Math.pow(10, data.decimalSell))).toFixed(5)}}</p>
                            </div>
                            <div v-if="sellTable.length === 0" class="table-no-row">
                                <p class="row-10">No SELL Orders Found</p>
                            </div>
                        </div>
                        <div v-if="sellTable.length > 10">
                            <paginate
                                    :pageCount=totalcount
                                    :clickHandler="clickCallback"
                                    :prevText="'<<'"
                                    :nextText="'>>'"
                                    :initial-page=initialPage
                                    :force-page=forcePage
                                    :active-class="'activeT'"
                                    :containerClass="'paginationT'">
                            </paginate>
                        </div>
                    </div>
                </div>
                <div class="middle-side">
                    <div class="mid-content">
                        <div class="btns-div">
                            <button @click="handleBuySell('buy')" :class="btnActive==='buy' ? 'buy-btn':'unactive-buy'">BUY</button>
                            <button @click="handleBuySell('sell')" :class="btnActive==='sell' ? 'sell-btn':'unactive-sell'">SELL</button>
                        </div>
                        <div class="details-div">
                            <p class="uppertxt">QUANTITY</p>
                            <div class="lowertxt">
                                <p v-if="quantityError" class="error-message sendFundPassword-error ">{{quantityError}}</p>
                                <input type="number" @focus="handleFocus" placeholder="0.00000" v-model="quantity"/>
                                <p>{{tokenData.betaSymbol}}</p>
                            </div>
                        </div>
                        <div class="balance-partition"></div>
                        <div class="details-div">
                            <p class="uppertxt Green">BID PRICE</p>
                            <div class="lowertxt">
                                <input type="number" @focus="handleFocus" placeholder="0.00000" v-model="bidPrice"/>
                                <p>{{tokenData.alphaSymbol}}</p>
                            </div>
                        </div>
                        <div class="balance-partition"></div>
                        <div class="details-div">
                            <p class="uppertxt">TOTAL</p>
                            <div class="lowertxt">
                                <p v-if="totalError" @focus="handleFocus" class="error-message sendFundPassword-error ">{{totalError}}</p>
                                <p>{{totalAmount}}</p>
                                <p>{{tokenData.alphaSymbol}}</p>
                            </div>
                        </div>
                        <div class="balance-partition"></div>
                        <div class="details-div">
                            <p v-if="approveError" class="error-message approveError ">{{approveError}}</p>
                            <p @click="show" class="uppertxt">ALLOWANCE AMOUNT <i class="fa fa-plus-circle"></i></p>
                            <div class="lowertxt">
                                <p>{{allowanceAmount}}</p>
                                <p v-if="btnActive==='sell'">{{tokenData.betaSymbol}}</p>
                                <p v-if="btnActive==='buy'">{{tokenData.alphaSymbol}}</p>
                            </div>
                        </div>
                        <div class="balance-partition"></div>
                        <div v-if="btnActive==='buy'" class="buy-btn">

                            <button :disabled="btndisable" @click="handlebuy" type="submit" class="ok button button--shikoba">
                                <img v-if="loading" class="outer-wheel button__icon" src="../../../../assets/img/innerCricle.svg"/>
                                <img v-if="!loading"  class="button__icon" src="../../../../assets/img/send.svg">
                                <span>BUY {{tokenData.betaSymbol}}</span>
                            </button>
                        </div>
                        <div v-if="btnActive==='sell'" class="sell-btn">
                            <button :disabled="btndisable1" @click="handlesell" type="submit" class="ok button button--shikoba">
                                <img v-if="loading1" class="outer-wheel button__icon" src="../../../../assets/img/innerCricle.svg"/>
                                <img v-if="!loading1"  class="button__icon" src="../../../../assets/img/send.svg">
                                <span>SELL {{tokenData.betaSymbol}}</span>
                            </button>
                        </div>
                        <div class="bal-text">
                            <p>AVAILABLE BALANCE</p>
                            <p>{{expAmount}} EXP</p>
                            <p>{{parseFloat(wexpAmount).toFixed(8)}} WEXP</p>
                            <p>{{parseFloat(tokenAmount).toFixed(8)}} {{this.tokenData.betaSymbol}}</p>
                        </div>
                        <div class="balance-partition1"></div>
                        <p @click="handleMaxBuy" class="buybluetxt">MAX BUY</p>
                    </div>
                </div>
                <div class="left-side">
                    <div class="left-side-table">
                        <div class="table-head">
                            <label>TOTAL ({{tokenData.alphaSymbol}})</label>
                            <label>AMOUNT ({{tokenData.betaSymbol}})</label>
                            <label>PRICE ({{tokenData.alphaSymbol}})</label>
                        </div>
                        <div class="table-partition"></div>
                        <div class="table-body">
                            <div v-if="buyTable.length > 0"  v-for="data in buyTable" @click="handleRow((data.amountBuy - data.amountBuyFilled)/Math.pow(10, data.decimalBuy),data.price,((data.price) * ((data.amountBuy - data.amountBuyFilled)/Math.pow(10, data.decimalBuy))))" class="table-row">
                                <p class="Red">{{parseFloat((data.price) * ((data.amountBuy - data.amountBuyFilled)/Math.pow(10, data.decimalBuy))).toFixed(5)}}</p>
                                <p>{{(data.amountBuy - data.amountBuyFilled)/Math.pow(10, data.decimalBuy)}}</p>
                                <p>{{parseFloat(data.price).toFixed(5)}}</p>
                            </div>
                            <div v-if="buyTable.length === 0" class="table-no-row">
                                <p class="row-10">No BUY Orders Found</p>
                            </div>
                        </div>
                        <div v-if="buyTable.length > 10">
                            <paginate
                                    :pageCount=totalcount
                                    :clickHandler="clickCallback"
                                    :prevText="'<<'"
                                    :nextText="'>>'"
                                    :initial-page=initialPage
                                    :force-page=forcePage
                                    :active-class="'activeT'"
                                    :containerClass="'paginationT'">
                            </paginate>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div>
            <h2 class="marketLabel">MARKET HISTORY</h2>
            <div class="expexDetails-table">
                <div class="table-head">
                    <label>DATE</label>
                    <label>TIME</label>
                    <label>ORDER TYPE</label>
                    <label>PRICE</label>
                    <label>AMOUNT</label>
                    <label>TOTAL</label>
                </div>
                <div class="table-partition"></div>
                <div class="table-body">
<!--                    <div class="table-row">-->
<!--                        <p>12/08/19</p>-->
<!--                        <p>12:34:00</p>-->
<!--                        <p class="Green row-10">BUY</p>-->
<!--                        <p>0.00089</p>-->
<!--                        <p>0.0000467</p>-->
<!--                        <p>0.000467</p>-->
<!--                    </div>-->

                    <div class="table-no-row">
                        <p class="row-10">No Market History Found</p>
                    </div>
                </div>
<!--                <div>-->
<!--                    <paginate-->
<!--                            :pageCount=totalcount-->
<!--                            :clickHandler="clickCallback"-->
<!--                            :prevText="'<<'"-->
<!--                            :nextText="'>>'"-->
<!--                            :initial-page=initialPage-->
<!--                            :force-page=forcePage-->
<!--                            :active-class="'activeT'"-->
<!--                            :containerClass="'paginationT'">-->
<!--                    </paginate>-->
<!--                </div>-->
            </div>
        </div>

        <modal class="tmodal" name="allowancePopup">
            <allowance-popup :modalArray="modalArray"></allowance-popup>
        </modal>
        <modal class="tmodal" name="insufficentBal">
            <insuficentBalance ></insuficentBalance>
        </modal>

    </div>
</template>

<script>
    import  insuficentBalance from '../../insuficentBalance';
    import Paginate from 'vuejs-paginate'
    import {web3, tokenInterface, expexABI, startConnectWebHttp,expexAddress} from '../../../../../main/libs/config';
    import AllowancePopup from './AllowancePopup/AllowancePopup';
    import {sqldb} from '../../../../../common/cronjobs';

    const web3http = startConnectWebHttp();
    const dexContract = new web3http.eth.Contract(expexABI, expexAddress);

    export default {
        name: 'ExpexDetails',
        props: ['fromAddress'],
        components : {
            'paginate': Paginate,
            'allowance-popup': AllowancePopup,
            'insuficentBalance': insuficentBalance,
        },
        watch: {
            // whenever question changes, this function will run
            quantity: function (newQuantity) {
                this.totalAmount = newQuantity*this.bidPrice;
            },
            bidPrice: function (newValue) {
                this.totalAmount = this.quantity*newValue;
            },
            fromAddress: function (value) {
                this.expAmount = value.text.split('(')[1].split(' ')[0];
                this.tokenAmount = 0;
                this.wexpAmount = this.fromAddress.text.split('(')[2].split(' ')[0];
                this.accounts.map((val) => {
                    if(val.hash === this.fromAddress.value) {
                        if(val.tokens){
                            val.token_icons.map((token) => {
                                if(token.token_symbol === this.tokenData.betaSymbol) {
                                    this.tokenAmount = token.balance;
                                }
                            })
                        }
                    }
                });
                this.buyTable = [];
                sqldb.each("SELECT * FROM Orders  where marketType = 'BUY' and maker != '"+value.value+"' COLLATE NOCASE and orderFilled  < 100", (err, row) => {
                    // console.log(row, "rowsss");
                    this.buyTable.push(row);
                });
                this.sellTable = [];
                sqldb.each("SELECT * FROM Orders where marketType = 'SELL' and maker != '"+value.value+"' COLLATE NOCASE and orderFilled  < 100", (err, row) => {
                    // console.log(row, "rowsss");
                    this.sellTable.push(row);
                });
                this.startAllowanceInterval();
            }
        },
        data() {
            return {
                web3,
                initialPage: 1,
                forcePage: 1,
                totalcount: 100,
                quantity: 0.00000,
                bidPrice: 0.00000,
                totalAmount: 0.00000,
                btnActive: 'buy',
                allowanceAmount: 0,
                orderAddresses: ['0x270ff59e03e69db4600900a2816587e7cd3e2f11', '0xa887adb722cf15bc1efe3c6a5d879e0482e8d197'],
                orderValues: [],
                modalArray: {},
                matchOrderHashes: ['0x0', '0x0', '0x0', '0x0', '0x0'],
                tokenData: {},
                expAmount: 0,
                wexpAmount: 0,
                tokenAmount: 0,
                quantityError: '',
                totalError: '',
                approveError: '',
                intervalid1: '',
                intervalid2: '',
                loading: false,
                loading1: false,
                btndisable: false,
                btndisable1: false,
                expexAddress,
                gasprice: 87,
                gasLimit: 900000,
                buyTable: [],
                sellTable: [],
            };
        },
        computed: {
            accounts() {
                var accountsArray = this.$store.state.allAccounts;
                return accountsArray;
            },
        },
        created(){
            this.tokenData = this.$router.history.current.query.data;
            if(this.fromAddress) {
                // console.log(this.fromAddress.text.split('('), this.fromAddress.text.split('(')[2].split(' ')[0]);
                this.expAmount = this.fromAddress.text.split('(')[1].split(' ')[0];
                this.tokenAmount = 0;
                this.wexpAmount = this.fromAddress.text.split('(')[2].split(' ')[0];
                this.accounts.map((val) => {
                    if(val.hash === this.fromAddress.value) {
                        if(val.tokens){
                            val.token_icons.map((token) => {
                                if(token.token_symbol === this.tokenData.betaSymbol) {
                                    this.tokenAmount = token.balance;
                                }
                            })
                        }
                    }
                });
                this.startAllowanceInterval();
            } else {
                this.$modal.show('insufficentBal');
            }
            this.buyTable = [];
            sqldb.each("SELECT * FROM Orders  where marketType = 'BUY' and maker != '"+this.fromAddress.value+"' COLLATE NOCASE and orderFilled  < 100", (err, row) => {
                // console.log(row, "rowsss");
                this.buyTable.push(row);
            });
            this.sellTable = [];
            sqldb.each("SELECT * FROM Orders where marketType = 'SELL' and maker != '"+this.fromAddress.value+"' COLLATE NOCASE and orderFilled  < 100", (err, row) => {
                // console.log(row, "rowsss");
                this.sellTable.push(row);
            });
        },
        destroyed() {
            clearInterval(this.intervalid1);
        },
        methods: {
            startAllowanceInterval() {
                this.allowanceAmount = 0;
                var contract;
                // console.log(contract , this.tokenData.betaAddress, this.fromAddress.value, this.expexAddress)
                // console.log(this.btnActive==='sell', this.btnActive, "****")
                this.intervalid1 = setInterval(() => {
                    if(this.btnActive==='sell') {
                        contract = new web3.eth.Contract(tokenInterface, this.tokenData.betaAddress);
                        contract.methods.allowance(this.fromAddress.value, this.expexAddress).call().then((res) => {
                            this.allowanceAmount = res/Math.pow(10, this.tokenData.betaDecimal);
                        });
                    } else {
                        contract = new web3.eth.Contract(tokenInterface, this.tokenData.alphaAddress);
                        contract.methods.allowance(this.fromAddress.value, this.expexAddress).call().then((res) => {
                            this.allowanceAmount = res/Math.pow(10, this.tokenData.alphaDecimal);
                        });
                    }
                }, 3000);
            },
            show () {
                if(this.fromAddress) {
                    if(this.btnActive==='sell') {
                        this.modalArray = {
                            type: "allowance",
                            fromAddress: this.fromAddress.value,
                            currency: this.tokenData.betaSymbol,
                            toAddress: this.tokenData.betaAddress,
                            decimal: this.tokenData.betaDecimal,
                        };
                        this.$modal.show('allowancePopup');
                    } else {
                        this.modalArray = {
                            type: "allowance",
                            fromAddress: this.fromAddress.value,
                            currency: this.tokenData.alphaSymbol,
                            toAddress: this.tokenData.alphaAddress,
                            decimal: this.tokenData.alphaDecimal,
                        };
                        this.$modal.show('allowancePopup');
                    }
                } else {
                    this.$modal.show('insufficentBal');
                }
            },
            hide () {
                this.$modal.show('insufficentBal');
                this.$modal.hide('allowancePopup');
            },
            clickCallback (pageNum) {
                console.log(pageNum)
            },
            handleRow(p1 = 0, p2 = 0, p3 = 0){
                this.quantity = p1;
                this.bidPrice = p2;
                this.totalAmount = p3;
            },
            handleMaxBuy() {

            },
            handleFocus() {
              this.quantityError = '';
              this.approveError = '';
              this.totalError = '';
            },
            handleBuySell(type){
                this.quantityError = '';
                this.approveError = '';
                this.totalError = '';
                this.totalcount = 0;
                this.quantity = 0;
                this.bidPrice = 0;
                this.totalAmount = 0;
                this.startAllowanceInterval();
                switch(type) {
                    case 'buy':
                        this.btnActive = 'buy';
                        break;
                    case 'sell':
                        this.btnActive = 'sell';
                        break;
                }
            },
            handlebuy() {
                if(this.totalAmount > 0 || this.totalAmount) {
                    if(this.allowanceAmount !==0 && this.allowanceAmount >= this.totalAmount) {
                        try {
                            this.orderAddresses = [this.tokenData.betaAddress , this.tokenData.alphaAddress];
                            let amountData= [Math.floor(this.quantity*Math.pow(10, this.tokenData.betaDecimal)).toString(), Math.floor(this.totalAmount*Math.pow(10, this.tokenData.alphaDecimal)).toString()]
                            this.modalArray = {
                                type: "buy",
                                fromAddress: this.fromAddress.value,
                                currency: this.tokenData.betaSymbol,
                                orderAddresses: this.orderAddresses,
                                amountData: amountData,
                                amount: this.totalAmount,
                                matchOrderHashes: this.matchOrderHashes,
                            };
                            this.$modal.show('allowancePopup');
                        }
                        catch(err) {
                            console.log(err, "err");
                        }
                        clearInterval(this.intervalid1);
                    }
                    else {
                        this.approveError = "Approve Allowance";
                    }
                }
                else {
                    this.totalError = "Total Amount is required"
                }
            },
            handlesell() {
                if(this.totalAmount > 0 || this.totalAmount) {
                    if (this.allowanceAmount !== 0 && this.allowanceAmount >= this.quantity) {
                        try {
                            this.orderAddresses = [this.tokenData.alphaAddress, this.tokenData.betaAddress];
                            let amountData= [Math.floor(this.quantity*Math.pow(10, this.tokenData.alphaDecimal)).toString(), Math.floor(this.totalAmount*Math.pow(10, this.tokenData.betaDecimal)).toString()]
                            this.modalArray = {
                                type: "sell",
                                fromAddress: this.fromAddress.value,
                                currency: this.tokenData.alphaSymbol,
                                orderAddresses: this.orderAddresses,
                                amountData: amountData,
                                amount: this.totalAmount,
                                matchOrderHashes: this.matchOrderHashes,
                            };
                            this.$modal.show('allowancePopup');
                        } catch (err) {

                        }
                        clearInterval(this.intervalid1);
                    }
                    else {
                        this.approveError = "Approve Allowance";
                    }
                }
                else {
                    this.totalError = "Total Amount is required"
                }
            }
        }
    }
</script>

<style>

</style>
