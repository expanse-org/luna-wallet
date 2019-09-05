<template>
    <div :class="'top-bar ' + tabClass">
        <div class="details">
            <div class="peers">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="29px"
                    viewBox="0 0 34 34" v-bind:style="{enableBackground:'new 0 0 34 34'}" xml:space="preserve">
                    <path class="peer" d="M3.8,34C1.7,34,0,32.3,0,30.2s1.7-3.8,3.8-3.8s3.8,1.7,3.8,3.8l0,0C7.6,32.3,5.9,34,3.8,34z
                        M3.8,28.4c-1,0-1.8,0.8-1.8,1.8c0,1,0.8,1.8,1.8,1.8s1.8-0.8,1.8-1.8C5.6,29.2,4.8,28.4,3.8,28.4z M33,31.2c-0.6,0-1-0.4-1-1
                        c0,0,0,0,0,0C32,14.6,19.4,2,3.8,2c-0.6,0-1-0.5-1-1s0.5-1,1-1C20.5,0,34,13.5,34,30.2C34,30.7,33.6,31.2,33,31.2
                        C33,31.2,33,31.2,33,31.2L33,31.2z M26.7,31.2c-0.6,0-1-0.5-1-1c0,0,0,0,0,0c0-12-9.8-21.8-21.8-21.8c-0.6,0-1-0.5-1-1
                        c0-0.5,0.4-1,1-1C17,6.4,27.6,17,27.7,30.2C27.7,30.7,27.2,31.2,26.7,31.2L26.7,31.2z M20.3,31.2c-0.6,0-1-0.5-1-1l0,0
                        c0-8.6-6.9-15.5-15.5-15.5c-0.6,0-1-0.5-1-1c0-0.6,0.5-1,1-1c9.7,0,17.5,7.8,17.5,17.5C21.3,30.7,20.9,31.2,20.3,31.2
                        C20.3,31.2,20.3,31.2,20.3,31.2L20.3,31.2z M13.3,31.2c-0.6,0-1-0.5-1-1l0,0c0-4.7-3.8-8.4-8.4-8.5c-0.6,0-1-0.5-1-1s0.5-1,1-1
                        c5.8,0,10.5,4.7,10.5,10.5C14.3,30.7,13.8,31.2,13.3,31.2C13.3,31.2,13.3,31.2,13.3,31.2L13.3,31.2z"
                    />
                </svg>
                <label>{{peerCountData? peerCountData: this.totalPeers? this.totalPeers:0}} peers </label>
            </div>

            <div class="total">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px"
                    height="30px" viewBox="0 0 37 37" v-bind:style="{enableBackground:'new 0 0 37 37'}" xml:space="preserve">
                    <defs>
                    </defs>
                    <path id="Rectangle_1_copy_3_1_" class="st25" d="M33,8.9V18c2.5,0.3,4.2,2.5,4,5s-2.5,4.2-5,4c-2.1-0.2-3.7-1.9-4-4h-3v5
                        c2.5,0.3,4.2,2.5,4,5c-0.3,2.5-2.5,4.2-5,4c-2.1-0.2-3.7-1.9-4-4H8.9c-0.3,2.5-2.5,4.2-5,4s-4.2-2.5-4-5c0.2-2.1,1.9-3.7,4-4V17.9
                        c-2.5-0.3-4.2-2.5-4-4.9S2.5,8.8,5,9c2.1,0.2,3.7,1.9,4,4H12V8.9C9.5,8.7,7.8,6.5,8,4c0.3-2.5,2.5-4.2,5-4c2.1,0.2,3.7,1.9,4,4H28
                        c0.3-2.5,2.5-4.2,4.9-4s4.2,2.5,4,4.9C36.7,7.1,35.1,8.7,33,8.9z M32.5,25c1.4,0,2.5-1.1,2.5-2.5S33.9,20,32.5,20
                        c-1.4,0-2.5,1.1-2.5,2.5S31.1,25,32.5,25z M24.5,35c1.4,0,2.5-1.1,2.5-2.5c0-1.4-1.1-2.5-2.5-2.5S22,31.1,22,32.5
                        C22,33.9,23.1,35,24.5,35z M13,18c2.1,0.2,3.7,1.9,4,4h7v-4c-2.1-0.2-3.7-1.9-4-4h-7V18z M12.5,20c-1.4,0-2.5,1.1-2.5,2.5
                        s1.1,2.5,2.5,2.5s2.5-1.1,2.5-2.5S13.9,20,12.5,20z M24.5,16c1.4,0,2.5-1.1,2.5-2.5S25.9,11,24.5,11S22,12.1,22,13.5
                        S23.1,16,24.5,16z M2,32.5C2,33.9,3.1,35,4.5,35S7,33.9,7,32.5C7,31.1,5.9,30,4.5,30S2,31.1,2,32.5z M4.5,11C3.1,11,2,12.1,2,13.5
                        S3.1,16,4.5,16S7,14.9,7,13.5S5.9,11,4.5,11z M8.9,14c-0.2,2.1-1.9,3.7-4,4V28c2.1,0.2,3.7,1.9,4,3.9H20c0.2-2.1,1.9-3.7,4-4v-5h-7
                        c-0.3,2.5-2.5,4.2-5,4c-2.5-0.3-4.2-2.5-4-5c0.2-2.1,1.9-3.7,4-4v-4H8.9z M12.5,2C11.1,2,10,3.1,10,4.5S11.1,7,12.5,7S15,5.9,15,4.5
                        S13.9,2,12.5,2z M28,5H16.9c-0.2,2.1-1.9,3.7-4,3.9V13h7c0.3-2.5,2.5-4.2,5-4s4.2,2.5,4,5c-0.2,2.1-1.9,3.7-4,4v4h3
                        c0.2-2.1,1.9-3.7,4-4V8.9C29.9,8.7,28.3,7.1,28,5z M32.5,2C31.1,2,30,3.1,30,4.5S31.1,7,32.5,7C33.9,7,35,5.9,35,4.5S33.9,2,32.5,2z
                        " />
                </svg>
                <label  class="total-blocks">{{currentblockData? currentblockData: this.totalblock? this.totalblock:0}}</label>
            </div>

            <div class="time">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px"
                    height="30px" viewBox="0 0 39 49.7" v-bind:style="{enableBackground:'new 0 0 39 49.7'}" xml:space="preserve">
                    <path class="watch" d="M33.9,16.7l2-2.1l1.2,1.2l1.2-1.2L34.8,11l-1.2,1.2l1.2,1.2l-2,2.1c-2.6-2.5-5.9-4.2-9.5-4.8
                        c1.4-1.1,2.2-2.8,2.2-4.7c0-3.3-2.6-6-5.9-6c-3.3,0.1-5.9,2.7-5.9,6c0,1.8,0.8,3.5,2.2,4.7c-3.5,0.7-6.8,2.4-9.5,4.8l-2-2.1l1.2-1.2
                        L4.2,11l-3.6,3.6l1.2,1.2l1.2-1.2l2,2.1C1.8,20.4-0.1,25.2,0,30.2c0,10.8,8.7,19.5,19.5,19.5S39,40.9,39,30.2
                        C39,25.2,37.2,20.4,33.9,16.7z M15.3,6c-0.1-2.3,1.8-4.3,4.1-4.3c2.3-0.1,4.3,1.8,4.3,4.1c0,0.1,0,0.1,0,0.2c-0.1,2-1.4,3.8-3.4,4.3
                        V6.9H22V5.2H17v1.7h1.7v3.4C16.7,9.8,15.3,8.1,15.3,6z M19.5,48.3c-10-0.2-18-8.4-17.8-18.4c0.2-9.8,8-17.6,17.8-17.8
                        c10,0.2,18,8.4,17.8,18.4C37.1,40.2,29.3,48.1,19.5,48.3z M19.5,15.5c-8.1-0.1-14.8,6.3-14.9,14.4S10.9,44.7,19,44.8
                        s14.8-6.3,14.9-14.4c0-0.1,0-0.2,0-0.2C34,22.2,27.5,15.6,19.5,15.5C19.5,15.5,19.5,15.5,19.5,15.5z M20.3,43.1v-4.3
                        c0-0.5-0.4-0.9-0.9-0.9s-0.9,0.4-0.9,0.9v4.3C12.2,42.6,7.2,37.5,6.8,31H11c0.5,0,0.9-0.4,0.9-0.9c0-0.5-0.4-0.9-0.9-0.9H6.8
                        c0.4-6.4,5.5-11.6,11.9-12.1v4.3c0,0.5,0.4,0.9,0.9,0.9s0.9-0.4,0.9-0.9v-4.3c6.4,0.5,11.5,5.6,11.9,12.1H28c-0.5,0-0.9,0.4-0.9,0.9
                        c0,0.5,0.4,0.9,0.9,0.9h4.2C31.7,37.4,26.7,42.5,20.3,43.1z M27.1,22.4c-0.3-0.3-0.8-0.3-1.1,0c0,0,0,0,0,0l-5.3,5.3
                        c-0.3,0-0.8-0.2-1.2-0.2c-1.4,0-2.5,1.2-2.5,2.6c0,0.3,0.2,0.9,0.2,1l-1.9,2.1c-0.3,0.3-0.3,0.9,0,1.2c0,0,0,0,0,0
                        c0.3,0.3,0.8,0.3,1.1,0c0,0,0,0,0,0l1.9-1.9c0.3,0.1,0.7,0.2,1,0.2c1.4,0,2.5-1.2,2.5-2.6c0-0.3-0.2-0.9-0.2-1l5.3-5.3
                        C27.4,23.5,27.5,22.9,27.1,22.4C27.2,22.5,27.2,22.4,27.1,22.4L27.1,22.4z M19.5,31c-0.5,0-0.9-0.4-0.9-0.8c0-0.5,0.4-0.9,0.8-0.9
                        c0.5,0,0.9,0.4,0.9,0.8c0,0,0,0,0,0C20.4,30.6,20,31,19.5,31C19.6,31,19.5,31,19.5,31z"
                    />
                </svg>
                <label class="time-since-last-block">{{timestampData? timestampData:(timeStamp ? timeStamp: "0s since last block")}}</label>
            </div>

            <div class="price">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px"
                    height="30px" viewBox="0 0 50 50" v-bind:style="{enableBackground:'new 0 0 50 50'}" xml:space="preserve">
                    <path class="dollar" d="M25,50C11.2,50,0,38.8,0,25S11.2,0,25,0s25,11.2,25,25S38.8,50,25,50z M25,3C12.8,3,3,12.8,3,25s9.8,22,22,22
                        s22-9.8,22-22S37.2,3,25,3z M25.5,45C14.7,45,6,36.3,6,25.5S14.7,6,25.5,6S45,14.7,45,25.5S36.3,45,25.5,45z M25.5,8.3
                        C16,8.3,8.3,16,8.3,25.5S16,42.7,25.5,42.7S42.7,35,42.7,25.5l0,0C42.7,16,35,8.3,25.5,8.3z M35,29.8c0,3.4-3.5,6.1-8.1,6.5v1.4
                        c0,0.7-0.7,1.3-1.4,1.3c-0.7,0-1.3-0.6-1.3-1.3v-1.4c-4.7-0.4-8.1-3.1-8.1-6.5c0-0.7,0.7-1.3,1.4-1.3c0.7,0,1.3,0.6,1.3,1.3
                        c0,1.9,2.4,3.5,5.4,3.9v-7.9c-4.7-0.4-8.1-3.1-8.1-6.5s3.5-6.1,8.1-6.5v-1.4c0-0.7,0.7-1.3,1.4-1.3c0.7,0,1.3,0.6,1.3,1.3v1.4
                        c4.7,0.4,8.1,3.1,8.1,6.5c0,0.7-0.7,1.3-1.4,1.3c-0.7,0-1.3-0.6-1.3-1.3c0-1.9-2.4-3.5-5.4-3.9v7.9C31.5,23.7,35,26.4,35,29.8z
                        M26.9,33.6c3.1-0.4,5.4-2,5.4-3.9s-2.4-3.5-5.4-3.9V33.6L26.9,33.6z M24.1,15.4c-3.1,0.4-5.4,2-5.4,3.9s2.4,3.5,5.4,3.9V15.4z"
                    />
                </svg>
                <label>EXP Price:
                    <span class="currValue">{{currenciesData && currenciesData['USD'].PRICE}}</span>
                </label>
            </div>

            <div v-if="currentblockData !== highestblockData" class="bar-wrap">
                <span v-bind:style="{width: '(currentblockData / highestblockData) * 100'+'%'}" class="bar-fill"></span>
            </div>
            <div v-if="currentblockData !== highestblockData && currentblockData" class="download-values">
                <p>DOWNLOADING.. </p>
                <span class="downloading-off">{{currentblockData? currentblockData:0}}</span>
                <span>/</span>
                <span class="total-off">{{highestblockData? highestblockData:0}}</span>
            </div>


        </div>
        <div class="balance">
            <label>BALANCE</label>
            <div :class="'amount ' + tabClass">
                <label class="dashboard-balance">{{dashboardbalanceData ? dashboardbalanceData:0}}</label>
            </div>

            <div class="down">
                <select v-on:change="handleCurrency(selectCurrency)" v-model="selectCurrency"  id="currency">
                    <option v-for="(val,currency) in currenciesData" :value="currency">{{currency}}</option>
                </select>
            </div>
        </div>
        <!-- <button type="button" class="notifications">
            <img src="assets/img/notification.png" alt="notify">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="19.9"
                height="23.438" viewBox="0 0 19.9 23.438">
                <path d="M17.570,9.970 C17.570,6.338 15.110,3.410 11.713,2.590 L11.713,1.770 C11.713,0.833 10.893,0.012 9.956,0.012 C9.019,0.012 8.199,0.833 8.199,1.770 L8.199,2.590 C4.801,3.410 2.341,6.338 2.341,9.970 L2.341,16.413 L-0.001,18.755 L-0.001,19.927 L19.913,19.927 L19.913,18.755 L17.570,16.413 L17.570,9.970 ZM9.956,23.441 C10.073,23.441 10.307,23.441 10.424,23.441 C11.244,23.324 11.830,22.738 12.064,22.035 C12.181,21.801 12.299,21.450 12.299,21.098 L7.613,21.098 C7.613,22.387 8.667,23.441 9.956,23.441 Z"
                    class="notification-icon"></path>
            </svg>
        </button>-->
    </div>
