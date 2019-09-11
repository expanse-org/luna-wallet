<template>
    <div>
        <div class="userInfo">
            <div class="curve"></div>
            <div class="left">
                <!-- <div class="qrCode" id="qrCode1"> -->
                <div class="qrCodevue" >
                    <qrcode-vue :value="accountHash" level="L"></qrcode-vue>
                </div>
                <!-- </div> -->
                <div class="info main-account">
                    <h1 class="m_name">{{accountTitle? accountTitle: 'Main Account'}}</h1>
                    <label class="balance">
                        {{defaultCurrencyData === '$'? '$':""}} {{ (parseFloat(accPriceData) * accountbalance).toFixed(5)}} {{defaultCurrencyData !== '$'? defaultCurrencyData:""}}
                    </label>
                    <!-- <span class="currency-sign">Exp</span> -->
                    <div class=" copy accoundID wd300">
                        <label class="main-account-hash">{{accountHash? accountHash: '0X'}}</label>
                        <div @click="handletooltip" class="tooltip3 copytext" data-val=".main-account-hash-input">
                            <img src="../../../assets/img/copy.svg"  />
                            <span v-if="copiedtip" class="tooltiptext2">Copied</span>
                        </div>
                        <input type="hidden" v-model="accountHash" class="mainv-account-hash-input" />

                    </div>
                    <div class="btns">
                        <button class="button action button--shikoba md-trigger openAddAccountModal" @click="show" data-modal="modal-3">
                            <img class="button__icon" src="../../../assets/img/addaccount.svg" />
                            <span>Add Account</span>
                        </button>
                        <button class="button primery button--shikoba account1 a1 main_view_account" data-val="0xd416db48cce26ad2dff060d90ef45db8a67aa3ac"
                                @click="mainMenu('details')">
                            <img class="button__icon" src="../../../assets/img/viewaccount.svg" />
                            <span>View Account</span>
                        </button>
                    </div>
                </div>
                <div class="send-btn-align">
                    <button class="button send-main-btn" @click="mainMenu('send')" data-modal="modal-3">
                        <span>SEND</span>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="38" height="35" viewBox="0 0 38 35">
                            <path d="M37.808,0.139 C37.639,-0.008 37.398,-0.043 37.194,0.052 L0.329,17.098 C0.131,17.189 0.003,17.386 0.000,17.604 C-0.002,17.822 0.122,18.022 0.318,18.118 L10.751,23.213 C10.942,23.307 11.170,23.285 11.341,23.158 L21.485,15.614 L13.522,23.765 C13.408,23.881 13.350,24.041 13.363,24.202 L14.155,34.478 C14.173,34.706 14.326,34.900 14.544,34.972 C14.603,34.991 14.663,35.000 14.722,35.000 C14.884,35.000 15.042,34.931 15.152,34.804 L20.689,28.418 L27.534,31.673 C27.683,31.744 27.855,31.747 28.006,31.682 C28.157,31.616 28.272,31.489 28.321,31.333 L37.975,0.734 C38.043,0.520 37.977,0.287 37.808,0.139 Z"
                            class="icon"></path>
                        </svg>
                    </button>
                </div>
            </div>

        </div>

        <div class="main-actions">
            <div class="actions">
                <div @click="openGanderUrl('https://gander.tech/address/'+accountHash)" class="view_on_external" data-href="">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26px" height="16px">
                        <path fill-rule="evenodd" fill="rgb(199, 75, 66)" d="M24.840,8.489 C24.617,8.795 19.295,16.000 12.499,16.000 C5.703,16.000 0.381,8.795 0.158,8.488 C-0.053,8.197 -0.053,7.802 0.158,7.511 C0.381,7.205 5.703,-0.000 12.499,-0.000 C19.295,-0.000 24.617,7.205 24.840,7.512 C25.052,7.802 25.052,8.197 24.840,8.489 ZM12.499,1.655 C7.482,1.655 3.155,6.435 1.873,7.999 C3.157,9.563 7.493,14.345 12.499,14.345 C17.516,14.345 21.843,9.565 23.125,8.001 C21.841,6.436 17.505,1.655 12.499,1.655 ZM12.499,12.966 C9.772,12.966 7.554,10.738 7.554,8.000 C7.554,5.262 9.772,3.034 12.499,3.034 C15.226,3.034 17.444,5.262 17.444,8.000 C17.444,10.738 15.226,12.966 12.499,12.966 ZM12.499,4.690 C10.681,4.690 9.203,6.175 9.203,8.000 C9.203,9.825 10.681,11.310 12.499,11.310 C14.317,11.310 15.796,9.825 15.796,8.000 C15.796,6.175 14.317,4.690 12.499,4.690 Z"/>
                    </svg>
                    <label>SHOW INTERFACE</label>
                </div>
                <div class="showInterface transferFunds" data-account="0" data-balance="0" @click="mainMenu('send')">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="25px">
                        <path fill-rule="evenodd" fill="rgb(203, 77, 67)" d="M15.617,20.670 L12.281,24.426 C11.956,24.789 11.498,25.000 11.014,25.000 C10.530,25.000 10.072,24.789 9.747,24.426 L6.411,20.670 C5.786,19.969 5.844,18.872 6.545,18.239 C7.245,17.606 8.321,17.665 8.946,18.374 L9.305,18.779 L9.305,10.340 C9.305,9.386 10.063,8.618 11.022,8.618 C11.965,8.618 12.723,9.386 12.723,10.340 L12.723,18.779 L13.082,18.374 C13.707,17.665 14.783,17.606 15.483,18.239 C15.858,18.577 16.359,19.784 15.617,20.670 ZM9.521,6.761 C8.821,7.394 7.745,7.335 7.120,6.626 L6.761,6.221 L6.761,14.661 C6.761,15.615 6.003,16.383 5.060,16.383 C4.118,16.383 3.359,15.615 3.359,14.661 L3.359,6.221 L3.001,6.626 C2.376,7.335 1.300,7.394 0.599,6.761 C-0.109,6.128 -0.159,5.039 0.466,4.331 L3.801,0.575 C4.127,0.203 4.585,0.001 5.052,0.001 C5.536,0.001 5.994,0.212 6.320,0.575 L9.655,4.331 C10.347,5.149 9.897,6.424 9.521,6.761 Z"/>
                    </svg>
                    <label>DEPOSIT</label>
                </div>
                <div class="btcDeposit tooltip2 copytext" @click="handletooltip('copiedtip')" data-val=".detail-account-hash-input">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26px" height="26px">
                        <path fill-rule="evenodd" fill="rgb(201, 76, 66)" d="M25.594,5.978 C25.323,5.707 24.994,5.571 24.607,5.571 L18.571,5.571 C17.991,5.571 17.372,5.765 16.714,6.152 L16.714,1.393 C16.714,1.006 16.579,0.677 16.308,0.406 C16.037,0.135 15.708,0.000 15.321,0.000 L9.286,0.000 C8.899,0.000 8.473,0.097 8.009,0.290 C7.545,0.483 7.177,0.716 6.906,0.987 L0.987,6.906 C0.716,7.177 0.483,7.545 0.290,8.009 C0.097,8.473 0.000,8.899 0.000,9.286 L0.000,19.036 C0.000,19.423 0.135,19.752 0.406,20.022 C0.677,20.293 1.006,20.429 1.393,20.429 L9.286,20.429 L9.286,24.607 C9.286,24.994 9.421,25.323 9.692,25.594 C9.963,25.865 10.292,26.000 10.678,26.000 L24.607,26.000 C24.994,26.000 25.323,25.865 25.594,25.594 C25.865,25.323 26.000,24.994 26.000,24.607 L26.000,6.964 C26.000,6.578 25.865,6.249 25.594,5.978 ZM16.714,8.662 L16.714,13.000 L12.376,13.000 L16.714,8.662 ZM7.428,3.090 L7.428,7.428 L3.090,7.428 L7.428,3.090 ZM10.272,12.478 C10.001,12.749 9.769,13.116 9.576,13.581 C9.382,14.045 9.286,14.470 9.286,14.857 L9.286,18.571 L1.857,18.571 L1.857,9.286 L7.893,9.286 C8.280,9.286 8.609,9.150 8.879,8.879 C9.150,8.609 9.286,8.280 9.286,7.893 L9.286,1.857 L14.857,1.857 L14.857,7.893 L10.272,12.478 ZM24.143,24.143 L11.143,24.143 L11.143,14.857 L17.178,14.857 C17.565,14.857 17.894,14.722 18.165,14.451 C18.436,14.180 18.571,13.851 18.571,13.464 L18.571,7.428 L24.142,7.428 L24.142,24.143 L24.143,24.143 Z"/>
                    </svg>
                    <label>Copy Address</label>
                </div>
                <div class="deposit tooltip2 copytext " @click="handletooltip('comingSoon')">
                    <!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In  -->
                    <svg class="up" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0.347in" height="0.347in">
                        <path fill-rule="evenodd" fill="rgb(203, 77, 67)" d="M12.500,25.000 C5.596,25.000 -0.000,19.404 -0.000,12.500 C-0.000,5.596 5.596,-0.000 12.500,-0.000 C19.404,-0.000 25.000,5.596 25.000,12.500 C25.000,19.404 19.404,25.000 12.500,25.000 L12.500,25.000 ZM12.500,2.273 C6.852,2.273 2.273,6.852 2.273,12.500 C2.273,18.148 6.852,22.727 12.500,22.727 C18.148,22.727 22.727,18.148 22.727,12.500 C22.727,6.852 18.148,2.273 12.500,2.273 ZM18.182,15.606 C18.178,17.088 17.380,18.455 16.091,19.187 L16.091,20.783 C16.091,21.360 15.623,21.828 15.045,21.828 C14.468,21.828 14.000,21.360 14.000,20.783 L14.000,20.783 L14.000,19.748 L11.909,19.748 L11.909,20.783 C11.909,21.361 11.441,21.829 10.864,21.829 C10.286,21.829 9.818,21.361 9.818,20.783 L9.818,19.748 L8.773,19.748 C8.198,19.750 7.730,19.287 7.727,18.712 L7.727,6.288 C7.730,5.713 8.198,5.250 8.773,5.252 L9.818,5.252 L9.818,4.217 C9.818,3.640 10.286,3.172 10.864,3.172 C11.441,3.172 11.909,3.640 11.909,4.217 L11.909,5.253 L14.000,5.253 L14.000,4.217 C14.000,3.640 14.469,3.172 15.046,3.173 C15.623,3.173 16.090,3.641 16.091,4.217 L16.091,5.813 C18.068,6.928 18.767,9.435 17.651,11.413 C17.419,11.823 17.118,12.191 16.762,12.500 C17.663,13.281 18.181,14.414 18.182,15.606 ZM14.000,7.323 L9.818,7.323 L9.818,11.465 L14.000,11.465 C15.144,11.482 16.084,10.568 16.101,9.425 C16.118,8.281 15.205,7.340 14.061,7.323 C14.041,7.323 14.020,7.323 14.000,7.323 ZM14.000,13.535 L9.818,13.535 L9.818,17.677 L14.000,17.677 C15.144,17.694 16.084,16.780 16.101,15.637 C16.118,14.493 15.205,13.552 14.061,13.535 C14.041,13.535 14.020,13.535 14.000,13.535 Z"/>
                    </svg>
                    <!--<span class="tooltiptext2" v-if="comingSoon" style="padding:6px;">Comming Soon</span>-->
                    <label>BTC DEPOSIT</label>
                </div>

            </div>
        </div>

        <modal class="modal" name="openAddAccountModal">
            <addAccount-app/>
        </modal>
        <modal class="modal" name="wallet_info">
            <walletInfo :accountHash="accountHash"></walletInfo>
        </modal>
        <modal class="modal" name="suffibalance">
            <insuficentBalance ></insuficentBalance>
        </modal>

    </div>

