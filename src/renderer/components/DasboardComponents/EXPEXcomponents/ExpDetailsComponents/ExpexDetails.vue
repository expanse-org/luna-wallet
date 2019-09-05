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
                        <button class="deposit-btn"><img src="../../../../assets/img/Polygonwhite2.png"/> DEPOSIT</button>
                        <button class="withdraw-btn"><img src="../../../../assets/img/PolygonWhite3.png"/> WITHDRAW</button>
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
                            <label>SUM</label>
                            <label>TOTAL</label>
                            <label>SIZE</label>
                            <label>BID (EXP)</label>
                        </div>
                        <div class="table-partition"></div>
                        <div class="table-body">
                            <div class="table-row">
                                <p>0.00089</p>
                                <p>0.0000467</p>
                                <p>12.708</p>
                                <p>0.010000278</p>
                                <p class="Red">SELL</p>
                            </div>
                            <div class="table-row">
                                <p>0.00089</p>
                                <p>0.0000467</p>
                                <p>12.708</p>
                                <p>0.010000278</p>
                                <p class="Red">SELL</p>
                            </div>
                            <div class="table-row">
                                <p>0.00089</p>
                                <p>0.0000467</p>
                                <p>12.708</p>
                                <p>0.010000278</p>
                                <p class="Red">SELL</p>
                            </div>
                            <div class="table-row">
                                <p>0.00089</p>
                                <p>0.0000467</p>
                                <p>12.708</p>
                                <p>0.010000278</p>
                                <p class="Red">SELL</p>
                            </div>
                            <div class="table-row">
                                <p>0.00089</p>
                                <p>0.0000467</p>
                                <p>12.708</p>
                                <p>0.010000278</p>
                                <p class="Red">SELL</p>
                            </div>
                            <div class="table-row">
                                <p>0.00089</p>
                                <p>0.0000467</p>
                                <p>12.708</p>
                                <p>0.010000278</p>
                                <p class="Red">SELL</p>
                            </div>
                            <div class="table-row">
                                <p>0.00089</p>
                                <p>0.0000467</p>
                                <p>12.708</p>
                                <p>0.010000278</p>
                                <p class="Red">SELL</p>
                            </div>
                            <div class="table-row">
                                <p>0.00089</p>
                                <p>0.0000467</p>
                                <p>12.708</p>
                                <p>0.010000278</p>
                                <p class="Red">SELL</p>
                            </div>
                            <div class="table-row">
                                <p>0.00089</p>
                                <p>0.0000467</p>
                                <p>12.708</p>
                                <p>0.010000278</p>
                                <p class="Red">SELL</p>
                            </div>
                            <div class="table-row">
                                <p>0.00089</p>
                                <p>0.0000467</p>
                                <p>12.708</p>
                                <p>0.010000278</p>
                                <p class="Red">SELL</p>
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
                            <button class="buy-btn">BUY</button>
                            <button class="sell-btn">SELL</button>
                        </div>
                        <div class="details-div">
                            <p class="uppertxt">QUANTITY</p>
                            <div class="lowertxt">
                                <p>0.000000000</p>
                                <p>ETH1</p>
                            </div>
                        </div>
                        <div class="balance-partition"></div>
                        <div class="details-div">
                            <p class="uppertxt Green">BID PRICE</p>
                            <div class="lowertxt">
                                <p>0.000000000</p>
                                <p>EXP</p>
                            </div>
                        </div>
                        <div class="balance-partition"></div>
                        <div class="details-div">
                            <p class="uppertxt">TOTAL</p>
                            <div class="lowertxt">
                                <p>0.000000000</p>
                                <p>ETH1</p>
                            </div>
                        </div>
                        <div class="balance-partition"></div>
                        <div class="buy-btn">
                            <button>BUY ETH1</button>
                        </div>
                        <div class="bal-text">
                            <p>AVAILABLE BALANCE</p>
                            <p>0.000000000 EXP</p>
                            <p>0.000000000 ETH1</p>
                        </div>
                        <div class="balance-partition1"></div>
                        <p class="buybluetxt">MAX BUY</p>
                    </div>
                </div>
                <div class="left-side">
                    <div class="left-side-table">
                        <div class="table-head">
                            <label></label>
                            <label>ASK (EXP)</label>
                            <label>SIZE</label>
                            <label>TOTAL</label>
                            <label>SUM</label>
                        </div>
                        <div class="table-partition"></div>
                        <div class="table-body">
                            <div class="table-row">
                                <p class="Green">BUY</p>
                                <p>0.010000278</p>
                                <p>0.00089</p>
                                <p>0.0000467</p>
                                <p>12.708</p>
                            </div>
                            <div class="table-row">
                                <p class="Green">BUY</p>
                                <p>0.010000278</p>
                                <p>0.00089</p>
                                <p>0.0000467</p>
                                <p>12.708</p>
                            </div>
                            <div class="table-row">
                                <p class="Green">BUY</p>
                                <p>0.010000278</p>
                                <p>0.00089</p>
                                <p>0.0000467</p>
                                <p>12.708</p>
                            </div>
                            <div class="table-row">
                                <p class="Green">BUY</p>
                                <p>0.010000278</p>
                                <p>0.00089</p>
                                <p>0.0000467</p>
                                <p>12.708</p>
                            </div>
                            <div class="table-row">
                                <p class="Green">BUY</p>
                                <p>0.010000278</p>
                                <p>0.00089</p>
                                <p>0.0000467</p>
                                <p>12.708</p>
                            </div>
                            <div class="table-row">
                                <p class="Green">BUY</p>
                                <p>0.010000278</p>
                                <p>0.00089</p>
                                <p>0.0000467</p>
                                <p>12.708</p>
                            </div>
                            <div class="table-row">
                                <p class="Green">BUY</p>
                                <p>0.010000278</p>
                                <p>0.00089</p>
                                <p>0.0000467</p>
                                <p>12.708</p>
                            </div>
                            <div class="table-row">
                                <p class="Green">BUY</p>
                                <p>0.010000278</p>
                                <p>0.00089</p>
                                <p>0.0000467</p>
                                <p>12.708</p>
                            </div>
                            <div class="table-row">
                                <p class="Green">BUY</p>
                                <p>0.010000278</p>
                                <p>0.00089</p>
                                <p>0.0000467</p>
                                <p>12.708</p>
                            </div>
                            <div class="table-row">
                                <p class="Green">BUY</p>
                                <p>0.010000278</p>
                                <p>0.00089</p>
                                <p>0.0000467</p>
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
                    <label>SIDE</label>
                    <label>BID/ASK</label>
                    <label>TOTAL (ETH1)</label>
                    <label>TOTAL COST (EXP)</label>
                </div>
                <div class="table-partition"></div>
                <div class="table-body">
                    <div class="table-row">
                        <p>12/08/19</p>
                        <p>12:34:00</p>
                        <p class="Green">BUY</p>
                        <p>0.00089</p>
                        <p>0.0000467</p>
                        <p>0.000467</p>
                    </div>
                    <div class="table-row">
                        <p>12/08/19</p>
                        <p>12:34:00</p>
                        <p class="Red">SELL</p>
                        <p>0.00089</p>
                        <p>0.0000467</p>
                        <p>0.000467</p>
                    </div>
                    <div class="table-row">
                        <p>12/08/19</p>
                        <p>12:34:00</p>
                        <p class="Red">SELL</p>
                        <p>0.00089</p>
                        <p>0.0000467</p>
                        <p>0.000467</p>
                    </div>
                    <div class="table-row">
                        <p>12/08/19</p>
                        <p>12:34:00</p>
                        <p class="Green">BUY</p>
                        <p>0.00089</p>
                        <p>0.0000467</p>
                        <p>0.000467</p>
                    </div>
                    <div class="table-row">
                        <p>12/08/19</p>
                        <p>12:34:00</p>
                        <p class="Green">BUY</p>
                        <p>0.00089</p>
                        <p>0.0000467</p>
                        <p>0.000467</p>
                    </div>
                    <div class="table-row">
                        <p>12/08/19</p>
                        <p>12:34:00</p>
                        <p class="Green">BUY</p>
                        <p>0.00089</p>
                        <p>0.0000467</p>
                        <p>0.000467</p>
                    </div>
                    <div class="table-row">
                        <p>12/08/19</p>
                        <p>12:34:00</p>
                        <p class="Red">SELL</p>
                        <p>0.00089</p>
                        <p>0.0000467</p>
                        <p>0.000467</p>
                    </div>
                    <div class="table-row">
                        <p>12/08/19</p>
                        <p>12:34:00</p>
                        <p class="Red">SELL</p>
                        <p>0.00089</p>
                        <p>0.0000467</p>
                        <p>0.000467</p>
                    </div>
                    <div class="table-row">
                        <p>12/08/19</p>
                        <p>12:34:00</p>
                        <p class="Green">BUY</p>
                        <p>0.00089</p>
                        <p>0.0000467</p>
                        <p>0.000467</p>
                    </div>
                    <div class="table-row">
                        <p>12/08/19</p>
                        <p>12:34:00</p>
                        <p class="Green">BUY</p>
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
    </div>
</template>

<script>
    import Paginate from 'vuejs-paginate'
    export default {
        name: 'ExpexDetails',
        components : {
            'paginate': Paginate,
        },
        data() {
            return {
                initialPage: 1,
                forcePage: 1,
                totalcount: 100,
            };
        },
        created(){
        },
        methods: {
            clickCallback (pageNum) {
                console.log(pageNum)
            },
        }
    }
</script>

<style>

</style>
