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
                    <input placeholder="Find..." type="text" class="find-market"/>
                </div>
            </div>
        </div>
        <div class="market-table">
            <div class="table-head">
                <label>MARKET</label>
                <label>CURRENCY</label>
                <label>VOLUME</label>
                <label>%EXCHANGE</label>
                <label>24HR HIGH</label>
                <label>24HR LOW</label>
                <label>DATE ADDED</label>
            </div>
            <div class="table-partition"></div>
            <div class="table-body">
                <div @click="openDetails" class="table-row">
                    <p>EXP-ETH</p>
                    <p>Ethereum 1</p>
                    <p>256,796.32</p>
                    <p class="row-mid Green">5.1 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-NOC</p>
                    <p>NetCenter Token</p>
                    <p>256,796.32</p>
                    <p class="row-mid Red">2.1 <img src="../../../../assets/img/PolygonRed2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-RSP</p>
                    <p>Reserve Check</p>
                    <p>256,796.32</p>
                    <p class="row-mid Red">1.2 <img src="../../../../assets/img/PolygonRed2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-NOC</p>
                    <p>NetCenter Token</p>
                    <p>256,796.32</p>
                    <p class="row-mid Green">2.1 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-ETH</p>
                    <p>Ethereum 1</p>
                    <p>256,796.32</p>
                    <p class="row-mid Green">5.1 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-ETH</p>
                    <p>Ethereum 1</p>
                    <p>256,796.32</p>
                    <p class="row-mid Green">5.1 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-NOC</p>
                    <p>NetCenter Token</p>
                    <p>256,796.32</p>
                    <p class="row-mid Red">2.1 <img src="../../../../assets/img/PolygonRed2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-RSP</p>
                    <p>Reserve Check</p>
                    <p>256,796.32</p>
                    <p class="row-mid Red">1.2 <img src="../../../../assets/img/PolygonRed2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-NOC</p>
                    <p>NetCenter Token</p>
                    <p>256,796.32</p>
                    <p class="row-mid Green">2.1 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-ETH</p>
                    <p>Ethereum 1</p>
                    <p>256,796.32</p>
                    <p class="row-mid Green">5.1 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-ETH</p>
                    <p>Ethereum 1</p>
                    <p>256,796.32</p>
                    <p class="row-mid Green">5.1 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-NOC</p>
                    <p>NetCenter Token</p>
                    <p>256,796.32</p>
                    <p class="row-mid Red">2.1 <img src="../../../../assets/img/PolygonRed2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-RSP</p>
                    <p>Reserve Check</p>
                    <p>256,796.32</p>
                    <p class="row-mid Red">1.2 <img src="../../../../assets/img/PolygonRed2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-NOC</p>
                    <p>NetCenter Token</p>
                    <p>256,796.32</p>
                    <p class="row-mid Green">2.1 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-ETH</p>
                    <p>Ethereum 1</p>
                    <p>256,796.32</p>
                    <p class="row-mid Green">5.1 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-ETH</p>
                    <p>Ethereum 1</p>
                    <p>256,796.32</p>
                    <p class="row-mid Green">5.1 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-NOC</p>
                    <p>NetCenter Token</p>
                    <p>256,796.32</p>
                    <p class="row-mid Red">2.1 <img src="../../../../assets/img/PolygonRed2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-RSP</p>
                    <p>Reserve Check</p>
                    <p>256,796.32</p>
                    <p class="row-mid Red">1.2 <img src="../../../../assets/img/PolygonRed2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-NOC</p>
                    <p>NetCenter Token</p>
                    <p>256,796.32</p>
                    <p class="row-mid Green">2.1 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
                    <p>0.0000567</p>
                    <p>0.0000467</p>
                    <p class="row-10">08/13/18</p>
                </div>
                <div class="table-row">
                    <p>EXP-ETH</p>
                    <p>Ethereum 1</p>
                    <p>256,796.32</p>
                    <p class="row-mid Green">5.1 <img src="../../../../assets/img/PolygonGreen2.png"/></p>
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
    import Paginate from 'vuejs-paginate'
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
            };
        },
        created(){
        },
        methods: {
            clickCallback (pageNum) {
                console.log(pageNum)
            },
            openDetails() {
                this.$router.push({
                    path: '/expexdetails'
                });
            }
        }
    }
</script>

<style>

</style>
