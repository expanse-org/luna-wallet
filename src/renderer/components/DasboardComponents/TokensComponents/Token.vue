<template>
    <div class="contract tabcontent" id="tokens" >
        <div class="content"  v-bind:style="{zIndex: '0'}">
            <div class="heading">
                <label>Tokens</label>
            </div>
            <div class="custom-tokens">
                <div class="head">
                    <label>CUSTOM TOKENS</label>
                    <p>Tokens are currencies and other fungibles built on the Expanse platform. In order for accounts
                        to watch for<br> tokens and send them, you have to add their address to this list. You can create your
                        own token by simply <br> modifying this example of a custom token contract or learning more about Expanse Tokens.</p>
                </div>
                <div class="buttons">
                    <button type="button" name="watchtoken" @click="handleWatchToken" class="primery add_token_popup button button--wapasha button--round-s md-trigger " data-modal="modal-2">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="22"
                             height="22" viewBox="0 0 22 22">
                            <path d="M22.000,14.000 L14.000,14.000 L14.000,22.000 L8.000,22.000 L8.000,14.000 L-0.000,14.000 L-0.000,8.000 L8.000,8.000 L8.000,-0.000 L14.000,-0.000 L14.000,8.000 L22.000,8.000 L22.000,14.000 Z" class="plus" />
                        </svg>
                        <span>WATCH TOKEN</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="dashboard costum-account">
            <div class="content costum-account">
                <div class="accounts">
                    <div class="top">
                        <label>Tokens</label>
                    </div>
                    <div class="bottom tokens_list_js">
                        <div v-if="tokenlist && token" v-for="(token, key) in AddTokenData" class="a1">
                            <div class="delete-icon token_delete" @click="deleteToken(token.id)" data-val="token.token_address">
                           </div>
                           <div class="link token_edit" @click="editToken(token.id)" :data-index="parseInt(key + 1)" :data-val="token.token_address">
                               <div class="img">
                                   <svg :class=" 'svg-1 svg' + parseInt(key + 1)"  v-bind:style="{fill:token.color? token.color: getRandomColor(), enableBackground:'new 0 0 43 43' }"
                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="43px" height="43px" viewBox="0 0 43 43"   xml:space="preserve">
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
                                           x="0px" y="0px" width="15.2px" height="21.9px" viewBox="0 0 15.2 21.9" style="enable-background:new 0 0 15.2 21.9;"
                                           xml:space="preserve">
                                           <path class="key1" d="M8.6,2.3c0.3,0.2,0.3,0.5,0.2,0.8C8.6,3.3,8.3,3.4,8,3.3L7,2.7L6.3,3.8C6,4.3,6.1,5,6.6,5.3
                                               c0,0,0,0,0,0L9,6.7l3-5.2L9.7,0.1C9.1-0.2,8.5,0,8.2,0.5c0,0,0,0,0,0L7.5,1.7L8.6,2.3z M7,12.4C7,12.4,7,12.4,7,12.4l-0.6-0.2
                                               c-2.1-1.2-4.7-0.4-5.9,1.7c-1.1,2-0.4,4.6,1.6,5.8l3,1.7c2.1,1.2,4.7,0.4,5.9-1.7c1.1-2,0.4-4.6-1.6-5.8l-0.6-0.3c0,0,0.1,0,0.1,0
                                               L15,3c0.3-0.5,0.2-1.2-0.3-1.5s-1.2-0.2-1.5,0.3c0,0-0.1,0.1-0.1,0.1L7,12.4z M9.1,18.7c-0.6,1-1.9,1.4-2.9,0.8l-3-1.7
                                               c-1-0.6-1.4-1.9-0.8-2.9s1.9-1.4,2.9-0.8l0,0l3,1.7C9.3,16.4,9.6,17.7,9.1,18.7z"/>
                                           </svg>
                                           <label>{{token.token_name}} </label>
                                           <span> {{token.token_symbol}}</span>
                                       </div>
                                       <div>
                                           <p class="tooltip accoundID wd180">{{token.token_address}}
                                               <span class="tooltiptext parrentFont">{{token.token_address}} </span>
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
        <modal class="modal" name="watchtoken">
            <AddToken></AddToken>
        </modal>
    </div>
</template>

<script>
    import {db} from '../../../../../lowdbFunc';
    import AddToken from './AddToken';
    import {listTokens,updated_tokens_list_hash, tokens } from './listTokenfunc';
    import { mapState } from 'Vuex';
    export default {
        name: 'tokenDetails',
        components: {
            AddToken: AddToken
        },
        data() {
            return{
                token: '',
                tokenlist: false,
                token_edit: false,
                color: '',
            };
        },
        computed: {
            ...mapState(['tokenList']),
            AddTokenData() {
                this.token = this.$store.state.tokenList;
                return this.token;
            },
        },
        created(){
            listTokens();
            if(tokens){
                this.tokenlist = true;
            }
        },
        methods: {
            editToken(token_id){
                console.log(token_id);
                this.$store.dispatch('addEditTokenHash', token_id);
                this.show();
            },
            show () {
                this.$modal.show('watchtoken');
            },
            hide () {
                this.$modal.hide('watchtoken');
            },
            handleWatchToken(){
                this.$store.dispatch('addEditTokenHash', '');
                this.show();
            },
            deleteToken(token_id){
                console.log(token_id, "yokenID");
                let token_hash = token_id;
                let token = db.get('tokens').find({ id: token_id }).value();
                if(token){
                    let con = confirm('You want To Delete: '+token.token_name+' Token');
                    if(con){
                        db.get('tokens').remove({ id: token_id}).write();
                        setTimeout(()=>{
                            listTokens();
                        }, 1000);
                        console.log(this.AddTokenData, this.$store.state.tokenList, "AddTokenData");
                    }
                }
            }
        }
    }
</script>


<style>
    .modal .v--modal {
        top: 20% !important;;
        left: 25% !important;;
        max-width: 630px !important;
        min-width: 320px !important;
        height: auto !important;
        position: fixed !important;
        border-radius: 10px !important;
        box-sizing: border-box !important;
        border-radius: 10px !important;
        width: 80vw !important;
        padding:0 !important;
        z-index: 2000;
    }

    .modal .v--modal .popup {
        width: 91% !important;
    }

</style>
