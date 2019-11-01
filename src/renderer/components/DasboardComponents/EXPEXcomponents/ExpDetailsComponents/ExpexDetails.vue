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
                        <div class="keyvalue">
                            <div><p>PRICE:</p>{{marketStats.maxPrice? marketStats.maxPrice : 0 }}</div>
                            <div><p>VOL:</p> 0.08763</div>
                        </div>
                        <div class="keyvalue">
                            <div><p>OPEN:</p> {{marketStats.firstPrice? marketStats.firstPrice : 0 }}</div>
                            <div><p>HIGH:</p> {{marketStats.maxPrice? marketStats.maxPrice : 0 }}</div>
                        </div>
                        <div class="keyvalue">
                            <div><p>CLOSE:</p> {{marketStats.lastPrice? marketStats.lastPrice : 0 }}</div>
                            <div><p>LOW:</p> {{marketStats.minPrice? marketStats.minPrice : 0 }}</div>
                        </div>
                    </div>
                </div>
                <div id="thechart"></div>
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
                            <div v-if="buyTable.length > 0" v-for="data in buyTable" @click="handleRow((web3.utils.fromWei((data.amountBuy - data.amountBuyFilled).toString(), 'ether')), parseFloat(data.price).toFixed(4))" class="table-row">
                                <p>{{parseFloat(data.price).toFixed(4)}}</p>
                                <p>{{web3.utils.fromWei((data.amountBuy - data.amountBuyFilled).toString(), 'ether')}}</p>
                                <p class="Green">{{parseFloat((parseFloat(data.price).toFixed(4)) * (web3.utils.fromWei((data.amountBuy - data.amountBuyFilled).toString(), 'ether'))).toFixed(5)}}</p>
                            </div>
                            <div v-if="buyTable.length === 0" class="table-no-row">
                                <p class="row-10">No Buy Orders Found</p>
                            </div>
                        </div>
                        <div v-if="totalcount1 > 1">
                            <paginate
                                    :pageCount=totalcount1
                                    :clickHandler="clickCallback1"
                                    :prevText="'<<'"
                                    :nextText="'>>'"
                                    :initial-page=initialPage1
                                    :force-page=forcePage1
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
                                <p v-if="bidPriceError" class="error-message sendFundPassword-error ">{{bidPriceError}}</p>
                                <input type="number" @focus="handleFocus" placeholder="0.00000" v-model="bidPrice"/>
                                <p>{{tokenData.alphaSymbol}}</p>
                            </div>
                        </div>
                        <div class="balance-partition"></div>
                        <div class="details-div">
                            <p class="uppertxt">TOTAL</p>
                            <div class="lowertxt">
                                <p v-if="totalError" @focus="handleFocus" class="error-message sendFundPassword-error ">{{totalError}}</p>
                                <p>{{parseFloat(totalAmount).toFixed(6)}}</p>
                                <p>{{tokenData.alphaSymbol}}</p>
                            </div>
                        </div>
                        <div class="balance-partition"></div>
                        <div class="details-div">
                            <p v-if="approveError" class="error-message approveError ">{{approveError}}</p>
                            <i class="icon-plus-circled"></i>
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
                        <p v-if="btnActive==='buy'" @click="handleMaxBuy" class="buybluetxt">MAX BUY</p>
                        <p v-if="btnActive==='sell'" @click="handleMaxSell" class="buybluetxt">MAX SELL</p>
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
                            <div v-if="sellTable.length > 0"  v-for="data in sellTable" @click="handleRow((web3.utils.fromWei((data.amountSell - data.amountSellFilled).toString(), 'ether')),parseFloat(data.price).toFixed(4))" class="table-row">
                                <p class="Red">{{parseFloat((data.price) * (web3.utils.fromWei((data.amountSell - data.amountSellFilled).toString(), 'ether'))).toFixed(5)}}</p>
                                <!--<p>{{(data.amountSell - data.amountSellFilled)/Math.pow(10, data.decimalSell)}}</p>-->
                                <p>{{web3.utils.fromWei((data.amountSell - data.amountSellFilled).toString(), 'ether')}}</p>
                                <p>{{parseFloat(data.price).toFixed(4)}}</p>
                            </div>
                            <div v-if="sellTable.length === 0" class="table-no-row">
                                <p class="row-10">No Sell Orders Found</p>
                            </div>
                        </div>
                        <div v-if="totalcount2 > 1">
                            <paginate
                                    :pageCount=totalcount2
                                    :clickHandler="clickCallback2"
                                    :prevText="'<<'"
                                    :nextText="'>>'"
                                    :initial-page=initialPage2
                                    :force-page=forcePage2
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
                    <label>ORDER TYPE</label>
                    <label>PRICE</label>
                    <label>AMOUNT</label>
                    <label>TOTAL</label>
                </div>
                <div class="table-partition"></div>
                <div class="table-body">
                    <div v-for="mdata in marketHistoryTable" v-if="marketHistoryTable.length > 0" class="table-row">
                        <p>{{ parseInt(mdata.createdAt) * 1000 | moment("DD-MM-YYYY")}}</p>
                        <p v-if="mdata.marketType === 'BUY'" class="Green row-10">BUY</p>
                        <p v-else class="Red row-10">SELL</p>
                        <p>{{mdata.price}}</p>
                        <p v-if="mdata.marketType === 'BUY'">{{mdata.amountBuy}}</p>
                        <p v-else >{{mdata.amountSell}}</p>
                        <p v-if="mdata.marketType === 'BUY'">{{mdata.amountSell}}</p>
                        <p v-else >{{mdata.amountBuy}}</p>
                    </div>
                    <div v-if="marketHistoryTable.length === 0" class="table-no-row">
                        <p class="row-10">No Market History Found</p>
                    </div>
                </div>
                <div v-if="totalcount > 1">
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
    import { ipcRenderer } from 'electron';
    import {tokenInterface, expexABI,startConnectWeb, startConnectWebHttp,expexAddress} from '../../../../../main/libs/config';
    import AllowancePopup from './AllowancePopup/AllowancePopup';
    import {sqldb} from '../../../../../common/cronjobs';
    var Highcharts = require('highcharts/highstock');

    const web3 = startConnectWeb();
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
                this.offset1 = 0;
                this.offset2 = 0;
                this.initialPage1 = 0;
                this.initialPage2 = 0;
                this.forcePage1 = 0;
                this.forcePage2 = 0;
                this.expAmount = value.text.split('(')[1].split(' ')[0];
                this.tokenAmount = 0;
                this.wexpAmount = this.fromAddress.text.split('(')[2].split(' ')[0];
                let userData = this.accounts.find((val) => val.hash === this.fromAddress.value);
                let tokenBal = userData && userData.tokens && userData.token_icons.find((token) => token.token_symbol === this.tokenData.betaSymbol);
                if(tokenBal) {
                    this.tokenAmount = tokenBal.balance;
                }
                this.getBuyOrders();
                this.getSellOrders();
                this.getbuyCount();
                this.getsellCount();
                this.startAllowanceInterval();
            },
            allowanceAmount() {
                if(this.allowanceAmount > 0) {
                    this.approveError = '';
                }
            }
        },
        mounted() {
            this.tokenData = this.$router.history.current.query.data;
            var candleData = [];
            console.log(this.tokenData);

            let startDate = new Date("2019-10-20:00:00");
            let endDate = new Date();
            endDate.setDate(endDate.getDate() + 1);
            for(let i=0;i<20;i++) {
                let ts1 = Math.round(startDate / 1000);
                startDate.setDate(startDate.getDate() + 1);
                let ts2 = Math.round(startDate / 1000);
                let query = "SELECT MAX(price) as maxPrice,MIN(price) as minPrice,createdAt,(select price from Trade where createdAt BETWEEN '"+ts1+"' and '"+ts2+"' order by createdAt desc limit 1" +
                    ") as lastPrice,(select price from Trade where createdAt BETWEEN '"+ts1+"' and '"+ts2+"' order by createdAt asc limit 1" +
                    ") as firstPrice  FROM Trade where ((tokenBuy = '"+this.tokenData.alphaAddress+"' and tokenSell = '"+this.tokenData.betaAddress+"') or (tokenBuy = '"+this.tokenData.betaAddress+"' and tokenSell = '"+this.tokenData.alphaAddress+"')) and createdAt BETWEEN '"+ts1+"' and '"+ts2+"' ORDER BY createdAt desc"
                // console.log(this.tokenData, query);
                sqldb.each("SELECT SUM(amountBuy) as amountBuy,SUM(amountSell) as amountSell,MAX(price) as maxPrice,MIN(price) as minPrice,createdAt,(select price from Trade where createdAt BETWEEN '"+ts1+"' and '"+ts2+"' order by createdAt desc limit 1" +
                    ") as lastPrice,(select price from Trade where createdAt BETWEEN '"+ts1+"' and '"+ts2+"' order by createdAt asc limit 1" +
                    ") as firstPrice  FROM Trade where ((tokenBuy = '"+this.tokenData.alphaAddress+"' and tokenSell = '"+this.tokenData.betaAddress+"') or (tokenBuy = '"+this.tokenData.betaAddress+"' and tokenSell = '"+this.tokenData.alphaAddress+"')) and createdAt BETWEEN '"+ts1+"' and '"+ts2+"' ORDER BY createdAt desc", (err, row) => {
                    if(row && (row.createdAt && row.maxPrice)) {
                        let data = [parseInt(row.createdAt) * 1000, row.firstPrice,row.maxPrice, row.minPrice, row.lastPrice];
                        candleData.push(data);
                        this.chart = new Highcharts.stockChart(spec)
                        if(startDate.toLocaleDateString() == endDate.toLocaleDateString()) {
                            // console.log(row, "rowcheck");
                            this.marketStats = {
                                maxPrice: row.maxPrice,
                                minPrice: row.minPrice,
                                lastPrice: row.lastPrice,
                                firstPrice: row.firstPrice,
                                amountBuy: row.amountBuy,
                                amountSell: row.amountSell,
                            }
                        }
                    }
                });
                if(startDate.toLocaleDateString() == endDate.toLocaleDateString()) {
                    break;
                }
            }
            var spec = {
                chart: {
                    type: 'candlestick',
                    renderTo: 'thechart',
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                        stops: [
                            [0, '#2a2a2b'],
                            [1, '#3e3e40']
                        ]
                    },
                },
                subtitle: {
                    style: {
                        color: '#E0E0E3',
                        textTransform: 'uppercase'
                    }
                },
                xAxis: {
                    gridLineColor: '#707073',
                    labels: {
                        style: {
                            color: '#E0E0E3'
                        }
                    },
                    lineColor: '#707073',
                    minorGridLineColor: '#505053',
                    tickColor: '#707073',
                    title: {
                        style: {
                            color: '#A0A0A3'

                        }
                    }
                },
                yAxis: {
                    gridLineColor: '#707073',
                    labels: {
                        style: {
                            color: '#E0E0E3'
                        }
                    },
                    lineColor: '#707073',
                    minorGridLineColor: '#505053',
                    tickColor: '#707073',
                    tickWidth: 1,
                    title: {
                        style: {
                            color: '#A0A0A3'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    style: {
                        color: '#F0F0F0'
                    }
                },
                navigator: {
                    handles: {
                        backgroundColor: '#666',
                        borderColor: '#AAA'
                    },
                    outlineColor: '#CCC',
                    maskFill: 'rgba(255,255,255,0.1)',
                    series: {
                        color: '#000000',
                        lineColor: '#000000'
                    },
                    xAxis: {
                        gridLineColor: '#505053'
                    }
                },
                legend: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    itemStyle: {
                        color: '#E0E0E3'
                    },
                    itemHoverStyle: {
                        color: '#FFF'
                    },
                    itemHiddenStyle: {
                        color: '#606063'
                    },
                    title: {
                        style: {
                            color: '#C0C0C0'
                        }
                    }
                },
                credits: {
                    style: {
                        color: '#666'
                    }
                },
                labels: {
                    style: {
                        color: '#707073'
                    }
                },

                drilldown: {
                    activeAxisLabelStyle: {
                        color: '#F0F0F3'
                    },
                    activeDataLabelStyle: {
                        color: '#F0F0F3'
                    }
                },

                navigation: {
                    buttonOptions: {
                        symbolStroke: '#DDDDDD',
                        theme: {
                            fill: '#505053'
                        }
                    }
                },

                // scroll charts
                rangeSelector: {
                    buttonTheme: {
                        fill: '#505053',
                        stroke: '#000000',
                        style: {
                            color: '#CCC'
                        },
                        states: {
                            hover: {
                                fill: '#707073',
                                stroke: '#000000',
                                style: {
                                    color: 'white'
                                }
                            },
                            select: {
                                fill: '#000003',
                                stroke: '#000000',
                                style: {
                                    color: 'white'
                                }
                            }
                        }
                    },
                    inputBoxBorderColor: '#505053',
                    inputStyle: {
                        backgroundColor: '#333',
                        color: 'silver'
                    },
                    labelStyle: {
                        color: 'silver'
                    }
                },
                scrollbar: {
                    barBackgroundColor: '#808083',
                    barBorderColor: '#808083',
                    buttonArrowColor: '#CCC',
                    buttonBackgroundColor: '#606063',
                    buttonBorderColor: '#606063',
                    rifleColor: '#FFF',
                    trackBackgroundColor: '#404043',
                    trackBorderColor: '#404043'
                },
                series: [{
                    type: 'candlestick',
                    name: 'Trade Chart',
                    data: candleData,
                    color: '#85A200',
                    upColor: '#cb4d43',
                    dataGrouping: {
                        units: [
                            [
                                'week', // unit name
                                [1] // allowed multiples
                            ], [
                                'month',
                                [1, 2, 3, 4, 6]
                            ]
                        ]
                    },
                }]

            };

        },
        data() {
            return {
                web3,
                chart:undefined,
                initialPage: 1,
                initialPage1: 1,
                initialPage2: 1,
                forcePage: 1,
                forcePage1: 1,
                forcePage2: 1,
                offset: 0,
                offset1: 0,
                offset2: 0,
                totalcount: 0,
                totalcount1: 0,
                totalcount2: 0,
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
                limit: 5,
                limit1: 10,
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
                marketHistoryTable: [],
                buyselectData: "decimalSell , decimalBuy, price, sum(amountBuy) as amountBuy, sum(amountSell) as amountSell, sum(amountBuyFilled) as amountBuyFilled, sum(amountSellFilled) as amountSellFilled",
                mainquery: "",
                mainquery1: "",
                bidPriceError: "",
                marketStats: {
                    maxPrice: 0,
                    minPrice: 0,
                    lastPrice: 0,
                    firstPrice: 0,
                },
            };
        },
        computed: {
            accounts() {
                var accountsArray = this.$store.state.allAccounts;
                return accountsArray;
            },
            getOrders() {
                ipcRenderer.on('newTrade', (res) => {
                    if(res) {
                        this.getBuyOrders();
                        this.getSellOrders();
                        this.getbuyCount();
                        this.getsellCount();
                    }
                });
                ipcRenderer.on('newOrder', (event , res) => {
                    if(res) {
                        this.getBuyOrders();
                        this.getSellOrders();
                        this.getbuyCount();
                        this.getsellCount();
                    }
                });
                ipcRenderer.on('updateOrder', (event , res) => {
                    if(res) {
                        this.getBuyOrders();
                        this.getSellOrders();
                        this.getbuyCount();
                        this.getsellCount();
                    }
                });
            }
        },
        created(){
            this.tokenData = this.$router.history.current.query.data;
            this.mainquery = "marketType = ? and maker != ? and status = ? and  orderFilled  < ? and tokenBuy = ? and tokenSell = ? group by  price order by price asc LIMIT 10";
            this.mainquery1 = "marketType = ? and maker != ? and status = ? and orderFilled  < ? and tokenBuy = ? and tokenSell = ? group by  price order by price desc LIMIT 10";
            if(this.fromAddress) {
                // console.log(this.fromAddress.text.split('('), this.fromAddress.text.split('(')[2].split(' ')[0]);
                this.expAmount = this.fromAddress.text.split('(')[1].split(' ')[0];
                this.tokenAmount = 0;
                this.wexpAmount = this.fromAddress.text.split('(')[2].split(' ')[0];
                let userData = this.accounts.find((val) => val.hash === this.fromAddress.value);
                let tokenBal = userData && userData.tokens && userData.token_icons.find((token) => token.token_symbol === this.tokenData.betaSymbol);
                if(tokenBal) {
                    this.tokenAmount = tokenBal.balance;
                }
                this.startAllowanceInterval();
            } else {
                this.$modal.show('insufficentBal');
            }

            this.getBuyOrders();
            this.getSellOrders();
            let new_data = [this.tokenData.betaAddress, this.tokenData.alphaAddress, this.tokenData.alphaAddress, this.tokenData.betaAddress]
            let paramquery = "((tokenBuy = ? and tokenSell = ?) or (tokenBuy = ? and tokenSell = ?)) ORDER BY createdAt LIMIT "+this.limit+" OFFSET "+ this.offset +"";
            this.marketHistoryTable = [];
            sqldb.each("SELECT * FROM Trade where "+ paramquery,new_data, (err, row) => {
                // console.log(row, "rowsss");
                if(row) {
                    this.marketHistoryTable.push(row);
                }
            });
            this.getbuyCount();
            this.getsellCount();
            this.getHistoryCount();
        },
        destroyed() {
            clearInterval(this.intervalid1);
        },
        methods: {
            getBuyOrders() {
                this.buyTable = [];
                let new_data = ['BUY', this.fromAddress.value, 'OPEN', 100, this.tokenData.betaAddress, this.tokenData.alphaAddress];
                console.log(new_data, "new_data", this.mainquery);
                sqldb.each("SELECT "+this.buyselectData+" FROM Orders where "+this.mainquery+" OFFSET '"+this.offset1+"'",new_data, (err, row) => {
                    console.log(row, "rowsss");
                    if(row) {
                        this.buyTable.push(row);
                    }
                });
            },
            getSellOrders() {
                this.sellTable = [];
                let new_data = ['SELL', this.fromAddress.value, 'OPEN', 100, this.tokenData.alphaAddress, this.tokenData.betaAddress]
                sqldb.each("SELECT "+this.buyselectData+" FROM Orders where  "+this.mainquery1+" OFFSET '"+this.offset2+"'",new_data, (err, row) => {
                    // console.log(row, "rowsss");
                    if(row)
                    {
                        this.sellTable.push(row);
                    }
                });
            },
            getbuyCount() {
                let i =0 ;
                let new_data = ['BUY', this.fromAddress.value, 'OPEN', 100, this.tokenData.betaAddress, this.tokenData.alphaAddress]
                let mainqueryCount = "marketType = ? and maker != ? and status = ? and orderFilled  < ? and tokenBuy = ? and tokenSell = ? group by  price order by price asc";
                sqldb.each("SELECT COUNT(*) as count FROM Orders where "+mainqueryCount,new_data, (err, row) => {
                    if(row) {
                        i++;
                        this.totalcount1 = Math.ceil( i /  10);
                    }
                });
            },
            getsellCount() {
                let i =0 ;
                let new_data = ['SELL', this.fromAddress.value, 'OPEN', 100, this.tokenData.alphaAddress, this.tokenData.betaAddress]
                let mainqueryCount = "marketType = ? and maker != ? and status = ? and orderFilled  < ? and tokenBuy = ? and tokenSell = ? group by  price order by price desc";
                sqldb.each("SELECT COUNT(*) as count FROM Orders where  "+mainqueryCount,new_data, (err, row) => {
                    if(row) {
                        i++;
                        this.totalcount2 = Math.ceil( i /  10);
                    }
                });
            },
            getHistoryCount() {
                let new_data = [this.tokenData.betaAddress, this.tokenData.alphaAddress, this.tokenData.alphaAddress, this.tokenData.betaAddress]
                let mainqueryCount = "((tokenBuy = ? COLLATE NOCASE and tokenSell = ? COLLATE NOCASE) or (tokenBuy = ? COLLATE NOCASE and tokenSell = ? COLLATE NOCASE)) ORDER BY createdAt";
                sqldb.each("SELECT COUNT(*) as count FROM Trade where "+mainqueryCount,new_data,(err, row) => {
                    // console.log(row, "rowsss");
                    if(row) {
                        this.totalcount = Math.ceil( (row.count) /  5);
                    }
                });
            },
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
                // console.log(pageNum)
                this.marketHistoryTable = [];
                this.forcePage = pageNum;
                this.offset = (pageNum -1) * this.limit;
                pageNum = (pageNum -1) * this.limit ;
                sqldb.each("SELECT * FROM Trade where ((tokenBuy = '"+this.tokenData.betaAddress+"' COLLATE NOCASE and tokenSell = '"+this.tokenData.alphaAddress+"' COLLATE NOCASE) or (tokenBuy = '"+this.tokenData.alphaAddress+"' COLLATE NOCASE and tokenSell = '"+this.tokenData.betaAddress+"' COLLATE NOCASE)) ORDER BY createdAt LIMIT "+this.limit+" OFFSET "+ pageNum +"", (err, row) => {
                    // console.log(row, "rowsss");
                    if(row) {
                        this.marketHistoryTable.push(row);
                    }
                });
            },
            clickCallback1 (pageNum) {
                console.log(pageNum);
                this.forcePage1 = pageNum;
                this.offset1 = (pageNum -1) * this.limit1;
                pageNum = (pageNum -1) * this.limit1 ;
                this.buyTable = [];
                let new_data = ['BUY', this.fromAddress.value, 'OPEN', 100, this.tokenData.betaAddress, this.tokenData.alphaAddress]
                sqldb.each("SELECT "+this.buyselectData+" FROM Orders where "+this.mainquery+" OFFSET '"+pageNum+"'",new_data, (err, row) => {
                    // console.log(row, "rowsss");
                    if(row) {
                        this.buyTable.push(row);
                    }
                });
            },
            clickCallback2 (pageNum) {
                console.log(pageNum);
                this.forcePage2 = pageNum;
                this.offset2 = (pageNum -1) * this.limit1;
                pageNum = (pageNum -1) * this.limit1 ;
                this.sellTable = [];
                let new_data = ['SELL', this.fromAddress.value,'OPEN' , 100, this.tokenData.alphaAddress, this.tokenData.betaAddress]
                sqldb.each("SELECT "+this.buyselectData+" FROM Orders where  "+this.mainquery1+" OFFSET '"+pageNum+"'",new_data, (err, row) => {
                    // console.log(row, "rowsss");
                    if(row)
                    {
                        this.sellTable.push(row);
                    }
                });
            },
            handleRow(p1 = 0, p2 = 0, p3 = 0){
                this.quantity = p1;
                this.bidPrice = p2;
                this.totalAmount = p3;
            },
            handleMaxBuy() {
                this.quantity = this.wexpAmount;
                this.bidPrice = this.wexpAmount;
            },
            handleMaxSell() {
                this.quantity = this.tokenAmount;
                this.bidPrice = this.wexpAmount;
            },
            handleFocus() {
              this.quantityError = '';
              this.approveError = '';
              this.totalError = '';
              this.bidPriceError = '';
            },
            handleBuySell(type){
                this.quantityError = "";
                this.bidPriceError = "";
                this.totalError = "";
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
            getorderdata (tokenbuy, tokensell) {
                return new Promise(async (resolve, reject) => {
                    let i = 0;
                    let new_data = [100, this.fromAddress.value, this.bidPrice, tokenbuy, tokensell];
                    let paramquery = "orderfilled < ? and maker != ? and price = ? and tokenBuy = ? and tokenSell = ?";
                    await sqldb.get("SELECT orderHash FROM Orders where "+paramquery,new_data, (err, row) => {
                        if(err) {
                            reject(err);
                        }
                        if(!row) {
                            this.matchOrderHashes = ['0x0', '0x0', '0x0', '0x0', '0x0'];
                            resolve(this.matchOrderHashes);
                        }
                        if(row) {
                            this.matchOrderHashes[i] = row.orderHash;
                            i++;
                            resolve(this.matchOrderHashes);
                        }
                    });
                });
            },
            async handlebuy() {
                this.quantityError = "";
                this.bidPriceError = "";
                this.totalError = "";
                if(this.quantity >= 0.01 && this.totalAmount > 0 && this.bidPrice > 0) {
                    if(this.allowanceAmount !==0 && this.allowanceAmount >= this.totalAmount) {
                        var userData = this.accounts.find((val) => val.hash === this.fromAddress.value);
                        var tokenBal = userData && userData.tokens && userData.token_icons.find((token) => token.token_symbol === this.tokenData.alphaSymbol);
                        if((this.tokenData.alphaSymbol === 'WEXP' && (parseFloat(this.totalAmount) <= parseFloat(this.wexpAmount))) || (tokenBal && (parseFloat(this.totalAmount) <= parseFloat(tokenBal.balance)))) {
                            try {
                                await this.getorderdata(this.tokenData.alphaAddress, this.tokenData.betaAddress);
                                this.orderAddresses = [this.tokenData.betaAddress , this.tokenData.alphaAddress];
                                let amountData= [web3.utils.toWei(parseFloat(this.quantity).toFixed(6).toString(), 'ether'), web3.utils.toWei(parseFloat(this.totalAmount).toFixed(6).toString(), 'ether')]
                                this.modalArray = {
                                    type: "buyBtn",
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
                        } else {
                            this.totalError = "Seems You don't have sufficient Token Amount"
                        }
                    }
                    else {
                        this.approveError = "Approve Allowance";
                    }
                }
                else {
                    if(!this.quantity || this.quantity === 0) {
                        this.quantityError = "Quantity is required"
                    }
                    if(this.quantity && this.quantity < 0.01) {
                        this.quantityError = "Quantity greater than 0.01"
                    }
                    if(!this.totalAmount || this.totalAmount <= 0) {
                        this.totalError = "Total Amount is required"
                    }
                    if(!this.bidPrice || this.bidPrice <= 0) {
                        this.bidPriceError = "Bid Price is required"
                    }
                }
            },
            async handlesell() {
                this.quantityError = "";
                this.bidPriceError = "";
                this.totalError = "";
                var userData = this.accounts.find((val) => val.hash === this.fromAddress.value);
                var tokenBal = userData && userData.tokens && userData.token_icons.find((token) => token.token_symbol === this.tokenData.alphaSymbol);
                if(this.quantity >= 0.01 && this.totalAmount > 0 && this.bidPrice > 0) {
                    if(this.allowanceAmount !==0 && this.allowanceAmount >= this.totalAmount) {
                        if((this.tokenData.alphaSymbol === 'WEXP' && (parseFloat(this.quantity) <= parseFloat(this.wexpAmount))) || (tokenBal && (parseFloat(this.quantity) <= parseFloat(tokenBal.balance))))
                        {
                            try {
                                await this.getorderdata(this.tokenData.betaAddress, this.tokenData.alphaAddress);
                                this.orderAddresses = [this.tokenData.alphaAddress, this.tokenData.betaAddress];
                                let amountData= [web3.utils.toWei(this.totalAmount.toString(), 'ether'), web3.utils.toWei(this.quantity.toString(), 'ether')]
                                this.modalArray = {
                                    type: "sellBtn",
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
                        } else {
                            this.quantityError = "Seems You don't have sufficient Token Amount"
                        }
                    } else {
                        this.approveError = "Approve Allowance";
                    }
                } else {
                    if(!this.quantity || this.quantity === 0) {
                        this.quantityError = "Quantity is required"
                    }
                    if(this.quantity && this.quantity < 0.01) {
                        this.quantityError = "Quantity greater than 0.01"
                    }
                    if(!this.totalAmount || this.totalAmount <= 0) {
                        this.totalError = "Total Amount is required"
                    }
                    if(!this.bidPrice || this.bidPrice <= 0) {
                        this.bidPriceError = "Bid Price is required"
                    }
                }
            }
        }
    }
</script>

<style>

</style>
