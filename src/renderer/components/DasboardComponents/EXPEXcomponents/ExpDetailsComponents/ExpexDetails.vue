<template>
    <div class="content">
        <div class="expexDetails-Info">
            <div class="curve"></div>
            <div class="expexDetails-content">
                <div class="expexDetails-headings">
                    <h1>EXP-ETH1</h1>
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
                            <label>PRICE (EXP)</label>
                            <label>AMOUNT (WEXP)</label>
                            <label>TOTAL (EXP)</label>
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
                                <input type="number" placeholder="0.00000" v-model="quantity"/>
                                <p>WEXP</p>
                            </div>
                        </div>
                        <div class="balance-partition"></div>
                        <div class="details-div">
                            <p class="uppertxt Green">BID PRICE</p>
                            <div class="lowertxt">
                                <input type="number" placeholder="0.00000" v-model="bidPrice"/>
                                <p>EXP</p>
                            </div>
                        </div>
                        <div class="balance-partition"></div>
                        <div class="details-div">
                            <p class="uppertxt">TOTAL</p>
                            <div class="lowertxt">
                                <p>{{totalAmount}}</p>
                                <p>WEXP</p>
                            </div>
                        </div>
                        <div v-if="btnActive==='sell'" class="balance-partition"></div>
                        <div v-if="btnActive==='sell'" class="details-div">
                            <p @click="show" class="uppertxt">ALLOWANCE AMOUNT <span class="roundadd">+</span></p>
                            <div class="lowertxt">
                                <p>{{allowanceAmount}}</p>
                                <p>WEXP</p>
                            </div>
                        </div>
                        <div class="balance-partition"></div>
                        <div v-if="btnActive==='buy'" class="buy-btn">
                            <button>BUY EXP</button>
                        </div>
                        <div v-if="btnActive==='sell'" class="sell-btn">
                            <button>SELL EXP</button>
                        </div>
                        <div class="bal-text">
                            <p>AVAILABLE BALANCE</p>
                            <p>0.000000000 EXP</p>
                            <p>0.000000000 WEXP</p>
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
            <allowance-popup></allowance-popup>
        </modal>
    </div>
</template>

<script>
    import Paginate from 'vuejs-paginate'
    import AllowancePopup from './AllowancePopup/AllowancePopup'
    export default {
        name: 'ExpexDetails',
        components : {
            'paginate': Paginate,
            'allowance-popup': AllowancePopup,
        },
        watch: {
            // whenever question changes, this function will run
            quantity: function (newQuantity) {
                this.totalAmount = newQuantity*this.bidPrice;
            },
            bidPrice: function (newValue) {
                this.totalAmount = this.quantity*newValue;
            }
        },
        data() {
            return {
                initialPage: 1,
                forcePage: 1,
                totalcount: 100,
                quantity: 0.00000,
                bidPrice: 0.00000,
                totalAmount: 0.00000,
                btnActive: 'buy',
                allowanceAmount: 0,
            };
        },

        created(){
        },
        methods: {
            show () {
                this.$modal.show('allowancePopup');
            },
            hide () {
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
            handleBuySell(type){
                switch(type) {
                    case 'buy':
                        this.btnActive = 'buy';
                        break;
                    case 'sell':
                        this.btnActive = 'sell';
                        break;
                }
            }
        }
    }
</script>

<style>

</style>
