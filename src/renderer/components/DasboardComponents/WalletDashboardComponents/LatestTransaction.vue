<template>
    <div class="accounts">
        <div class="top">
            <label>ACCOUNTS</label>

            <div>
                <button class="button view-token-btn" @click="openTokens('tokens')" data-modal="modal-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="555" height="555" viewBox="0 0 555 555">
                        <path id="Rounded_Rectangle_3" data-name="Rounded Rectangle 3"  d="M177.293,546.928l-47.762-47.762A54.33,54.33,0,0,0,57,426.639L8.072,377.707a27.571,27.571,0,0,1,0-38.991L338.716,8.072a27.571,27.571,0,0,1,38.991,0l48.2,48.2a54.33,54.33,0,0,0,74,74l47.028,47.027a27.571,27.571,0,0,1,0,38.991L216.284,546.928A27.571,27.571,0,0,1,177.293,546.928Zm279.566-317a11.029,11.029,0,0,0,0-15.6L340.665,98.142a11.028,11.028,0,0,0-15.6,0L96.192,327.019a11.028,11.028,0,0,0,0,15.6L212.385,458.808a11.028,11.028,0,0,0,15.6,0ZM217.064,441.652L113.348,337.936a5.515,5.515,0,0,1,0-7.8l216.01-216.01a5.513,5.513,0,0,1,7.8,0L440.872,217.844a5.513,5.513,0,0,1,0,7.8l-216.01,216.01A5.515,5.515,0,0,1,217.064,441.652Z"></path>
                    </svg>
                    <span>View Tokens</span>
                </button>
                <button class="button view-contract-btn" @click="openTokens('contracts')" data-modal="modal-3">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="34px"
                        height="39px" viewBox="0 0 45 52" v-bind:style="{enableBackground:'new 0 0 45 52'}" xml:space="preserve">
                        <path id="Rounded_Rectangle_1_copy_1_" class="icon" d="M44,52H12c-0.6,0-1-0.4-1-1V41H1c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1h32
                        c0.6,0,1,0.4,1,1v10h10c0.6,0,1,0.4,1,1v39C45,51.6,44.6,52,44,52z M32,2H2v37h9v-3h2v3h19V13h-3v-2h3V2z M43,13h-9v27
                        c0,0.6-0.4,1-1,1H13v9h30V13z M22,11h5v2h-5V11z M16,11h4v2h-4V11z M13,14h-2v-3h3v2h-1V14z M13,20h-2v-3h2V20z M13,27h-2v-4h2V27z
                        M13,33h-2v-4h2V33z"></path>
                    </svg>
                    <span>View Contracts</span>
                </button>
            </div>
        </div>
        <div class="bottom accounts-list">
            <div v-if="accountdetailTab && (account && account.accountTitle)" v-for="(account, key ) in accounts" class="account1 a1" :data-index="parseInt(key + 1)"  @click="mainMenu($event,account.hash,'notwatch')">
                <div v-if="account.isHd" class="wallet-icon"></div>
                <div class="img">
                    <div v-if="account.tokens && (account.token_icons.length > 0 && account.token_icons.length < 3)" v-for="(ac_tokens, key ) in account.token_icons" class="icons">
                        <svg :class="'svg-1 svg'+ parseInt(key + 1)" v-bind:style="{fill: ac_tokens.color, enableBackground: 'new 0 0 43 43'}"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px" y="0px" width="43px" height="43px" viewBox="0 0 43 43" xml:space="preserve">
                        <circle class="st012" cx="21.5" cy="21.5" r="21.5"/>
                        <rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4"/>
                        <rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4"/>
                        <rect x="28.9" y="9.2" class="st125" width="4.9" height="4.8"/>
                        <rect x="14.3" y="15.6" class="st125" width="14.6" height="8"/>
                        <rect x="9.4" y="9.2" class="st125" width="4.9" height="4.8"/>
                        <rect x="1.2" y="18.7" class="st125" width="6.5" height="6.4"/>
                        <rect x="6.1" y="26.7" class="st125" width="9.7" height="9.6"/>
                        <rect x="17.5" y="25.1" class="st125" width="8.1" height="15.9"/>
                        <rect x="27.3" y="26.7" class="st125" width="9.7" height="9.6"/>
                        </svg>
                    </div>
                    <svg  :class="'svg-1 svg' + parseInt(key + 1)" v-bind:style="{fill:account.color, enableBackground: 'new 0 0 43 43'}"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="43px" height="43px" viewBox="0 0 43 43" xml:space="preserve">
                    <circle class="st012" cx="21.5" cy="21.5" r="21.5"/>
                    <rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4"/>
                    <rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4"/>
                    <rect x="28.9" y="9.2" class="st125" width="4.9" height="4.8"/>
                    <rect x="14.3" y="15.6" class="st125" width="14.6" height="8"/>
                    <rect x="9.4" y="9.2" class="st125" width="4.9" height="4.8"/>
                    <rect x="1.2" y="18.7" class="st125" width="6.5" height="6.4"/>
                    <rect x="6.1" y="26.7" class="st125" width="9.7" height="9.6"/>
                    <rect x="17.5" y="25.1" class="st125" width="8.1" height="15.9"/>
                    <rect x="27.3" y="26.7" class="st125" width="9.7" height="9.6"/>
                    </svg>
                </div>
                <div class="details">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px" y="0px" width="15.2px" height="21.9px" viewBox="0 0 15.2 21.9" style="enable-background:new 0 0 15.2 21.9;"
                            xml:space="preserve">
                            <path class="key1" d="M8.6,2.3c0.3,0.2,0.3,0.5,0.2,0.8C8.6,3.3,8.3,3.4,8,3.3L7,2.7L6.3,3.8C6,4.3,6.1,5,6.6,5.3
                            c0,0,0,0,0,0L9,6.7l3-5.2L9.7,0.1C9.1-0.2,8.5,0,8.2,0.5c0,0,0,0,0,0L7.5,1.7L8.6,2.3z M7,12.4C7,12.4,7,12.4,7,12.4l-0.6-0.2
                            c-2.1-1.2-4.7-0.4-5.9,1.7c-1.1,2-0.4,4.6,1.6,5.8l3,1.7c2.1,1.2,4.7,0.4,5.9-1.7c1.1-2,0.4-4.6-1.6-5.8l-0.6-0.3c0,0,0.1,0,0.1,0
                            L15,3c0.3-0.5,0.2-1.2-0.3-1.5s-1.2-0.2-1.5,0.3c0,0-0.1,0.1-0.1,0.1L7,12.4z M9.1,18.7c-0.6,1-1.9,1.4-2.9,0.8l-3-1.7
                            c-1-0.6-1.4-1.9-0.8-2.9s1.9-1.4,2.9-0.8l0,0l3,1.7C9.3,16.4,9.6,17.7,9.1,18.7z"/>
                            </svg>
                        <label>{{ account.accountTitle }} </label>
                        <span>({{defaultCurrencyData === '$'? '$':""}} {{ (parseFloat(accPriceData) * account.balance).toFixed(5)}} {{defaultCurrencyData !== '$'? defaultCurrencyData:""}})</span>
                        <!--<span>({{ account.balance }}   EXP)</span>-->
                    </div>
                    <div>
                        <p class="tooltip accoundID wd180">{{ account.hash }}
                            <span class="tooltiptext parrentFont">{{ account.hash }}</span>
                        </p>
                    </div>
                    <div v-if="account.tokens && (account.token_icons.length > 2)" class="icons2">
                        <div v-for="(ac_tokens, key ) in account.token_icons" class="icons">
                            <svg  :class="'svg-1 svg'+parseInt(key + 1)" v-bind:style="{fill: ac_tokens.color , enableBackground: 'new 0 0 43 43'}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px" y="0px" width="43px" height="43px" viewBox="0 0 43 43" style="enable-background:new 0 0 43 43;" xml:space="preserve">
                            <circle class="st012" cx="21.5" cy="21.5" r="21.5"/>
                            <rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4"/>
                            <rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4"/>
                            <rect x="28.9" y="9.2" class="st125" width="4.9" height="4.8"/>
                            <rect x="14.3" y="15.6" class="st125" width="14.6" height="8"/>
                            <rect x="9.4" y="9.2" class="st125" width="4.9" height="4.8"/>
                            <rect x="1.2" y="18.7" class="st125" width="6.5" height="6.4"/>
                            <rect x="6.1" y="26.7" class="st125" width="9.7" height="9.6"/>
                            <rect x="17.5" y="25.1" class="st125" width="8.1" height="15.9"/>
                            <rect x="27.3" y="26.7" class="st125" width="9.7" height="9.6"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="accountWatch" v-for="(account, key ) in WatchAccounts" class="account1 a1" :data-index="parseInt(key + 1)"  @click="mainMenu($event,account.hash,'watch')">
                <div class="watchEye-icon"></div>
                <div class="img">
                    <div v-if="account.tokens && (account.token_icons.length > 0 && account.token_icons.length < 3)" v-for="(ac_tokens, key ) in account.token_icons" class="icons">
                        <svg :class="'svg-1 svg'+ parseInt(key + 1)" v-bind:style="{fill: ac_tokens.color, enableBackground: 'new 0 0 43 43'}"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px" y="0px" width="43px" height="43px" viewBox="0 0 43 43" xml:space="preserve">
                        <circle class="st012" cx="21.5" cy="21.5" r="21.5"/>
                        <rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4"/>
                        <rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4"/>
                        <rect x="28.9" y="9.2" class="st125" width="4.9" height="4.8"/>
                        <rect x="14.3" y="15.6" class="st125" width="14.6" height="8"/>
                        <rect x="9.4" y="9.2" class="st125" width="4.9" height="4.8"/>
                        <rect x="1.2" y="18.7" class="st125" width="6.5" height="6.4"/>
                        <rect x="6.1" y="26.7" class="st125" width="9.7" height="9.6"/>
                        <rect x="17.5" y="25.1" class="st125" width="8.1" height="15.9"/>
                        <rect x="27.3" y="26.7" class="st125" width="9.7" height="9.6"/>
                        </svg>
                    </div>
                    <svg  :class="'svg-1 svg' + parseInt(key + 1)" v-bind:style="{fill:account.color, enableBackground: 'new 0 0 43 43'}"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="43px" height="43px" viewBox="0 0 43 43" xml:space="preserve">
                    <circle class="st012" cx="21.5" cy="21.5" r="21.5"/>
                    <rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4"/>
                    <rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4"/>
                    <rect x="28.9" y="9.2" class="st125" width="4.9" height="4.8"/>
                    <rect x="14.3" y="15.6" class="st125" width="14.6" height="8"/>
                    <rect x="9.4" y="9.2" class="st125" width="4.9" height="4.8"/>
                    <rect x="1.2" y="18.7" class="st125" width="6.5" height="6.4"/>
                    <rect x="6.1" y="26.7" class="st125" width="9.7" height="9.6"/>
                    <rect x="17.5" y="25.1" class="st125" width="8.1" height="15.9"/>
                    <rect x="27.3" y="26.7" class="st125" width="9.7" height="9.6"/>
                    </svg>
                </div>
                <div class="details">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px" y="0px" width="15.2px" height="21.9px" viewBox="0 0 15.2 21.9" style="enable-background:new 0 0 15.2 21.9;"
                            xml:space="preserve">
                            <path class="key1" d="M8.6,2.3c0.3,0.2,0.3,0.5,0.2,0.8C8.6,3.3,8.3,3.4,8,3.3L7,2.7L6.3,3.8C6,4.3,6.1,5,6.6,5.3
                            c0,0,0,0,0,0L9,6.7l3-5.2L9.7,0.1C9.1-0.2,8.5,0,8.2,0.5c0,0,0,0,0,0L7.5,1.7L8.6,2.3z M7,12.4C7,12.4,7,12.4,7,12.4l-0.6-0.2
                            c-2.1-1.2-4.7-0.4-5.9,1.7c-1.1,2-0.4,4.6,1.6,5.8l3,1.7c2.1,1.2,4.7,0.4,5.9-1.7c1.1-2,0.4-4.6-1.6-5.8l-0.6-0.3c0,0,0.1,0,0.1,0
                            L15,3c0.3-0.5,0.2-1.2-0.3-1.5s-1.2-0.2-1.5,0.3c0,0-0.1,0.1-0.1,0.1L7,12.4z M9.1,18.7c-0.6,1-1.9,1.4-2.9,0.8l-3-1.7
                            c-1-0.6-1.4-1.9-0.8-2.9s1.9-1.4,2.9-0.8l0,0l3,1.7C9.3,16.4,9.6,17.7,9.1,18.7z"/>
                            </svg>
                        <label>{{ account.accountTitle }} </label>
                        <span>({{defaultCurrencyData === '$'? '$':""}} {{ (parseFloat(accPriceData) * account.balance).toFixed(6)}} {{defaultCurrencyData !== '$'? defaultCurrencyData:""}})</span>
                    </div>
                    <div>
                        <p class="tooltip accoundID wd180">{{ account.hash }}
                            <span class="tooltiptext parrentFont">{{ account.hash }}</span>
                        </p>
                    </div>
                    <div v-if="account.tokens && (account.token_icons.length > 2)" class="icons2">
                        <div v-for="(ac_tokens, key ) in account.token_icons" class="icons">
                            <svg  :class="'svg-1 svg'+parseInt(key + 1)" v-bind:style="{fill: ac_tokens.color , enableBackground: 'new 0 0 43 43'}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px" y="0px" width="43px" height="43px" viewBox="0 0 43 43" style="enable-background:new 0 0 43 43;" xml:space="preserve">
                            <circle class="st012" cx="21.5" cy="21.5" r="21.5"/>
                            <rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4"/>
                            <rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4"/>
                            <rect x="28.9" y="9.2" class="st125" width="4.9" height="4.8"/>
                            <rect x="14.3" y="15.6" class="st125" width="14.6" height="8"/>
                            <rect x="9.4" y="9.2" class="st125" width="4.9" height="4.8"/>
                            <rect x="1.2" y="18.7" class="st125" width="6.5" height="6.4"/>
                            <rect x="6.1" y="26.7" class="st125" width="9.7" height="9.6"/>
                            <rect x="17.5" y="25.1" class="st125" width="8.1" height="15.9"/>
                            <rect x="27.3" y="26.7" class="st125" width="9.7" height="9.6"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="contractinfo">
            <label>Most exchanges don't support receiving exp from a contract wallet yet. Be sure to move the
                money to an account address first!</label>
            <!--   <button>

                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px"
                    viewBox="0 0 45 52" style="enable-background:new 0 0 45 52;" xml:space="preserve">
                    <path class="show" d="M44,52H12c-0.6,0-1-0.4-1-1V41H1c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1h32c0.6,0,1,0.4,1,1v10h10c0.6,0,1,0.4,1,1
                    v39C45,51.6,44.6,52,44,52z M32,2H2v37h9v-3h2v3h19V13h-3v-2h3V2z M43,13h-9v27c0,0.6-0.4,1-1,1H13v9h30V13z M22,11h5v2h-5V11z
                    M16,11h4v2h-4V11z M13,14h-2v-3h3v2h-1V14z M13,20h-2v-3h2V20z M13,27h-2v-4h2V27z M13,33h-2v-4h2V33z"
                    />
                </svg>

                Show Contract Info
            </button> -->
        </div>

        <div class="latestTransaction">
            <div class="header">
                <h1>Latest Transactions</h1>
                <div class="search">
                    <input type="text" name="fname" v-model="searchTxn" @change="handletxn(0)" placeholder="Filter Transaction" id="filterMainTransaction">
                    <button class="search">
                        <img src="../../../assets/img/search.svg">
                    </button>
                </div>
            </div>
            <div class="transactionContent dashboardTransactionContent">
                <div v-if="loader" class="loader transactionLoader">
                    <div class="outerCircle">
                        <img src="../../../assets/img/outer.png">
                    </div>
                    <div class="innerCircle">
                        <img src="../../../assets/img/inner.png">
                    </div>
                </div>
                <div>
                    <div @click="handletxdetail(transaction)" v-if="istransactions && transaction.Type != 'mined_transaction'" v-for="(transaction, index) in filtertransaction? filtertransaction: transactions" class="row transactionDetail md-trigger" data-modal="modal-4" :data-transactionid="transaction.hash">
                        <label class="date">{{ parseInt(transaction.timeUnixEpoch) * 1000 | moment("MMM-DD")}}</label>
                        <label v-if="transaction.status && transaction.status === '0x1'" class="status statstf"><strong>Completed</strong></label>
                        <label v-else-if="transaction.status && transaction.status === '0x0'" class="status statstf">Failed</label>
                        <label v-else-if="transaction.status === ''" class="status statstf">Pending</label>
                        <div class="account">
                            <div class="fromAccount">{{transaction.from?transaction.from:'From'}}</div>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="19px" viewBox="0 0 11 19" style="enable-background:new 0 0 11 19;" xml:space="preserve">
                            <path class="arrow" d="M0,11.6V19l0,0l11-9.4L0,0l0,0V11.6z"></path>
                        </svg>
                            <div class="toAccount">{{transaction.to}}</div>
                        </div>
                        <label class="amount">
                            <span >{{ web3.utils.fromWei(transaction.valueInWei.toString(), 'ether')?parseFloat(web3.utils.fromWei(transaction.valueInWei.toString(), 'ether')).toFixed(4):0}} Exp</span>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 35 35" style="enable-background:new 0 0 35 35;" xml:space="preserve">
                            <path class="open" d="M0,17.5C0,7.8,7.8,0,17.5,0S35,7.8,35,17.5S27.2,35,17.5,35S0,27.2,0,17.5z M31.5,17.5c0-7.7-6.3-14-14-14s-14,6.3-14,14s6.3,14,14,14S31.5,25.2,31.5,17.5z M10.8,17.9l0.8-0.2L10.8,17.9l8.4-11.5l1.6,1.2l-7.5,10.3l7.7,10L19.3,29L10.8,17.9z"></path>
                        </svg>
                        </label>
                    </div>
                </div>
                <div v-if="notransactions" >
                    <h3 class="notrnas">No Transactions Found</h3>
                </div>
            </div>

            <div v-if="transactions">
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
        <modal class="modal" name="txndetals">
            <transactiondetail :txndetaildata="txndetaildata"></transactiondetail>
        </modal>
    </div>