</template>

<script>
    import WalletInfo from './ViewAccount/WalletInfo';
    import insuficentBalance from '../insuficentBalance';
    import QrcodeVue from 'qrcode.vue';
    import {web3} from '../../../../main/libs/config';
    import { clipboard, dialog } from 'electron';
    import os from 'os';
    import  * as child_process from 'child_process';
    // var web3 = startConnectWeb();
    import AddAccount from './AddAccount';
    export default {
        name: 'Accounts',
        components:{
            'walletInfo': WalletInfo,
            'insuficentBalance': insuficentBalance,
            'addAccount-app': AddAccount,
            'qrcode-vue': QrcodeVue,
        },
        data() {
          return {
              accountTitle: '',
              accountbalance: '',
              accountHash: '',
              accountHashError: '',
              comingSoon: false,
              copiedtip: false,
              copiedtip1: false,
              balance: '',
              size: 116,
              web3,
              loader: true,
              searchTxn: '',
              txndetaildata: '',
              option: '',
          };
        },
        computed: {
            accounts() {
                this.expaccounts = this.$store.state.allAccounts;
                return this.expaccounts;
            },
            defaultCurrencyData() {
                this.defaultSign = this.$store.state.ac_dcurrency ;
                // console.log(this.defaultSign, "this.defaultSign -----------------------------")
                return this.defaultSign;
            },
            accPriceData() {
                var curr = this.defaultCurrencyData === "$" ?  'USD':this.defaultCurrencyData;
                this.accbprice = this.$store.state.currencies && this.$store.state.currencies[curr].PRICE.replace(/[^0-9\.]/g, '');
                return this.accbprice;
            },
            totalBalanceData: function(){
                let tb = this.$store.state.total_balance;
                return tb;
            },
        },
        created(){
            console.log(web3, this.accountHash,"web3")
            let that = this;
            that.intervalid1 = setInterval(() => {
                if (that.accounts.length > 0 && that.accounts !== ' ') {
                    that.accounts.map((account_hash) => {
                        if(account_hash){
                            web3.eth.getCoinbase().then((res)=> {
                                // console.log(res);
                                if(account_hash.hash) {
                                    if (res == (account_hash.hash).toLowerCase()){
                                        // console.log(account_hash, "account_hash");
                                        that.accountTitle = account_hash.accountTitle;
                                        that.accountHash = account_hash.hash;
                                        that.accountbalance = account_hash.balance;
                                        // console.log(that.accountbalance, "accountbalance");
                                        clearInterval(that.intervalid1)
                                    }
                                }
                            });
                        }
                    })
                }
            }, 100);
        },
        methods: {
            mainMenu(type){
                console.log(type, type === 'send')
                if(type === 'details') {
                    this.$router.push({
                        path: '/accountdetails',
                        query: { accountDetail: this.accountHash }
                    });
                } else {
                    if (this.totalBalanceData > 0) {
                        this.$router.push({
                            path: '/transferfunds'
                        });
                        this.transferfundTab = 'tablinks active';
                    }else if(this.totalBalanceData === 0){
                        this.show2();
                    }
                }
            },
            handletooltip(tip){
                console.log(tip, tip === 'comingSoon')
                if(tip === 'comingSoon'){
                    this.$router.push({
                        path: '/currencyconverter'
                    });
                    // this.comingSoon = true;
                    // this.copiedtip = false;
                    // setTimeout(() =>{
                    //     this.comingSoon = false;
                    // },1000);
                } else {
                    var copyText = this.accountHash;
                    if (copyText) {
                        clipboard.writeText(copyText, 'selected');
                    }
                    this.copiedtip = true;
                    this.comingSoon = false;
                    setTimeout(() => {
                        this.copiedtip = false;
                    },2000);
                }
            },
            show () {
                this.$modal.show('openAddAccountModal');
            },
            hide () {
                this.$modal.hide('openAddAccountModal');
            },
            show1 () {
                this.$modal.show('wallet_info', { accountHash: this.accountHash });
            },
            show2 () {
                this.$modal.show('suffibalance');
            },
            hide1 () {
                this.$modal.hide('suffibalance');
            },
            openGanderUrl(url){
                console.log(url);
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
    .qrCodevue {
        padding: 10px!important;
        width: 101px!important;
        height: 101px!important;
        background: white!important;
    }
    .multiselect__select{
        top: 5px !important;
    }

</style>


<style>
    @import "../../../../../static/modalcomponent.css";
</style>
