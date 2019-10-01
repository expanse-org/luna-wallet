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
                                  :show-labels="false" :options="['All', 'Buy','Sell']" class="filter-select">
                    </multiselect>
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
                    <p @click="openGanderUrl('https://gander.tech/tx/0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa')" class="fix-text tooltip">
                        0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa
                        <span class="tooltiptext parrentFont">0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa</span>
                    </p>
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
                    <p @click="openGanderUrl('https://gander.tech/tx/0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa')" class="fix-text tooltip">
                        0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa
                        <span class="tooltiptext parrentFont">0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa</span>
                    </p>
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
                    <p @click="openGanderUrl('https://gander.tech/tx/0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa')" class="fix-text tooltip">
                        0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa
                        <span class="tooltiptext parrentFont">0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa</span>
                    </p>
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
                    <p @click="openGanderUrl('https://gander.tech/tx/0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa')" class="fix-text tooltip">
                        0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa
                        <span class="tooltiptext parrentFont">0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa</span>
                    </p>
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
                    <p @click="openGanderUrl('https://gander.tech/tx/0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa')" class="fix-text tooltip">
                        0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa
                        <span class="tooltiptext parrentFont">0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa</span>
                    </p>
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
                    <p @click="openGanderUrl('https://gander.tech/tx/0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa')" class="fix-text tooltip">
                        0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa
                        <span class="tooltiptext parrentFont">0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa</span>
                    </p>
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
                    <p @click="openGanderUrl('https://gander.tech/tx/0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa')" class="fix-text tooltip">
                        0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa
                        <span class="tooltiptext parrentFont">0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa</span>
                    </p>
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
                    <p @click="openGanderUrl('https://gander.tech/tx/0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa')" class="fix-text tooltip">
                        0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa
                        <span class="tooltiptext parrentFont">0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa</span>
                    </p>
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
                    <p @click="openGanderUrl('https://gander.tech/tx/0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa')" class="fix-text tooltip">
                        0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa
                        <span class="tooltiptext parrentFont">0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa</span>
                    </p>
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
                    <p @click="openGanderUrl('https://gander.tech/tx/0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa')" class="fix-text tooltip">
                        0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa
                        <span class="tooltiptext parrentFont">0x32747c4df589f04d0bad4d0ce99d29a5e63e3076528669f2a23129d04989caaa</span>
                    </p>
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
    import os from 'os';
    import  * as child_process from 'child_process';
    import Multiselect from 'vue-multiselect';
    export default {
        name: 'TradeHistory',
        components : {
            'paginate': Paginate,
            'multiselect': Multiselect,
        },
        data() {
            return {
                initialPage: 1,
                forcePage: 1,
                totalcount: 100,
                selected: 'Buy',
            };
        },
        created(){
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
        }
    }
</script>

<style>

</style>
