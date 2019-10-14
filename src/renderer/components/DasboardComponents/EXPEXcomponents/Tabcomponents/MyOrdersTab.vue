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
                    <span class="mtop-10">From:</span> <datetime type="date" v-model="fromDate" class="find-market" input-id="startDate"></datetime>
                </div>
                <div class="myorder-input1">
                    <span class="mtop-10">To:</span> <datetime type="date" v-model="todate" class="find-market" input-id="startDate"></datetime>
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
                    <p>{{parseFloat(data.price).toFixed(6)}}</p>
                    <p v-if="data.marketType === 'BUY'">{{(data.amountBuy/Math.pow(10, data.decimalBuy))}}</p>
                    <p v-else >{{data.amountSell/Math.pow(10, data.decimalSell)}}</p>
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
            <div v-if="openorderTable.length > 10">
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
                    <span class="mtop-10">From:</span> <datetime type="date" v-model="fromDate1" class="find-market" input-id="startDate"></datetime>
                </div>
                <div class="myorder-input1">
                    <span class="mtop-10">To:</span> <datetime type="date" v-model="todate1" class="find-market" input-id="startDate"></datetime>
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
                    <p>{{parseFloat(order.price).toFixed(6)}}</p>
                    <p v-if="order.marketType === 'BUY'">{{order.amountBuy/Math.pow(10, order.decimalBuy)}}</p>
                    <p v-else >{{order.amountSell/Math.pow(10, order.decimalSell)}}</p>
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
            <div v-if="orderHistory.length > 10">
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
    import Multiselect from 'vue-multiselect'
    import {db} from '../../../../../../lowdbFunc';
    import {sqldb} from '../../../../../common/cronjobs';
    import { clipboard } from 'electron';
    import { Datetime } from 'vue-datetime';

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
                totalcount: 100,
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
                hashSearch: '',
                hashSearch1: '',
            };
        },
        watch: {
            fromDate(data) {
                this.openorderTable = [];
                if(data) {
                    sqldb.each("SELECT * FROM Orders where orderHash = '"+data+"' COLLATE NOCASE", (err, row) => {
                        if(row) {
                            this.openorderTable.push(row);
                        }
                    });
                } else {
                    sqldb.each("SELECT * FROM marketPair", (err, row) => {
                        // console.log(row, "rowsss");
                        if(row) {
                            this.openorderTable.push(row);
                        }
                    });
                }
            },
            hashSearch(data) {
                this.openorderTable = [];
                if(data) {
                    sqldb.each("SELECT * FROM Orders where maker = '"+this.fromAddress.value+"' COLLATE NOCASE and orderFilled  < 100 and orderHash = '"+data+"' COLLATE NOCASE", (err, row) => {
                        if(row) {
                            this.openorderTable.push(row);
                        }
                    });
                } else {
                    sqldb.each("SELECT * FROM Orders where maker = '"+this.fromAddress.value+"' COLLATE NOCASE and orderFilled  < 100", (err, row) => {
                        if(row) {
                            this.openorderTable.push(row);
                        }
                    });
                }
            },
            hashSearch1(data) {
                this.orderHistory = [];
                if(data) {
                    sqldb.each("SELECT * FROM Orders where maker = '"+this.fromAddress.value+"' COLLATE NOCASE and orderFilled = 100 and orderHash = '"+data+"' COLLATE NOCASE", (err, row) => {
                        if(row) {
                            this.orderHistory.push(row);
                        }
                    });
                } else {
                    sqldb.each("SELECT * FROM Orders where maker = '"+this.fromAddress.value+"' COLLATE NOCASE and orderFilled = 100", (err, row) => {
                        if(row) {
                            this.orderHistory.push(row);
                        }
                    });
                }
            },
            selected(data) {
                this.openorderTable = [];
                if(data === 'BUY' || data === 'SELL' ) {
                    sqldb.each("SELECT * FROM Orders where maker = '"+this.fromAddress.value+"' COLLATE NOCASE and orderFilled < 100 and marketType = '"+data+"' COLLATE NOCASE", (err, row) => {
                        if(row) {
                            this.openorderTable.push(row);
                        }
                    });
                } else {
                    sqldb.each("SELECT * FROM Orders where maker = '"+this.fromAddress.value+"' COLLATE NOCASE and orderFilled < 100", (err, row) => {
                        if(row) {
                            this.openorderTable.push(row);
                        }
                    });
                }
            },
            selected1(data) {
                this.orderHistory = [];
                if(data === 'BUY' || data === 'SELL' ) {
                    sqldb.each("SELECT * FROM Orders where maker = '"+this.fromAddress.value+"' COLLATE NOCASE and orderFilled = 100 and marketType = '"+data+"' COLLATE NOCASE", (err, row) => {
                        if(row) {
                            this.orderHistory.push(row);
                        }
                    });
                } else {
                    sqldb.each("SELECT * FROM Orders where maker = '"+this.fromAddress.value+"' COLLATE NOCASE and orderFilled = 100", (err, row) => {
                        if(row) {
                            this.orderHistory.push(row);
                        }
                    });
                }
            },
            fromAddress: function (value) {
                this.openorderTable=[];
                this.orderHistory=[];
                sqldb.each("SELECT * FROM Orders where maker = '"+value.value+"' COLLATE NOCASE and orderFilled  < 100", (err, row) => {
                    if(row) {
                        this.openorderTable.push(row);
                    }
                });
                sqldb.each("SELECT * FROM Orders where maker = '"+value.value+"' COLLATE NOCASE and orderFilled  = 100", (err, row) => {
                    if(row) {
                        this.orderHistory.push(row);
                    }
                });
            }

        },
        computed: {
            AddTokenData() {
                let tokensdata = db.get('tokens').value();
                return tokensdata;
            },

        },
        created(){
            this.openorderTable=[];
            this.orderHistory=[];
            sqldb.each("SELECT * FROM Orders where maker = '"+this.fromAddress.value+"' COLLATE NOCASE and orderFilled  < 100", (err, row) => {
                if(row) {
                    this.openorderTable.push(row);
                }
            });
            sqldb.each("SELECT * FROM Orders where maker = '"+this.fromAddress.value+"' COLLATE NOCASE and orderFilled  = 100", (err, row) => {
                if(row) {
                    this.orderHistory.push(row);
                }
            });
        },
        methods: {
            clickCallback (pageNum) {
                console.log(pageNum)
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
