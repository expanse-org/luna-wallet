<template>
    <div class="popup md-content ">
        <a href="#" @click="hide1" class="btn-close md-close"></a>
        <div class="deploy-modal">
            <div>
                <h1>Deploy Contract</h1>
                <div class="row">
                    <p v-if="contractNameError" class="error-message contractName-error">Contract Name is required</p>
                    <span :class="contractName? 'input input--nao input--filled': 'input input--nao'">
                        <input type="text" class="field input__field input__field--nao" v-model="contractName" @focus="handleFocus" name="contractName" />
                        <label class="input__label input__label--nao" >
                            <span class="input__label-content input__label-content--nao">CONTRACT NAME
                                <span class="mandatory">*</span>

                            </span>
                        </label>
                        <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                            <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                        </svg>
                    </span>
                </div>
                <br /><br />
                <div class="row fromdpdown">
                    <div class="fmlabel">
                        <p v-if="AddressFromError" class="error-message from-error">FROM is reqiured</p>
                        <label>FROM </label>
                    </div>
                    <div>
                      <!--  <input type="text" class="field input__field input__field--nao"  v-model="AddressFrom" @focus="handleFocus"/> -->
                         <multiselect :searchable="false" name="SendFunds" track-by="text" :loading="loading" :allow-empty="false" label="text"  @select="handlefromchange" :show-labels="false" placeholder="Select From Account"  v-model="AddressFrom" :options="optionFrom">
                            <template slot="singleLabel" slot-scope="props">
                                <img class="option__image" src="../../../assets/img/selectbg2.png" /><img class="option__image setImg" src="../../../assets/img/selectkey.png" /><span class="option__title">{{ props.option.text }}</span>
                            </template>
                            <template slot="option" slot-scope="props">
                                <img class="option__image" src="../../../assets/img/selectbg2.png" /><img class="option__image setImg" src="../../../assets/img/selectkey.png" /><span class="option__title">{{ props.option.text }}</span>
                            </template>
                        </multiselect>
                    </div>
                </div>
                <div class="row">
                    <p v-if="amountError" class="error-message amount-error">Amount is reqiured</p>
                    <span :class="amount || amount === 0? 'input input--nao input--filled': 'input input--nao'">
                        <input type="number" class="field input__field input__field--nao" v-model="amount" @focus="handleFocus"/>
                        <label class="input__label input__label--nao" >
                            <span class="input__label-content input__label-content--nao">Amount
                            </span>
                        </label>
                        <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                            <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                        </svg>
                    </span>
                </div>
                <div class="chexboxes row">
                    <div class="checkbox perform">
                        <label class="filter__value">
                            <input class="filter__mark showPass" type="checkbox" v-model="sendAllAmount" @click="handlesendall" id="input-3">
                            <i class="filter__mark"></i>
                            <span class="filter__text">Send All
                                <span> 0 Expasne</span>
                            </span>
                        </label>
                    </div>
                </div>

                <div class="row editorCode">
                    <div class="fmlabel">
                        <p v-if="contentError" class="error-message from-error">{{contentError}}</p>
                        <label>Source Code </label>
                    </div>
                    <editor v-model="content" @init="editorInit" :onChange="onChange"  :onFocus="onChange" lang="javascript" theme="chrome" height="150"></editor>
                </div>
                <div class="row">
                    <div class="slidecontainer">
                        <input type="range" min="0" v-model="range" @focus="handleFocus" max="211816" class="slider" id="myRange">
                    </div>
                </div>
                <div class="limits">
                    <p>CHEAPER</p>
                    <p>FASTER</p>
                </div>
                <div class="row">
                    <p>This is the most amount of money that might be used to process this transaction. Your transaction
                        will be mined
                        <span>probably within 30 seconds.</span>
                    </p>
                    <div class="total">
                        <p class="totalp">TOTAL</p>
                        <p>{{parseFloat(amount?amount:0) + parseFloat(range/ 1000000000)}} EXP
                            <!--<span>(0.0003 EXP)</span>-->
                        </p>
                    </div>
                </div>
                {{contentChange}}
                <div v-if="contractdeploytab" class="row fromdpdown deploydp">
                    <div class="fmlabel">
                        <p v-if="contractdeployError" class="error-message from-error">Contract To Deploy is reqiured</p>
                        <label>Contract to Deploy</label>
                    </div>
                    <div>
                        <multiselect :searchable="false" name="SendFunds" track-by="text" :allow-empty="false" label="text" :show-labels="false" placeholder="Select From Account"  v-model="contractdeploy" :options="contractdeployoption">
                            <template slot="singleLabel" slot-scope="{option}">
                                <span class="option__title">{{ option.text }}</span>
                            </template>
                        </multiselect>
                    </div>
                </div>
                <div class="buttons">
                    <button class="ok button button--shikoba" @click="handledeployContract($event)">
                        <img class="button__icon" src="../../../assets/img/add.svg">
                        <span>Deploy</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="scmodal">
            <modal class="modal" name="sendContract">
                <sendContract :contractData="contractData" :updatedata="updatedata"></sendContract>
            </modal>
        </div>
    </div>
