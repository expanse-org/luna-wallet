<template>
    <div id="transaction-modal" class="txns_details">
        <div class="popup  md-content ">
            <a href="#" @click="hide" class="btn-close md-close"></a>
            <div v-if="transaction" class="transaction transaction_details">
                <h2>Transaction</h2>
                <p class="trx_hash">
                    {{transaction.hash}}</p>
                <p class="trx_time">
                    {{parseInt(transaction.timeUnixEpoch) * 1000 | moment("LLLL")}}<br />
                    <span>({{transaction &&  transaction.timeUnixEpoch | moment("from", "now")}})</span>
                </p>
                <div class="table">
                    <div class="rows">
                        <label>Amount</label>
                        <div class="content">
                            <label class="trx_amount">
                                {{ web3.utils.fromWei(transaction.valueInWei.toString(), 'ether')?parseFloat(web3.utils.fromWei(transaction.valueInWei.toString(), 'ether')).toFixed(4):0}}
                                <span>EXP</span>
                            </label>
                        </div>
                    </div>
                    <div class="rows">
                        <label>From</label>
                        <div class="content">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="43px"
                                    height="43px" viewBox="0 0 43 43" style="enable-background:new 0 0 43 43;" xml:space="preserve">
                                    <defs>
                                    </defs>
                                    <circle class="st012" cx="21.5" cy="21.5" r="21.5" />
                                    <rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4" />
                                    <rect x="28.9" y="9.2" class="st125" width="4.9" height="4.8" />
                                    <rect x="14.3" y="15.6" class="st125" width="14.6" height="8" />
                                    <rect x="9.4" y="9.2" class="st125" width="4.9" height="4.8" />
                                    <rect x="1.2" y="18.7" class="st125" width="6.5" height="6.4" />
                                    <rect x="6.1" y="26.7" class="st125" width="9.7" height="9.6" />
                                    <rect x="17.5" y="25.1" class="st125" width="8.1" height="15.9" />
                                    <rect x="27.3" y="26.7" class="st125" width="9.7" height="9.6" />
                                </svg>
                            <label class="trx_from">
                                {{transaction && transaction.from}}
                            </label>
                        </div>
                    </div>
                    <div class="rows">
                        <label>To</label>
                        <div class="content">
                            <svg version="1.1" class="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    width="43px" height="43px" viewBox="0 0 43 43" style="enable-background:new 0 0 43 43;" xml:space="preserve">
                                    <defs>
                                    </defs>
                                    <circle class="st012" cx="21.5" cy="21.5" r="21.5" />
                                    <rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4" />
                                    <rect x="28.9" y="9.2" class="st125" width="4.9" height="4.8" />
                                    <rect x="14.3" y="15.6" class="st125" width="14.6" height="8" />
                                    <rect x="9.4" y="9.2" class="st125" width="4.9" height="4.8" />
                                    <rect x="1.2" y="18.7" class="st125" width="6.5" height="6.4" />
                                    <rect x="6.1" y="26.7" class="st125" width="9.7" height="9.6" />
                                    <rect x="17.5" y="25.1" class="st125" width="8.1" height="15.9" />
                                    <rect x="27.3" y="26.7" class="st125" width="9.7" height="9.6" />
                                </svg>
                            <label class="trx_to">
                                {{transaction && transaction.to}}
                            </label>
                        </div>
                    </div>
                    <div class="rows">
                        <label>Fee paid</label>
                        <div class="content">
                            <label class="trx_fee_paind">
                                {{transaction && transaction.transactionFee}} EXP
                            </label>
                        </div>
                    </div>
                    <div class="rows">
                        <label>Gas Limit</label>
                        <div class="content">
                            <label class="tex_gass_limit">
                                {{transaction &&  transaction.gasDecimal }}
                                <!--(GWei)-->
                            </label>
                        </div>
                    </div>
                    <div class="rows">
                        <label>Gas used</label>
                        <div class="content">
                            <label class="tex_gass_used">
                                {{web3.utils.toDecimal(transaction && transaction.gasUsed)}} ({{(parseInt(transaction.gasUsed)/parseInt(transaction.gasDecimal)) * 100}} %)
                            </label>
                        </div>
                    </div>
                    <div class="rows">
                        <label>Gas price</label>
                        <div class="content">
                            <label class="trx_gass_price">
                                {{web3.utils.fromWei(transaction.gasPrice.toString(), 'ether')}} EXP ({{transaction.gasPriceInWei}} Gwei)
                            </label>
                        </div>
                    </div>
                    <!-- <div class="rows">

                            <label>Amount</label>
                            <div class="content">
                                <label class="trx_amount">
                                    00.00
                                    <span>EXPANSE </span>
                                </label>
                            </div>
                        </div> -->
                    <div class="rows">
                        <label>Block</label>
                        <div class="content">
                            <a @click="openGanderUrl('https://gander.tech/block/'+transaction.blockNumberDecimal)" href="" class='trx_block' target="_blank">
                                {{transaction && transaction.blockNumberDecimal}}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="loader transactionLoader">
                <div class="outerCircle">
                    <img src="../../../assets/img/outer.png">
                </div>
                <div class="innerCircle">
                    <img src="../../../assets/img/inner.png">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import * as Raven from 'raven-js';
    const numberToBN = require('number-to-bn');
    const Gwei = 1000000000;
    import {web3} from '../../../../main/libs/config';
    import os from 'os';
    import  * as child_process from 'child_process';
    // var web3 = startConnectWeb();

    export default {
        name: 'transactiondetails',
        props : ['txndetaildata'],
        data() {
            return{
                transaction: '',
                Gwei,
                web3

            };
        },
        created(){
            console.log(this.txndetaildata);
            var postData = {
                hash : this.txndetaildata
            };
            this.fetch(postData);
        },
        methods: {
            hide () {
                this.$modal.hide('txndetals');
            },
            fetch(postData){
                console.log(postData, "postData------");
                var transaction_list_hash ,updated_transaction_list_hash;
                axios.get('https://api.gander.tech/transactionByHash/'+this.txndetaildata)
                    .then((response) => {
                        console.log(response.data.message, "response------");
                        if(response.data.data){
                            this.transaction = response.data.data[0];
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        Raven.captureException(error);
                    });
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

</style>
