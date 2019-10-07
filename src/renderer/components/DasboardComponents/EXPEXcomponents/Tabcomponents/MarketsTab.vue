<template>
    <div class="content">
        <div class="market-Info">
            <div class="curve"></div>
            <div class="market-content">
                <div class="market-headings">
                    <h1>Expanse Markets</h1>
                    <h3>Total Volume = 890,435.987 EXP</h3>
                </div>
                <div class="market-input">
                    <input placeholder="Find Tokens..." type="text" class="find-market"/>
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
                <label>DATE ADDED</label>
            </div>
            <div class="table-partition"></div>
            <div class="table-body">
                <div v-for="data in marketTable" v-if="data.status === 'active'" @click="openDetails(data)" class="table-row">
                    <p>{{data.alpha}} - {{data.beta}}</p>
                    <p>256,796.32</p>
                    <p>256,796.32</p>
                    <p class="row-mid Green">5.1 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-NOC</p>
                    <p>256,796.32</p>
                    <p>256,796.32</p>
                    <p class="row-mid Red">2.1 <img src="../../../../assets/img/PolygonRed2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-RSP</p>
                    <p>256,796.32</p>
                    <p>256,796.32</p>
                    <p class="row-mid Red">1.2 <img src="../../../../assets/img/PolygonRed2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-NOC</p>
                    <p>256,796.32</p>
                    <p>256,796.32</p>
                    <p class="row-mid Green">2.1 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-ETH</p>
                    <p>256,796.32</p>
                    <p>256,796.32</p>
                    <p class="row-mid Green">5.1 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-ETH</p>
                    <p>256,796.32</p>
                    <p>256,796.32</p>
                    <p class="row-mid Green">5.1 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-NOC</p>
                    <p>256,796.32</p>
                    <p>256,796.32</p>
                    <p class="row-mid Red">2.1 <img src="../../../../assets/img/PolygonRed2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-RSP</p>
                    <p>256,796.32</p>
                    <p>256,796.32</p>
                    <p class="row-mid Red">1.2 <img src="../../../../assets/img/PolygonRed2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-NOC</p>
                    <p>256,796.32</p>
                    <p>256,796.32</p>
                    <p class="row-mid Green">2.1 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-ETH</p>
                    <p>256,796.32</p>
                    <p>256,796.32</p>
                    <p class="row-mid Green">5.1 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-ETH</p>
                    <p>256,796.32</p>
                    <p>256,796.32</p>
                    <p class="row-mid Red">1.2 <img src="../../../../assets/img/PolygonRed2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-NOC</p>
                    <p>256,796.32</p>
                    <p>256,796.32</p>
                    <p class="row-mid Green">2.1 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-ETH</p>
                    <p>256,796.32</p>
                    <p>256,796.32</p>
                    <p class="row-mid Green">5.1 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-ETH</p>
                    <p>256,796.32</p>
                    <p>256,796.32</p>
                    <p class="row-mid Red">1.2 <img src="../../../../assets/img/PolygonRed2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-NOC</p>
                    <p>256,796.32</p>
                    <p>256,796.32</p>
                    <p class="row-mid Red">1.2 <img src="../../../../assets/img/PolygonRed2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-ETH</p>
                    <p>256,796.32</p>
                    <p>256,796.32</p>
                    <p class="row-mid Green">5.1 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-ETH</p>
                    <p>256,796.32</p>
                    <p>256,796.32</p>
                    <p class="row-mid Green">5.1 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-NOC</p>
                    <p>256,796.32</p>
                    <p>256,796.32</p>
                    <p class="row-mid Green">2.1 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-ETH</p>
                    <p>256,796.32</p>
                    <p>256,796.32</p>
                    <p class="row-mid Green">5.1 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-ETH</p>
                    <p>256,796.32</p>
                    <p>256,796.32</p>
                    <p class="row-mid Red">1.2 <img src="../../../../assets/img/PolygonRed2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
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
</template>

<script>
    import Paginate from 'vuejs-paginate';
    var sqlite3 = require('sqlite3').verbose();
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
            };
        },
        created(){
            var sqldb = new sqlite3.Database( './expexmarket.sqlite3db', (err, result) => {console.log(err, result)});
            // console.log(sqldb, "sqldb");
            this.marketTable=[];
            sqldb.each("SELECT * FROM TokenPairs", (err, row) => {
                console.log(row, "rowsss");
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
