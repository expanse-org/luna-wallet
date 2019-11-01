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
                    <input placeholder="Find by Tx hash" v-model="hashSearch" type="text" class="find-market"/>
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
                <div v-if="openorderTable.length > 0"  class="table-row" v-for="(data, index) in (openorderTable || getOrders)">
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
                    <p @click="openGanderUrl('https://gander.tech/tx/'+data.txHash)" class="fix-text tooltip">
                        {{data.txHash}}
                        <span class="tooltiptext parrentFont">{{data.txHash}}</span>
                    </p>
                    <div @click="handletooltip(data.txHash, index)" class="tooltip3 copytext">
                        <img src="../../../../assets/img/copy.svg"  />
                        <span v-if="copiedtip === index" class="tooltiptext2">Copied</span>
                    </div>
                    <p class="buttonCancel" @click="handleCancel(data)">Cancel</p>
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
                    <p @click="openGanderUrl('https://gander.tech/tx/'+order.txHash)" class="fix-text tooltip">
                        {{order.txHash}}
                        <span class="tooltiptext parrentFont">{{order.txHash}}</span>
                    </p>
                    <div @click="handletooltip1(order.txHash, index)" class="tooltip3 copytext">
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

        <modal class="tmodal" name="cancelOrderPopup">
            <allowance-popup :modalArray="modalArray"></allowance-popup>
        </modal>
    </div>
</template>

