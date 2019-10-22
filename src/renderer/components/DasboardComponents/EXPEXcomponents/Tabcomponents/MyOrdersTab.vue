<template>
    <div class="content">
        <div class="myorder-Info">
            <div class="curve"></div>
            <div class="myorder-content">
                <div class="myorder-headings">
                    <h1>Open Orders</h1>
                </div>
                <div class="myorder-select">
                    <multiselect  v-model="selected" placeholder="Select Buy/Sell" :searchable="false" :allow-empty="false"
                                  :show-labels="false" :options="['ALL','BUY','SELL']" class="filter-select">
                    </multiselect>
                </div>
                <div class="myorder-input1">
                    <span class="mtop-10">From:</span> <datetime type="date" placeholder="Start Date" v-model="fromDate" class="find-market" input-id="startDate"></datetime>
                </div>
                <div class="myorder-input1">
                    <span class="mtop-10">To:</span> <datetime type="date" placeholder="End Date" v-model="todate" class="find-market" input-id="startDate"></datetime>
                </div>
                <div class="myorder-input">
                    <input placeholder="Find..." v-model="hashSearch" type="text" class="find-market"/>
                </div>
            </div>
        </div>
        <div class="myorder-table">
            <div class="table-head">
                <label>MARKET PAIR</label>
                <label>DATE CREATED</label>
                <label>ORDER TYPE</label>
                <label>PRICE</label>
                <label>AMOUNT</label>
                <label>TOTAL</label>
                <label>FULFILLED(%)</label>
                <label>TX HASH</label>
                <label>ACTION</label>
            </div>
            <div class="table-partition"></div>
            <div class="table-body">
                <div v-if="openorderTable.length > 0"  class="table-row" v-for="(data, index) in openorderTable">
                    <p>{{(data.betaSymbol)}}-{{(data.alphaSymbol)}}</p>
                    <p>{{ parseInt(data.createdAt) * 1000 | moment("DD-MM-YYYY")}}</p>
                    <p v-if="data.marketType === 'BUY'" class="Green">{{data.marketType}}</p>
                    <p v-else class="Red">{{data.marketType}}</p>
                    <p>{{data.price}}</p>
                    <p v-if="data.marketType === 'BUY'">{{parseFloat(((data.amountBuy - data.amountBuyFilled)/Math.pow(10, data.decimalBuy))).toFixed(4)}}</p>
                    <p v-else >{{parseFloat(((data.amountSell - data.amountSellFilled)/Math.pow(10, data.decimalSell))).toFixed(4)}}</p>
                    <p v-if="data.marketType === 'BUY'">{{parseFloat((data.price) * ((data.amountBuy - data.amountBuyFilled)/Math.pow(10, data.decimalBuy))).toFixed(4)}}</p>
                    <p v-else >{{parseFloat((data.price) * ((data.amountSell - data.amountSellFilled)/Math.pow(10, data.decimalSell))).toFixed(4)}}</p>
                    <p>{{data.orderFilled}}%</p>
                    <p @click="openGanderUrl('https://gander.tech/tx/'+data.orderHash)" class="fix-text tooltip">
                        {{data.orderHash}}
                        <span class="tooltiptext parrentFont">{{data.orderHash}}</span>
                    </p>
                    <div @click="handletooltip(data.orderHash, index)" class="tooltip3 copytext">
                        <img src="../../../../assets/img/copy.svg"  />
                        <span v-if="copiedtip === index" class="tooltiptext2">Copied</span>
                    </div>
                    <p>Cancel</p>
                </div>
                <div v-if="openorderTable.length === 0" class="table-no-row">
                    <p class="row-10">No Open Orders Found</p>
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

        <div class="myorder-Info">
            <div class="curve"></div>
            <div class="myorder-content">
                <div class="myorder-headings">
                    <h1>Order History</h1>
                </div>
                <div class="myorder-select">
                    <multiselect  v-model="selected1" placeholder="Select Buy/Sell" :searchable="false" :allow-empty="false"
                                  :show-labels="false" :options="['ALL','BUY','SELL']" class="filter-select">
                    </multiselect>
                </div>
                <div class="myorder-input1">
                    <span class="mtop-10">From:</span> <datetime type="date" placeholder="Start Date" v-model="fromDate1" class="find-market" input-id="startDate"></datetime>
                </div>
                <div class="myorder-input1">
                    <span class="mtop-10">To:</span> <datetime type="date" placeholder="End Date" v-model="todate1" class="find-market" input-id="startDate"></datetime>
                </div>
                <div class="myorder-input">
                    <input placeholder="Find by Tx hash" v-model="hashSearch1" type="text" class="find-market"/>
                </div>
            </div>
        </div>
        <div class="myorder-table myorder-table1">
            <div class="table-head">
                <label>MARKET PAIR</label>
                <label>DATE CREATED</label>
                <label>ORDER TYPE</label>
                <label>PRICE</label>
                <label>AMOUNT</label>
                <label>TOTAL</label>
                <label>FULFILLED(%)</label>
                <label>TX HASH</label>
            </div>
            <div class="table-partition"></div>
            <div class="table-body">
                <div v-if="orderHistory.length > 0"  class="table-row" v-for="(order, index) in orderHistory">
                    <p>{{(order.betaSymbol)}}-{{(order.alphaSymbol)}}</p>
                    <p>{{ parseInt(order.createdAt) * 1000 | moment("DD-MM-YYYY")}}</p>
                    <p v-if="order.marketType === 'BUY'" class="Green">{{order.marketType}}</p>
                    <p v-else class="Red">{{order.marketType}}</p>
                    <p>{{order.price}}</p>
                    <p v-if="order.marketType === 'BUY'">{{parseFloat(((order.amountBuy - order.amountBuyFilled)/Math.pow(10, order.decimalBuy))).toFixed(4)}}</p>
                    <p v-else >{{parseFloat(((order.amountSell - order.amountSellFilled)/Math.pow(10, order.decimalSell))).toFixed(4)}}</p>
                    <p v-if="order.marketType === 'BUY'">{{parseFloat((order.price) * ((order.amountBuy - order.amountBuyFilled)/Math.pow(10, order.decimalBuy))).toFixed(4)}}</p>
                    <p v-else >{{parseFloat((order.price) * ((order.amountSell - order.amountSellFilled)/Math.pow(10, order.decimalSell))).toFixed(4)}}</p>
                    <p>{{order.orderFilled}}%</p>
                    <p @click="openGanderUrl('https://gander.tech/tx/'+order.orderHash)" class="fix-text tooltip">
                        {{order.orderHash}}
                        <span class="tooltiptext parrentFont">{{order.orderHash}}</span>
                    </p>
                    <div @click="handletooltip1(order.orderHash, index)" class="tooltip3 copytext">
                        <img src="../../../../assets/img/copy.svg"  />
                        <span v-if="copiedtip1 === index" class="tooltiptext2">Copied</span>
                    </div>
                </div>
                <div v-if="orderHistory.length === 0" class="table-no-row">
                    <p class="row-10">No Orders History Found</p>
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
</template>

