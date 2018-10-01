<template>
    <div class="accounts">
        <div class="top">
            <label>ACCOUNTS</label>
        </div>
        <div class="bottom accounts-list">
            <div v-if="accountdetailTab" v-for="(account, key ) in accounts" class="account1 a1" :data-index="parseInt(key + 1)"  @click="mainMenu($event,account.hash)">
                <div v-if="account.isHd" class="wallet-icon"></div>
                <div class="img">
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
                        <span>({{ account.balance }}   EXP)</span>
                    </div>
                    <div>
                        <p class="tooltip accoundID wd180">{{ account.hash }}
                            <span class="tooltiptext parrentFont">{{ account.hash }}</span>
                        </p>
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
                    <input type="text" name="fname" placeholder="Filter Transaction" id="filterMainTransaction">
                    <button class="search">
                        <img src="../../../assets/img/search.svg">
                    </button>
                </div>
            </div>
            <div class="transactionContent dashboardTransactionContent">
                <div class="loader transactionLoader">
                    <div class="outerCircle">
                        <img src="../../../assets/img/outer.png">
                    </div>
                    <div class="innerCircle">
                        <img src="../../../assets/img/inner.png">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { sortbyEXPBalance, watchOnlyAccounts} from './walletcommon';
    export default {
        name: 'latestTransaction',
        data() {
            return {
                accountdetailTab: false,
                simpleaccountTab: false,
                expaccounts: '',
                watchaccounts: '',
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
        },
        created(){
            if(this.accounts.length > 0 ){
                this.accountdetailTab = true;
            }
        },
        methods: {
            mainMenu(e, account_hash){
                this.$router.push({
                    path: '/accountdetails',
                    query: { accountDetail:  account_hash}
                });
            }
        }
    }
</script>

<style>

</style>
