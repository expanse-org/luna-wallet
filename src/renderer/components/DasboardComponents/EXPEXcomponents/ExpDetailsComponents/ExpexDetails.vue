<template>
    <div class="content">
        <div class="expexDetails-Info">
            <div class="curve"></div>
            <div class="expexDetails-content">
                <div class="expexDetails-headings">
                    <h1 v-if="tokenData">{{tokenData.alphaSymbol}} - {{tokenData.betaSymbol}}</h1>
                    <h1 v-else>EXP-ETH1</h1>
                    <p>Ethereum 1</p>
                </div>
                <div class="expHeadData">
                    <p>$ 459.89</p>
                    <p class="Red">EXP 0.000000087</p>
                    <p>LAST</p>
                </div>
                <div class="expHeadData">
                    <p>$ 459.89</p>
                    <p class="Green">EXP 0.000000087</p>
                    <p>BID</p>
                </div>
                <div class="expHeadData">
                    <p>$ 459.89</p>
                    <p class="Green">EXP 0.000000087</p>
                    <p>ASK</p>
                </div>
                <div class="expHeadData">
                    <p>$ 459.89</p>
                    <p class="Red">EXP 0.000000087</p>
                    <p>VOLUME</p>
                </div>
                <div class="expHeadData">
                    <p>$ 459.89</p>
                    <p class="Green">EXP 0.000000087</p>
                    <p>24H HIGH</p>
                </div>
                <div class="expHeadData">
                    <p>$ 459.89</p>
                    <p class="Red">EXP 0.000000087</p>
                    <p>24H LOW</p>
                </div>
            </div>
        </div>
        <div class="expexchart-section">
            <div class="chart-content">
                <div class="head-text">
                    <div class="text-data">
                        <h1>MARKET CHART</h1>
                        <div class="keyvalue">
                            <div><p>PRICE:</p> 0.06763</div>
                            <div><p>VOL:</p> 0.08763</div>
                        </div>
                        <div class="keyvalue">
                            <div><p>OPEN:</p> 0.06763</div>
                            <div><p>HIGH:</p> 0.08763</div>
                        </div>
                        <div class="keyvalue">
                            <div><p>CLOSE:</p> 0.06763</div>
                            <div><p>LOW:</p> 0.08763</div>
                        </div>
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
                            <div @click="handleRow(12.708,0.00089,0.010000278)" class="table-row">
                                <p>12.708</p>
                                <p>0.00089</p>
                                <p class="Green">0.010000278</p>
                            </div>
                            <div @click="handleRow(12.708,0.00089,0.010000278)" class="table-row">
                                <p>12.708</p>
                                <p>0.00089</p>
                                <p class="Green">0.010000278</p>
                            </div>
                            <div @click="handleRow(12.708,0.00089,0.010000278)" class="table-row">
                                <p>12.708</p>
                                <p>0.00089</p>
                                <p class="Green">0.010000278</p>
                            </div>
                            <div @click="handleRow(12.708,0.00089,0.010000278)" class="table-row">
                                <p>12.708</p>
                                <p>0.00089</p>
                                <p class="Green">0.010000278</p>
                            </div>
                            <div @click="handleRow(12.708,0.00089,0.010000278)" class="table-row">
                                <p>12.708</p>
                                <p>0.00089</p>
                                <p class="Green">0.010000278</p>
                            </div>
                            <div @click="handleRow(12.708,0.00089,0.010000278)" class="table-row">
                                <p>12.708</p>
                                <p>0.00089</p>
                                <p class="Green">0.010000278</p>
                            </div>
                            <div @click="handleRow(12.708,0.00089,0.010000278)" class="table-row">
                                <p>12.708</p>
                                <p>0.00089</p>
                                <p class="Green">0.010000278</p>
                            </div>
                            <div @click="handleRow(12.708,0.00089,0.010000278)" class="table-row">
                                <p>12.708</p>
                                <p>0.00089</p>
                                <p class="Green">0.010000278</p>
                            </div>
                            <div @click="handleRow(12.708,0.00089,0.010000278)" class="table-row">
                                <p>12.708</p>
                                <p>0.00089</p>
                                <p class="Green">0.010000278</p>
                            </div>
                            <div @click="handleRow(12.708,0.00089,0.010000278)" class="table-row">
                                <p>12.708</p>
                                <p>0.00089</p>
                                <p class="Green">0.010000278</p>
                            </div>
                        </div>
                        <div>
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
                            <p @click="show" class="uppertxt">ALLOWANCE AMOUNT <span class="roundadd">+</span></p>
                            <div class="lowertxt">
                                <p>{{allowanceAmount}}</p>
                                <p v-if="btnActive==='sell'">{{tokenData.betaSymbol}}</p>
                                <p v-if="btnActive==='buy'">{{tokenData.alphaSymbol}}</p>
                            </div>
                        </div>
                        <div class="balance-partition"></div>
                        <div v-if="btnActive==='buy'" class="buy-btn">
                            <button @click="handlebuy">BUY {{tokenData.alphaSymbol}}</button>
                        </div>
                        <div v-if="btnActive==='sell'" class="sell-btn">
                            <button @click="handlesell">SELL {{tokenData.alphaSymbol}}</button>
                        </div>
                        <div class="bal-text">
                            <p>AVAILABLE BALANCE</p>
                            <p>{{expAmount}} EXP</p>
                            <p>{{wexpAmount}} WEXP</p>
                        </div>
                        <div class="balance-partition1"></div>
                        <p @click="handleMaxBuy" class="buybluetxt">MAX BUY</p>
                    </div>
                </div>
                <div class="left-side">
                    <div class="left-side-table">
                        <div class="table-head">
                            <label>TOTAL (EXP)</label>
                            <label>AMOUNT (WEXP)</label>
                            <label>PRICE (EXP)</label>
                        </div>
                        <div class="table-partition"></div>
                        <div class="table-body">
                            <div @click="handleRow(12.708,0.00089,0.0000467)" class="table-row">
                                <p class="Red">0.0000467</p>
                                <p>0.00089</p>
                                <p>12.708</p>
                            </div>
                            <div @click="handleRow(12.708,0.00089,0.0000467)" class="table-row">
                                <p class="Red">0.0000467</p>
                                <p>0.00089</p>
                                <p>12.708</p>
                            </div>
                            <div @click="handleRow(12.708,0.00089,0.0000467)" class="table-row">
                                <p class="Red">0.0000467</p>
                                <p>0.00089</p>
                                <p>12.708</p>
                            </div>
                            <div @click="handleRow(12.708,0.00089,0.0000467)" class="table-row">
                                <p class="Red">0.0000467</p>
                                <p>0.00089</p>
                                <p>12.708</p>
                            </div>
                            <div @click="handleRow(12.708,0.00089,0.0000467)" class="table-row">
                                <p class="Red">0.0000467</p>
                                <p>0.00089</p>
                                <p>12.708</p>
                            </div>
                            <div @click="handleRow(12.708,0.00089,0.0000467)" class="table-row">
                                <p class="Red">0.0000467</p>
                                <p>0.00089</p>
                                <p>12.708</p>
                            </div>
                            <div @click="handleRow(12.708,0.00089,0.0000467)" class="table-row">
                                <p class="Red">0.0000467</p>
                                <p>0.00089</p>
                                <p>12.708</p>
                            </div>
                            <div @click="handleRow(12.708,0.00089,0.0000467)" class="table-row">
                                <p class="Red">0.0000467</p>
                                <p>0.00089</p>
                                <p>12.708</p>
                            </div>
                            <div @click="handleRow(12.708,0.00089,0.0000467)" class="table-row">
                                <p class="Red">0.0000467</p>
                                <p>0.00089</p>
                                <p>12.708</p>
                            </div>
                            <div @click="handleRow(12.708,0.00089,0.0000467)" class="table-row">
                                <p class="Red">0.0000467</p>
                                <p>0.00089</p>
                                <p>12.708</p>
                            </div>
                        </div>
                        <div>
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
                    <div class="table-row">
                        <p>12/08/19</p>
                        <p>12:34:00</p>
                        <p class="Green row-10">BUY</p>
                        <p>0.00089</p>
                        <p>0.0000467</p>
                        <p>0.000467</p>
                    </div>
                    <div class="table-row">
                        <p>12/08/19</p>
                        <p>12:34:00</p>
                        <p class="Red row-10">SELL</p>
                        <p>0.00089</p>
                        <p>0.0000467</p>
                        <p>0.000467</p>
                    </div>
                    <div class="table-row">
                        <p>12/08/19</p>
                        <p>12:34:00</p>
                        <p class="Red row-10">SELL</p>
                        <p>0.00089</p>
                        <p>0.0000467</p>
                        <p>0.000467</p>
                    </div>
                    <div class="table-row">
                        <p>12/08/19</p>
                        <p>12:34:00</p>
                        <p class="Green row-10">BUY</p>
                        <p>0.00089</p>
                        <p>0.0000467</p>
                        <p>0.000467</p>
                    </div>
                    <div class="table-row">
                        <p>12/08/19</p>
                        <p>12:34:00</p>
                        <p class="Green row-10">BUY</p>
                        <p>0.00089</p>
                        <p>0.0000467</p>
                        <p>0.000467</p>
                    </div>
                    <div class="table-row">
                        <p>12/08/19</p>
                        <p>12:34:00</p>
                        <p class="Green row-10">BUY</p>
                        <p>0.00089</p>
                        <p>0.0000467</p>
                        <p>0.000467</p>
                    </div>
                    <div class="table-row">
                        <p>12/08/19</p>
                        <p>12:34:00</p>
                        <p class="Red row-10">SELL</p>
                        <p>0.00089</p>
                        <p>0.0000467</p>
                        <p>0.000467</p>
                    </div>
                    <div class="table-row">
                        <p>12/08/19</p>
                        <p>12:34:00</p>
                        <p class="Red row-10">SELL</p>
                        <p>0.00089</p>
                        <p>0.0000467</p>
                        <p>0.000467</p>
                    </div>
                    <div class="table-row">
                        <p>12/08/19</p>
                        <p>12:34:00</p>
                        <p class="Green row-10">BUY</p>
                        <p>0.00089</p>
                        <p>0.0000467</p>
                        <p>0.000467</p>
                    </div>
                    <div class="table-row">
                        <p>12/08/19</p>
                        <p>12:34:00</p>
                        <p class="Green row-10">BUY</p>
                        <p>0.00089</p>
                        <p>0.0000467</p>
                        <p>0.000467</p>
                    </div>
                </div>
                <div>
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
    import {web3, tokenInterface} from '../../../../../main/libs/config';
    import AllowancePopup from './AllowancePopup/AllowancePopup'
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
            fromAddress: function () {
                this.expAmount = this.fromAddress.text.split('(')[1].split(' ')[0];
                this.wexpAmount = this.fromAddress.text.split('(')[2].split(' ')[0];
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
                expexAddress: '0xD3627766D0584Ed23f8D1acd2E493F8c281C9EF9',
                orderAddresses: ['0x270ff59e03e69db4600900a2816587e7cd3e2f11', '0xa887adb722cf15bc1efe3c6a5d879e0482e8d197'],
                orderValues: [],
                modalArray: {},
                matchOrderHashes: ['0x0', '0x0', '0x0', '0x0', '0x0'],
                tokenData: {},
                expAmount: 0,
                wexpAmount: 0,
                quantityError: '',
                totalError: '',
                approveError: '',
                intervalid1: '',
                intervalid2: ''
            };
        },

        created(){
            this.tokenData = this.$router.history.current.query.data;
            if(this.fromAddress) {
                // console.log(this.fromAddress.text.split('('), this.fromAddress.text.split('(')[2].split(' ')[0]);
                this.expAmount = this.fromAddress.text.split('(')[1].split(' ')[0];
                this.wexpAmount = this.fromAddress.text.split('(')[2].split(' ')[0];
                this.startAllowanceInterval();
            } else {
                this.$modal.show('insufficentBal');
            }
        },
        methods: {
            startAllowanceInterval() {
                var contract;
                // console.log(contract , this.tokenData.betaAddress, this.fromAddress.value, this.expexAddress)
                if(this.btnActive==='sell') {
                    contract = new web3.eth.Contract(tokenInterface, this.tokenData.betaAddress);
                    this.intervalid1 = setInterval(() => {
                        contract.methods.allowance(this.fromAddress.value, this.expexAddress).call().then((res) => {
                            console.log(res, "allowance sell");
                            if(res>0) {
                                this.allowanceAmount = res/Math.pow(10, this.tokenData.betaDecimal);
                            }
                        });
                    }, 3000);
                } else {
                    contract = new web3.eth.Contract(tokenInterface, this.tokenData.alphaAddress);
                    this.intervalid2 = setInterval(() => {
                        contract.methods.allowance(this.fromAddress.value, this.expexAddress).call().then((res) => {
                            console.log(res, "allowance buy");
                            if(res>0) {
                                this.allowanceAmount = res/Math.pow(10, this.tokenData.alphaDecimal);
                            }
                        });
                    }, 3000);
                }
            },
            show () {
                if(this.fromAddress) {
                    if(this.btnActive==='sell') {
                        if(this.quantity !== 0 && this.quantity > 0 && this.quantity !== '') {
                            this.modalArray = {
                                fromAddress: this.fromAddress.value,
                                currency: this.tokenData.betaSymbol,
                                toAddress: this.tokenData.betaAddress,
                                amount: this.quantity,
                            };
                            this.$modal.show('allowancePopup');
                        } else {
                            this.approveError = '';
                            this.quantityError = "Quantity is required";
                        }
                    } else {
                        if(this.totalAmount !== 0 && this.totalAmount > 0 && this.totalAmount !== '') {
                            this.modalArray = {
                                fromAddress: this.fromAddress.value,
                                currency: this.tokenData.alphaSymbol,
                                toAddress: this.tokenData.alphaAddress,
                                amount: this.totalAmount,
                            };
                            this.$modal.show('allowancePopup');
                        } else {
                            this.approveError = '';
                            this.totalError = "Total Amount is required"
                        }
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
                switch(type) {
                    case 'buy':
                        this.btnActive = 'buy';
                        break;
                    case 'sell':
                        this.btnActive = 'sell';
                        break;
                }
            },
            OrderErc20( orderAddresses,  orderValues, matchOrderHashes) {

            },
            handlebuy() {
                console.log("handle buy")

                if(this.allowanceAmount !==0 && this.allowanceAmount >= this.totalAmount) {
                    clearInterval(this.intervalid1);
                }
                else {
                    this.approveError = "Approve Expex";
                }
                try {
                    // this.OrderErc20(this.orderAddresses, [0.0001, 0.0001], this.matchOrderHashes);
                }
                catch(err) {

                }

            },
            handlesell() {
                if(this.allowanceAmount !==0 && this.allowanceAmount >= this.quantity) {
                    clearInterval(this.intervalid2);
                }
            }
        }
    }
</script>

<style>

</style>