<script>
    import Paginate from 'vuejs-paginate'
    import os from 'os';
    import  * as child_process from 'child_process';
    import Multiselect from 'vue-multiselect'
    import {db} from '../../../../../../lowdbFunc';
    import {sqldb} from '../../../../../common/cronjobs';
    import { clipboard } from 'electron';
    import { Datetime } from 'vue-datetime';
    import {web3} from '../../../../../main/libs/config';

    export default {
        name: 'MyOrders',
        components : {
            'paginate': Paginate,
            'multiselect': Multiselect,
            'datetime': Datetime
        },
        props: ['fromAddress'],
        data() {
            return {
                initialPage: 1,
                forcePage: 1,
                initialPage1: 1,
                forcePage1: 1,
                totalcount: 0,
                totalcount1: 0,
                selected: 'ALL',
                selected1: 'ALL',
                openorderTable: [],
                orderHistory: [],
                todate: '12/01/2019',
                fromDate: '',
                todate1: '',
                fromDate1: '',
                copiedtip: -1,
                copiedtip1: -1,
                row_count: 5,
                offset: 0,
                row_count1: 5,
                offset1: 0,
                hashSearch: '',
                hashSearch1: '',
                web3,
                hashQuery: '',
                todateQuery: '',
                fromDateQuery: '',
                selectQuery: '',
                mainQuery: '',
                hashQuery1: '',
                todateQuery1: '',
                fromDateQuery1: '',
                selectQuery1: '',
                mainQuery1: '',
            };
        },
        watch: {
            fromDate() {
                this.offset = 0;
                this.forcePage = 1;
                this.openorderTable = [];
                if(this.todate && this.fromDate) {
                    this.fromDateQuery = "createdAt BETWEEN '"+this.fromDate.split('T')[0]+"' AND '"+this.todate.split('T')[0]+"' and";
                } else {
                    if(this.fromDate ) {
                        this.fromDateQuery = "createdAt = '"+ this.fromDate.split('T')[0] +"' and";
                    }
                }
                if(this.todate || this.fromDate) {
                    sqldb.each("SELECT * FROM  Orders where "+ this.hashQuery +" "+ this.selectQuery +" "+ this.todateQuery +" "+ this.fromDateQuery +" "+ this.mainQuery + " OFFSET "+ this.offset +"", (err, row) => {
                        if(row) {
                            this.openorderTable.push(row);
                        }
                    });
                }
                this.getopenorderCount(this.hashSearch , this.selectQuery , this.todateQuery, this.fromDateQuery,this.mainQuery , this.offset);
            },
            todate() {
                this.offset = 0;
                this.forcePage = 1;
                this.openorderTable = [];
                if(this.todate && this.fromDate) {
                    this.todateQuery = "createdAt BETWEEN '"+this.fromDate.split('T')[0]+"' AND '"+this.todate.split('T')[0]+"' and";
                } else {
                    if(this.todate ) {
                        this.todateQuery = "createdAt = '"+ this.todate.split('T')[0] +"' and";
                    }
                }
                if(this.todate || this.fromDate) {
                    sqldb.each("SELECT * FROM  Orders where "+ this.hashQuery +" "+ this.selectQuery +" "+ this.todateQuery +" "+ this.fromDateQuery +" "+ this.mainQuery + " OFFSET "+ this.offset +"", (err, row) => {
                        if(row) {
                            this.openorderTable.push(row);
                        }
                    });
                }
                this.getopenorderCount(this.hashSearch , this.selectQuery , this.todateQuery, this.fromDateQuery,this.mainQuery , this.offset);
            },
            hashSearch(data) {
                this.offset = 0;
                this.forcePage = 1;
                this.openorderTable = [];
                if(data) {
                    this.hashQuery = "orderHash = '"+data+"' COLLATE NOCASE and";
                    sqldb.each("SELECT * FROM  Orders where "+ this.hashQuery +" "+ this.selectQuery +" "+ this.todateQuery +" "+ this.fromDateQuery +" "+ this.mainQuery + " OFFSET "+ this.offset +"", (err, row) => {
                        if(row) {
                            this.openorderTable.push(row);
                        }
                    });
                } else if(!this.hashSearch) {
                    this.hashQuery = "";
                    this.getopenOrders();
                }
                this.getopenorderCount(this.hashQuery , this.selectQuery , this.todateQuery, this.fromDateQuery,this.mainQuery , this.offset);
            },
            selected(data) {
                this.offset = 0;
                this.forcePage = 1;
                this.openorderTable = [];
                if(data === 'BUY' || data === 'SELL' ) {
                    this.selectQuery = "marketType = '"+data+"' COLLATE NOCASE and";
                    sqldb.each("SELECT * FROM  Orders where "+ this.hashQuery +" "+ this.selectQuery +" "+ this.todateQuery +" "+ this.fromDateQuery +" "+ this.mainQuery + " OFFSET "+ this.offset +"", (err, row) => {
                        if(row) {
                            this.openorderTable.push(row);
                        }
                    });
                } else if(this.selected === 'ALL') {
                    this.selectQuery = "";
                    this.getopenOrders();
                }
                this.getopenorderCount(this.hashSearch , this.selectQuery , this.todateQuery, this.fromDateQuery,this.mainQuery , this.offset);
            },
            fromDate1() {
                this.offset1 = 0;
                this.forcePage1 = 1;
                this.orderHistory = [];
                if(this.todate1 && this.fromDate1) {
                    this.fromDateQuery1 = "createdAt BETWEEN '"+this.fromDate1.split('T')[0]+"' AND '"+this.todate1.split('T')[0]+"' and";
                } else {
                    if(this.fromDate1 ) {
                        this.fromDateQuery1 = "createdAt = '"+ this.fromDate1.split('T')[0] +"' and";
                    }
                }
                if(this.todate1 || this.fromDate1) {
                    sqldb.each("SELECT * FROM  Orders where "+ this.todateQuery1 +" "+ this.fromDateQuery1 +" "+ this.mainQuery1 + " OFFSET "+ this.offset1 +"", (err, row) => {
                        if(row) {
                            this.orderHistory.push(row);
                        }
                    });
                }
                this.getorderCount(this.hashSearch1 , this.selectQuery1 , this.todateQuery1, this.fromDateQuery1 ,this.mainQuery1 , this.offset1);
            },
            todate1() {
                this.offset1 = 0;
                this.forcePage1 = 1;
                this.orderHistory = [];
                if(this.todate1 && this.fromDate1) {
                    this.todateQuery1 = "createdAt BETWEEN '"+this.fromDate1.split('T')[0]+"' AND '"+this.todate1.split('T')[0]+"' and";
                } else {
                    if(this.todate1 ) {
                        this.todateQuery1 = "createdAt = '"+ this.todate.split('T')[0] +"' and";
                    }
                }
                if(this.todate1 || this.fromDate1) {
                    sqldb.each("SELECT * FROM  Orders where "+ this.todateQuery1 +" "+ this.fromDateQuery1 +" "+ this.mainQuery1 + " OFFSET "+ this.offset1 +"", (err, row) => {
                        if(row) {
                            this.orderHistory.push(row);
                        }
                    });
                }
                this.getorderCount(this.hashSearch1 , this.selectQuery1 , this.todateQuery1, this.fromDateQuery1 ,this.mainQuery1 , this.offset1);
            },
            hashSearch1(data) {
                this.offset1 = 0;
                this.forcePage1 = 1;
                this.orderHistory = [];
                if(data) {
                    this.hashQuery1 = "orderHash = '"+data+"' COLLATE NOCASE and";
                    sqldb.each("SELECT  * FROM  Orders where "+ this.hashQuery1 +" "+ this.selectQuery1 +" "+ this.todateQuery1 +" "+ this.fromDateQuery1 +" "+ this.mainQuery1 + " OFFSET "+ this.offset1 +"", (err, row) => {
                        if(row) {
                            this.orderHistory.push(row);
                        }
                    });
                } else {
                    this.hashQuery1 = "";
                    this.getorderHistory();
                }
                this.getorderCount(this.hashSearch1 , this.selectQuery1 , this.todateQuery1, this.fromDateQuery1 ,this.mainQuery1 , this.offset1);
            },
            selected1(data) {
                this.offset1 = 0;
                this.forcePage1 = 1;
                this.orderHistory = [];
                if(data === 'BUY' || data === 'SELL' ) {
                    this.selectQuery1 = "marketType = '"+data+"' COLLATE NOCASE and";
                    sqldb.each("SELECT  * FROM  Orders where "+ this.hashQuery1 +" "+ this.selectQuery1 +" "+ this.todateQuery1 +" "+ this.fromDateQuery1 +" "+ this.mainQuery1 + " OFFSET "+ this.offset1 +"", (err, row) => {
                        if(row) {
                            this.orderHistory.push(row);
                        }
                    });
                } else {
                    this.selectQuery1 = "";
                    this.getorderHistory();
                }
                this.getorderCount(this.hashSearch1 , this.selectQuery1 , this.todateQuery1, this.fromDateQuery1 ,this.mainQuery1 , this.offset1);
            },
            fromAddress: function (value) {
                this.openorderTable=[];
                this.orderHistory=[];
                this.offset = 0;
                this.forcePage = 1;
                this.offset1 = 0;
                this.forcePage1 = 1;
                this.mainQuery = " maker = '"+ value.value+"' COLLATE NOCASE and orderFilled < 100 ORDER BY createdAt desc LIMIT "+ this.row_count +"";
                this.mainQuery1 = " maker = '"+ value.value+"' COLLATE NOCASE and orderFilled = 100 ORDER BY createdAt desc LIMIT "+ this.row_count1 +"";
                this.getopenOrders();
                this.getorderHistory();
                this.getopenorderCount(this.hashSearch , this.selectQuery , this.todateQuery, this.fromDateQuery,this.mainQuery , this.offset);
                this.getorderCount(this.hashSearch1 , this.selectQuery1 , this.todateQuery1, this.fromDateQuery1 ,this.mainQuery1 , this.offset1);
            },
        },
        computed: {
            AddTokenData() {
                let tokensdata = db.get('tokens').value();
                return tokensdata;
            },

        },
        created(){
            this.mainQuery = " maker = '"+ this.fromAddress.value+"' COLLATE NOCASE and orderFilled < 100 ORDER BY createdAt desc LIMIT "+ this.row_count +"";
            this.mainQuery1 = " maker = '"+ this.fromAddress.value+"' COLLATE NOCASE and orderFilled = 100 ORDER BY createdAt desc LIMIT "+ this.row_count1 +"";
            this.getopenOrders();
            this.getopenorderCount('' , '' , '', '',this.mainQuery , this.offset);
            this.getorderHistory();
            this.getorderCount();
        },
        methods: {
            getopenOrders() {
                this.openorderTable=[];
                sqldb.each("SELECT * FROM  Orders where "+ this.hashQuery +" "+ this.selectQuery +" "+ this.todateQuery +" "+ this.fromDateQuery +" "+ this.mainQuery + " OFFSET "+ this.offset +"", (err, row) => {
                    if(row) {
                        this.openorderTable.push(row);
                    }
                });
                this.getopenorderCount(this.hashSearch , this.selectQuery , this.todateQuery, this.fromDateQuery,this.mainQuery , this.offset);
            },
            getorderHistory() {
                this.orderHistory=[];
                sqldb.each("SELECT  * FROM  Orders where "+ this.hashQuery1 +" "+ this.selectQuery1 +" "+ this.todateQuery1 +" "+ this.fromDateQuery1 +" "+ this.mainQuery1 + " OFFSET "+  this.offset1  +"", (err, row) => {
                    if(row) {
                        this.orderHistory.push(row);
                    }
                });
                this.getorderCount(this.hashSearch1 , this.selectQuery1 , this.todateQuery1, this.fromDateQuery1 ,this.mainQuery1 , this.offset1);
            },
            getopenorderCount(hashQuery = '',selectQuery = '',todateQuery = '',fromDateQuery = '',mainQuery = '',offset = 0){
                sqldb.each("SELECT COUNT(*) as count FROM  Orders where "+ hashQuery +" "+ selectQuery +" "+ todateQuery +" "+ fromDateQuery +" "+ mainQuery + " OFFSET "+ offset +"", (err, row) => {
                    if(row) {
                        this.totalcount = Math.ceil((row.count) / this.row_count);
                    }
                });
            },
            getorderCount(hashQuery1 = '',selectQuery1 = '',todateQuery1 = '',fromDateQuery1 = '',mainQuery1 = '',offset1 = 0){
                sqldb.each("SELECT COUNT(*) as count FROM  Orders where "+ hashQuery1 +" "+ selectQuery1 +" "+ todateQuery1 +" "+ fromDateQuery1 +" "+ mainQuery1 + " OFFSET "+ offset1 +"", (err, row) => {
                    if(row) {
                        this.totalcount1 = Math.ceil((row.count) / this.row_count1);
                    }
                });
            },
            clickCallback (pageNum) {
                this.forcePage = pageNum;
                this.offset = (pageNum -1) * this.row_count;
                this.openorderTable=[];
                if(this.todate && this.fromDate) {
                    this.fromDateQuery = "createdAt BETWEEN '"+this.fromDate.split('T')[0]+"' AND '"+this.todate.split('T')[0]+"' and";
                } else {
                    if(this.todate ) {
                        this.todateQuery = "createdAt = '"+ this.todate.split('T')[0] +"' and";
                    }
                    if(this.fromDate ) {
                        this.fromDateQuery = "createdAt = '"+ this.fromDate.split('T')[0] +"' and";
                    }
                }
                if(this.hashSearch ) {
                    this.hashQuery = "orderHash = '"+this.hashSearch+"' COLLATE NOCASE and";
                }
                if(this.selected !== "ALL" ) {
                    this.selectQuery = "marketType = '"+this.selected+"' COLLATE NOCASE and";
                }
                pageNum = (pageNum -1) * this.row_count ;
                sqldb.each("SELECT * FROM  Orders where "+ this.hashQuery +" "+ this.selectQuery +" "+ this.todateQuery +" "+ this.fromDateQuery +" "+ this.mainQuery + " OFFSET "+ pageNum +"", (err, row) => {
                    if(row) {
                        this.openorderTable.push(row);
                    }
                });
                this.getopenorderCount(this.hashSearch , this.selectQuery , this.todateQuery, this.fromDateQuery,this.mainQuery , this.offset);
            },
            clickCallback1 (pageNum) {
                this.forcePage1 = pageNum;
                this.offset1 = (pageNum -1) * this.row_count1;
                this.orderHistory=[];
                if(this.todate1 && this.fromDate1) {
                    this.fromDateQuery1 = "createdAt BETWEEN '"+this.fromDate1.split('T')[0]+"' AND '"+this.todate1.split('T')[0]+"' and";
                } else {
                    if(this.todate1 ) {
                        this.todateQuery1 = "createdAt = '"+ this.todate1.split('T')[0] +"' and";
                    }
                    if(this.fromDate1 ) {
                        this.fromDateQuery1 = "createdAt = '"+ this.fromDate1.split('T')[0] +"' and";
                    }
                }
                if(this.hashSearch1 ) {
                    this.hashQuery1 = "orderHash = '"+this.hashSearch1+"' COLLATE NOCASE and";
                }
                if(this.selected1 !== "ALL" ) {
                    this.selectQuery1 = "marketType = '"+this.selected1+"' COLLATE NOCASE and";
                }
                pageNum = (pageNum -1) * this.row_count1 ;
                // console.log("SELECT * FROM  Orders where "+ this.selectQuery1 +" "+ this.todateQuery1 +" "+ this.fromDateQuery1 +" "+ this.mainQuery1 + " OFFSET "+ pageNum +"");
                sqldb.each("SELECT  * FROM  Orders where "+ this.hashQuery1 +" "+ this.selectQuery1 +" "+ this.todateQuery1 +" "+ this.fromDateQuery1 +" "+ this.mainQuery1 + " OFFSET "+ pageNum +"", (err, row) => {
                    if(row) {
                        this.orderHistory.push(row);
                    }
                });
                this.getopenorderCount();
            },
            openGanderUrl(url){
                if(os.type() == 'Windows_NT') {
                    child_process.execSync('start '+url)
                }
                if(os.type() == 'Linux') {
                    child_process.execSync('xdg-open '+url)
                }
                if(os.type() == 'Darwin') {
                    child_process.execSync('open '+url)
                }
            },
            handletooltip(text, index){
                var copyText = text;
                if (copyText) {
                    clipboard.writeText(copyText, 'selected');
                }
                this.copiedtip = index;
                setTimeout(() => {
                    this.copiedtip = -1;
                },2000);

            },
            handletooltip1(text, index){
                var copyText = text;
                if (copyText) {
                    clipboard.writeText(copyText, 'selected');
                }
                this.copiedtip1 = index;
                setTimeout(() => {
                    this.copiedtip1 = -1;
                },2000);

            },
        }
    }
</script>

<style>
</style>
