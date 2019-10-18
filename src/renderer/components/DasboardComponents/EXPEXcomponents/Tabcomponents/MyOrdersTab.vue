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
                <label>TOTAL</label>
                <label>FULFILLED(%)</label>
                <label>TX HASH</label>
                <label>ACTION</label>
            </div>
            <div class="table-partition"></div>
            <div class="table-body">
                <div v-if="openorderTable.length > 0"  class="table-row" v-for="(data, index) in openorderTable">
                    <p>{{(data.betaSymbol)}}-{{(data.alphaSymbol)}}</p>
                    <p>{{data.createdAt}}</p>
                    <p v-if="data.marketType === 'BUY'" class="Green">{{data.marketType}}</p>
                    <p v-else class="Red">{{data.marketType}}</p>
                    <p>{{parseFloat(data.price).toFixed(4)}}</p>
                    <p v-if="data.marketType === 'BUY'">{{parseFloat((data.price) * ((data.amountBuy - data.amountBuyFilled)/Math.pow(10, data.decimalBuy))).toFixed(4)}}</p>
                    <p v-else >{{parseFloat((data.price) * ((data.amountSell - data.amountSellFilled)/Math.pow(10, data.decimalSell))).toFixed(4)}}</p>
                    <p>{{data.orderFilled}}%</p>
                    <p @click="openGanderUrl('https://gander.tech/tx/{{data.orderHash}}')" class="fix-text tooltip">
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
                <label>TOTAL</label>
                <label>FULFILLED(%)</label>
                <label>TX HASH</label>
            </div>
            <div class="table-partition"></div>
            <div class="table-body">
                <div v-if="orderHistory.length > 0"  class="table-row" v-for="(order, index) in orderHistory">
                    <p>{{(order.betaSymbol)}}-{{(order.alphaSymbol)}}</p>
                    <p>{{order.createdAt}}</p>
                    <p v-if="order.marketType === 'BUY'" class="Green">{{order.marketType}}</p>
                    <p v-else class="Red">{{order.marketType}}</p>
                    <p>{{parseFloat(order.price).toFixed(4)}}</p>
                    <p v-if="order.marketType === 'BUY'">{{parseFloat((order.price) * ((order.amountBuy - order.amountBuyFilled)/Math.pow(10, order.decimalBuy))).toFixed(4)}}</p>
                    <p v-else >{{parseFloat((order.price) * ((order.amountSell - order.amountSellFilled)/Math.pow(10, order.decimalSell))).toFixed(4)}}</p>
                    <p>{{order.orderFilled}}%</p>
                    <p @click="openGanderUrl('https://gander.tech/tx/{{order.orderHash}}')" class="fix-text tooltip">
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
                    sqldb.each("SELECT * FROM  Orders where "+ this.todateQuery +" "+ this.fromDateQuery +" "+ this.mainQuery + " OFFSET "+ this.offset +"", (err, row) => {
                        if(row) {
                            this.openorderTable.push(row);
                        }
                    });
                }
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
                    sqldb.each("SELECT * FROM  Orders where "+ this.todateQuery +" "+ this.fromDateQuery +" "+ this.mainQuery + " OFFSET "+ this.offset +"", (err, row) => {
                        if(row) {
                            this.openorderTable.push(row);
                        }
                    });
                }
            },
            hashSearch(data) {
                this.offset = 0;
                this.forcePage = 1;
                this.openorderTable = [];
                if(data) {
                    sqldb.each("SELECT * FROM Orders where orderHash = '"+data+"' COLLATE NOCASE and "+ this.mainQuery +" OFFSET "+ this.offset +"", (err, row) => {
                        if(row) {
                            this.openorderTable.push(row);
                        }
                    });
                } else if(!this.hashSearch) {
                    this.getopenOrders();
                }
            },
            selected(data) {
                this.offset = 0;
                this.forcePage = 1;
                this.openorderTable = [];
                if(data === 'BUY' || data === 'SELL' ) {
                    // console.log("SELECT * FROM Orders where marketType = '"+data+"' COLLATE NOCASE and "+ this.mainQuery +" OFFSET "+ this.offset);
                    sqldb.each("SELECT * FROM Orders where marketType = '"+data+"' COLLATE NOCASE and "+ this.mainQuery +" OFFSET "+ this.offset +"", (err, row) => {
                        if(row) {
                            this.openorderTable.push(row);
                        }
                    });
                } else if(this.selected === 'ALL') {
                    this.getopenOrders();
                }
            },
            hashSearch1(data) {
                this.offset = 0;
                this.forcePage = 1;
                this.orderHistory = [];
                if(data) {
                    sqldb.each("SELECT * FROM Orders where maker = '"+this.fromAddress.value+"' COLLATE NOCASE and orderFilled = 100 and orderHash = '"+data+"' COLLATE NOCASE ORDER BY 1 LIMIT "+ this.row_count1 +" OFFSET "+ this.offset1 +"", (err, row) => {
                        if(row) {
                            this.orderHistory.push(row);
                        }
                    });
                } else {
                    this.getorderHistory();
                }
            },
            selected1(data) {
                this.offset = 0;
                this.forcePage = 1;
                this.orderHistory = [];
                if(data === 'BUY' || data === 'SELL' ) {
                    sqldb.each("SELECT * FROM Orders where maker = '"+this.fromAddress.value+"' COLLATE NOCASE and orderFilled = 100 and marketType = '"+data+"' COLLATE NOCASE ORDER BY 1 LIMIT "+ this.row_count1 +" OFFSET "+ this.offset1 +"", (err, row) => {
                        if(row) {
                            this.orderHistory.push(row);
                        }
                    });
                } else {
                    this.getorderHistory();
                }
            },
            fromAddress: function (value) {
                this.openorderTable=[];
                this.orderHistory=[];
                this.offset = 0;
                this.forcePage = 1;
                sqldb.each("SELECT * FROM  Orders where maker = '"+ value.value+"' COLLATE NOCASE and orderFilled < 100 ORDER BY 1 LIMIT "+ this.row_count +" OFFSET "+ this.offset +"", (err, row) => {
                    if(row) {
                        this.openorderTable.push(row);
                    }
                });
                sqldb.each("SELECT * FROM Orders where maker = '"+value.value+"' COLLATE NOCASE and orderFilled  = 100 ORDER BY 1 LIMIT "+ this.row_count1 +" OFFSET "+ this.offset1 +"", (err, row) => {
                    if(row) {
                        this.orderHistory.push(row);
                    }
                });
            },
            openorderTable() {
                if(this.hashSearch || this.todate || this.fromDate || this.selected !== 'ALL') {
                    sqldb.each("SELECT COUNT(*) FROM  Orders where "+ this.hashQuery +" "+ this.selectQuery +" "+ this.todateQuery +" "+ this.fromDateQuery +" maker = "+ this.fromAddress.value+"' COLLATE NOCASE and orderFilled < 100 ", (err, row) => {
                        if(row) {
                            this.totalcount = Math.ceil( (row['COUNT(*)'] + 1) /  5);
                        }
                    });
                }
            },
            orderHistory() {
                if(this.hashSearch1 || this.todate1 || this.fromDate1 || this.selected1 !== 'ALL') {
                    this.totalcount1 = Math.ceil( (this.orderHistory.length + 1) /  5);
                }
            },
        },
        computed: {
            AddTokenData() {
                let tokensdata = db.get('tokens').value();
                return tokensdata;
            },

        },
        created(){
            this.mainQuery = " maker = '"+ this.fromAddress.value+"' COLLATE NOCASE and orderFilled < 100 ORDER BY 1 LIMIT "+ this.row_count +"";
            this.mainQuery1 = " maker = '"+ this.fromAddress.value+"' COLLATE NOCASE and orderFilled = 100 ORDER BY 1 LIMIT "+ this.row_count1 +"";
            this.getopenOrders();
            this.getorderHistory();
        },
        methods: {
            getopenOrders() {
                this.openorderTable=[];
                sqldb.each("SELECT * FROM  Orders where "+this.mainQuery+" OFFSET "+ this.offset +"", (err, row) => {
                    if(row) {
                        this.openorderTable.push(row);
                    }
                });
                sqldb.get("SELECT COUNT(*) FROM Orders where maker = '"+this.fromAddress.value+"' COLLATE NOCASE and orderFilled  < 100", (err, row) => {
                    if(row) {
                        this.totalcount = Math.ceil( (row['COUNT(*)']) /  5);
                    }
                });
            },
            getorderHistory() {
                this.orderHistory=[];
                sqldb.each("SELECT * FROM Orders where "+this.mainQuery1+" OFFSET "+ this.offset1 +"", (err, row) => {
                    if(row) {
                        this.orderHistory.push(row);
                    }
                });
                sqldb.get("SELECT COUNT(*) FROM Orders where maker = '"+this.fromAddress.value+"' COLLATE NOCASE and orderFilled = 100", (err, row) => {
                    if(row) {
                        this.totalcount1 = Math.ceil( (row['COUNT(*)']) /  5);
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
                // console.log("SELECT * FROM  Orders where "+ this.selectQuery +" "+ this.todateQuery +" "+ this.fromDateQuery +" "+ this.mainQuery + " OFFSET "+ pageNum +"");
                sqldb.each("SELECT * FROM  Orders where "+ this.hashQuery +" "+ this.selectQuery +" "+ this.todateQuery +" "+ this.fromDateQuery +" "+ this.mainQuery + " OFFSET "+ pageNum +"", (err, row) => {
                    if(row) {
                        this.openorderTable.push(row);
                    }
                });
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
                sqldb.each("SELECT * FROM  Orders where "+ this.hashQuery1 +" "+ this.selectQuery1 +" "+ this.todateQuery1 +" "+ this.fromDateQuery1 +" "+ this.mainQuery1 + " OFFSET "+ pageNum +"", (err, row) => {
                    if(row) {
                        this.orderHistory.push(row);
                    }
                });
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
