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
                    <input placeholder="Find Tokens..." v-model="searchTokens" type="text" class="find-market"/>
                </div>
            </div>
        </div>
        <div class="market-table">
            <div class="table-head">
                <label>PAIR</label>
                <label>PRICE</label>
                <label>VOLUME</label>
                <label>%CHANGE</label>
                <label>24HR CHANGE</label>
                <label>24HR HIGH</label>
                <label>24HR LOW</label>
            </div>
            <div class="table-partition"></div>
            <div class="table-body">
                <div v-if="marketTable.length > 0" v-for="data in marketTable" @click="openDetails(data)" class="table-row">
                    <p>{{data.betaSymbol}} - {{data.alphaSymbol}}</p>
                    <p>{{data.Price}}</p>
                    <p>{{data.volume}}</p>
                    <p class="row-mid Green">0 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
                    <p>{{data.Price}}</p>
                    <p>{{data.maxPrice}}</p>
                    <p>{{data.minPrice}}</p>
                </div>
                <div v-if="marketTable.length === 0" class="table-no-row">
                    <p class="row-10">No Market Data Found</p>
                </div>
            </div>
            <div v-if="marketTable.length > 10">
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
    export default {
        name: 'marketsTab',
        components : {
            'paginate': Paginate,
        },
        data() {
            return {
                initialPage: 1,
                forcePage: 1,
                totalcount: 100,
                marketTable: [],
                othermaketData: [],
                searchTokens: '',
            };
        },
        watch: {
            searchTokens(value) {
                this.marketTable = [];
                if(value) {
                    sqldb.each("SELECT * FROM marketPair where betaSymbol = '"+value+"' COLLATE NOCASE or alphaSymbol = '"+value+"' COLLATE NOCASE", (err, row) => {
                        if(row) {
                            this.marketTable.push(row);
                        }
                    });
                }
            }
        },
        created(){
            this.marketTable=[];
            sqldb.each("SELECT * FROM marketPair", (err, row) => {
                // console.log(row, "rowsss");
                this.marketTable.push(row);
            });
        },
        methods: {
            clickCallback (pageNum) {
                console.log(pageNum)
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