</template>

<script>
    import './DeployContract'
    import ace from 'vue2-ace-editor';
    import {db} from '../../../../../lowdbFunc';
    const fs = require("fs");
    import SendContract from './SendContract';
    import { ipcRenderer } from 'electron';
    import {web3} from '../../../../main/libs/config';
    // var web3 = startConnectWeb();
    import Multiselect from 'vue-multiselect'

    export default {
        name: 'WatchContracts',
        props:['updatedata'],
        components: {
            editor: ace, 
            'multiselect': Multiselect,       
            'sendContract': SendContract,
        },
        computed: {
            contentChange(){
                let data = '';
                console.log("contentChange")
                if(this.content){
                    this.onChange();
                }
                return data;
            }
        },
        data() {
            return {
                contractName: '',
                contractNameError: '',
                AddressFrom: '',
                optionFrom: '',
                loading: true,
                amount: 0,
                sendAllAmount: false,
                range: 52061,
                AddressFromError: false,
                amountError: false,
                content: '',
                contractData: '',
                contentError: false,
                contractdeploy: '',
                contractdeployError: '',
                contractdeploytab: false,
                contractdeployoption: [],
            };
        },
        created() {
            this.optionFrom = [];
            this.intervalid1 = setInterval(() => {
                if (this.$store.state.allAccounts.length > 0) {
                    this.total_balance = this.$store.state.total_balance;
                    this.$store.state.allAccounts.map((val) => {
                        if(val.balance > 0){
                            console.log(val.balance);
                            console.log(val);
                            var data = { value:val.hash ,text: val.accountTitle + '- ('+ val.balance+' EXP)'};
                            this.optionFrom.push(data);
                            this.loading= false;
                        }
                    });
                    clearInterval(this.intervalid1);
                    this.loading= false;
                }
            }, 100);
        },
        methods: {
            editorInit: () =>  {
                require('brace/ext/language_tools') //language extension prerequsite...
                require('brace/mode/html')
                require('brace/mode/javascript')    //language
                require('brace/mode/less')
                require('brace/theme/chrome')
                require('brace/snippets/javascript') //snippet
            },
            onChange(){
                this.contentError = '';
                this.contractdeployError = '';
                this.contractdeploy = '';
                this.contractdeployoption = [];
                ipcRenderer.send('ComplieContract', this.content);
                ipcRenderer.on('CompliedContract', (event, res) => {
                    console.log("onchnageContent", res)
                    if(res.errors) {
                        console.log(res.errors, "Invalid Source Code")
                        this.contentError = 'Invalid Source Code';
                        return false;
                    }
                    this.contractdeploytab = true;
                    if(Object.keys(res.contracts).length === 1) {
                        this.contractdeployoption = [];
                        this.contractdeploy = {value: res.contracts[Object.keys(res.contracts)[0]], text: Object.keys(res.contracts)[0].replace(/:/g, '') };
                        this.contractdeployoption = [{value: res.contracts[Object.keys(res.contracts)[0]], text: Object.keys(res.contracts)[0].replace(/:/g, '') }];
                        // console.log(this.contractdeployoption);
                    } else if(Object.keys(res.contracts).length > 1) {
                        this.contractdeployoption = [];
                        for (let i=0;i<Object.keys(res.contracts).length; i++) {
                            // console.log( res.contracts[Object.keys(res.contracts)[i]]);
                            this.contractdeploy = {value: res.contracts[Object.keys(res.contracts)[0]], text: Object.keys(res.contracts)[0].replace(/:/g, '') };
                            let data = {value: res.contracts[Object.keys(res.contracts)[i]], text: Object.keys(res.contracts)[i].replace(/:/g, '') };
                            this.contractdeployoption.push(data);
                        }
                    }

                    console.log(this.contractdeployoption);
                });
            },
            show () {
                this.$modal.show('sendContract');
            },
            hide () {
                this.$modal.hide('sendContract');
            },
            hide1 () {
                this.$modal.hide('deployContract');
            },
            handlefromchange(){
                setTimeout(() => {
                    if(this.sendAllAmount) {
                        this.handlesendall();
                    }
                }, 200)
            },
            handlesendall() {
                if(this.AddressFrom && this.AddressFrom.value) {
                    // console.log(this.AddressFrom.text , this.AddressFrom.text.split("(")[1].split(" ") , this.AddressFrom.text.split("(")[1].split(" ")[0]);
                    this.amount = this.AddressFrom.text.split("(")[1].split(" ")[0];
                }
            },
            handledeployContract(e) {
                e.preventDefault();
                this.AddressFromError = false;
                this.amountError = false;
                this.contentError = '';
                this.contractdeployError = '';
                // console.log("FRom001", this.AddressFrom.value, this.amount, this.range , this.content);
                if(this.contractName && this.AddressFrom.value && this.amount && this.range && this.content && this.contractdeploy) {
                    // console.log(this.contractName, "contract.length");
                    let contract = db.get('contracts').find({
                        contract_name: this.contractName
                    }).value();
                    console.log(contract, "contract.length");
                    if(contract) {
                        this.contractNameError = 'Contract Name is already exists';
                    } else {
                        this.contractData = {
                            contractName: this.contractName,
                            AddressFrom: this.AddressFrom.value,
                            amount: this.amount,
                            range: this.range,
                            content: this.content,
                            contractdeploy: this.contractdeploy.value
                        };
                        this.show();
                    }
                } else {
                    if(!this.contractName) {
                        this.contractNameError = 'Contract Name is required';
                    }
                    if(!this.AddressFrom.value) {
                        this.AddressFromError = true;
                    }
                    if(!this.amount) {
                        this.amountError = true;
                    }
                    if(!this.content) {
                        this.contentError = "Source Code is required";
                    }
                    if(!this.contractdeploy) {
                        this.contractdeployError = true;
                    }
                }
            },
            handleFocus() {
                this.AddressFromError = false;
                this.amountError = false;
                this.contentError = '';
                this.contractdeployError = '';
                this.contractNameError = '';
            },
        }
    }