<script>
    import Paginate from 'vuejs-paginate'
    import os from 'os';
    import  * as child_process from 'child_process';
    import Multiselect from 'vue-multiselect'
    import {db} from '../../../../../../lowdbFunc';
    import {sqldb} from '../../../../../common/cronjobs';
    import { clipboard,ipcRenderer } from 'electron';
    import { Datetime } from 'vue-datetime';
    import {web3} from '../../../../../main/libs/config';
    import AllowancePopup from '../ExpDetailsComponents/AllowancePopup/AllowancePopup';

    export default {
        name: 'MyOrders',
        components : {
            'paginate': Paginate,
            'multiselect': Multiselect,
            'allowance-popup': AllowancePopup,
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
                paramData: [],
                paramData1: [],
                hashQuery1: '',
                todateQuery1: '',
                fromDateQuery1: '',
                selectQuery1: '',
                mainQuery1: '',
                modalArray: [],
            };
        },
        watch: {
            fromDate() {
                this.offset = 0;
                this.forcePage = 1;
                this.openorderTable = [];
                let startDate = new Date(this.fromDate.split('T')[0]+":00:00");
                let ts1 = Math.round(startDate / 1000);
                if(this.todate && this.fromDate) {
                    let todate = new Date(this.todate.split('T')[0]+":00:00");
                    let ts2 = Math.round(todate / 1000);
                    this.fromDateQuery = "createdAt BETWEEN '"+ts1+"' AND '"+ts2+"' and";
                } else {
                    if(this.fromDate ) {
                        this.fromDateQuery = "createdAt >= '"+ts1+"' and";
                    }
                }
                if(this.todate || this.fromDate) {
                    console.log(this.fromDateQuery);
                    this.getopenOrders(0);
                }
                this.getopenorderCount();
            },
            todate() {
                this.offset = 0;
                this.forcePage = 1;
                this.openorderTable = [];
                let todate = new Date(this.todate.split('T')[0]+":00:00");
                let ts2 = Math.round(todate / 1000);
                if(this.todate && this.fromDate) {
                    let startDate = new Date(this.fromDate.split('T')[0]+":00:00");
                    let ts1 = Math.round(startDate / 1000);
                    this.todateQuery = "createdAt BETWEEN '"+ts1+"' AND '"+ts2+"' and";
                } else {
                    if(this.todate ) {
                        this.todateQuery = "createdAt <= '"+ ts2 +"' and";
                    }
                }
                if(this.todate || this.fromDate) {
                    this.getopenOrders(0);
                }
                this.getopenorderCount();
            },
            hashSearch(data) {
                this.offset = 0;
                this.forcePage = 1;
                this.openorderTable = [];
                if(data) {
                    this.getopenOrders(0);
                } else if(!this.hashSearch) {
                    this.hashQuery = "";
                    this.getopenOrders(0);
                }
                this.getopenorderCount();
            },
            selected(data) {
                this.offset = 0;
                this.forcePage = 1;
                this.openorderTable = [];
                if(data === 'BUY' || data === 'SELL' ) {
                    this.getopenOrders(0);
                } else if(this.selected === 'ALL') {
                    this.selectQuery = "";
                    this.getopenOrders();
                }
                this.getopenorderCount();
            },
            fromDate1() {
                this.offset1 = 0;
                this.forcePage1 = 1;
                this.orderHistory = [];
                let startDate = new Date(this.fromDate1.split('T')[0]+":00:00");
                let ts1 = Math.round(startDate / 1000);
                if(this.todate1 && this.fromDate1) {
                    let todate = new Date(this.todate1.split('T')[0]+":00:00");
                    let ts2 = Math.round(todate / 1000);
                    this.fromDateQuery1 = "createdAt BETWEEN '"+ts1+"' AND '"+ts2+"' and";
                } else {
                    if(this.fromDate1 ) {
                        this.fromDateQuery1 = "createdAt >= '"+ ts1 +"' and";
                    }
                }
                if(this.todate1 || this.fromDate1) {
                    this.getorderHistory(0);
                }
                this.getorderCount();
            },
            todate1() {
                this.offset1 = 0;
                this.forcePage1 = 1;
                this.orderHistory = [];
                let todate = new Date(this.todate1.split('T')[0]+":00:00");
                let ts2 = Math.round(todate / 1000);
                if(this.todate1 && this.fromDate1) {
                    let startDate = new Date(this.fromDate1.split('T')[0]+":00:00");
                    let ts1 = Math.round(startDate / 1000);
                    this.todateQuery1 = "createdAt BETWEEN '"+ts1+"' AND '"+ts2+"' and";
                } else {
                    if(this.todate1 ) {
                        this.todateQuery1 = "createdAt <= '"+ ts2 +"' and";
                    }
                }
                if(this.todate1 || this.fromDate1) {
                    this.getorderHistory(0);
                }
                this.getorderCount();
            },
            hashSearch1(data) {
                this.offset1 = 0;
                this.forcePage1 = 1;
                this.orderHistory = [];
                if(data) {
                    this.getorderHistory(0);
                } else if(!this.hashSearch1) {
                    this.hashQuery1 = "";
                    this.getorderHistory(0);
                }
                this.getorderCount();
            },
            selected1(data) {
                this.offset1 = 0;
                this.forcePage1 = 1;
                this.orderHistory = [];
                if(data === 'BUY' || data === 'SELL' ) {
                    this.getorderHistory(0);
                } else if(this.selected1 === 'ALL') {
                    this.selectQuery1 = "";
                    this.getorderHistory(0);
                }
                this.getorderCount();
            },
            fromAddress: function (value) {
                this.openorderTable=[];
                this.orderHistory=[];
                this.offset = 0;
                this.forcePage = 1;
                this.offset1 = 0;
                this.forcePage1 = 1;
                this.paramData = [this.fromAddress.value, 100,'OPEN'];
                this.mainQuery = "maker = ? COLLATE NOCASE and orderFilled < ? and status = ? ORDER BY createdAt desc LIMIT "+ this.row_count +"";
                this.paramData1 = [this.fromAddress.value, 100];
                this.mainQuery1 = " maker = ? and orderFilled = ? ORDER BY createdAt desc LIMIT "+ this.row_count1 +"";
                this.getopenOrders(0);
                this.getorderHistory(0);
                this.getopenorderCount();
                this.getorderCount();
            },
        },
        computed: {
            AddTokenData() {
                let tokensdata = db.get('tokens').value();
                return tokensdata;
            },
            getOrders() {
                ipcRenderer.on('newOrder', (event , res) => {
                    console.log(event, res);
                    if(res) {
                        this.getopenOrders();
                        this.getopenorderCount();
                        this.getorderHistory();
                        this.getorderCount();
                    }
                });
                ipcRenderer.on('updateOrder', (event , res) => {
                    if(res) {
                        this.getopenOrders();
                        this.getopenorderCount();
                        this.getorderHistory();
                        this.getorderCount();
                    }
                });
            }
        },
        created(){
            this.paramData = [this.fromAddress.value, 100,'OPEN'];
            this.mainQuery = "maker = ? COLLATE NOCASE and orderFilled < ? and status = ? ORDER BY createdAt desc LIMIT "+ this.row_count +"";
            this.paramData1 = [this.fromAddress.value, 100];
            this.mainQuery1 = "maker = ? COLLATE NOCASE and orderFilled = ? ORDER BY createdAt desc LIMIT "+ this.row_count1 +"";
            this.getopenOrders();
            this.getopenorderCount();
            this.getorderHistory();
            this.getorderCount();
        },
        methods: {
            handleCancel(data) {
                this.modalArray = {
                    type: "cancelOrder",
                    fromAddress: this.fromAddress.value,
                    orderHash: data.orderHash,
                };
                this.$modal.show('cancelOrderPopup');
            },
            getopenOrders(pageNum = 0) {
                this.openorderTable=[];
                this.hashQuery = '';
                this.selectQuery = '';
                if(this.hashSearch && this.selected !== "ALL" ) {
                    this.hashQuery = 'orderHash = ? and ';
                    this.selectQuery = 'marketType = ? and ';
                    this.paramData = [this.hashSearch,this.selected, this.fromAddress.value, 100,'OPEN'];
                } else {
                    if(this.selected !== "ALL" ) {
                        this.selectQuery = 'marketType = ? and ';
                        this.paramData = [this.selected, this.fromAddress.value, 100,'OPEN'];
                    } else if(this.selected === "ALL" ){
                        if(this.hashSearch) {
                            this.hashQuery = 'orderHash = ? and ';
                            this.paramData = [this.hashSearch, this.fromAddress.value, 100,'OPEN'];
                        } else {
                            this.paramData = [this.fromAddress.value, 100,'OPEN'];
                        }
                    }
                }
                sqldb.each("SELECT * FROM  Orders where "+ this.hashQuery +" "+ this.selectQuery +" "+ this.todateQuery +" "+ this.fromDateQuery +" "+ this.mainQuery + " OFFSET "+ pageNum +"",this.paramData, (err, row) => {
                    if(row) {
                        // console.log(row, "ro")
                        this.openorderTable.push(row);
                    }
                });
                this.getopenorderCount();
            },
            getorderHistory(pageNum = 0) {
                this.orderHistory=[];
                this.hashQuery1 = '';
                this.selectQuery1 = '';
                if(this.hashSearch1 && this.selected1 !== "ALL" ) {
                    this.hashQuery1 = 'orderHash = ? and ';
                    this.selectQuery1 = 'marketType = ? and ';
                    this.paramData1 = [this.hashSearch1,this.selected1, this.fromAddress.value, 100];
                } else {
                    if(this.selected1 !== "ALL" ) {
                        this.selectQuery1 = 'marketType = ? and ';
                        this.paramData1 = [this.selected1, this.fromAddress.value, 100];
                    } else if(this.selected1 === "ALL" ){
                        if(this.hashSearch1) {
                            this.hashQuery1 = 'orderHash = ? and ';
                            this.paramData1 = [this.hashSearch1, this.fromAddress.value, 100];
                        } else {
                            this.paramData1 = [this.fromAddress.value, 100];
                        }
                    }
                }
                sqldb.each("SELECT * FROM  Orders where "+ this.hashQuery1 +" "+ this.selectQuery1 +" "+ this.todateQuery1 +" "+ this.fromDateQuery1 +" "+ this.mainQuery1 + " OFFSET "+ this.offset1 +"",this.paramData1, (err, row) => {
                    if(row) {
                        this.orderHistory.push(row);
                    }
                });
                this.getorderCount();
            },
            getopenorderCount(){
                this.hashQuery = '';
                this.selectQuery = '';
                if(this.hashSearch && this.selected !== "ALL" ) {
                    this.hashQuery = 'orderHash = ? and ';
                    this.selectQuery = 'marketType = ? and ';
                    this.paramData = [this.hashSearch,this.selected, this.fromAddress.value, 100,'OPEN'];
                } else {
                    if(this.selected !== "ALL" ) {
                        this.selectQuery = 'marketType = ? and ';
                        this.paramData = [this.selected, this.fromAddress.value, 100,'OPEN'];
                    } else if(this.selected === "ALL" ){
                        if(this.hashSearch) {
                            this.hashQuery = 'orderHash = ? and ';
                            this.paramData = [this.hashSearch, this.fromAddress.value, 100,'OPEN'];
                        } else {
                            this.paramData = [this.fromAddress.value, 100,'OPEN'];
                        }
                    }
                }
                let todate = new Date(this.todate.split('T')[0]+":00:00");
                let ts2 = Math.round(todate / 1000);
                if(this.todate && this.fromDate) {
                    let startDate = new Date(this.fromDate.split('T')[0]+":00:00");
                    let ts1 = Math.round(startDate / 1000);
                    this.todateQuery = "createdAt BETWEEN '"+ts1+"' AND '"+ts2+"' and";
                } else {
                    if(this.todate ) {
                        this.todateQuery = "createdAt <= '"+ ts2 +"' and";
                    }
                }
                sqldb.each("SELECT COUNT(*) as count FROM  Orders where  "+ this.hashQuery +" "+ this.selectQuery +" "+ this.todateQuery +" "+ this.fromDateQuery +" "+ this.mainQuery + " OFFSET "+ this.offset +"",this.paramData ,  (err, row) => {
                    if(row) {
                        this.totalcount = Math.ceil((row.count) / this.row_count);
                    }
                });
            },
            getorderCount(){
                this.hashQuery1 = '';
                this.selectQuery1 = '';
                if(this.hashSearch1 && this.selected1 !== "ALL" ) {
                    this.hashQuery1 = 'orderHash = ? and ';
                    this.selectQuery1 = 'marketType = ? and ';
                    this.paramData1 = [this.hashSearch1,this.selected1, this.fromAddress.value, 100];
                } else {
                    if(this.selected1 !== "ALL" ) {
                        this.selectQuery1 = 'marketType = ? and ';
                        this.paramData1 = [this.selected1, this.fromAddress.value, 100];
                    } else if(this.selected1 === "ALL" ){
                        if(this.hashSearch1) {
                            this.hashQuery1 = 'orderHash = ? and ';
                            this.paramData1 = [this.hashSearch1, this.fromAddress.value, 100];
                        } else {
                            this.paramData1 = [this.fromAddress.value, 100];
                        }
                    }
                }
                let todate = new Date(this.todate1.split('T')[0]+":00:00");
                let ts2 = Math.round(todate / 1000);
                if(this.todate1 && this.fromDate1) {
                    let startDate = new Date(this.fromDate1.split('T')[0]+":00:00");
                    let ts1 = Math.round(startDate / 1000);
                    this.todateQuery1 = "createdAt BETWEEN '"+ts1+"' AND '"+ts2+"' and";
                } else {
                    if(this.todate1 ) {
                        this.todateQuery1 = "createdAt <= '"+ ts2 +"' and";
                    }
                }
                sqldb.each("SELECT COUNT(*) as count FROM  Orders where "+ this.hashQuery1 +" "+ this.selectQuery1 +" "+ this.todateQuery1 +" "+ this.fromDateQuery1 +" "+ this.mainQuery1 + " OFFSET "+ this.offset1 +"",this.paramData1 , (err, row) => {
                    if(row) {
                        this.totalcount1 = Math.ceil((row.count) / this.row_count1);
                    }
                });
            },
            hide () {
                this.$modal.hide('cancelOrderPopup');
            },
            clickCallback (pageNum) {
                this.forcePage = pageNum;
                this.offset = (pageNum -1) * this.row_count;
                this.openorderTable=[];
                let todate = new Date(this.todate.split('T')[0]+":00:00");
                let ts2 = Math.round(todate / 1000);
                if(this.todate && this.fromDate) {
                    let startDate = new Date(this.fromDate.split('T')[0]+":00:00");
                    let ts1 = Math.round(startDate / 1000);
                    this.todateQuery = "createdAt BETWEEN '"+ts1+"' AND '"+ts2+"' and";
                } else {
                    if(this.todate ) {
                        this.todateQuery = "createdAt <= '"+ ts2 +"' and";
                    }
                }
                pageNum = (pageNum -1) * this.row_count ;
                this.getopenOrders(pageNum);
                this.getopenorderCount();
            },
            clickCallback1 (pageNum) {
                this.forcePage1 = pageNum;
                this.offset1 = (pageNum -1) * this.row_count1;
                this.orderHistory=[];
                let todate = new Date(this.todate1.split('T')[0]+":00:00");
                let ts2 = Math.round(todate / 1000);
                if(this.todate1 && this.fromDate1) {
                    let startDate = new Date(this.fromDate1.split('T')[0]+":00:00");
                    let ts1 = Math.round(startDate / 1000);
                    this.todateQuery1 = "createdAt BETWEEN '"+ts1+"' AND '"+ts2+"' and";
                } else {
                    if(this.todate1 ) {
                        this.todateQuery1 = "createdAt <= '"+ ts2 +"' and";
                    }
                }
                pageNum = (pageNum -1) * this.row_count1 ;
                this.getorderHistory(pageNum);
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
