<template>
    <div class="accountDetails tabcontent" id="accountDetail">
        <div class="content">
            <div class="userInfo">
                <div class="curve"></div>
                <div class="left">
                    <div class="qrCodevue" >
                        <qrcode-vue :value="accountHash"  level="L"></qrcode-vue>
                    </div>
                    <div class="info detail-account">
                        <h1 class="update_account_title" @blur="changetitle" contenteditable="true">{{account && account.accountTitle}}</h1>
                        <label class="balance">{{defaultCurrencyData === '$'? '$':""}}  {{ (parseFloat(accPriceData) * (account && account.balance)).toFixed(5)}} {{defaultCurrencyData !== '$'? defaultCurrencyData:""}}</label>
                        <!-- <span class="currency-sign">EXP</span> -->
                        <p class="tooltip accoundID wd300 ">
                            <label class="detail-account-hash">{{accountHash}}</label>
                            <img v-if="account && account.isHd" class="hd-icon" src="../../../../assets/img/wallet.svg" />
                            <span class="tooltiptext parrentFont detail-account-hash">{{accountHash}}</span>
                            <input type="hidden" v-model="accountHash" class="detail-account-hash-input" />
                        </p>
                        <div class="btns">
                            <button @click="show" class=" button button--shikoba hd_account_detail md-trigger" data-modal="modal-5">
                                <img class="button__icon" src="../../../../assets/img/viewaccount.svg">
                                <span>wallet info</span>
                            </button>
                            <button @click="handleArchive" class="button button--shikoba move_account_to_archive">
                                <img class="button__icon" src="../../../../assets/img/archive.svg">
                                <span>Archive Account</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="actions">
                <div v-if="option!== 'watch'" class="showInterface transferFunds" data-account="0" data-balance="0" @click="mainMenu()">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="25px">
                        <path fill-rule="evenodd" fill="rgb(203, 77, 67)" d="M15.617,20.670 L12.281,24.426 C11.956,24.789 11.498,25.000 11.014,25.000 C10.530,25.000 10.072,24.789 9.747,24.426 L6.411,20.670 C5.786,19.969 5.844,18.872 6.545,18.239 C7.245,17.606 8.321,17.665 8.946,18.374 L9.305,18.779 L9.305,10.340 C9.305,9.386 10.063,8.618 11.022,8.618 C11.965,8.618 12.723,9.386 12.723,10.340 L12.723,18.779 L13.082,18.374 C13.707,17.665 14.783,17.606 15.483,18.239 C15.858,18.577 16.359,19.784 15.617,20.670 ZM9.521,6.761 C8.821,7.394 7.745,7.335 7.120,6.626 L6.761,6.221 L6.761,14.661 C6.761,15.615 6.003,16.383 5.060,16.383 C4.118,16.383 3.359,15.615 3.359,14.661 L3.359,6.221 L3.001,6.626 C2.376,7.335 1.300,7.394 0.599,6.761 C-0.109,6.128 -0.159,5.039 0.466,4.331 L3.801,0.575 C4.127,0.203 4.585,0.001 5.052,0.001 C5.536,0.001 5.994,0.212 6.320,0.575 L9.655,4.331 C10.347,5.149 9.897,6.424 9.521,6.761 Z"/>
                    </svg>
                    <label>Transfer Expanse & Tokens</label>
                </div>

                <div  v-if="option!== 'watch'" class="deposit tooltip2 copytext " @click="handletooltip('comingSoon')">
                    <!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In  -->
                    <svg class="up" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0.347in" height="0.347in">
                        <path fill-rule="evenodd" fill="rgb(203, 77, 67)" d="M12.500,25.000 C5.596,25.000 -0.000,19.404 -0.000,12.500 C-0.000,5.596 5.596,-0.000 12.500,-0.000 C19.404,-0.000 25.000,5.596 25.000,12.500 C25.000,19.404 19.404,25.000 12.500,25.000 L12.500,25.000 ZM12.500,2.273 C6.852,2.273 2.273,6.852 2.273,12.500 C2.273,18.148 6.852,22.727 12.500,22.727 C18.148,22.727 22.727,18.148 22.727,12.500 C22.727,6.852 18.148,2.273 12.500,2.273 ZM18.182,15.606 C18.178,17.088 17.380,18.455 16.091,19.187 L16.091,20.783 C16.091,21.360 15.623,21.828 15.045,21.828 C14.468,21.828 14.000,21.360 14.000,20.783 L14.000,20.783 L14.000,19.748 L11.909,19.748 L11.909,20.783 C11.909,21.361 11.441,21.829 10.864,21.829 C10.286,21.829 9.818,21.361 9.818,20.783 L9.818,19.748 L8.773,19.748 C8.198,19.750 7.730,19.287 7.727,18.712 L7.727,6.288 C7.730,5.713 8.198,5.250 8.773,5.252 L9.818,5.252 L9.818,4.217 C9.818,3.640 10.286,3.172 10.864,3.172 C11.441,3.172 11.909,3.640 11.909,4.217 L11.909,5.253 L14.000,5.253 L14.000,4.217 C14.000,3.640 14.469,3.172 15.046,3.173 C15.623,3.173 16.090,3.641 16.091,4.217 L16.091,5.813 C18.068,6.928 18.767,9.435 17.651,11.413 C17.419,11.823 17.118,12.191 16.762,12.500 C17.663,13.281 18.181,14.414 18.182,15.606 ZM14.000,7.323 L9.818,7.323 L9.818,11.465 L14.000,11.465 C15.144,11.482 16.084,10.568 16.101,9.425 C16.118,8.281 15.205,7.340 14.061,7.323 C14.041,7.323 14.020,7.323 14.000,7.323 ZM14.000,13.535 L9.818,13.535 L9.818,17.677 L14.000,17.677 C15.144,17.694 16.084,16.780 16.101,15.637 C16.118,14.493 15.205,13.552 14.061,13.535 C14.041,13.535 14.020,13.535 14.000,13.535 Z"/>
                    </svg>
                    <!--<span class="tooltiptext2" v-if="comingSoon" style="padding:6px;">Comming Soon</span>-->
                    <label>Fund with Bitcoin</label>
                </div>

                <div @click="openGanderUrl('https://gander.tech/address/'+accountHash)" class="view_on_external" data-href="">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26px" height="16px">
                        <path fill-rule="evenodd" fill="rgb(199, 75, 66)" d="M24.840,8.489 C24.617,8.795 19.295,16.000 12.499,16.000 C5.703,16.000 0.381,8.795 0.158,8.488 C-0.053,8.197 -0.053,7.802 0.158,7.511 C0.381,7.205 5.703,-0.000 12.499,-0.000 C19.295,-0.000 24.617,7.205 24.840,7.512 C25.052,7.802 25.052,8.197 24.840,8.489 ZM12.499,1.655 C7.482,1.655 3.155,6.435 1.873,7.999 C3.157,9.563 7.493,14.345 12.499,14.345 C17.516,14.345 21.843,9.565 23.125,8.001 C21.841,6.436 17.505,1.655 12.499,1.655 ZM12.499,12.966 C9.772,12.966 7.554,10.738 7.554,8.000 C7.554,5.262 9.772,3.034 12.499,3.034 C15.226,3.034 17.444,5.262 17.444,8.000 C17.444,10.738 15.226,12.966 12.499,12.966 ZM12.499,4.690 C10.681,4.690 9.203,6.175 9.203,8.000 C9.203,9.825 10.681,11.310 12.499,11.310 C14.317,11.310 15.796,9.825 15.796,8.000 C15.796,6.175 14.317,4.690 12.499,4.690 Z"/>
                    </svg>
                    <label>View on Gander</label>
                </div>

                <div class="btcDeposit tooltip2 copytext" @click="handletooltip('copiedtip')" data-val=".detail-account-hash-input">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26px" height="26px">
                        <path fill-rule="evenodd" fill="rgb(201, 76, 66)" d="M25.594,5.978 C25.323,5.707 24.994,5.571 24.607,5.571 L18.571,5.571 C17.991,5.571 17.372,5.765 16.714,6.152 L16.714,1.393 C16.714,1.006 16.579,0.677 16.308,0.406 C16.037,0.135 15.708,0.000 15.321,0.000 L9.286,0.000 C8.899,0.000 8.473,0.097 8.009,0.290 C7.545,0.483 7.177,0.716 6.906,0.987 L0.987,6.906 C0.716,7.177 0.483,7.545 0.290,8.009 C0.097,8.473 0.000,8.899 0.000,9.286 L0.000,19.036 C0.000,19.423 0.135,19.752 0.406,20.022 C0.677,20.293 1.006,20.429 1.393,20.429 L9.286,20.429 L9.286,24.607 C9.286,24.994 9.421,25.323 9.692,25.594 C9.963,25.865 10.292,26.000 10.678,26.000 L24.607,26.000 C24.994,26.000 25.323,25.865 25.594,25.594 C25.865,25.323 26.000,24.994 26.000,24.607 L26.000,6.964 C26.000,6.578 25.865,6.249 25.594,5.978 ZM16.714,8.662 L16.714,13.000 L12.376,13.000 L16.714,8.662 ZM7.428,3.090 L7.428,7.428 L3.090,7.428 L7.428,3.090 ZM10.272,12.478 C10.001,12.749 9.769,13.116 9.576,13.581 C9.382,14.045 9.286,14.470 9.286,14.857 L9.286,18.571 L1.857,18.571 L1.857,9.286 L7.893,9.286 C8.280,9.286 8.609,9.150 8.879,8.879 C9.150,8.609 9.286,8.280 9.286,7.893 L9.286,1.857 L14.857,1.857 L14.857,7.893 L10.272,12.478 ZM24.143,24.143 L11.143,24.143 L11.143,14.857 L17.178,14.857 C17.565,14.857 17.894,14.722 18.165,14.451 C18.436,14.180 18.571,13.851 18.571,13.464 L18.571,7.428 L24.142,7.428 L24.142,24.143 L24.143,24.143 Z"/>
                    </svg>
                    <span v-if="copiedtip" class="tooltiptext2">Copied</span>
                    <label>Copy Address</label>
                </div>
            </div>

            <div class="accounts">
                <div class="top h-hide">
                    <label>currency you have</label>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px">
                        <path fill-rule="evenodd" fill="rgb(255, 255, 255)" d="M12.000,24.000 C5.373,24.000 -0.000,18.627 -0.000,12.000 C-0.000,5.373 5.373,0.000 12.000,0.000 C18.627,0.000 24.000,5.373 24.000,12.000 C24.000,18.627 18.627,24.000 12.000,24.000 ZM16.772,7.997 L12.005,12.863 L7.233,7.992 L4.572,10.708 L11.995,18.285 L12.000,18.281 L14.656,15.569 L19.423,10.703 L16.772,7.997 Z"/>
                    </svg>
                </div>
                <div class="bottom">
                    <div class="currency-account">
                        <a v-if="account.tokens" v-for="(tokenHash, key) in account.token_icons">
                           <div>
                               <div class="left">
                                   <div class="circle">
                                       <svg version="1.1" class="svg-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="43px" height="43px"
                                            viewBox="0 0 43 43" v-bind:style="{enableBackground:'new 0 0 43 43',fill:tokenHash.color}" xml:space="preserve">
                                           <defs>
                                           </defs>
                                           <circle class="st012" cx="21.5" cy="21.5" r="21.5"></circle>
                                           <rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4"></rect>
                                           <rect x="28.9" y="9.2" class="st125" width="4.9" height="4.8"></rect>
                                           <rect x="14.3" y="15.6" class="st125" width="14.6" height="8"></rect>
                                           <rect x="1.2" y="18.7" class="st125" width="6.5" height="6.4"></rect>
                                           <rect x="6.1" y="26.7" class="st125" width="9.7" height="9.6"></rect>
                                           <rect x="17.5" y="25.1" class="st125" width="8.1" height="15.9"></rect>
                                           <rect x="27.3" y="26.7" class="st125" width="9.7" height="9.6"></rect>
                                       </svg>
                                   </div>
                                   <div class="content">
                                       <p>{{tokenHash.token_name}}</p>
                                       <p>{{ parseFloat(tokenHash.balance).toFixed(8) +' '+tokenHash.token_symbol}}</p>
                                       </div>
                                   </div>
                               <div v-if="option!== 'watch'" class="right">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="27px" height="27px">
                                       <path fill-rule="evenodd" fill="rgb(255, 255, 255)" d="M13.500,27.000 C6.044,27.000 -0.000,20.956 -0.000,13.500 C-0.000,6.044 6.044,-0.000 13.500,-0.000 C20.956,-0.000 27.000,6.044 27.000,13.500 C27.000,20.956 20.956,27.000 13.500,27.000 ZM21.504,5.459 C21.420,5.385 21.301,5.368 21.199,5.415 L2.864,13.963 C2.765,14.009 2.701,14.108 2.700,14.217 C2.699,14.326 2.760,14.426 2.858,14.474 L8.047,17.029 C8.142,17.076 8.256,17.065 8.341,17.002 L13.386,13.219 L9.425,17.306 C9.369,17.364 9.340,17.444 9.346,17.525 L9.740,22.678 C9.749,22.792 9.825,22.890 9.934,22.925 C9.963,22.935 9.993,22.939 10.022,22.939 C10.103,22.939 10.181,22.905 10.236,22.841 L12.990,19.639 L16.395,21.271 C16.469,21.307 16.554,21.308 16.629,21.275 C16.704,21.243 16.762,21.179 16.786,21.100 L21.588,5.757 C21.621,5.650 21.589,5.533 21.504,5.459 Z"></path>
                                       </svg>
                                   </div>
                               </div>
                           </a>
                    </div>
                </div>
            </div>
            <div class="note">
                <p class="regular">
                    <span>NOTE.</span> Accounts can’t display incoming transactions, but can receive, hold and send
                    Expanse. To see incoming transactions
                    <!-- <a href="#">create a wallet contract </a> to store expanse. -->
                    create a wallet contract to store expanse.
                </p>
                <p class="bold">
                    If your balance doesn’t seem updated, make sure that you are in sync with the network.
                </p>

            </div>

            <div v-if="!notransactions" class="latestTransaction">
                <div class="header">
                    <h1>Latest Transactions</h1>
                    <div class="search">
                        <input type="text" name="fname" v-model="searchTxn" @change="handletxn" placeholder="Filter Transaction" id="filterDetailsTransaction">
                        <button class="search">
                            <img src="../../../../assets/img/search.svg">
                        </button>
                    </div>

                </div>

                <div class="transactionContent accountDetailsTransactionContent">
                    <div v-if="loader" class="loader transactionLoader">
                        <div class="outerCircle">
                            <img src="../../../../assets/img/outer.png">
                        </div>
                        <div class="innerCircle">
                            <img src="../../../../assets/img/inner.png">
                        </div>
                    </div>
                    <div>
                        <div @click="handletxdetail(transaction)" v-for="(transaction, index) in filtertransaction? filtertransaction:transactions" v-if="istransactions&& transaction.Type != 'mined_transaction'"  class="row transactionDetail md-trigger" data-modal="modal-4" :data-transactionid="transaction.hash">
                            <label class="date">{{ transaction.timestampDecimal | moment("MMM-DD")}}</label>
                            <label v-if="transaction.transactionStatus && transaction.transactionStatus === 'Pending'" class="status statstf"><strong>{{transaction.transactionStatus}}</strong></label>
                            <label v-else-if="transaction.transactionStatus" class="status statstf">{{transaction.transactionStatus}}</label>
                            <label v-if="!transaction.transactionStatus && transaction.blockNumber" class="status">Completed</label>
                            <label v-else-if="!transaction.transactionStatus" class="status"><strong>Pending</strong></label>
                            <div class="account">
                                <div class="fromAccount">{{transaction.from?transaction.from:'From'}}</div>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="19px" viewBox="0 0 11 19" style="enable-background:new 0 0 11 19;" xml:space="preserve">
                            <path class="arrow" d="M0,11.6V19l0,0l11-9.4L0,0l0,0V11.6z"></path>
                        </svg>
                                <div class="toAccount">{{transaction.to}}</div>
                            </div>
                            <label class="amount">
                                <span >{{transaction.valueDecimal?parseFloat(transaction.valueDecimal).toFixed(4):0}} Exp</span>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 35 35" style="enable-background:new 0 0 35 35;" xml:space="preserve">
                            <path class="open" d="M0,17.5C0,7.8,7.8,0,17.5,0S35,7.8,35,17.5S27.2,35,17.5,35S0,27.2,0,17.5z M31.5,17.5c0-7.7-6.3-14-14-14s-14,6.3-14,14s6.3,14,14,14S31.5,25.2,31.5,17.5z M10.8,17.9l0.8-0.2L10.8,17.9l8.4-11.5l1.6,1.2l-7.5,10.3l7.7,10L19.3,29L10.8,17.9z"></path>
                        </svg>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <modal class="modal" name="wallet_info">
            <walletInfo :accountHash="accountHash"></walletInfo>
        </modal>
        <modal class="modal" name="suffibalance">
            <insuficentBalance ></insuficentBalance>
        </modal>
        <modal class="modal" name="txndetals">
            <transactiondetail :txndetaildata="txndetaildata"></transactiondetail>
        </modal>
    </div>
