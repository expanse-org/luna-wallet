<template>
    <div id="transaction-modal">
        <div class="popup  md-content ">
            <a href="#" @click="hide" class="btn-close md-close"></a>
            <div v-if="transaction.transaction_info" class="transaction transaction_details">
                <h2>Transaction</h2>
                <p class="trx_hash">
                    {{transaction.transaction_info && transaction.transaction_info.hash}}</p>
                <p class="trx_time">
                    {{transaction.transaction_info &&  transaction.transaction_info.timestampDecimal | moment("LLLL")}}<br />
                    <span>({{transaction.transaction_info &&  transaction.transaction_info.timestampDecimal | moment("from", "now")}})</span>
                </p>
                <div class="table">
                    <div class="rows">
                        <label>Amount</label>
                        <div class="content">
                            <label class="trx_amount">
                                {{transaction.transaction_info && transaction.transaction_info.valueDecimal}}
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
                                {{transaction.transaction_info && transaction.transaction_info.from}}
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
                                {{transaction.transaction_info && transaction.transaction_info.to}}
                            </label>
                        </div>
                    </div>
                    <div class="rows">
                        <label>Fee paid</label>
                        <div class="content">
                            <label class="trx_fee_paind">
                                {{web3.utils.toDecimal(transaction.transaction_recipt_info && transaction.transaction_recipt_info.gasUsed)}}
                            </label>
                        </div>
                    </div>
                    <div class="rows">
                        <label>Gas Limit</label>
                        <div class="content">
                            <label class="tex_gass_limit">
                                {{transaction.transaction_info &&  web3.utils.fromWei(web3.utils.toDecimal(transaction.transaction_info.gas).toString(), 'ether') * Gwei }}
                                (GWei)
                            </label>
                        </div>
                    </div>
                    <div class="rows">
                        <label>Gas used</label>
                        <div class="content">
                            <label class="tex_gass_used">
                                {{web3.utils.toDecimal(transaction.transaction_recipt_info && transaction.transaction_recipt_info.gasUsed)}}
                            </label>
                        </div>
                    </div>
                    <div class="rows">
                        <label>Gas price</label>
                        <div class="content">
                            <label class="trx_gass_price">
                                {{transaction.transaction_recipt_info && parseFloat(web3.utils.fromWei(web3.utils.toDecimal(transaction.transaction_recipt_info.gasUsed).toString(), 'ether') * Gwei).toFixed(6)}}
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
                            <a :href="'https://gander.tech/block/'+transaction.transaction_info.blockNumberDecimal" class='trx_block' target="_blank">
                                {{transaction.transaction_info && transaction.transaction_info.blockNumberDecimal}}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div  v-else class="loader transactionLoader">
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
    const numberToBN = require('number-to-bn');
    const Gwei = 1000000000;
    import {startConnectWeb} from '../../../../main/libs/config';
    var web3 = startConnectWeb();
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
                axios.post('https://beta-api.gander.tech/gettransactionbyhash', postData)
                    .then((response) => {
                        console.log(response, "response------");
                        if(response.data.message){
                            this.transaction = response.data.message;
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        // Raven.captureException(error);
                    });
            },
        }
    }
</script>

<style>

</style>
