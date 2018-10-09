<template>
    <div class="contract tabcontent" id="contracts">
        <div class="content">
            <div class="heading">
                <label>Contracts</label>
            </div>
            <div class="custom-tokens">
                <div class="head">
                    <label>CUSTOM CONTRACTS</label>
                    <p>To watch and interact with a contract already deployed on the blockchain,
                        <br> you need to know its address and the description of its interface in JSON format.</p>
                </div>
                <div class="buttons">
                    <button type="button" @click="show" class="primery add_token_popup button button--wapasha button--round-s md-trigger " data-modal="watch-contract">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                            <path id="Forma_1" data-name="Forma 1" class="plus" d="M10,20A10,10,0,1,1,20,10,10,10,0,0,1,10,20ZM10,5.095c-4.315,0-7.687,4.231-7.829,4.412a0.8,0.8,0,0,0,0,.988C2.313,10.674,5.685,14.9,10,14.9s7.687-4.229,7.829-4.409a0.8,0.8,0,0,0,0-.988C17.688,9.326,14.316,5.095,10,5.095ZM10,13.3c-2.747,0-5.178-2.275-6.137-3.3C4.822,8.97,7.254,6.694,10,6.694S15.18,8.972,16.138,10C15.183,11.03,12.758,13.3,10,13.3Zm0-5.7A2.4,2.4,0,1,0,12.4,10,2.4,2.4,0,0,0,10,7.6Z" />
                        </svg>
                        <span>Watch Contract</span>
                    </button>
                    <button type="button" @click="show1" class="action add_token_popup button button--wapasha button--round-s md-trigger" data-modal="deploy-modal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                            <path d="M22.000,14.000 L14.000,14.000 L14.000,22.000 L8.000,22.000 L8.000,14.000 L-0.000,14.000 L-0.000,8.000 L8.000,8.000 L8.000,-0.000 L14.000,-0.000 L14.000,8.000 L22.000,8.000 L22.000,14.000 Z" class="plus" />
                        </svg>
                        <span>Deploy New Contract</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="dashboard costum-account">
            <div class="content costum-account">
                <div class="accounts">
                    <div class="top">
                        <label>Contracts</label>
                    </div>
                    <div class="bottom contracts_list_js">
                        <div v-for="(contract, key) in contractData" class="a1 contractDetail" :data-val="contract.id" @click="mainMenu(contract.id)">
                           <div class="delete-icon contract_delete" :data-val="contract.id" >
                           </div>
                           <div class="link contract_edit-1" :data-index="parseInt(key + 1)" :data-val="contract.id">
                               <div class="img">
                                   <svg  :class="'svg-1 svg'+parseInt(key + 1)" v-bind:style="{fill: contract.color ? contract.color :getRandomColor ,enableBackground:'new 0 0 43 43'}"
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
                                       <div>
                                           <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15.2px"
                                                height="21.9px" viewBox="0 0 15.2 21.9" v-bind:style="{enableBackground: 'new 0 0 15.2 21.9'}" xml:space="preserve">
                                               <path class="key1" d="M8.6,2.3c0.3,0.2,0.3,0.5,0.2,0.8C8.6,3.3,8.3,3.4,8,3.3L7,2.7L6.3,3.8C6,4.3,6.1,5,6.6,5.3
                                                   c0,0,0,0,0,0L9,6.7l3-5.2L9.7,0.1C9.1-0.2,8.5,0,8.2,0.5c0,0,0,0,0,0L7.5,1.7L8.6,2.3z M7,12.4C7,12.4,7,12.4,7,12.4l-0.6-0.2
                                                   c-2.1-1.2-4.7-0.4-5.9,1.7c-1.1,2-0.4,4.6,1.6,5.8l3,1.7c2.1,1.2,4.7,0.4,5.9-1.7c1.1-2,0.4-4.6-1.6-5.8l-0.6-0.3c0,0,0.1,0,0.1,0
                                                   L15,3c0.3-0.5,0.2-1.2-0.3-1.5s-1.2-0.2-1.5,0.3c0,0-0.1,0.1-0.1,0.1L7,12.4z M9.1,18.7c-0.6,1-1.9,1.4-2.9,0.8l-3-1.7
                                                   c-1-0.6-1.4-1.9-0.8-2.9s1.9-1.4,2.9-0.8l0,0l3,1.7C9.3,16.4,9.6,17.7,9.1,18.7z"/>
                                           </svg>
                                           <label>{{contract.contract_name}}</label>
                                            <!--//<span> ( ' + contract.token_symbol + ' )</span>-->
                                           </div>
                                       <div>
                                           <p class="tooltip accoundID wd180">{{contract.contract_address}}
                                               <span class="tooltiptext parrentFont">{{contract.contract_address}}</span>
                                           </p>
                                       </div>
                                   </div>
                               </div>
                           </div>
                        </div>
                    </div>
                    <div class="contractinfo">
                        <label>Most exchanges don't support receiving exp from a contract wallet yet. Be sure to move
                            the money to an account address first!</label>
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
                </div>
            </div>
        </div>
        <modal name="watchContract" class="modal">
            <watch-Contract :contractid="contractid"></watch-Contract>
        </modal>
        <modal name="deployContract" class="modal">
            <deploy-Contract></deploy-Contract>
        </modal>
    </div>
</template>

<script>
    import { getRandomColor } from '../../AccountsData/commonFunc';
    import {db} from '../../../../../lowdbFunc';
    import WatchContract from './WatchContract';
    import DeployContract from './DeployContract';
    export default {
        name: 'Contracts',
        components: {
            'watch-Contract' : WatchContract,
            'deploy-Contract' : DeployContract,
        },
        data() {
            return {
                contracts: '',
                contractid: '',
                getRandomColor,
            };
        },
        computed: {
            contractData(){
                console.log(db.get('contracts').value());
                this.contracts = db.get('contracts').value();
                return this.contracts;
            }
        },
        created(){
            this.intervalid1 = setInterval(() => {
                if(this.contractData.length > 0 ){
                    clearInterval(this.intervalid1)
                }
            }, 100);
        },
        methods: {
            show () {
                this.$modal.show('watchContract');
            },
            hide () {
                this.$modal.hide('watchContract');
            },
            show1 () {
                this.$modal.show('deployContract');
            },
            hide1 () {
                this.$modal.hide('deployContract');
            },
            mainMenu(contractid) {
                // console.log(this.contractid);
                // this.contractid = contractid;
                // this.$modal.show('watchContract');

                this.$router.push({
                    path: '/contractdetails',
                    query: { contractid: contractid }
                });
            }
        }
    }
</script>
<style>
    @import "../../../../../static/modalcomponent.css";

</style>