</template>

<script>
    import WalletInfo from './WalletInfo';
    import insuficentBalance from '../../insuficentBalance';
    import * as $ from 'jquery';
    import {web3} from '../../../../../main/libs/config';
    import {db} from '../../../../../../lowdbFunc';
    import { clipboard, dialog } from 'electron';
    import QrcodeVue from 'qrcode.vue';
    import axios from 'axios';
    import object_hash from 'object-hash';
    import {getAllAcounts, getArchiveaccounts} from '../walletcommon';
    import os from 'os';
    import Raven from 'raven';
    import  * as child_process from 'child_process';
    import Transactiondetail from '../Transactiondetail';

    export default {
        name: 'ViewAccount',
        data() {
            return{
                accountHash: '',
                account: '',
                accountHashError: '',
                comingSoon: false,
                copiedtip: false,
                balance: '',
                size: 116,
                web3,
                transactions: '',
                istransactions: false,
                notransactions: false,
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
            WatchAccounts() {
                this.watchaccounts = this.$store.state.watchAccounts ;
                return this.watchaccounts;
            },
            defaultCurrencyData() {
                this.defaultSign = this.$store.state.ac_dcurrency ;
                return this.defaultSign;
            },
            accPriceData() {
                var curr = this.defaultCurrencyData === "$" ?  'USD':this.defaultCurrencyData;
                this.accbprice = this.$store.state.currencies && this.$store.state.currencies[curr].PRICE.replace(/[^0-9\.]/g, '');
                return this.accbprice;
            },
            filtertransaction() {
                if(this.searchTxn.trim()){
                    return this.transactions.filter(item => {
                        return item.to.indexOf(this.searchTxn.toLowerCase()) > -1 || item.from.indexOf(this.searchTxn.toLowerCase()) > -1 || item.transactionStatus && item.transactionStatus.indexOf(this.searchTxn.toLowerCase()) > -1 || item.valueDecimal && (parseFloat(item.valueDecimal).toFixed(4)).indexOf(this.searchTxn.toLowerCase()) > -1
                    })
                }
            }
        },
        components: {
            'walletInfo': WalletInfo,
            'insuficentBalance': insuficentBalance,
            'qrcode-vue': QrcodeVue,
            'transactiondetail': Transactiondetail,
        },
        created() {
            // console.log(this.$router);
            this.notransactions = false;
            this.accountHash = this.$router.history.current.query.accountDetail;
            this.option = this.$router.history.current.query.option;
            if(this.option == 'watch') {
                this.intervalid3 = setInterval(() => {
                    if(this.WatchAccounts.length > 0 ){
                        this.WatchAccounts.map((account_hash) => {
                            console.log(account_hash,this.accountHash, "account_hash");
                            if(account_hash.hash === this.accountHash )
                            {
                                this.account = account_hash;
                                console.log(this.account, "account");
                            }
                        })
                        this.accountdetailTab = true;
                        this.istransactions = true;
                        var postData = {
                            skip: 0,
                            limit: 15,
                            addresses: [this.accountHash],
                        };
                        this.fetch(postData);
                    } else {
                        this.accountdetailTab = false;
                        this.istransactions = false;
                        this.loader = true;
                    }
                }, 100);
            } else {
                this.intervalid2 = setInterval(() => {
                    if(this.accounts.length > 0 ){
                        this.accounts.map((account_hash) => {
                            if(account_hash.hash === this.accountHash )
                            {
                                this.account = account_hash;
                                console.log(this.account, "account");
                            }
                        })
                        this.accountdetailTab = true;
                        this.istransactions = true;
                        var postData = {
                            skip: 0,
                            limit: 15,
                            addresses: [this.accountHash],
                        };
                        this.fetch(postData);
                    } else {
                        this.accountdetailTab = false;
                        this.istransactions = false;
                        this.loader = true;
                    }
                }, 100);
            }

        },
        methods: {
            show () {
                this.$modal.show('wallet_info', { accountHash: this.accountHash });
            },
            hide () {
                this.$modal.hide('wallet_info');
            },
            show1 () {
                this.$modal.show('suffibalance');
            },
            hide1 () {
                this.$modal.hide('suffibalance');
            },
            handleFocus(){

            },
            handleArchive(){
                if(this.account) {
                    if(confirm("Do You want to Archive this Account")){
                        db.get('accounts').find({ hash: this.accountHash }).assign({ archive : true }).write();
                        this.$router.push({
                            path: '/walletdashboard',
                        });
                        getAllAcounts();
                    }
                } else {
                }

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
            mainMenu(){
                if (this.account.balance > 0) {
                    this.$router.push({
                        path: '/transferfunds',
                        query: { hash:  this.accountHash},
                    });
                }else  if(this.account.balance){
                    this.show1();
                }
            },
            handletooltip(tip){
                if(tip === 'comingSoon'){
                    this.$router.push({
                        path: '/currencyconverter'
                    });
                    // this.comingSoon = true;
                    // this.copiedtip = false;
                    // setTimeout(() =>{
                    //     this.comingSoon = false;
                    // },1000);
                }else {
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
            handletxn() {
                if(this.searchTxn){
                    // let postData = {
                    //     skip: 0,
                    //     limit: 15,
                    //     addresses: [this.searchTxn],
                    // };
                    // this.fetch(postData);
                } else {
                    let postData = {
                        skip: 0,
                        limit: 15,
                        addresses: [this.accountHash],
                    };
                    this.fetch(postData);
                }
            },
            fetch(postData){
                this.notransactions = false;
                clearInterval(this.intervalid2);
                clearInterval(this.intervalid3);
                console.log(postData, "postData------");
                var transaction_list_hash ,updated_transaction_list_hash;
                axios.post('https://api.gander.tech/getalltransactionsbyaddressarray', postData)
                    .then((response) => {
                        this.istransactions = true;
                        this.notransactions = false;
                        this.transactions = response.data.message;
                        console.log(this.transactions === null ,"this.transactions ");
                        if(this.transactions && this.transactions.length > 0 ){
                            console.log(this.transactions ,"this.transactions ");
                            transaction_list_hash = object_hash(this.transactions);
                            this.loader = false;
                            if(transaction_list_hash == updated_transaction_list_hash && !this.searchTxn){
                                return false;
                            }else{
                                updated_transaction_list_hash = transaction_list_hash;
                            }
                        } else {
                            this.notransactions = true;
                            this.loader = false;
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        Raven.captureException(error);
                    });
            },
            handletxdetail(txn){
                // console.log(txn);
                if(txn.hash){
                    this.txndetaildata = txn.hash;
                } else if(txn.transactionHash) {
                    this.txndetaildata = txn.transactionHash;
                }
                this.showtxn();
            },
            showtxn () {
                this.$modal.show('txndetals');
            },
            changetitle(evt){
                let newtitle = evt.target.innerText;
                console.log(newtitle);
                db.get('accounts').find({ hash: this.accountHash }).assign({ accountTitle : newtitle}).write();
                // console.log(db.get('accounts').find({hash: this.accountHash}));
                getAllAcounts();
            }
        }
    }
</script>

<style >
    .qrCodevue {
        padding: 10px!important;
        width: 101px!important;
        height: 101px!important;
        background: white!important;
    }

    .statstf {
        text-transform: capitalize;
    }
</style>

<style>
    @import "../../../../../../static/modalcomponent.css";
</style>
