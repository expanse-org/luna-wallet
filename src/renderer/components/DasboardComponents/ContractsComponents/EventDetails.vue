<template>
    <div id="transaction-modal">
        <div class="popup  md-content ">
            <a href="#" @click="hide" class="btn-close md-close"></a>
            <div v-if="eventData" class="transaction transaction_details">
                <h2>Events</h2>
                <p class="trx_hash"></p>
                <p class="trx_time">
                    {{eventData.blockData &&  eventData.blockData.timestamp | moment("LLLL")}}<br />
                    <span>({{eventData.blockData &&  eventData.blockData.timestamp | moment("from", "now")}})</span>
                </p>
                <div class="table">
                    <div class="rows">
                        <label>Event name</label>
                        <div class="content">
                            <label class="trx_amount">
                                {{eventData.eventdata && eventData.eventdata.event}}
                            </label>
                        </div>
                    </div>
                    <div class="rows">
                        <label>Return values</label>
                        <div class="content">
                            <label class="trx_from">
                            </label>
                        </div>
                    </div>
                    <div class="rows">
                        <label>Origin Contract</label>
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
                                {{eventData.eventdata &&  eventData.eventdata.address}}
                            </label>
                        </div>
                    </div>
                    <div class="rows">
                        <label>Log index</label>
                        <div class="content">
                            <label class="tex_gass_limit">
                                {{eventData.eventdata &&  eventData.eventdata.logIndex}}
                            </label>
                        </div>
                    </div>
                    <div class="rows">
                        <label>Transaction index</label>
                        <div class="content">
                            <label class="tex_gass_used">
                                {{eventData.eventdata &&  eventData.eventdata.transactionIndex}}
                            </label>
                        </div>
                    </div>
                    <div class="rows">
                        <label>Transaction hash</label>
                        <div class="content">
                            <label class="trx_gass_price">
                                {{eventData.eventdata &&  eventData.eventdata.transactionHash}}
                            </label>
                        </div>
                    </div>
                    <div class="rows">
                        <label>Block</label>
                        <div class="content">
                            <a :href="'https://gander.tech/block/'+(eventData.eventdata && eventData.eventdata.blockNumber)" class='trx_block' target="_blank">
                                {{eventData.eventdata &&  eventData.eventdata.blockNumber}}
                            </a>
                        </div>
                    </div>
                    <div class="rows">
                        <label>Block Hash</label>
                        <div class="content">
                            <label class="trx_gass_price">
                             {{eventData.eventdata &&  eventData.eventdata.blockHash}}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {web3} from '../../../../main/libs/config';
    export default {
        name: 'transactiondetails',
        props : ['eventsData'],
        data() {
            return{
                transaction: '',
                web3,
                eventData: '',
            };
        },
        created(){
            this.eventData = this.eventsData;
            console.log(this.eventData);
        },
        methods: {
            hide () {
                this.$modal.hide('eventdetailsMD');
            },
        }
    }
</script>

<style>

</style>
