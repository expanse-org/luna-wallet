<template>
    <div class="main-container dashboard archive-accounts">
        <div class="create-acccount content">
            <div class="accounts">
                <div class="top">
                    <label>Archive Accounts</label>
                    <!-- <label>No Records Found</label> -->
                </div>
                <div class="accounts-list">
                    <div v-for="(account, key) in userAccounts" class="a1">
                        <div @click="handleunarchive(account.hash)" class="unarchive-icon un_archive_account" :data-val="account.hash">
                        </div>
                        <div class="link token_edit" :data-index="parseInt(key + 1)" :data-val="account.hash">
                            <div class="img">
                                <svg :class="'svg-1 svg'+parseInt(key + 1)" v-bind:style="{fill: account.color, enableBackground:'new 0 0 43 43' }"
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
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
                            <div class="details">
                                <div>
                                    <div>
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        x="0px" y="0px" width="15.2px" height="21.9px" viewBox="0 0 15.2 21.9" v-bind:style="{enableBackground: 'new 0 0 15.2 21.9'}"
                                        xml:space="preserve">
                                        <path class="key1" d="M8.6,2.3c0.3,0.2,0.3,0.5,0.2,0.8C8.6,3.3,8.3,3.4,8,3.3L7,2.7L6.3,3.8C6,4.3,6.1,5,6.6,5.3
                                            c0,0,0,0,0,0L9,6.7l3-5.2L9.7,0.1C9.1-0.2,8.5,0,8.2,0.5c0,0,0,0,0,0L7.5,1.7L8.6,2.3z M7,12.4C7,12.4,7,12.4,7,12.4l-0.6-0.2
                                            c-2.1-1.2-4.7-0.4-5.9,1.7c-1.1,2-0.4,4.6,1.6,5.8l3,1.7c2.1,1.2,4.7,0.4,5.9-1.7c1.1-2,0.4-4.6-1.6-5.8l-0.6-0.3c0,0,0.1,0,0.1,0
                                            L15,3c0.3-0.5,0.2-1.2-0.3-1.5s-1.2-0.2-1.5,0.3c0,0-0.1,0.1-0.1,0.1L7,12.4z M9.1,18.7c-0.6,1-1.9,1.4-2.9,0.8l-3-1.7
                                            c-1-0.6-1.4-1.9-0.8-2.9s1.9-1.4,2.9-0.8l0,0l3,1.7C9.3,16.4,9.6,17.7,9.1,18.7z"/>
                                        </svg>
                                        <label>{{account.accountTitle}}</label>
                                    </div>
                                    <div>
                                        <p class="tooltip accoundID wd180"> {{account.hash}}
                                            <span class="tooltiptext parrentFont"> {{account.hash }}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getArchiveaccounts, getAllAcounts} from '../DasboardComponents/WalletDashboardComponents/walletcommon';
    import {startConnectWeb, web3} from '../../../main/libs/config';
    import {db} from '../../../../lowdbFunc';
    import {ipcRenderer} from 'electron';

    export default {
        name: 'ArchiveMain',
        data() {
            return{
                archiveaccount: '',
            };
        },
        computed: {
            userAccounts() {
                this.archiveaccount = this.$store.state.userAccounts;
                return this.archiveaccount;
            },
        },
        created(){
            this.intervalid1 = setInterval(() => {
                getArchiveaccounts();
                if(this.userAccounts && this.userAccounts.length >0) {
                    console.log(this.userAccounts);
                    clearInterval(this.intervalid1);
                }
            }, 100);
            setInterval(() => {
                getArchiveaccounts();
            }, 500);
           
        },
        methods: {
            handleunarchive(accounthash) {
                console.log(accounthash);
                var accountHash = accounthash;
                if (confirm("You want to Un Archive this account")){
                    db.get('accounts').find({ hash: accountHash }).assign({ archive : false }).write();
                    getArchiveaccounts();
                    if (typeof web3 !== 'undefined') {
                        getAllAcounts();
                    } else {
                        // set the provider you want from Web3.providers
                        startConnectWeb();
                        this.intervalid1 = setInterval(() => {
                            if(typeof web3 !== 'undefined' ){
                                getAllAcounts();
                                clearInterval(this.intervalid1)
                            }
                        }, 100);
                    }
                }
            }
        }
    }
</script>

<style>
    @import "../../assets/css/style.css";
</style>
