<template>
    <div class="accountDetails tabcontent" id="contractDetail">
        <div class="content">
            <div class="userInfo">
                <div class="curve"></div>
                <div class="left">
                    <div class="qrCodevue" >
                        <qrcode-vue :value="contracts.contract_address"  level="L"></qrcode-vue>
                    </div>
                    <!--<canvas id="contract_qrCode" class="qrCode">-->
                    <!--</canvas>-->
                    <div class="info detail-contract">
                        <h1>{{contracts.contract_name}}</h1>
                        <div class="balance"><img src="../../../assets/img/key1.svg"><label class="contract_hash_js">{{contracts.contract_address}}</label></div>
                        <p class="tooltip accoundID wd300 ">
                            <label class="detail-account-hash">000.0000000 EXPANSE</label>
                            <span class="tooltiptext parrentFont contract_hash_js">{{contracts.contract_address}}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="actions">
                <div class="showInterface transferFunds" data-account="0" data-balance="0" @click="mainMenu()">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="25px">
                        <path fill-rule="evenodd" fill="rgb(203, 77, 67)" d="M15.617,20.670 L12.281,24.426 C11.956,24.789 11.498,25.000 11.014,25.000 C10.530,25.000 10.072,24.789 9.747,24.426 L6.411,20.670 C5.786,19.969 5.844,18.872 6.545,18.239 C7.245,17.606 8.321,17.665 8.946,18.374 L9.305,18.779 L9.305,10.340 C9.305,9.386 10.063,8.618 11.022,8.618 C11.965,8.618 12.723,9.386 12.723,10.340 L12.723,18.779 L13.082,18.374 C13.707,17.665 14.783,17.606 15.483,18.239 C15.858,18.577 16.359,19.784 15.617,20.670 ZM9.521,6.761 C8.821,7.394 7.745,7.335 7.120,6.626 L6.761,6.221 L6.761,14.661 C6.761,15.615 6.003,16.383 5.060,16.383 C4.118,16.383 3.359,15.615 3.359,14.661 L3.359,6.221 L3.001,6.626 C2.376,7.335 1.300,7.394 0.599,6.761 C-0.109,6.128 -0.159,5.039 0.466,4.331 L3.801,0.575 C4.127,0.203 4.585,0.001 5.052,0.001 C5.536,0.001 5.994,0.212 6.320,0.575 L9.655,4.331 C10.347,5.149 9.897,6.424 9.521,6.761 Z"
                        />
                    </svg>
                    <label>Transfer Expanse & Tokens</label>
                </div>

                <div class="deposit tooltip2 copytext " @click="handletooltip('comingSoon')">
                    <!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In  -->
                    <svg class="up" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0.347in" height="0.347in">
                        <path fill-rule="evenodd" fill="rgb(203, 77, 67)" d="M12.500,25.000 C5.596,25.000 -0.000,19.404 -0.000,12.500 C-0.000,5.596 5.596,-0.000 12.500,-0.000 C19.404,-0.000 25.000,5.596 25.000,12.500 C25.000,19.404 19.404,25.000 12.500,25.000 L12.500,25.000 ZM12.500,2.273 C6.852,2.273 2.273,6.852 2.273,12.500 C2.273,18.148 6.852,22.727 12.500,22.727 C18.148,22.727 22.727,18.148 22.727,12.500 C22.727,6.852 18.148,2.273 12.500,2.273 ZM18.182,15.606 C18.178,17.088 17.380,18.455 16.091,19.187 L16.091,20.783 C16.091,21.360 15.623,21.828 15.045,21.828 C14.468,21.828 14.000,21.360 14.000,20.783 L14.000,20.783 L14.000,19.748 L11.909,19.748 L11.909,20.783 C11.909,21.361 11.441,21.829 10.864,21.829 C10.286,21.829 9.818,21.361 9.818,20.783 L9.818,19.748 L8.773,19.748 C8.198,19.750 7.730,19.287 7.727,18.712 L7.727,6.288 C7.730,5.713 8.198,5.250 8.773,5.252 L9.818,5.252 L9.818,4.217 C9.818,3.640 10.286,3.172 10.864,3.172 C11.441,3.172 11.909,3.640 11.909,4.217 L11.909,5.253 L14.000,5.253 L14.000,4.217 C14.000,3.640 14.469,3.172 15.046,3.173 C15.623,3.173 16.090,3.641 16.091,4.217 L16.091,5.813 C18.068,6.928 18.767,9.435 17.651,11.413 C17.419,11.823 17.118,12.191 16.762,12.500 C17.663,13.281 18.181,14.414 18.182,15.606 ZM14.000,7.323 L9.818,7.323 L9.818,11.465 L14.000,11.465 C15.144,11.482 16.084,10.568 16.101,9.425 C16.118,8.281 15.205,7.340 14.061,7.323 C14.041,7.323 14.020,7.323 14.000,7.323 ZM14.000,13.535 L9.818,13.535 L9.818,17.677 L14.000,17.677 C15.144,17.694 16.084,16.780 16.101,15.637 C16.118,14.493 15.205,13.552 14.061,13.535 C14.041,13.535 14.020,13.535 14.000,13.535 Z"
                        />
                    </svg>
                    <!--<span v-if="comingSoonTip" class="tooltiptext2" style="padding:6px;">Comming Soon</span>-->
                    <label>Fund with Bitcoin</label>
                </div>

                <div @click="openGanderUrl('https://gander.tech/address/'+contracts.contract_address)" class="view_on_external" data-href="">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26px" height="16px">
                        <path fill-rule="evenodd" fill="rgb(199, 75, 66)" d="M24.840,8.489 C24.617,8.795 19.295,16.000 12.499,16.000 C5.703,16.000 0.381,8.795 0.158,8.488 C-0.053,8.197 -0.053,7.802 0.158,7.511 C0.381,7.205 5.703,-0.000 12.499,-0.000 C19.295,-0.000 24.617,7.205 24.840,7.512 C25.052,7.802 25.052,8.197 24.840,8.489 ZM12.499,1.655 C7.482,1.655 3.155,6.435 1.873,7.999 C3.157,9.563 7.493,14.345 12.499,14.345 C17.516,14.345 21.843,9.565 23.125,8.001 C21.841,6.436 17.505,1.655 12.499,1.655 ZM12.499,12.966 C9.772,12.966 7.554,10.738 7.554,8.000 C7.554,5.262 9.772,3.034 12.499,3.034 C15.226,3.034 17.444,5.262 17.444,8.000 C17.444,10.738 15.226,12.966 12.499,12.966 ZM12.499,4.690 C10.681,4.690 9.203,6.175 9.203,8.000 C9.203,9.825 10.681,11.310 12.499,11.310 C14.317,11.310 15.796,9.825 15.796,8.000 C15.796,6.175 14.317,4.690 12.499,4.690 Z"
                        />
                    </svg>
                    <label>View on Gander</label>
                </div>

                <div class="btcDeposit tooltip2 copytext" data-val=".detail-account-hash-input" @click="handletooltip('copy')">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26px" height="26px">
                        <path fill-rule="evenodd" fill="rgb(201, 76, 66)" d="M25.594,5.978 C25.323,5.707 24.994,5.571 24.607,5.571 L18.571,5.571 C17.991,5.571 17.372,5.765 16.714,6.152 L16.714,1.393 C16.714,1.006 16.579,0.677 16.308,0.406 C16.037,0.135 15.708,0.000 15.321,0.000 L9.286,0.000 C8.899,0.000 8.473,0.097 8.009,0.290 C7.545,0.483 7.177,0.716 6.906,0.987 L0.987,6.906 C0.716,7.177 0.483,7.545 0.290,8.009 C0.097,8.473 0.000,8.899 0.000,9.286 L0.000,19.036 C0.000,19.423 0.135,19.752 0.406,20.022 C0.677,20.293 1.006,20.429 1.393,20.429 L9.286,20.429 L9.286,24.607 C9.286,24.994 9.421,25.323 9.692,25.594 C9.963,25.865 10.292,26.000 10.678,26.000 L24.607,26.000 C24.994,26.000 25.323,25.865 25.594,25.594 C25.865,25.323 26.000,24.994 26.000,24.607 L26.000,6.964 C26.000,6.578 25.865,6.249 25.594,5.978 ZM16.714,8.662 L16.714,13.000 L12.376,13.000 L16.714,8.662 ZM7.428,3.090 L7.428,7.428 L3.090,7.428 L7.428,3.090 ZM10.272,12.478 C10.001,12.749 9.769,13.116 9.576,13.581 C9.382,14.045 9.286,14.470 9.286,14.857 L9.286,18.571 L1.857,18.571 L1.857,9.286 L7.893,9.286 C8.280,9.286 8.609,9.150 8.879,8.879 C9.150,8.609 9.286,8.280 9.286,7.893 L9.286,1.857 L14.857,1.857 L14.857,7.893 L10.272,12.478 ZM24.143,24.143 L11.143,24.143 L11.143,14.857 L17.178,14.857 C17.565,14.857 17.894,14.722 18.165,14.451 C18.436,14.180 18.571,13.851 18.571,13.464 L18.571,7.428 L24.142,7.428 L24.142,24.143 L24.143,24.143 Z"
                        />
                    </svg>
                    <span v-if="copyTip" class="tooltiptext2">Copied</span>
                    <label>Copy Address</label>
                </div>
            </div>

            <div class="contract-details">
                <div class="header">
                    <h1>Hide contract info</h1>


                </div>
                <div class="inner">
                    <div class="left contract_abi">
                        <div v-for="value in contractConstants" :class="value.name">
                           <div class="one-line">
                               <div class="key">{{value.name}}</div>
                           </div>
                           <div v-for="output in value.outputs" class="output">
                               <div class="key">-- ({{output.type}})</div>
                               <div class="answer"></div>
                               <div class="value">{{getAddress(value,output)}}</div>
                           </div>
                           <div v-for="(input,index) in value.inputs" class="output input-outer">
                                <div class="inputs">
                                    <div class="key">({{input.name}}) -- ({{input.type}})</div>
                                    <div class="value">
                                        <div class="query">
                                            <input type="text" placeholder="Type your Query" :name='input.name'>
                                        </div>
                                    </div>
                                </div>
                                <div class="inputs">
                                    <div class="key"></div>
                                    <div v-if="value.inputs.length-1 == index" class="value">
                                        <div class="query">
                                            <button class="queryBtn" v-on:click="handleQuery(JSON.stringify(value))" :data-val="JSON.stringify(value)">Query</button>
                                        </div>
                                    </div>
                                </div>
                           </div>
                        </div>
                        <!-- <div class="one-line">
                         <div class="key">Name</div><div class="value">Gander</div>
                        </div>
                        <div class="one-line">
                         <div class="key">Desimals</div><div class="value">12</div>
                         </div> -->
                        <!-- <div class="one-line">
                        <div class="key">Balance</div><div class="value"> <div class="dim">owner- address</div>Gander</div>
                        </div>
                        <div class="one-line">
                        <div class="key">Allowance</div><div class="value">Gander</div>
                        </div>
                        <div class="one-line">
                        <div class="key">Total Supply</div><div class="value">Gander</div>
                       </div>
                       <div class="one-line">
                        <div class="key">Version</div><div class="value">Gander</div>
                        </div>
                        <div class="one-line">
                        <div class="key">symbol</div><div class="value">Gander</div>
                        </div> -->


                    </div>
                    <div class="right">

                        <form id="execute_contract" target="#">
                            <div class="cont_select_center">
                                <div class="select_mate contract_functions_c" data-mate-select="active">
                                    <multiselect :searchable="false" name="contract_abi_functions" class="contract_abi_functions" v-model="contractabiFunc" track-by="name" :allow-empty="false" label="name" :show-labels="false" placeholder="Select Function" :options="contractFunctions" >
                                        <template slot="singleLabel" slot-scope="{option}">
                                            <span class="option__title">{{ option.name.replace(/([a-z])([A-Z])/g, '$1 $2') }}</span>
                                        </template>
                                    </multiselect>
                                </div>
                            </div>

                            <div class="contract_functions_details details">
                                <div v-for="input in contractabiFunc.inputs">
                                    <div class="lable">
                                        <div class="key">{{input.name}}--{{input.type}}</div>
                                        <div class="value"></div>
                                    </div>
                                    <div class="output">
                                        <div class="query">
                                            <input type="text" :name="input.name+''+input.type">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p>Execute From</p>
                            <div class="cont_select_center">
                                <div class="select_mate contract_sndform" data-mate-select="active">
                                    <multiselect  name="contract_sendFrom" class="contract_sendFrom" :searchable="false" :loading="loading" v-model="contractsendFrom" track-by="text" :allow-empty="false" label="text" :show-labels="false" placeholder="Select Address" :options="optionFroms" >
                                        <template slot="singleLabel" slot-scope="{option}">
                                            <span class="option__title">{{ option.text }}</span>
                                        </template>
                                    </multiselect>
                                </div>
                            </div>
                            <div class="query">
                                <button type="button" @click="handlExcute" class="execute_contract">Execute</button>
                            </div>
                        </form>
                        <div class="condetail">
                            <div class="chexboxes">
                                <div class="checkbox perform">
                                    <label class="filter__value">
                                        <input class="filter__mark" type="checkbox" v-model="isshowEvents" @click="getEvents">
                                        <i class="filter__mark"></i>
                                        <span class="filter__text">Show Events</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="note">
                    <p class="regular">
                        <span>NOTE:</span> If your balance doesn’t seem updated, make sure that you are in sync with the network.
                    </p>
                </div>
                <div v-if="noEvents" class="latestTransaction">
                    <div class="header">
                        <h1>Latest Events</h1>
                        <div class="search">
                            <input type="text" name="fname" v-model="eventsearch" placeholder="Filter Events" id="filterDetailsTransaction">
                            <button class="search">
                                <img src="../../../assets/img/search.svg">
                            </button>
                        </div>

                    </div>

                    <div class="transactionContent accountDetailsTransactionContent eventdetailsContnt">
                        <div v-if="loadereve" class="loader transactionLoader">
                            <div class="outerCircle">
                                <img src="../../../assets/img/outer.png">
                            </div>
                            <div class="innerCircle">
                                <img src="../../../assets/img/inner.png">
                            </div>
                        </div>
                        <div class="latestevents" @click="handleEvedetail(event)" v-if="isevents && !loadereve" v-for="(event, index) in filterEvents? filterEvents:EventsData">
                            <div class="leftcontent">
                                <label class="date">{{ event && event.timestamp | moment("MMM-DD")}}</label>
                            </div>
                            <div class="rightcontent">
                                <label class="status"><strong>{{event.eventdata && event.eventdata.event}}</strong></label>
                                <div class="valuetxt" v-for="(value, index) in (event.eventdata && event.eventdata.returnValues)" >
                                    <label v-if="isNaN(index)">{{index}}: {{value}}</label>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <modal class="modal" name="insufficentBal">
            <insuficentBalance ></insuficentBalance>
        </modal>
        <modal class="modal" name="sendTransactions">
            <sendTransaction :modalArray="modalArray"></sendTransaction>
        </modal>
        <modal class="modal" name="eventdetailsMD">
            <eventDetails :eventsData="eventModalData"></eventDetails>
        </modal>
    </div>