</script>
<style>
    @import "../../../../../static/modalcomponent.css";
    @import "../../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";
</style>

<style>

    .editorCode {
        margin-top: 40px;
        margin-bottom: 40px;
    }

    .deploy-modal .multiselect__content {
        padding: 0!important;
    }

    .deploy-modal .multiselect__option {
        padding: 7px 15px!important;
    }

    .deploy-modal .multiselect__tags {
        width: 100%!important;
        border: none!important;
        padding: 6px 40px 0px 8px!important;
        border-radius: 0!important;
    }

    .deploy-modal .multiselect__content-wrapper {
        background: none;
        height: auto!important;
        max-height: auto!important;
        /*display: block!important;*/
    }

    .multiselect__content-wrapper {
        margin-top: 3px;
    }


    .deploy-modal .multiselect__placeholder {
        line-height: 23px!important;
        text-indent: 8px!important;
    }

    .deploy-modal .multiselect__option--selected .multiselect__option--highlight  {
        background: #ffffff!important;
        color: #000!important;;
    }

    .deploy-modal .multiselect__option--highlight {
        background: #ffffff!important;
        color: #000!important;
    }

    .deploy-modal .multiselect__element {
        background: #ffffff!important;
        color: #000!important;
        padding: 0px!important;

    }

    .deploy-modal  .multiselect__single {
        padding-left: 15px!important;
        margin-bottom: 0px!important;
        line-height: 43px;
        height: 50px;
    }

    .deploy-modal  .multiselect__spinner:after,.deploy-modal  .multiselect__spinner:before {
        border-color: #000000 transparent transparent!important;
        margin-top: -1px;

    }

    .deploy-modal  .multiselect__tags input  {
        display: none!important;
    }

    .deploy-modal  .multiselect__single .setImg  {
        margin: 8px 5px!important;
    }

    .deploy-modal  .multiselect__single .option__title {
        vertical-align: top!important;
        line-height: 47px!important;
    }

    .deploy-modal  .multiselect__option .setImg {
        margin: 8px 5px!important;
    }

    .deploy-modal  .multiselect__option .option__title {
        vertical-align: top!important;
        line-height: 47px!important;
    }

    .deploy-modal   .multiselect__input, .deploy-modal   .multiselect__single {
        padding: 0px 0px 0px 15px!important;
    }


    .fmlabel {
        text-align: left;
        margin-bottom: 10px;

    }

    .deploy-modal .fmlabel .from-error {
        top:0px!important;

    }

    .deploy-modal .amount-error {
        top:25px!important;
    }

    .fromdpdown {
        z-index: 999;
    }

     .scmodal  .v--modal-overlay {
         background: none!important;
     }

    .deploy-modal .deploydp .multiselect__option {
        padding: 10px 22px!important;
        text-transform: capitalize!important;
    }

    .deploy-modal  .deploydp .multiselect__single {
        line-height: 35px;
        height: 40px;
    }

    .deploy-modal  .deploydp .multiselect__single .option__title {
        line-height: 35px!important;
        text-transform: capitalize!important;
    }

</style>
