<template>
    <div class="content">
        <div class="myorder-Info">
            <div class="curve"></div>
            <div class="myorder-content">
                <div class="myorder-headings">
                    <h1>Trade History</h1>
                </div>
                <div class="myorder-select">
                    <input placeholder="Find..." type="text" class="find-market"/>
                </div>
                <div class="myorder-input1">
                    From: <input type="date" class="find-market"/>
                </div>
                <div class="myorder-input1">
                    To: <input type="date" class="find-market"/>
                </div>
                <div class="myorder-input">
                    <input placeholder="Find..." type="text" class="find-market"/>
                </div>
            </div>
        </div>
        <div class="myorder-table">
            <div class="table-head">
                <label>MARKET</label>
                <label>OPENED DATE</label>
                <label>TYPE</label>
                <label>PRICE</label>
                <label>FILLED</label>
                <label>AMOUNT</label>
                <label>TOTAL</label>
                <label>TX HASH</label>
                <label>ACTION</label>
            </div>
            <div class="table-partition"></div>
            <div class="table-body">
                <div class="table-row">
                    <p>EXP-ETH</p>
                    <p>12/08/19 12:34:00</p>
                    <p class="Green">BUY</p>
                    <p>0.00089</p>
                    <p>0.09%</p>
                    <p>2,390</p>
                    <p>2,390</p>
                    <p class="fix-text">0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa</p>
                    <p>Cancel</p>
                </div>
                <div class="table-row">
                    <p>EXP-NOC</p>
                    <p>12/08/19 12:34:00</p>
                    <p class="Red">SELL</p>
                    <p>0.00089</p>
                    <p>0.09%</p>
                    <p>2,390</p>
                    <p>2,390</p>
                    <p class="fix-text">0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa</p>
                    <p>Cancel</p>
                </div>
                <div class="table-row">
                    <p>EXP-RSP</p>
                    <p>12/08/19 12:34:00</p>
                    <p class="Red">SELL</p>
                    <p>0.00089</p>
                    <p>0.09%</p>
                    <p>2,390</p>
                    <p>2,390</p>
                    <p class="fix-text">0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa</p>
                    <p>Cancel</p>
                </div>
                <div class="table-row">
                    <p>EXP-NOC</p>
                    <p>12/08/19 12:34:00</p>
                    <p class="Green">BUY</p>
                    <p>0.00089</p>
                    <p>0.09%</p>
                    <p>2,390</p>
                    <p>2,390</p>
                    <p class="fix-text">0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa</p>
                    <p>Cancel</p>
                </div>
                <div class="table-row">
                    <p>EXP-ETH</p>
                    <p>12/08/19 12:34:00</p>
                    <p class="Green">BUY</p>
                    <p>0.00089</p>
                    <p>0.09%</p>
                    <p>2,390</p>
                    <p>2,390</p>
                    <p class="fix-text">0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa</p>
                    <p>Cancel</p>
                </div>
                <div class="table-row">
                    <p>EXP-ETH</p>
                    <p>12/08/19 12:34:00</p>
                    <p class="Green">BUY</p>
                    <p>0.00089</p>
                    <p>0.09%</p>
                    <p>2,390</p>
                    <p>2,390</p>
                    <p class="fix-text">0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa</p>
                    <p>Cancel</p>
                </div>
                <div class="table-row">
                    <p>EXP-NOC</p>
                    <p>12/08/19 12:34:00</p>
                    <p class="Red">SELL</p>
                    <p>0.00089</p>
                    <p>0.09%</p>
                    <p>2,390</p>
                    <p>2,390</p>
                    <p class="fix-text">0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa</p>
                    <p>Cancel</p>
                </div>
                <div class="table-row">
                    <p>EXP-RSP</p>
                    <p>12/08/19 12:34:00</p>
                    <p class="Red">SELL</p>
                    <p>0.00089</p>
                    <p>0.09%</p>
                    <p>2,390</p>
                    <p>2,390</p>
                    <p class="fix-text">0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa</p>
                    <p>Cancel</p>
                </div>
                <div class="table-row">
                    <p>EXP-NOC</p>
                    <p>12/08/19 12:34:00</p>
                    <p class="Green">BUY</p>
                    <p>0.00089</p>
                    <p>0.09%</p>
                    <p>2,390</p>
                    <p>2,390</p>
                    <p class="fix-text">0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa</p>
                    <p>Cancel</p>
                </div>
                <div class="table-row">
                    <p>EXP-ETH</p>
                    <p>12/08/19 12:34:00</p>
                    <p class="Green">BUY</p>
                    <p>0.00089</p>
                    <p>0.09%</p>
                    <p>2,390</p>
                    <p>2,390</p>
                    <p class="fix-text">0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa</p>
                    <p>Cancel</p>
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
        name: 'TradeHistory',
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
        }
    }
</script>

<style>

</style>