</template>

<script>
    import InsuficentBalance from '../insuficentBalance'
    import SendTransaction from '../TransferFundsComponents/SendTransaction';
    import EventDetails from './EventDetails';
    import {db} from '../../../../../lowdbFunc';
    import { clipboard } from 'electron';
    import * as $ from 'jquery';
    import axios from 'axios';
    import QrcodeVue from 'qrcode.vue';
    import Multiselect from 'vue-multiselect';
    import {web3} from '../../../../main/libs/config';
    import os from 'os';
    import  * as child_process from 'child_process';
    var instance;

    export default {
        name: 'ContractsDetails',
        components: {
            'insuficentBalance':InsuficentBalance,
            'qrcode-vue': QrcodeVue,
            'multiselect': Multiselect,
            'sendTransaction': SendTransaction,
            'eventDetails': EventDetails,
        },
        data() {
            return {
                contracts: '',
                editor: '',
                content: '',
                comingSoonTip: false,
                copyTip: false,
                contractConstants: [],
                contractFunctions: [],
                answerOutput: '',
                inputName: '',
                contractabiFunc: '',
                contractsendFrom: '',
                optionTab: '',
                optionFroms: [],
                loading: '',
                modalArray: '',
                isevents: false,
                noEvents: false,
                EventsData: [],
                loadereve: true,
                eventModalData: '',
                isshowEvents: '',
                eventsearch: '',
            };
        },
        computed: {
            accounts() {
                this.accountsArray = this.$store.state.allAccounts;
                return this.accountsArray;
            },
            filterEvents() {
                this.isevents = true;
                this.loadereve = false;
                this.eventsearch = this.eventsearch.trim();
                if(this.eventsearch){
                    return this.EventsData.filter(item => {
                        return item.eventdata.event.indexOf(this.eventsearch) > -1 ||
                            (item.eventdata.returnValues.Account && item.eventdata.returnValues.Account.indexOf(this.eventsearch) > -1) ||
                            (item.eventdata.returnValues.Amount && item.eventdata.returnValues.Amount.indexOf(this.eventsearch) > -1) ||
                            (item.eventdata.returnValues.Module && item.eventdata.returnValues.Module.indexOf(this.eventsearch) > -1) ||
                            (item.eventdata.returnValues.Polarity && item.eventdata.returnValues.Polarity.indexOf(this.eventsearch) > -1)
                    })
                }
            }
        },
        created(){
            this.intervalid1 = setInterval(() => {
                if (this.accounts.length > 0) {
                    this.accounts.map((val) => {
                        if(val.balance > 0){
                            var data = { value:val.hash ,text: val.accountTitle + '- ('+ parseFloat(val.balance).toFixed(4)+' EXP)'};
                            this.optionFroms.push(data);
                            this.loading= false;
                        }
                        this.loading= false;
                    });
                    clearInterval(this.intervalid1)
                }
            }, 100);
            // this.editor = ace.edit("editor");
            var contractId = this.$router.history.current.query.contractid;
            let contracts =  db.get('contracts').find({id: contractId}).value();
            this.contracts =  contracts;
            // console.log(this.contracts && this.contracts.contract_json);
            instance = new web3.eth.Contract(this.contracts && this.contracts.contract_json, this.contracts && this.contracts.contract_address);

            this.abidisplay();

        },
        methods: {
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
            getEvents() {
                this.noEvents = true;
                this.EventsData = [];
                var contractAddress = this.contracts.contract_address; // contract Address
                var abiArray = db.get('contracts').find({contract_address: contractAddress}).value().contract_json;

                var contract =  new web3.eth.Contract(abiArray,contractAddress);

                console.log(contract, "contract")
                if(!this.isshowEvents) {
                    let that = this;
                    var subscription = contract.events.allEvents({
                        fromBlock: '0x0',
                        toBlock: 'latest'
                    });

                    contract.getPastEvents('allEvents', {
                        fromBlock: '0x0',
                        toBlock: 'latest'
                    }, function (error, logs) {
                        // console.log(logs, "result===================");

                    });


                    subscription.on('data', function (logs) {
                        // console.log(logs, "--")
                        if (logs) {
                            // console.log(logs, "result===================");
                            web3.eth.getBlock(logs.blockNumber).then((res) => {
                                // console.log(res, "res===================");
                                var data = Object.assign({timestamp: res.timestamp, eventdata: logs, contractName:that.contracts && that.contracts.contract_name }, data)
                                that.EventsData.push(data);
                            });
                            that.noEvents = true;
                            that.isevents = true;
                            that.loadereve = false;
                        } else {
                            that.noEvents = false;
                            that.isevents = false;
                            that.loadereve = false;
                            // console.log(error, "error===================");
                        }
                    })
                } else {
                     this.noEvents = false;
                     this.isevents=false;
                     this.loadereve=false;
                }


               // if(!this.isshowEvents) {
               //      let that = this;
               //      var subscription = web3.eth.subscribe('logs', {
               //          address: contractAddress,
               //          fromBlock: '0x0',
               //          toBlock: 'latest'
               //      }, function (error, result) {
               //          if(result){
               //              console.log(result, "result===================");
               //              web3.eth.getBlock(result.blockNumber).then((res) => {
               //                  // console.log(res, "res===================");
               //                  var data =  Object.assign({blockData: res, eventdata: result}, data)
               //                  that.EventsData.push(data);
               //              });
               //              that.noEvents = true;
               //              that.isevents=true;
               //              that.loadereve=false;
               //          } else {
               //              that.noEvents = false;
               //              that.isevents=false;
               //              that.loadereve=false;
               //              console.log( error , "error===================");
               //          }
               //      });
               // } else {
               //      this.noEvents = false;
               //      this.isevents=false;
               //      this.loadereve=false;
               // }

            },
            handleEvedetail(eventdata){
                this.eventModalData = eventdata;
                this.show3();
            },
            mainMenu(){
                if (this.$store.state.total_balance == 0) {
                    // alert('You dont have Balane to transfer Funds');
                    this.show1();
                }else {
                    this.$router.push({
                        path: '/transferfunds'
                    });
                }
            },
            abidisplay () {
                this.contracts.contract_json.map((cdata, key) => {
                    if (cdata.type === 'function' ){
                        if(cdata.constant){
                            this.contractConstants.push(cdata);
                        }else{
                            this.contractFunctions.push(cdata);
                        }
                    }
                });

            },
            show1 () {
                this.$modal.show('insufficentBal');
            },
            show2 () {
                this.$modal.show('sendTransactions');
            },
            show3 () {
                this.$modal.show('eventdetailsMD');
            },
            getAddress (value,output){
                var dataoinput = '';
                if(value.inputs.length == 0) {
                    instance.methods[value.name]().call().then((res) => {
                        if(res){
                            // console.log(res," res");
                            dataoinput = res;
                            $("."+(value.name)+" .value").html(res);
                        }
                    }, (err) => {
                        // console.log(err,"errrr====")
                    });
                } else {
                    return output.name;
                }
            },
            handletooltip(tip){
                if(tip === 'comingSoon'){
                    this.$router.push({
                        path: '/currencyconverter'
                    });
                    // this.comingSoonTip = true;
                    // this.copyTip = false;
                    // setTimeout(() =>{
                    //     this.comingSoonTip = false;
                    // },1000);
                }else {
                    var copyText = this.contracts.contract_address;
                    if (copyText) {
                        clipboard.writeText(copyText, 'selected');
                    }
                    this.copyTip = true;
                    this.comingSoonTip = false;
                    setTimeout(() => {
                        this.copyTip = false;
                    },2000);
                }
            },
            handleInputName(inputname){

            },
            handleQuery(value) {
                var address = [];
                var parsedValue = JSON.parse(value);
                var inputs = $("."+(parsedValue.name)+" input").val();
                if(parsedValue.inputs.length  < 2) {
                    var result;
                    $("." + (parsedValue.name) + " input").each(function () {
                        address.push($(this).val());
                    });
                    $("."+(parsedValue.name)+" .answer").html('');
                    instance.methods[parsedValue.name](address[0]).call().then((res) => {
                        if (res == true) {
                            result = "True"
                        }
                        if (res == false) {
                            result = "False"
                        }
                        if (web3.utils.isAddress(res)) {
                            result = res;
                        }
                        else if (typeof res == 'object') {
                            result = web3.utils.fromWei(res.toNumber(), "ether")
                        }
                        $("."+(parsedValue.name)+" .answer").html(result);
                    })
                }
                if(parsedValue.inputs.length  > 1) {
                    var result;
                    $("."+(parsedValue.name)+" input").each(function(index) {
                        address.push($(this).val());

                    });
                    $("."+(parsedValue.name)+" .answer").html('');
                    instance.methods[parsedValue.name].apply(this,address).call().then((res) => {
                        if (res == true) {
                            result = "True"
                        }
                        if (res == false) {
                            result = "False"
                        }
                        if (web3.utils.isAddress(res)) {
                            result = res;
                        }
                        else if (typeof res === 'object') {
                            result = web3.utils.fromWei(res.toNumber(), "ether")
                        }
                        $("."+(parsedValue.name)+" .answer").html(result);
                    });
                    $("."+(parsedValue.name)+" .answer").html(result);

                }
            },
            handlExcute(e) {
                e.preventDefault();
                let args = [];
                var param;
                let from = this.contractsendFrom.value;
                console.log(this.contractabiFunc);
                let contract_function = this.contractabiFunc.name;

                var myForm = document.getElementById("execute_contract");
                //Extract Each Element Value
                for (var i = 1; i < myForm.elements.length -2; i++) {
                    args.push(myForm.elements[i].value);
                    param = myForm.elements[i].value;
                }

                var contractAddress = this.contracts.contract_address; // contract Address
                var to = contractAddress;
                console.log("contract_function",contract_function);

                var abiArray = db.get('contracts').find({contract_address: contractAddress}).value().contract_json;

                var contract =  new web3.eth.Contract(abiArray,contractAddress);
                console.log("contract",contract);
                // GET RAW DATA
                var raw_data;
                if(args.length > 1){
                    raw_data = contract.methods[contract_function].apply(null,args).encodeABI();
                }else{
                    raw_data = contract.methods[contract_function](args[0]).encodeABI();
                }
                console.log("raw DATA", raw_data);

                web3.eth.getTransactionCount(from).then((res) => {
                    console.log("res res", res);
                    var nonce = res;
                    let fee = 200000;
                    web3.eth.getGasPrice().then((price)=>{
                        this.modalArray = {
                            currentArray: this.currentArray,
                            fundsFrom: from,
                            fundsTo: to,
                            amount: '00000',
                            currencyHash: to,
                            raw_data: raw_data,
                            contract_function: contract_function,
                            is_contract: true,
                            estimatedGas: 21000,
                            gasPrice: price,
                            nonce: nonce,
                        };
                        this.show2();
                    });

                });
            }
        }
    }
