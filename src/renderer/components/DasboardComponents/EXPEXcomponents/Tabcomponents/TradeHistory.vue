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
                    <p>{{parseFloat(trade.price).toFixed(4)}}</p>
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
                let todate = new Date(this.toDate.split('T')[0]+":00:00");
                let ts2 = Math.round(todate / 1000);
                if(this.toDate && this.fromDate) {
                    let startDate = new Date(this.fromDate.split('T')[0]+":00:00");
                    let ts1 = Math.round(startDate / 1000);
                    this.todateQuery = "createdAt BETWEEN '"+ts1+"' AND '"+ts2+"' and";
                } else {
                    if(this.toDate ) {
                        this.todateQuery = "createdAt <= '"+ ts2 +"' and";
                    }
                }
                if(this.toDate || this.fromDate) {
                    this.gettrades(0);
                }
                this.getTradeCount();
            },
            fromDate: function (value) {
                this.tradeTable = [];
                let startDate = new Date(this.fromDate.split('T')[0]+":00:00");
                let ts1 = Math.round(startDate / 1000);
                if(this.toDate && this.fromDate) {
                    let todate = new Date(this.toDate.split('T')[0]+":00:00");
                    let ts2 = Math.round(todate / 1000);
                    this.fromDateQuery = "createdAt BETWEEN '"+ts1+"' AND '"+ts2+"' and";
                } else {
                    if(this.fromDate ) {
                        this.fromDateQuery = "createdAt >= '"+ ts1 +"' and";
                    }
                }
                if(this.toDate || this.fromDate) {
                    this.gettrades(0);
                }
                this.getTradeCount();
            },
            selected: function (value) {
                this.tradeTable = [];
                this.offset = 0;
                this.forcePage = 1;
                if(value === 'BUY' || value === 'SELL' ) {
                    this.gettrades(0);
                } else if(this.selected === 'ALL') {
                    this.selectQuery = "";
                    this.gettrades(0);
                }
                this.getTradeCount();
            },
            searchHash: function (value) {
                this.offset = 0;
                this.forcePage = 1;
                this.tradeTable = [];
                if(data) {
                    this.gettrades(0);
                } else if(!this.hashSearch) {
                    this.hashQuery = "";
                    this.gettrades(0);
                }
                this.getTradeCount();
            },
            fromAddress: function (value) {
                this.tradeTable = [];
                this.paramData = [this.fromAddress.value, this.fromAddress.value];
                this.mainQuery = "(maker = ? or taker = ?) order by createdAt desc LIMIT "+this.limit+"";
                this.gettrades(0);
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
                paramData: [],
            };
        },
        created(){
            this.paramData = [this.fromAddress.value, this.fromAddress.value];
            this.mainQuery = "(maker = ? or taker = ?) order by createdAt desc LIMIT "+this.limit+"";
            this.gettrades();
        },
        computed: {
            getTradeData() {
                ipcRenderer.on('newTrade', (event , res) => {
                    if(res) {
                        this.gettrades(0);
                        this.getTradeCount();
                    }
                });
            }
        },
        methods: {
            gettrades(pageNum = 0){
                this.tradeTable=[];
                this.hashQuery = '';
                this.selectQuery = '';
                if(this.hashSearch && this.selected !== "ALL" ) {
                    this.hashQuery = 'orderHash = ? and ';
                    this.selectQuery = 'marketType = ? and ';
                    this.paramData = [this.hashSearch,this.selected, this.fromAddress.value, this.fromAddress.value];
                } else {
                    if(this.selected !== "ALL" ) {
                        this.selectQuery = 'marketType = ? and ';
                        this.paramData = [this.selected, this.fromAddress.value, this.fromAddress.value];
                    } else if(this.selected === "ALL" ){
                        if(this.hashSearch) {
                            this.hashQuery = 'orderHash = ? and ';
                            this.paramData = [this.hashSearch, this.fromAddress.value, this.fromAddress.value];
                        } else {
                            this.paramData = [this.fromAddress.value, this.fromAddress.value];
                        }
                    }
                }
                sqldb.each("SELECT * FROM  Trade where "+ this.hashQuery +" "+ this.selectQuery +" "+ this.todateQuery +" "+ this.fromDateQuery +" "+ this.mainQuery + " OFFSET "+ pageNum +"",this.paramData, (err, row) => {
                    if(row)
                    {
                        this.tradeTable.push(row);
                    }
                });
                this.getTradeCount();
            },
            getTradeCount() {
                this.hashQuery = '';
                this.selectQuery = '';
                if(this.hashSearch && this.selected !== "ALL" ) {
                    this.hashQuery = 'orderHash = ? and ';
                    this.selectQuery = 'marketType = ? and ';
                    this.paramData = [this.hashSearch,this.selected, this.fromAddress.value, this.fromAddress.value];
                } else {
                    if(this.selected !== "ALL" ) {
                        this.selectQuery = 'marketType = ? and ';
                        this.paramData = [this.selected, this.fromAddress.value, this.fromAddress.value];
                    } else if(this.selected === "ALL" ){
                        if(this.hashSearch) {
                            this.hashQuery = 'orderHash = ? and ';
                            this.paramData = [this.hashSearch, this.fromAddress.value, this.fromAddress.value];
                        } else {
                            this.paramData = [this.fromAddress.value, this.fromAddress.value];
                        }
                    }
                }
                let todate = new Date(this.toDate.split('T')[0]+":00:00");
                let ts2 = Math.round(todate / 1000);
                if(this.toDate && this.fromDate) {
                    let startDate = new Date(this.fromDate.split('T')[0]+":00:00");
                    let ts1 = Math.round(startDate / 1000);
                    this.todateQuery = "createdAt BETWEEN '"+ts1+"' AND '"+ts2+"' and";
                } else {
                    if(this.toDate ) {
                        this.todateQuery = "createdAt <= '"+ ts2 +"' and";
                    }
                }
                sqldb.each("SELECT COUNT(*) as count FROM Trade where "+ this.hashQuery +" "+ this.selectQuery +" "+ this.todateQuery +" "+ this.fromDateQuery +" "+ this.mainQuery +" OFFSET "+ this.offset +"", this.paramData, (err, row) => {
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
                let todate = new Date(this.toDate.split('T')[0]+":00:00");
                let ts2 = Math.round(todate / 1000);
                if(this.toDate && this.fromDate) {
                    let startDate = new Date(this.fromDate.split('T')[0]+":00:00");
                    let ts1 = Math.round(startDate / 1000);
                    this.todateQuery = "createdAt BETWEEN '"+ts1+"' AND '"+ts2+"' and";
                } else {
                    if(this.toDate ) {
                        this.todateQuery = "createdAt <= '"+ ts2 +"' and";
                    }
                }
                pageNum = (pageNum -1) * this.row_count ;
                this.gettrades(pageNum);
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