</template>

<script>
    import Paginate from 'vuejs-paginate'

    import { sortbyEXPBalance, watchOnlyAccounts} from './walletcommon';
    import axios from 'axios';
    import object_hash from 'object-hash';
    import {web3} from '../../../../main/libs/config';
    import Transactiondetail from './Transactiondetail';
    import * as Raven from 'raven-js';

    // var web3 = startConnectWeb();
    export default {
        name: 'latestTransaction',
        data() {
            return {
                accountdetailTab: false,
                simpleaccountTab: false,
                expaccounts: '',
                watchaccounts: '',
                loader: true,
                istransactions: false,
                searchTxn: '',
                addhashes: '',
                transactions: '',
                web3,
                notransactions: false,
                accountWatch: false,
                txndetaildata: '',
                defaultSign: '',
                accbprice: '',
                initialPage: 0,
                forcePage: 0,
                totalcount: 0,
            };
        },
        components : {
            'transactiondetail': Transactiondetail,
            'paginate': Paginate,
        },
        computed: {
            accounts() {
                this.expaccounts = this.$store.state.allAccounts;
                return this.expaccounts;
            },
            hashaccounts() {
                this.addhashes = this.$store.state.addresseshash;
                return this.addhashes;
            },
            WatchAccounts() {
                this.watchaccounts = this.$store.state.watchAccounts ;
                return this.watchaccounts;
            },
            defaultCurrencyData() {
                this.defaultSign = this.$store.state.ac_dcurrency ;
                // console.log(this.defaultSign, "this.defaultSign -----------------------------")
                return this.defaultSign;
            },
            accPriceData() {
                var curr = this.defaultCurrencyData === "$" ?  'USD':this.defaultCurrencyData;
                // console.log(curr, "cur-----")
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
        created(){
            let pageNo = this.$router.history.current.query.page_no;
            if(pageNo) {
                this.initialPage = parseInt(pageNo);
                this.forcePage =  parseInt(pageNo);
            } else {
                this.initialPage = 0;
                this.forcePage =  0;
            }
            this.intervalid1 = setInterval(() => {
                if(this.accounts.length > 0 ){
                    this.accountdetailTab = true;
                    this.accountWatch = true;
                    if(this.hashaccounts.length > 0){
                        this.istransactions = true;
                        var postData = {
                            skip: 0,
                            limit: 15,
                            addresses: this.hashaccounts,
                        }
                        this.fetch(postData);
                        clearInterval(this.intervalid1);
                    }
                } else {
                    this.accountdetailTab = false;
                    this.istransactions = false;
                    this.loader = true;
                }
            }, 100);
        },
        methods: {
            clickCallback (pageNum) {
                // console.log(pageNum)
                this.handletxn(pageNum);
                this.$router.push(this.$router.history.current.path+"?page_no="+pageNum);
            },
            show () {
                this.$modal.show('txndetals');
            },
            hide () {
                this.$modal.hide('txndetals');
            },
            mainMenu(e, account_hash, option){
                this.$router.push({
                    path: '/accountdetails',
                    query: { accountDetail:  account_hash, option: option}
                });
            },
            openTokens(type){
                if(type== 'contracts') {
                    this.$router.push({
                        path: '/contracts',
                    });
                } else {
                    this.$router.push({
                        path: '/token',
                    });
                }
            },
            handletxn(skip) {
                if(this.searchTxn){
                    // let postData = {
                    //     skip: 0,
                    //     limit: 15,
                    //     addresses: [this.searchTxn],
                    // };
                    // this.fetch(postData);
                } else {
                    this.loader = true;
                    this.istransactions = false;
                    let postData = {
                        skip: skip * 15,
                        limit: 15,
                        addresses: this.hashaccounts,
                    };
                    this.initialPage = parseInt(skip);
                    this.forcePage =  parseInt(skip);
                    this.fetch(postData);
                }
            },
            fetch(postData){
                var transaction_list_hash ,updated_transaction_list_hash;
                axios.post('https://api.gander.tech/getalltransactionsbyaddressarray', postData)
                .then((response) => {
                    this.notransactions = false;
                    this.istransactions = true;
                    this.transactions = response.data.data.transactions;
                    this.totalcount = Math.floor( (response.data.data.count ) /  15);
                    if(this.transactions && this.transactions.length>0){
                        transaction_list_hash = object_hash(this.transactions);
                        this.loader = false;
                        if(transaction_list_hash == updated_transaction_list_hash && !this.searchTxn){
                            return false;
                        }else{
                            updated_transaction_list_hash = transaction_list_hash;
                        }
                    }else {
                        this.notransactions = true;
                        this.istransactions = false;
                        this.loader = false;
                    }
                })
                .catch((error) => {
                    Raven.captureException(error);
                    console.log(error);
                });
            },
            handletxdetail(txn){
                if(txn.hash){
                    this.txndetaildata = txn.hash;
                } else if(txn.transactionHash) {
                    this.txndetaildata = txn.transactionHash;
                }
                this.show();
            }
        }
    }
</script>

<style>

    .notrnas {
        margin: 0px auto;
        width: 178px;
        text-align: center;
    }
    .statstf {
        text-transform: capitalize;
    }

</style>
