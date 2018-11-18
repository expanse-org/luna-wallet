<template>
    <div class="popup popup1 md-content ">
        <a href="#" @click="hide" class="btn-close md-close"></a>
        <form v-if="!editForm" id="addToken" method="#">
            <h1>Watch Token</h1>
            <div class="row">
                <input class="add_or_update_token" type="hidden" value="0"/>
                <!-- 0 = add , 1 = update -->
                <p v-if="tokenAddressError" class="error-message tokenHash-error">{{tokenAddressError}}</p>
                <span :class="tokenAddress? 'input input--nao input--filled': 'input input--nao'">
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
                <span :class="tokenName? 'input input--nao input--filled': 'input input--nao'">
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
            <div class="row imppdrop">
                <p v-if="tokenTypeError" class="error-message tokenType-error">Type is required</p>
                <div class="cont_select_center">
                    <label >Token Type<span class="mandatory">*</span></label>
                    <div class="select_mate" data-mate-select="active">
                        <multiselect :searchable="false" name="tokenType" v-model="tokenType" track-by="text" :allow-empty="false" label="text" :show-labels="false" placeholder="Select Type" :options="optionTab" >
                            <template slot="singleLabel" slot-scope="{option}">
                               <span class="option__title">{{ option.text }}</span>
                            </template>
                        </multiselect>
                    </div>
                </div>
            </div>
            <div class="row2">
                <span :class="tokensymbol? 'input items input--nao input--filled': 'input items input--nao'">
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
                <span :class="decimalplaces? 'input items input--nao input--filled': 'input items input--nao'">
                    <p v-if="decimalplacesError" class="error-message tokendecimal-error">{{decimalplacesError}}</p>
                    <input type="number" class="input__field input__field--nao input_number" value="0" min="0"
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
                <span :class="tokenAddress? 'input input--nao input--filled': 'input input--nao'">
                    <input type="text" name="token_contract_address" disabled v-model="tokenAddress" @focus="handleFoucs"
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
                <span :class="tokenName? 'input input--nao input--filled': 'input input--nao'">
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
            <div class="row imppdrop">
                <p v-if="tokenTypeError" class="error-message tokenType-error">Type is required</p>
                <div class="cont_select_center">
                    <div class="select_mate" data-mate-select="active">
                        <multiselect :searchable="false" name="tokenType" v-model="tokenType" track-by="text" :allow-empty="false" label="text" :show-labels="false" placeholder="Select Type" :options="optionTab" >
                            <template slot="singleLabel" slot-scope="{option}">
                                <span class="option__title">{{ option.text }}</span>
                            </template>
                        </multiselect>
                    </div>
                </div>
            </div>
            <div class="row2">
                <span :class="tokensymbol? 'input items input--nao input--filled': 'input items input--nao'">
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
                <span :class="decimalplaces? 'input items input--nao input--filled': 'input items input--nao'" >
                    <p v-if="decimalplacesError" class="error-message tokendecimal-error">{{decimalplacesError}}</p>
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
    import { web3, tokenInterface } from '../../../../main/libs/config';
    import { getRandomColor } from '../../AccountsData/commonFunc';
    import { db } from '../../../../../lowdbFunc';
    import Multiselect from 'vue-multiselect'

    // var web3 = startConnectWeb();
    import shortid from 'shortid';
    import * as $ from 'jquery';
    import Raven from 'raven';
    import { listTokens } from './listTokenfunc';
    import  ethereum_address from 'ethereum-address';

    export default {
        name: 'Addtoken',
        props:['updateData','token_id'],
        data() {
            return {
                tokend: '',
                tokenAddress: '',
                tokenName: '',
                tokenType: {value: 'erc20',text:' ERC20'},
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
                optionTab: [{value: 'erc20',text:' ERC20'},{value: 'standard',text:'Standard Interface'}]
            };
        },
        components:{
            'multiselect': Multiselect,
        },
        computed: {
            AddTokenData() {
                let tokens = db.get('tokens').value();
                return tokens;
            }
        },
        created(){
            let token_ID = this.token_id;
            console.log(this.editForm, this.token_id);
            if(token_ID) {
                this.editForm = true;
                let token = db.get('tokens').find({ id: token_ID }).value();
                console.log(token);
                if(token) {
                    this.tokenAddress = token.token_address;
                    this.tokenName = token.token_name;
                    this.tokensymbol = token.token_symbol;
                    this.decimalplaces = token.decimal_places;
                    this.tokenType = token.tokenType == 'erc20' ? {value: 'erc20',text:' ERC20'} : {value: 'standard',text:'Standard Interface'};
                    this.tokenID = token.id;
                }
            } else {
                this.editForm = false;
                this.tokenAddress = '';
                this.tokenName = '';
                this.tokensymbol = '';
                this.decimalplaces = '';
                this.tokenType = {value: 'erc20',text:' ERC20'};
            }

        },
        methods: {
            hide () {
                this.$modal.hide('watchtoken');
            },
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
                console.log(this.editForm);
                if(this.tokenAddress && this.tokenName && this.tokenType.value && this.tokensymbol && this.decimalplaces){
                    let token = db.get('tokens').find({ token_address: this.tokenAddress }).value();
                    this.decimalplaces = parseInt(this.decimalplaces);
                    console.log(this.decimalplaces , this.decimalplaces <= 36)
                    if(this.decimalplaces >= 0 && this.decimalplaces <= 36) {
                        if(this.tokenAddress.length < 5){
                            this.tokenAddressError = 'Hash Address is required';
                        }else{
                            if((!ethereum_address.isAddress(this.tokenAddress))){
                                this.tokenAddressError = 'Invalid Hash Address';
                                return false;
                            }
                            if(!this.editForm){
                                if(token){
                                    this.tokenAddressError = "Token Already Exists";
                                    return false;
                                }
                            }
                            try{
                                if(!this.editForm){
                                    var color = getRandomColor();
                                    db.get('tokens').assign().push({  id : shortid.generate(), token_address: this.tokenAddress, token_name : this.tokenName, token_symbol: this.tokensymbol, tokenType:this.tokenType.value, decimal_places: this.decimalplaces, color:color}).write()
                                    this.updateData();
                                    this.tokenAddress = '';
                                    this.tokenName = '';
                                    this.tokensymbol = '';
                                    this.decimalplaces = '';
                                    this.tokenType = {value: 'erc20',text:' ERC20'};
                                }else{
                                    // console.log('update tokens');
                                    var color = getRandomColor();
                                    db.get('tokens').find({ id: this.tokenID  }).assign({  token_name : this.tokenName, token_symbol: this.tokensymbol,tokenType:this.tokenType.value, decimal_places: this.decimalplaces }).write();
                                    this.updateData();
                                }
                                $('.alert-sucess').show(300).delay(5000).hide(330);
                            }catch(err) {
                                console.log("Execption Error",err.message);
                                Raven.captureException(err);
                            }
                        }
                    } else {
                        this.decimalplacesError = 'Value must be positive & less than 36';
                        console.log(this.decimalplacesError , this.decimalplaces <= 36)
                    }
                }else {
                    if (!this.tokenAddress){
                        this.tokenAddressError = 'Hash Address is required';
                    }
                    if (!this.tokenName){
                        this.tokenNameError = true;
                    }
                    if (!this.tokenType.value){
                        this.tokenTypeError = true;
                    }
                    if (!this.tokensymbol){
                        this.tokensymbolError = true;
                    }
                    if (!this.decimalplaces){
                        this.decimalplacesError = 'Decimal Value is required';
                    }
                }
            },
            handleFoucs(){
                this.tokenAddressError = '';
                this.tokenNameError = false;
                this.tokenTypeError = false;
                this.tokensymbolError = false;
                this.decimalplacesError = '';
            },
        }
    }
