<template>
    <div class="content">
        <div class="market-Info">
            <div class="curve"></div>
            <div class="market-content">
                <div class="market-headings">
                    <h1>Expanse Markets</h1>
                    <h3>Total Volume = 0 EXP</h3>
                </div>
                <div class="market-input">
                    <input placeholder="Find Tokens " v-model="searchTokens" type="text" class="find-market"/>
                </div>
            </div>
        </div>
        <div class="market-table">
            <div class="table-head">
                <label>PAIR</label>
                <label>PRICE</label>
                <label>24HR VOLUME</label>
                <label>24HR CHANGE</label>
                <label>24HR HIGH</label>
                <label>24HR LOW</label>
            </div>
            <div class="table-partition"></div>
            <div class="table-body">
                <div v-if="marketTable.length > 0" v-for="(data, index) in (marketTable || getmarketPair)" @click="openDetails(data)" :class="data.perChange > 0 ? 'table-row Greenback': 'table-row'">
                    <p>{{data.betaSymbol}} - {{data.alphaSymbol}}</p>
                    <p>{{data.Price? data.Price: 0}}</p>
                    <p>{{data.volume? data.volume: 0}}</p>
                    <p v-if="data.perChange >= 0" class="row-mid Green">
                        {{data.perChange ? parseFloat(data.perChange):0}}% <img src="../../../../assets/img/PolygonGreen2.png"/>
                    </p>
                    <p v-else class="row-mid Red">
                        {{data.perChange ? parseFloat(data.perChange):0}}% <img src="../../../../assets/img/PolygonRed2.png"/>
                    </p>
                    <p>{{data.maxPrice? data.maxPrice: 0}}</p>
                    <p>{{data.minPrice ? data.minPrice: 0}}</p>
                </div>
                <div v-if="marketTable.length === 0" class="table-no-row">
                    <p class="row-10">No Market Data Found</p>
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
    import Paginate from 'vuejs-paginate';
    import {sqldb} from '../../../../../common/cronjobs';
    import {ipcRenderer} from 'electron';
    import {web3} from '../../../../../main/libs/config';

    export default {
        name: 'marketsTab',
        components : {
            'paginate': Paginate,
        },
        data() {
            return {
                initialPage: 1,
                forcePage: 1,
                offset: 0,
                limit: 10,
                totalcount: 0,
                marketTable: [],
                othermaketData: [],
                searchTokens: '',
                tsYesterday: '',
                lastmarketType: [],
                updaterow: -1,
                updaterowColor: '',
            };
        },
        watch: {
            searchTokens(value) {
                this.marketTable = [];
                if(value) {
                    let new_data = [value, value]
                    let mainqueryCount = " betaSymbol = ? or alphaSymbol = ?";
                    sqldb.each("SELECT * FROM marketPair where "+ mainqueryCount,new_data, (err, row) => {
                        if(row) {
                            this.marketTable.push(row);
                        }
                    });
                } else if(!value) {
                    this.getmarketData();
                    this.getmarketCount();
                }
            }

        },
        computed: {
           getmarketPair() {
               this.marketTable = [];
               ipcRenderer.on('newMarketPair', (event , res) => {
                   console.log(event, res);
                   if(res) {
                       this.getmarketData();
                       this.getmarketCount();
                   }
              });
               ipcRenderer.on('deleteMarketPair', (event , res) => {
                   if(res) {
                       this.getmarketData();
                       this.getmarketCount();
                   }
              });
               ipcRenderer.on('updatemarketPair', (event , res) => {
                   if(res) {
                       this.getmarketData();
                       this.getmarketCount();
                   }
              });
           }
        },
        created(){
            this.marketTable=[];
            this.lastmarketType=[];
            this.getmarketPair;
            this.getmarketData();
            this.getmarketCount();
        },
        methods: {
            clickCallback (pageNum) {
                this.forcePage = pageNum;
                this.offset = (pageNum -1) * this.limit;
                this.marketTable=[];
                pageNum = (pageNum -1) * this.limit ;
                sqldb.each("SELECT * FROM marketPair order by 1 LIMIT "+this.limit+" OFFSET "+pageNum+"", (err, row) => {
                    // console.log(row, "rowsss");
                    this.marketTable.push(row);
                });
            },
            getmarketData() {
                this.marketTable=[];
                let i = 0;
                sqldb.each("SELECT * FROM marketPair order by 1 LIMIT "+this.limit+" OFFSET "+this.offset+"", (err, row) => {
                    // console.log(row, "rowsss");
                    if(row) {
                        this.marketTable.push(row);
                    }
                    i=i+1;
                });
            },
            getmarketCount() {
                sqldb.each("SELECT COUNT(*) as count FROM marketPair", (err, row) => {
                    if(row) {
                        this.totalcount = Math.ceil( (row.count) /  this.limit);
                    }
                });
            },
            openDetails(data) {
                this.$router.push({
                    path: '/expexdetails',
                    query: { data: data }
                });
            }
        }
    }
</script>

<style>

</style>
