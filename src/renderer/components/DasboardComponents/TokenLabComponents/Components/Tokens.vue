<template>
    <div>
        <div v-if="contractdata" class="content">
            <div class="accounts">
                <div class="bottom accounts-list">
                    <div @click="mainMenu(token.id, token)" v-if="token.step >= 4 && token.paid && !token.archived" v-for="(token, key ) in contractdata" class="account1 a1" :data-index="parseInt(key + 1)">
                        <div class="img">
                            <svg :class="'svg-1 svg' + parseInt(key + 1)" v-bind:style="{fill:getRandomColor(), enableBackground: 'new 0 0 43 43'}"
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
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    x="0px" y="0px" width="15.2px" height="21.9px" viewBox="0 0 15.2 21.9" style="enable-background:new 0 0 15.2 21.9;"
                                    xml:space="preserve">
                                    <path class="key1" d="M8.6,2.3c0.3,0.2,0.3,0.5,0.2,0.8C8.6,3.3,8.3,3.4,8,3.3L7,2.7L6.3,3.8C6,4.3,6.1,5,6.6,5.3
                                    c0,0,0,0,0,0L9,6.7l3-5.2L9.7,0.1C9.1-0.2,8.5,0,8.2,0.5c0,0,0,0,0,0L7.5,1.7L8.6,2.3z M7,12.4C7,12.4,7,12.4,7,12.4l-0.6-0.2
                                    c-2.1-1.2-4.7-0.4-5.9,1.7c-1.1,2-0.4,4.6,1.6,5.8l3,1.7c2.1,1.2,4.7,0.4,5.9-1.7c1.1-2,0.4-4.6-1.6-5.8l-0.6-0.3c0,0,0.1,0,0.1,0
                                    L15,3c0.3-0.5,0.2-1.2-0.3-1.5s-1.2-0.2-1.5,0.3c0,0-0.1,0.1-0.1,0.1L7,12.4z M9.1,18.7c-0.6,1-1.9,1.4-2.9,0.8l-3-1.7
                                    c-1-0.6-1.4-1.9-0.8-2.9s1.9-1.4,2.9-0.8l0,0l3,1.7C9.3,16.4,9.6,17.7,9.1,18.7z"/>
                                </svg>
                                <label>{{ token.tokenname }} ({{token.tokensymbol}}) </label>
                                <!--<span>({{ token.tokenamount}})</span>-->
                            </div>
                            <div>
                                <p class="tooltip accoundID wd180">{{ token.token.addr }}
                                    <span class="tooltiptext parrentFont">{{ token.token.addr }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="contractdata === null" class="content">
            <div class="accounts">
                <div class="no-token">
                    <h1>No Tokens Found</h1>
                </div>
            </div>
        </div>
        <div v-else class="txns_details" >
            <div class="md-content">
                <div class="loader transactionLoader">
                    <div class="outerCircle">
                        <img src="../../../../assets/img/outer.png">
                    </div>
                    <div class="innerCircle">
                        <img src="../../../../assets/img/inner.png">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {apiurl} from '../../../../../main/libs/config';
    import {getRandomColor} from '../../../AccountsData/commonFunc';
    import {db} from '../../../../../../lowdbFunc';
    import axios from 'axios';
    import CryptoJS from "crypto-js";
    import shortid from "shortid";
    export default {
        name: 'Tokens',
        data() {
            return{
                contractdata: '',
                getRandomColor,
            };
        },
        created(){
            this.fetch();
        },
        methods: {
            mainMenu(contractid, contract) {
                this.$router.push({
                    path: '/contractdata',
                    query: {
                        contractid: contractid,
                        contract: contract
                    }
                });
            },
            fetch() {
                let bytes1  = CryptoJS.AES.decrypt(localStorage.getItem('lunatoken'), 'luna');
                let plaintext1 = bytes1.toString(CryptoJS.enc.Utf8);
                const config = { headers: { "Content-Type": "application/json", "Authorization": plaintext1} };
                let bytes  = CryptoJS.AES.decrypt(localStorage.getItem('lunamail'), 'luna');
                let plaintext = bytes.toString(CryptoJS.enc.Utf8);
                // console.log(plaintext, "plainText");
                let url = apiurl + `/contracts/email/${plaintext}`;
                var color = getRandomColor();
                axios.get(url, config )
                    .then((response)  =>  {
                        console.log(response.data.data);
                        this.contractdata = response.data.data;
                        response.data.data.map((token) => {
                            if(token.step >= 4 && token.paid && !token.archived) {
                                // console.log(token);
                                let token1 = db.get('tokens').find({ token_address: token.token && token.token.addr }).value();
                                if(token1)
                                {

                                } else {
                                    db.get('tokens').assign().push({
                                        id : shortid.generate(),
                                        token_address: token.token.addr,
                                        token_name : token.tokenname,
                                        token_symbol: token.tokensymbol,
                                        tokenType: token.std,
                                        decimal_places: token.tokendecimal,
                                        color: color
                                    }).write();
                                }
                                const config1 = { headers: { "Content-Type": "application/json"} };
                                var url1 = apiurl + `/contract/standard/${token.std}`;
                                axios.get(url1, config1 ).then((response)  =>  {
                                    // console.log( response.data.data, "getAddress 1");
                                    if(token.balances.addr) {
                                        let contract1 = db.get('contracts').find({
                                            contract_address: token.balances.addr
                                        }).value();
                                        if(contract1) {

                                        }
                                        else {
                                            db.get('contracts').push({
                                                id: shortid.generate(),
                                                contract_name: token.tokensymbol+ ' balance Contract ',
                                                contract_address: token.balances.addr,
                                                contract_json: response.data.data.balances.abi,
                                                color: getRandomColor(),
                                            }).write();
                                        }
                                    }
                                    if(token.admin.addr) {
                                        let contract1 = db.get('contracts').find({
                                            contract_address: token.admin.addr
                                        }).value();
                                        if(contract1) {

                                        }
                                        else {
                                            db.get('contracts').push({
                                                id: shortid.generate(),
                                                contract_name: token.tokensymbol+ ' admin Contract ',
                                                contract_address: token.admin.addr,
                                                contract_json: response.data.data.admin.abi,
                                                color: getRandomColor(),
                                            }).write();
                                        }
                                    }
                                }, (error)  =>  {
                                    console.log(error)
                                });


                            }
                        })
                    }, (error)  =>  {
                        console.log(error)
                    });
            }
        }
    }
</script>


<style>

    .no-token{
        background-color: #1a3640;
        width: 100%;
        padding: 60px 0px;
        text-align: center;
        font-size: 25px;
    }
</style>