</script>

<style>
    @import "../../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";
</style>

<style>

    .select_mate .multiselect__tags {
        width: 100%!important;
        border: none!important;
        border-radius : 0px!important;
    }

    .select_mate .multiselect__content-wrapper {
        z-index: 11111;
        /*display: block!important;*/
        border-radius: 0px!important;
    }

    .select_mate {
        border-radius: 0px!important;
    }

    .select_mate .multiselect__input,.select_mate .multiselect__single {
        padding: 0px 0 0 20px!important;
        line-height: 39px!important;
    }

    .select_mate .multiselect__option--selected .multiselect__option--highlight {
        background: #ffffff!important;
        color: #000!important;
    }

    .select_mate .multiselect__option--highlight{
        background: #ffffff!important;
        color: #000!important;
    }

    .select_mate .multiselect__element{
        background: #ffffff!important;
        color: #000!important;
    }

    .select_mate  .multiselect__select{
        height: 30px;
    }

    .select_mate  .multiselect__single{
        height: 25px;
    }
    .select_mate  .multiselect__single .option__title{
        vertical-align: top!important;
        line-height: 29px!important;
    }

    .select_mate  .multiselect__option {
        padding: 18px 0px 5px 28px!important;
        min-height: 46px!important;
        /*display: -webkit-inline-box!important;*/
    }

    .select_mate .multiselect__content-wrapper {
        margin-top: 3px;
    }

    .select_mate .multiselect__content {
        padding: 0px 0 0px 0px!important;
    }

    .select_mate .multiselect__element:hover {
        background-color: #f3f3f3!important;
    }

    .select_mate .multiselect__option .option__title {
        vertical-align: top!important;
        line-height: 39px!important;
    }

    .imppdrop {
        z-index: 999;
    }

    .imppdrop .cont_select_center label {
        text-align: left !important;
        vertical-align: super;
        display: inline-block;
    }

</style>
