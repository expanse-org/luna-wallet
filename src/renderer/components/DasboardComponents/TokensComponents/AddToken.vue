<template>
    <div class="popup popup1 md-content ">
        <form v-if="!editForm" id="addToken" method="#">
            <h1>Add Token</h1>
            <div class="row">
                <input class="add_or_update_token" type="hidden" value="0"/>
                <!-- 0 = add , 1 = update -->
                <p v-if="tokenAddressError" class="error-message tokenHash-error">{{tokenAddressError}}</p>
                <span class="input input--nao">
                    <input type="text" name="token_contract_address" v-model="tokenAddress" @focus="handleFoucs" @change="handleContractAdd"
                           class="token_contract_address input__field input__field--nao "/>
                    <label class="input__label input__label--nao " >
                        <span class="input__label-content input__label-content--nao">Token Contract Address
                            <span class="mandatory">*</span>
                        </span>
                    </label>
                    <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60"
                         preserveAspectRatio="none">
                        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                    </svg>
                </span>
            </div>
            <div class="row">
                <p v-if="tokenNameError" class="error-message tokenName-error">Name is required</p>
                <span class="input input--nao">
                    <input type="text" name="tokenName" v-model="tokenName" @focus="handleFoucs"
                           class="field tokenName input__field input__field--nao"/>

                    <label class="input__label input__label--nao" >
                        <span class="input__label-content input__label-content--nao">Token Name
                            <span class="mandatory">*</span>
                        </span>
                    </label>
                    <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60"
                         preserveAspectRatio="none">
                        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                    </svg>
                </span>
            </div>
            <div class="row">
                <p v-if="tokenTypeError" class="error-message tokenType-error">Type is required</p>
                <div class="cont_select_center">
                    <div class="select_mate" data-mate-select="active">
                        <select name="tokenType" class="tokenType" :selected="tokenType" v-model="tokenType" @focus="handleFoucs">
                            <option value="erc20">ERC20</option>
                            <option value="standard">Standard Interface</option>
                        </select>
                        <p class="selecionado_opcion" @click="open_select(this)"></p>
                        <span @click="open_select(this)" class="icon_select_mate">
                            <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>
                                <path d="M0-.75h24v24H0z" fill="none"/>
                            </svg>
                        </span>
                        <div class="cont_list_select_mate">
                            <ul class="cont_select_int"></ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row2">
                <span class="input items input--nao">
                    <p v-if="tokensymbolError" class="error-message tokenSymbol-error">Symbol is required</p>
                    <input type="text" class="token_symbol input__field input__field--nao" name="token_symbol"
                           placeholder=""  v-model="tokensymbol" @focus="handleFoucs"/>
                    <label class="input__label input__label--nao" >
                        <span class="input__label-content input__label-content--nao">Token Symbol
                            <span class="mandatory">*</span>
                        </span>
                    </label>
                    <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60"
                         preserveAspectRatio="none">
                        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                    </svg>
                </span>
                <span class="input items input--nao">
                    <p v-if="decimalplacesError" class="error-message tokendecimal-error">Decimal Value is required</p>
                    <input type="text" class="input__field input__field--nao input_number" value="0" min="0"
                           name="decimal_places"  v-model="decimalplaces" @focus="handleFoucs"/>

                    <label class="input__label input__label--nao" >
                        <span class="input__label-content input__label-content--nao">Decimal Value
                            <span class="mandatory">*</span>
                        </span>
                    </label>
                    <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60"
                         preserveAspectRatio="none">
                        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                    </svg>
                </span>
            </div>
            <div class="row">
        <!--    <div class="place">
            <div class="minus-plus">
                            <button type="button" class="minus">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="16" height="16" viewBox="0 0 16 16">
                                <path d="M8.000,16.000 C3.582,16.000 -0.000,12.418 -0.000,8.000 C-0.000,3.582 3.582,0.000 8.000,0.000 C12.418,0.000 16.000,3.582 16.000,8.000 C16.000,12.418 12.418,16.000 8.000,16.000 ZM13.000,7.000 L3.000,7.000 L3.000,9.000 L13.000,9.000 L13.000,7.000 Z" class="subtract"/>
                                </svg>
                            </button>
                            <button type="button" class="plus">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="16" height="16" viewBox="0 0 16 16">
                                <path d="M8.000,16.000 C3.582,16.000 -0.000,12.418 -0.000,8.000 C-0.000,3.582 3.582,0.000 8.000,0.000 C12.418,0.000 16.000,3.582 16.000,8.000 C16.000,12.418 12.418,16.000 8.000,16.000 ZM13.000,7.000 L9.000,7.000 L9.000,3.000 L7.000,3.000 L7.000,7.000 L3.000,7.000 L3.000,9.000 L7.000,9.000 L7.000,13.000 L9.000,13.000 L9.000,9.000 L13.000,9.000 L13.000,7.000 Z" class="add"/>
                                </svg>
                            </button>
                        </div>
                </div>
                <div class="test token_values">
                    <div class="expanse">
                        <label>TEST</label>
                        <label>0.00
                            <span class="token_symbol">EXP</span>
                        </label>
                    </div>
                    <button type="button" class="del">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="12"
                            height="16" viewBox="0 0 12 16">
                            <path d="M-0.000,2.917 L-0.000,1.329 C-0.000,1.050 0.228,0.824 0.508,0.824 L3.998,0.824 L3.998,0.169 C3.998,0.075 4.074,-0.000 4.168,-0.000 L7.832,-0.000 C7.926,-0.000 8.002,0.075 8.002,0.169 L8.002,0.824 L11.492,0.824 C11.772,0.824 12.000,1.050 12.000,1.329 L12.000,2.917 L-0.000,2.917 ZM10.592,15.228 C10.574,15.660 10.216,16.000 9.782,16.000 L2.218,16.000 C1.784,16.000 1.427,15.660 1.408,15.228 L0.868,3.896 L11.132,3.896 L10.592,15.228 ZM4.006,6.330 C4.006,6.152 3.882,6.009 3.729,6.009 L3.286,6.009 C3.133,6.009 3.009,6.153 3.009,6.330 L3.009,12.691 C3.009,12.868 3.133,13.012 3.286,13.012 L3.729,13.012 C3.882,13.012 4.006,12.868 4.006,12.691 L4.006,6.330 ZM6.997,6.330 C6.997,6.152 6.749,6.009 6.443,6.009 L5.557,6.009 C5.251,6.009 5.003,6.153 5.003,6.330 L5.003,12.691 C5.003,12.868 5.251,13.012 5.557,13.012 L6.443,13.012 C6.749,13.012 6.997,12.868 6.997,12.691 L6.997,6.330 ZM8.991,6.330 C8.991,6.152 8.867,6.009 8.714,6.009 L8.271,6.009 C8.118,6.009 7.994,6.153 7.994,6.330 L7.994,12.691 C7.994,12.868 8.118,13.012 8.271,13.012 L8.714,13.012 C8.867,13.012 8.991,12.868 8.991,12.691 L8.991,6.330 Z"
                                class="bin" />
                        </svg>
                    </button>
                </div>-->
            </div>
            <div class="alert-sucess hide">
                <p>Sweet! Token successfully Added.</p>
            </div>
            <div class="alert-unsucess hide">
                <p>ERROR</p>
            </div>
            <div class="buttons">

                <button class=" ok button button--shikoba" @click="handleAddToken($event)" type="submit">
                    <img class="button__icon" src="../../../assets/img/add.svg">
                    <span>add</span>
                </button>
            </div>
        </form>
        <form v-if="editForm" id="editToken" method="#">
            <h1>Update Token</h1>
            <div class="row">
                <input class="add_or_update_token" type="hidden" value="0"/>
                <!-- 0 = add , 1 = update -->
                <span class="input input--nao">
                    <input type="text" name="token_contract_address" v-model="tokenAddress" @focus="handleFoucs" @change="handleContractAdd"
                           class="token_contract_address input__field input__field--nao "/>
                    <label class="input__label input__label--nao " >
                        <span class="input__label-content input__label-content--nao">Token Contract Address
                            <span class="mandatory">*</span>
                        </span>
                    </label>
                    <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60"
                         preserveAspectRatio="none">
                        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                    </svg>
                </span>
            </div>
            <div class="row">
                <p v-if="tokenNameError" class="error-message tokenName-error">Name is required</p>
                <span class="input input--nao">
                    <input type="text" name="tokenName" v-model="tokenName" @focus="handleFoucs"
                           class="field tokenName input__field input__field--nao"/>

                    <label class="input__label input__label--nao" >
                        <span class="input__label-content input__label-content--nao">Token Name
                            <span class="mandatory">*</span>
                        </span>
                    </label>
                    <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60"
                         preserveAspectRatio="none">
                        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                    </svg>
                </span>
            </div>
            <div class="row">
                <p v-if="tokenTypeError" class="error-message tokenType-error">Type is required</p>
                <div class="cont_select_center">
                    <div class="select_mate" data-mate-select="active">
                        <select name="tokenType" class="tokenType" :selected="tokenType" v-model="tokenType" @focus="handleFoucs">
                            <option value="erc20">ERC20</option>
                            <option value="standard">Standard Interface</option>
                        </select>
                        <p class="selecionado_opcion" @click="open_select(this)"></p>
                        <span @click="open_select(this)" class="icon_select_mate">
                            <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>
                                <path d="M0-.75h24v24H0z" fill="none"/>
                            </svg>
                        </span>
                        <div class="cont_list_select_mate">
                            <ul class="cont_select_int"></ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row2">
                <span class="input items input--nao">
                    <p v-if="tokensymbolError" class="error-message tokenSymbol-error">Symbol is required</p>
                    <input type="text" class="token_symbol input__field input__field--nao" name="token_symbol"
                           placeholder=""  v-model="tokensymbol" @focus="handleFoucs"/>
                    <label class="input__label input__label--nao" >
                        <span class="input__label-content input__label-content--nao">Token Symbol
                            <span class="mandatory">*</span>
                        </span>
                    </label>
                    <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60"
                         preserveAspectRatio="none">
                        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                    </svg>
                </span>
                <span class="input items input--nao">
                    <p v-if="decimalplacesError" class="error-message tokendecimal-error">Decimal Value is required</p>
                    <input type="text" class="input__field input__field--nao input_number" value="0" min="0"
                           name="decimal_places"  v-model="decimalplaces" @focus="handleFoucs"/>

                    <label class="input__label input__label--nao" >
                        <span class="input__label-content input__label-content--nao">Decimal Value
                            <span class="mandatory">*</span>
                        </span>
                    </label>
                    <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60"
                         preserveAspectRatio="none">
                        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                    </svg>
                </span>
            </div>
            <div class="row">
                <!--    <div class="place">
                    <div class="minus-plus">
                                    <button type="button" class="minus">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="16" height="16" viewBox="0 0 16 16">
                                        <path d="M8.000,16.000 C3.582,16.000 -0.000,12.418 -0.000,8.000 C-0.000,3.582 3.582,0.000 8.000,0.000 C12.418,0.000 16.000,3.582 16.000,8.000 C16.000,12.418 12.418,16.000 8.000,16.000 ZM13.000,7.000 L3.000,7.000 L3.000,9.000 L13.000,9.000 L13.000,7.000 Z" class="subtract"/>
                                        </svg>
                                    </button>
                                    <button type="button" class="plus">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="16" height="16" viewBox="0 0 16 16">
                                        <path d="M8.000,16.000 C3.582,16.000 -0.000,12.418 -0.000,8.000 C-0.000,3.582 3.582,0.000 8.000,0.000 C12.418,0.000 16.000,3.582 16.000,8.000 C16.000,12.418 12.418,16.000 8.000,16.000 ZM13.000,7.000 L9.000,7.000 L9.000,3.000 L7.000,3.000 L7.000,7.000 L3.000,7.000 L3.000,9.000 L7.000,9.000 L7.000,13.000 L9.000,13.000 L9.000,9.000 L13.000,9.000 L13.000,7.000 Z" class="add"/>
                                        </svg>
                                    </button>
                                </div>
                        </div>
                        <div class="test token_values">
                            <div class="expanse">
                                <label>TEST</label>
                                <label>0.00
                                    <span class="token_symbol">EXP</span>
                                </label>
                            </div>
                            <button type="button" class="del">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="12"
                                    height="16" viewBox="0 0 12 16">
                                    <path d="M-0.000,2.917 L-0.000,1.329 C-0.000,1.050 0.228,0.824 0.508,0.824 L3.998,0.824 L3.998,0.169 C3.998,0.075 4.074,-0.000 4.168,-0.000 L7.832,-0.000 C7.926,-0.000 8.002,0.075 8.002,0.169 L8.002,0.824 L11.492,0.824 C11.772,0.824 12.000,1.050 12.000,1.329 L12.000,2.917 L-0.000,2.917 ZM10.592,15.228 C10.574,15.660 10.216,16.000 9.782,16.000 L2.218,16.000 C1.784,16.000 1.427,15.660 1.408,15.228 L0.868,3.896 L11.132,3.896 L10.592,15.228 ZM4.006,6.330 C4.006,6.152 3.882,6.009 3.729,6.009 L3.286,6.009 C3.133,6.009 3.009,6.153 3.009,6.330 L3.009,12.691 C3.009,12.868 3.133,13.012 3.286,13.012 L3.729,13.012 C3.882,13.012 4.006,12.868 4.006,12.691 L4.006,6.330 ZM6.997,6.330 C6.997,6.152 6.749,6.009 6.443,6.009 L5.557,6.009 C5.251,6.009 5.003,6.153 5.003,6.330 L5.003,12.691 C5.003,12.868 5.251,13.012 5.557,13.012 L6.443,13.012 C6.749,13.012 6.997,12.868 6.997,12.691 L6.997,6.330 ZM8.991,6.330 C8.991,6.152 8.867,6.009 8.714,6.009 L8.271,6.009 C8.118,6.009 7.994,6.153 7.994,6.330 L7.994,12.691 C7.994,12.868 8.118,13.012 8.271,13.012 L8.714,13.012 C8.867,13.012 8.991,12.868 8.991,12.691 L8.991,6.330 Z"
                                        class="bin" />
                                </svg>
                            </button>
                        </div>-->
            </div>
            <div class="alert-sucess hide">
                <p>Sweet! Token successfully Updated.</p>
            </div>
            <div class="alert-unsucess hide">
                <p>ERROR</p>
            </div>
            <div class="buttons">

                <button class=" ok button button--shikoba" @click="handleAddToken($event)" type="submit">
                    <img class="button__icon" src="../../../assets/img/add.svg">
                    <span>Update</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import { startConnectWeb, tokenInterface } from '../../../../main/libs/config';
    import { getRandomColor } from '../../AccountsData/commonFunc';
    import { db } from '../../../../../lowdbFunc';

    var web3 = startConnectWeb();
    import shortid from 'shortid';
    import * as $ from 'jquery';
    import Raven from 'raven';
    import { listTokens } from './listTokenfunc';
    import  ethereum_address from 'ethereum-address';

    export default {
        name: 'Addtoken',
        data() {
            return {
                tokenAddress: '',
                tokenName: '',
                tokenType: 'erc20',
                tokensymbol: '',
                decimalplaces: '',
                tokenAddressError: '',
                tokenNameError: false,
                tokenTypeError: false,
                tokensymbolError: false,
                decimalplacesError: false,
                editForm: false,
                tokenHash: false,
                tokenID: '',
            };
        },
        computed: {
            tokenIDData: function () {
                this.tokenID = this.$store.state.editTokenHash;
                if(this.tokenID){
                    this.editForm = true;
                }
                return this.tokenID;
            },
        },
        created(){
            let token_ID = this.tokenIDData;
            console.log(this.editForm);
            if(this.editForm){
                let token = db.get('tokens').find({ id: token_ID }).value();
                if(token){
                    this.tokenAddress = token.token_address;
                    this.tokenName = token.token_name;
                    this.tokensymbol = token.token_symbol;
                    this.decimalplaces = token.decimal_places;
                    this.tokenType = token.tokenType;
                    this.tokenID = token.id;
                    $('#editToken span.input.input--nao').addClass('input--filled');
                }
            }

        },
        methods: {
            handleContractAdd(){
                let that = this;
                let token_hash = this.tokenAddress;
                if((!ethereum_address.isAddress(this.tokenAddress))){
                    that.tokenAddressError = 'Invalid Hash Address';
                    console.log(this.tokenAddressError,"this.tokenAddress" )
                }else {
                    // console.log(this.tokenAddress,"this.tokenAddress",tokenInterface )
                    // console.log(web3,"web3")
                    var TokenContract = new web3.eth.Contract(tokenInterface, token_hash);
                    console.log(TokenContract,"TokenContract")
                    try{
                        console.log("try TokenContract ------- 1 ----", TokenContract)
                        // console.log("try TokenContract", TokenContract.methods.name())
                        TokenContract.methods.name().call(function(err ,res){
                            if(err){
                                that.tokenName = '';
                                return false;
                            }
                            that.tokenName = res;
                            console.log(res,"tokenName")
                        });
                    }catch(e){
                        that.tokenName = '';
                    }
                    try{
                        TokenContract.methods.symbol().call(function(err ,res){
                            if(err){
                                that.tokensymbol = '';
                                return false;
                            }
                            that.tokensymbol = res;
                            console.log(res,"tokensymbol")
                        });
                    }catch(e){
                        that.tokensymbol = '';
                        console.log(e,"catch tokensymbol")
                    }
                    try{
                        TokenContract.methods.decimals().call(function(err ,res){
                            if(err){
                                that.decimalplaces = '';
                                return false;
                            }
                            that.decimalplaces = res;
                            console.log(res,"decimalplaces")
                        });
                    }catch(e){
                        that.decimalplaces = '';
                    }
                    console.log(this.decimalplaces, "decimalplaces")
                }
            },
            handleAddToken(e){
                e.preventDefault();
                if(this.tokenAddress && this.tokenName && this.tokenType && this.tokensymbol && this.decimalplaces){
                    let token = db.get('tokens').find({ token_address: this.tokenAddress }).value();
                    if(this.tokenAddress.length < 5){
                        this.tokenAddressError = 'Hash Address is required';
                    }else{
                        if((!ethereum_address.isAddress(this.tokenAddress))){
                            this.tokenAddressError = 'Invalid Hash Address';
                        }
                        if(this.editForm){
                            if(token){
                                this.tokenAddressError = "Token Already Exists";
                            }
                        }
                        try{
                            if(!this.editForm){
                                var color = getRandomColor();
                                db.get('tokens').push({  id : shortid.generate(), token_address: this.tokenAddress, token_name : this.tokenName, token_symbol: this.tokensymbol, tokenType:this.tokenType, decimal_places: this.decimalplaces, color:color}).write()
                                listTokens();
                                console.log(this.$store.state.tokenList, "add tokenList");
                            }else{
                                // console.log('update tokens');
                                db.get('tokens').find({ id: this.tokenID  }).assign({  token_name : this.tokenName, token_symbol: this.tokensymbol,tokenType:this.tokenType, decimal_places: this.decimalplaces }).write();
                                listTokens();
                            }
                            $('.alert-sucess').show(300).delay(5000).hide(330);
                        }catch(err) {
                            console.log("Execption Error",err.message);
                            Raven.captureException(err);
                        }
                        // listTokens();
                        // listAccounts();
                    }
                    this.decimalplaces = parseInt(this.decimalplaces);
                }else {
                    if (!this.tokenAddress){
                        this.tokenAddressError = 'Hash Address is required';
                    }
                    if (!this.tokenName){
                        this.tokenNameError = true;
                    }
                    if (!this.tokenType){
                        this.tokenTypeError = true;
                    }
                    if (!this.tokensymbol){
                        this.tokensymbolError = true;
                    }
                    if (!this.decimalplaces){
                        this.decimalplacesError = true;
                    }
                }
            },
            handleFoucs(){
                this.tokenAddressError = false;
                this.tokenNameError = false;
                this.tokenTypeError = false;
                this.tokensymbolError = false;
                this.decimalplacesError = false;
            },
            open_select(idx) {
                console.log("open_select");
                // var idx1 = idx.getAttribute('data-n-select');
                // var ul_cont_li = document.querySelectorAll("[data-indx-select='" + idx1 + "'] .cont_select_int > li");
                // var hg = 0;
                // var slect_open = document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].getAttribute(
                //     'data-selec-open');
                // var slect_element_open = document.querySelectorAll("[data-indx-select='" + idx1 + "'] select")[0];
                // if (isMobileDevice()) {
                //     if (window.document.createEvent) { // All
                //         var evt = window.document.createEvent("MouseEvents");
                //         evt.initMouseEvent("mousedown", false, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0,
                //             null);
                //         slect_element_open.dispatchEvent(evt);
                //     } else if (slect_element_open.fireEvent) { // IE
                //         slect_element_open.fireEvent("onmousedown");
                //     } else {
                //         slect_element_open.click();
                //     }
                // } else {
                //
                //
                //     for (var i = 0; i < ul_cont_li.length; i++) {
                //         hg += ul_cont_li[i].offsetHeight;
                //     };
                //     if (slect_open == 'false') {
                //         document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].setAttribute('data-selec-open',
                //             'true');
                //         document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul")[0].style
                //             .height = hg + "px";
                //         document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .icon_select_mate")[0].style.transform =
                //             'rotate(180deg)';
                //     } else {
                //         document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].setAttribute('data-selec-open',
                //             'false');
                //         document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .icon_select_mate")[0].style.transform =
                //             'rotate(0deg)';
                //         document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul")[0].style
                //             .height = "0px";
                //     }
                // }

            }
        }
    }
</script>

<style>

</style>
