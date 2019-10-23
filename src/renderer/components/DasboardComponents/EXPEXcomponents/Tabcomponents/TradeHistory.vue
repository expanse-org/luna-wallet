<template>
    <div class="content">
        <div class="myorder-Info">
            <div class="curve"></div>
            <div class="myorder-content">
                <div class="myorder-headings">
                    <h1>Trade History</h1>
                </div>
                <div class="myorder-select">
                    <multiselect  v-model="selected" placeholder="Select Buy/Sell" :searchable="false" :allow-empty="false"
                                  :show-labels="false" :options="['ALL', 'BUY','SELL']" class="filter-select">
                    </multiselect>
                </div>
                <div class="myorder-input1">
                    <span class="mtop-10">From:</span> <datetime type="date" placeholder="Start Date" v-model="fromDate" class="find-market" input-id="startDate"></datetime>
                </div>
                <div class="myorder-input1">
                    <span class="mtop-10">To:</span> <datetime type="date" placeholder="End Date" v-model="toDate" class="find-market" input-id="startDate"></datetime>
                </div>
                <div class="myorder-input">
                    <input placeholder="Find Hash" v-model="searchHash" type="text" class="find-market"/>
                </div>
            </div>
        </div>
        <div class="myorder-table tradeTabel">
            <div class="table-head">
                <label>MARKET</label>
                <label>OPENED DATE</label>
                <label>TYPE</label>
                <label>PRICE</label>
                <label>TOTAL</label>
                <label>TX HASH</label>
            </div>
            <div class="table-partition"></div>
            <div class="table-body">
                <div v-if="tradeTable.length === 0" class="table-no-row">
                    <p class="row-10">No Trade History Found</p>
                </div>
                <div v-if="tradeTable.length > 0" v-for="(trade, index) in (tradeTable || getTradeData)" class="table-row">
                    <p>{{trade.betaSymbol}} -{{trade.alphaSymbol}}</p>
                    <p>{{ parseInt(trade.createdAt) * 1000 | moment("DD-MM-YYYY")}}</p>
                    <p v-if="trade.marketType === 'BUY'" class="Green">{{trade.marketType}}</p>
                    <p v-else class="Red">{{trade.marketType}}</p>
                    <p>{{parseInt(trade.price).toFixed(4)}}</p>
                    <p v-if="trade.marketType === 'BUY'">{{parseFloat(trade.amountBuy).toFixed(5)}}</p>
                    <p v-else >{{parseFloat(trade.amountSell).toFixed(5)}}</p>
                    <p @click="openGanderUrl('https://gander.tech/tx/'+trade.orderHash)" class="fix-text tooltip">
                        {{trade.orderHash}}
                        <span class="tooltiptext parrentFont">{{trade.orderHash}}</span>
                    </p>
                    <div @click="handletooltip1(trade.orderHash, index)" class="tooltip3 copytext">
                        <img src="../../../../assets/img/copy.svg"  />
                        <span v-if="copiedtip === index" class="tooltiptext2">Copied</span>
                    </div>
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
</template>