</template>

<script>
    import {web3, ExpApi} from '../../../../main/libs/config';
    import {syncPeers} from '../../../../common/web3Config';
    import Raven from 'raven';
    import moment from 'moment';
    import * as $ from 'jquery';
    // var web3 = startConnectWeb();
    const got = require('got');
    import _ from 'underscore';

    export default {
        name: 'Header-page',
        props:['tabClass'],
        data() {
            return {
                barWrap: false,
                downloading: false,
                totalPeers: '',
                pc: '',
                timeStamp: '',
                blockNumber: '',
                states: false,
                cb: 0,
                currentblock: 0,
                totalblock: 0,
                highestblock: 0,
                hb: 0,
                currency: 0.00,
                dashboardbalance: 0,
                defaultCurrencySign: '$',
                selectCurrency: 'USD',
                total_balance: 0,
                tb: 0,
                tmspm: 0,
                price: 0,
            };
        },
        computed: {
            currentblockData: function(){
                // console.log(this.$store.state.gexpSync,"this.$/ store.state.peerCount");
                if(this.$store.state.gexpSync.currentBlock){
                    this.cb = this.$store.state.gexpSync.currentBlock;
                    this.totalblock = this.$store.state.gexpSync.currentBlock;
                } else {
                    this.cb = this.$store.state.currentblock;
                    this.totalblock = this.$store.state.currentblock;
                }
                return this.cb;
            },
            highestblockData: function(){
                if(this.$store.state.gexpSync.currentBlock){
                    this.hb = this.$store.state.gexpSync.highestBlock;
                } else {
                    this.hb = this.$store.state.currentblock;
                }
                return this.hb;
            },
            peerCountData: function(){
                // console.log(this.$store.state.peerCount, "this.$store.state.peerCount");
                this.pc = this.$store.state.peerCount;
                return this.pc;
            },
            currenciesData: function(){
                this.currency = this.$store.state.currencies;
                var curNew= this.currency;
                got('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=EXP&tsyms=USD,BTC,EXP', {
                    json: true
                }).then(response => {
                    curNew = response.body.DISPLAY.EXP;
                    this.currency = response.body.DISPLAY.EXP;
                    $(".currValue").text(curNew['USD'].PRICE);
                },(error) => {
                });
                return this.currency;
            },
            totalBalanceData: function(){
                this.tb = this.$store.state.total_balance;
                // console.log(this.tb, "tb");
                return this.tb;
            },
            timestampData: function(){
                if(this.currentblockData) {
                    web3.eth.getBlock(this.currentblockData).then((res) => {
                        this.tmspm = moment(res.timestamp * 1000).fromNow();
                    });
                } else {
                    web3.eth.getBlock(this.totalblock).then((res) => {
                        this.tmspm = moment(res.timestamp * 1000).fromNow();
                    });
                }
                return this.tmspm;
            },
            dashboardbalanceData: function(){
                var price = this.$store.state.currencies && this.$store.state.currencies[this.selectCurrency].PRICE.replace(/[^0-9\.]/g, '');
                this.$store.dispatch('addpushAcdcurrency', this.defaultCurrencySign);
                this.$store.dispatch('addAcprice', price);
                this.dashboardbalance =  this.defaultCurrencySign +' '+ (parseFloat(price) * this.totalBalanceData).toFixed(6);
                return this.dashboardbalance;
            },
        },
        created(){
            let timestamp;
            // console.log(this.$store.state.gexpSync)
            // console.log(this.currenciesData, "currencies")
            if(this.$store.state.gexpSync){
                // console.log(this.$store.state.gexpSync, "this.$store.state.gexpSync.currentBlock")
                web3.eth.getBlock(this.$store.state.gexpSync.currentBlock).then((res) => {
                    this.timeStamp = moment(res.timestamp * 1000).fromNow();
                });
            }else {
                syncPeers();
                web3.eth.getBlockNumber().then((res) => {
                    if(res){
                        // console.log("latest block response",res);
                        var blockNumber = res;
                        this.totalblock = blockNumber;
                        web3.eth.getBlock(blockNumber).then((res) => {
                            this.timeStamp = moment(res.timestamp * 1000).fromNow();
                        });
                    }
                } );
                web3.eth.getBlock(this.totalblock).then((res) => {
                    if(res){
                        //console.log("web3 totalPeers and getblock response", res, res.timestamp)
                        this.timeStamp = moment(res.timestamp * 1000).fromNow();
                    }
                });
            }
            switch (this.$router.history.current.path){
                case '/walletdashboard':
                    this.tabClass = 'top-bar red';
                    break;
                case '/market':
                    this.tabClass = 'top-bar green';
                    break;
                case '/tokenlab':
                    this.tabClass = 'top-bar blue';
                    break;
            }
        },
        methods: {
            handleCurrency(curr){
                // console.log("web3 this.curr", curr);
                if(curr == 'USD'){
                    this.defaultCurrencySign = '$';
                }else {
                    this.defaultCurrencySign = curr;
                }
                var price = this.currenciesData[curr].PRICE.replace(/[^0-9\.]/g, '');
                this.$store.dispatch('addpushAcdcurrency', this.defaultCurrencySign);
                this.$store.dispatch('addAcprice', price);
                this.dashboardbalance =  this.defaultCurrencySign +' '+ (parseFloat(price) * this.total_balance).toFixed(6);
                // console.log("web3 this.dashboardbalance", this.dashboardbalance)
            },
            get_dashboard_total_balance(){
                let that = this;
                // let balance = dashboard.watchBalance();
                try {
                    web3.eth.getAccounts(function (error, accounts) {
                        if (accounts.length > 0) {
                            _.each(accounts, function (account_hash, key) {
                                // console.log(account_hash , key);
                                web3.eth.getBalance(account_hash).then((bal) => {
                                    var balance = web3.utils.fromWei(bal, "ether");
                                    var price = that.$store.state.currencies && that.$store.state.currencies[that.selectCurrency].PRICE.replace(/[^0-9\.]/g, '');
                                    that.$store.dispatch('addpushAcdcurrency', that.defaultCurrencySign);
                                    that.total_balance = parseFloat(that.total_balance) + parseFloat(balance);
                                    that.total_balance = that.total_balance.toFixed(6);
                                    that.$store.dispatch('addAcprice', price);
                                    // console.log('total_balance=============', that.total_balance)
                                    that.dashboardbalance = that.defaultCurrencySign+' ' + (that.total_balance * that.price).toFixed(6);
                                });
                            })
                        }
                    })
                } catch (err) {
                    console.log("Execption Error" + err.message);
                    Raven.captureException(err);
                }
            }
        }
    }
</script>

<style>
    .st25 {
        fill: #FFFFFF;
    }
</style>