</script>


<style>
    @import "../../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";
</style>

<style>

    .qrCodevue {
        padding: 10px!important;
        width: 101px!important;
        height: 101px!important;
        background: white!important;
    }

    .contract_functions_c .multiselect__tags,
    .contract_sndform .multiselect__tags {
        width: 100%!important;
        background: none!important;
        border: none!important;
    }

    .contract_functions_c .multiselect__content-wrapper,
    .contract_sndform .multiselect__content-wrapper {
        z-index: 11111;
        /*display: block!important;*/
        border-radius: 0px!important;
    }

    .contract_functions_c ,
    .contract_sndform {
        border-radius: 0px!important;
    }

    .contract_functions_c .multiselect__input,
    .contract_sndform .multiselect__input{
        display: none!important;
    }

    .contract_functions_c .multiselect__input, .contract_functions_c  .multiselect__single,
    .contract_sndform .multiselect__input, .contract_sndform  .multiselect__single {
        padding: 0px 0 0 10px!important;
        line-height: 39px!important;
    }

    .contract_functions_c .multiselect__option--selected .multiselect__option--highlight,
    .contract_sndform .multiselect__option--selected .multiselect__option--highlight {
        background: #ffffff;
    }

    .contract_functions_c .multiselect__option--highlight,
    .contract_sndform .multiselect__option--highlight{
        background: #265b6c!important;
    }

    .contract_functions_c .multiselect__element:nth-child(odd),
    .contract_sndform .multiselect__element:nth-child(odd) {
         background: #265b6c!important;
     }

    .contract_functions_c .multiselect__element:nth-child(even),
    .contract_sndform .multiselect__element:nth-child(even) {
         background: #1e4855!important;
     }

    .contract_functions_c .multiselect__option--selected,
    .contract_sndform .multiselect__option--selected {
         background: transparent!important;
     }

    .latestevents:nth-child(even) {
        background: #1e4855!important;
    }

    .latestevents:nth-child(odd) {
        background: #265b6c!important;
    }

    .contract_functions_c  .multiselect__single,
    .contract_sndform  .multiselect__single{
        background: none!important;
        color: #ffffff;
        height: 33px;
    }
    .contract_functions_c  .multiselect__single .option__title,
    .contract_sndform  .multiselect__single .option__title{
        vertical-align: top!important;
        line-height: 39px!important;
    }

    .contract_functions_c  .multiselect__option,
    .contract_sndform  .multiselect__option {
        padding: 18px 0px 5px 28px!important;
        min-height: 46px!important;
        /*display: -webkit-inline-box!important;*/
    }

    .contract_functions_c .multiselect__content-wrapper,
    .contract_sndform .multiselect__content-wrapper {
        background: #265b6c!important;
        margin-top: 3px;
    }

    .contract_functions_c .multiselect__content,
    .contract_sndform .multiselect__content {
        padding: 0px 0 0px 0px!important;
    }

    .contract_functions_c .multiselect__element .multiselect__option--highlight,
    .contract_sndform .multiselect__option--selected {
        background: none!important;
    }

    .contract_functions_c .multiselect__option .option__title,
    .contract_sndform .multiselect__option .option__title {
        vertical-align: top!important;
        line-height: 39px!important;
    }

    .contract_sndform  .multiselect__spinner:before, .contract_sndform .multiselect__spinner:after {
        border-color: #000000 transparent transparent!important;
        margin-top: -11px;
    }

    .condetail {
        margin-top: 10px;
    }

    .eventdetailsContnt {
        max-height: 450px!important;
    }


    .condetail label{
        width: 119px;
        margin-top: 3px;
    }

    .latestevents  {
       display: flex;
    }

    .latestevents .leftcontent, .latestevents .rightcontent {
        margin-right: 40px;
        padding: 15px;
    }

    .latestevents .rightcontent .valuetxt {
        margin-top: 8px;
    }


</style>