<script>
    import Paginate from 'vuejs-paginate'
    import os from 'os';
    import  * as child_process from 'child_process';
    import Multiselect from 'vue-multiselect';
    import {sqldb} from '../../../../../common/cronjobs';
    import { clipboard, ipcRenderer } from 'electron';
    export default {
        name: 'TradeHistory',
        components : {
            'paginate': Paginate,
            'multiselect': Multiselect,
        },
        props: ['fromAddress'],

        watch: {
            toDate: function (value) {
                this.tradeTable = [];
                if(this.toDate && this.fromDate) {
                    this.todateQuery = "createdAt BETWEEN '"+this.fromDate.split('T')[0]+"' AND '"+this.toDate.split('T')[0]+"' and";
                } else if(this.toDate ) {
                    this.todateQuery = "createdAt = '"+ this.toDate.split('T')[0] +"' and";
                }
                if(this.toDate || this.fromDate) {
                    sqldb.each("SELECT * FROM Trade where "+ this.hashQuery +" "+ this.selectQuery +" "+ this.todateQuery +" "+ this.fromDateQuery +" "+ this.mainQuery +" OFFSET "+ this.offset +"", (err, row) => {
                        if(row) {
                            this.tradeTable.push(row);
                        }
                    });
                }
                this.getTradeCount();
            },
            fromDate: function (value) {
                this.tradeTable = [];
                if(this.toDate && this.fromDate) {
                    this.fromDateQuery = "createdAt BETWEEN '"+this.fromDate.split('T')[0]+"' AND '"+this.toDate.split('T')[0]+"' and";
                } else if(this.toDate ) {
                    this.fromDateQuery = "createdAt = '"+ this.toDate.split('T')[0] +"' and";
                }
                if(this.toDate || this.fromDate) {
                    sqldb.each("SELECT * FROM Trade where "+ this.hashQuery +" "+ this.selectQuery +" "+ this.todateQuery +" "+ this.fromDateQuery +" "+ this.mainQuery +" OFFSET "+ this.offset +"", (err, row) => {
                        if(row) {
                            this.tradeTable.push(row);
                        }
                    });
                }
                this.getTradeCount();
            },
            selected: function (value) {
                this.tradeTable = [];
                this.offset = 0;
                this.forcePage = 1;
                if(value === 'BUY' || value === 'SELL' ) {
                    this.selectQuery = "marketType = '"+value+"' COLLATE NOCASE and";
                    sqldb.each("SELECT * FROM  Trade where "+ this.hashQuery +" "+ this.selectQuery +" "+ this.todateQuery +" "+ this.fromDateQuery +" "+ this.mainQuery + " OFFSET "+ this.offset +"", (err, row) => {
                        if(row) {
                            this.tradeTable.push(row);
                        }
                    });
                } else if(this.selected === 'ALL') {
                    this.selectQuery = "";
                    this.gettrades();
                }
                this.getTradeCount();
            },
            searchHash: function (value) {
                this.tradeTable = [];
                if (value) {
                    this.hashQuery = "orderHash = '"+value+"' COLLATE NOCASE and";
                    sqldb.each("SELECT * FROM  Trade where "+ this.hashQuery +" "+ this.selectQuery +" "+ this.todateQuery +" "+ this.fromDateQuery +" "+ this.mainQuery + " OFFSET "+ this.offset +"", (err, row) => {
                        // console.log(row, "rowsss");
                        if(row)
                        {
                            this.tradeTable.push(row);
                        }
                    });
                }
                else {
                    this.hashQuery = "";
                    this.gettrades();
                }
                this.getTradeCount();
            },
            fromAddress: function (value) {
                this.tradeTable = [];
                this.mainQuery = "(maker = '"+ value.value+"' COLLATE NOCASE or taker = '"+ value.value+"' COLLATE NOCASE) order by createdAt desc LIMIT "+this.limit+"";
                sqldb.each("SELECT * FROM  Trade where "+ this.hashQuery +" "+ this.selectQuery +" "+ this.todateQuery +" "+ this.fromDateQuery +" "+ this.mainQuery + " OFFSET "+ this.offset +"", (err, row) => {
                    // console.log(row, "rowsss");
                    if(row)
                    {
                        this.tradeTable.push(row);
                    }
                });
                this.getTradeCount();
            },
            getTradeData() {
                ipcRenderer.on('newTrade', (event , res) => {
                    if(res) {
                        this.gettrades();
                        this.getTradeCount();
                    }
                });
            }
        },
        data() {
            return {
                initialPage: 1,
                forcePage: 1,
                offset: 0,
                limit: 10,
                totalcount: 0,
                selected: 'ALL',
                tradeTable: [],
                copiedtip: -1,
                searchHash: '',
                toDate: '',
                fromDate: '',
                hashQuery: '',
                todateQuery: '',
                fromDateQuery: '',
                selectQuery: '',
                mainQuery: '',
            };
        },
        created(){
            this.mainQuery = "(maker = '"+this.fromAddress.value+"' COLLATE NOCASE or taker = '"+this.fromAddress.value+"' COLLATE NOCASE) order by createdAt desc LIMIT "+this.limit+"";
            this.gettrades();
        },
        computed: {
            getTradeData() {
                ipcRenderer.on('newTrade', (event , res) => {
                    if(res) {
                        this.gettrades();
                        this.getTradeCount();
                    }
                });
            }
        },
        methods: {
            gettrades(){
                this.tradeTable=[];
                sqldb.each("SELECT * FROM  Trade where "+ this.hashQuery +" "+ this.selectQuery +" "+ this.todateQuery +" "+ this.fromDateQuery +" "+ this.mainQuery + " OFFSET "+ this.offset +"", (err, row) => {
                    if(row)
                    {
                        this.tradeTable.push(row);
                    }
                });
                this.getTradeCount();
            },
            getTradeCount() {
                sqldb.each("SELECT COUNT(*) as count FROM Trade where "+ this.hashQuery +" "+ this.selectQuery +" "+ this.todateQuery +" "+ this.fromDateQuery +" "+ this.mainQuery +" OFFSET "+ this.offset +"", (err, row) => {
                    if(row) {
                        this.totalcount = Math.ceil((row.count) / this.limit);
                    }
                });
            },
            clickCallback (pageNum) {
                // console.log(pageNum)
                this.forcePage = pageNum;
                this.offset = (pageNum -1) * this.limit;
                this.tradeTable=[];
                pageNum = (pageNum -1) * this.limit ;
                if(this.toDate && this.fromDate) {
                    this.fromDateQuery = "createdAt BETWEEN '"+this.fromDate.split('T')[0]+"' AND '"+this.toDate.split('T')[0]+"' and";
                } else {
                    if(this.toDate ) {
                        this.todateQuery = "createdAt = '"+ this.toDate.split('T')[0] +"' and";
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
                sqldb.each("SELECT * FROM Trade where "+ this.hashQuery +" "+ this.selectQuery +" "+ this.todateQuery +" "+ this.fromDateQuery +" "+ this.mainQuery +" OFFSET "+ pageNum +"", (err, row) => {
                    if(row)
                    {
                        this.tradeTable.push(row);
                    }
                });
            },
            handletooltip1(text, index){
                var copyText = text;
                if (copyText) {
                    clipboard.writeText(copyText, 'selected');
                }
                this.copiedtip = index;
                setTimeout(() => {
                    this.copiedtip = -1;
                },2000);

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
        }
    }
</script>

<style>

</style>
