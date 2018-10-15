<template>
    <div class="popup md-content ">
        <a href="#" @click="hide1" class="btn-close md-close"></a>
        <div class="deploy-modal">
            <div>
                <h1>Deploy Contract</h1>
                <div class="row fromdpdown">
                    <div class="fmlabel">
                        <p v-if="AddressFromError" class="error-message from-error">FROM is reqiured</p>
                        <label>FROM </label>
                    </div>
                    <div>
                      <!--  <input type="text" class="field input__field input__field--nao"  v-model="AddressFrom" @focus="handleFocus"/> -->
                         <multiselect name="SendFunds" track-by="text" :loading="loading" :allow-empty="false" label="text" :show-labels="false" placeholder="Select From Account"  v-model="AddressFrom" :options="optionFrom">
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
                    <span :class="amount? 'input input--nao input--filled': 'input input--nao'">
                        <input type="text" class="field input__field input__field--nao" v-model="amount" @focus="handleFocus"/>
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
                            <input class="filter__mark showPass" type="checkbox" v-model="sendAllAmount" @focus="handleFocus" id="input-3">
                            <i class="filter__mark"></i>
                            <span class="filter__text">Send All
                                <span> 0 Expasne</span>
                            </span>
                        </label>
                    </div>
                </div>

                <div class="row editorCode">
                    <editor v-model="content" @init="editorInit" lang="javascript" theme="chrome" width="500" height="100"></editor>
                </div>
                <div class="row">
                    <div class="slidecontainer">
                        <input type="range" min="1" v-model="range" @focus="handleFocus" max="100" class="slider" id="myRange">
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
                        <p>0.153681 USD
                            <span>(0.0003 EXP)</span>
                        </p>
                    </div>
                </div>
                 <div class="row">
                    <p v-if="accountPasswordError" class="error-message amount-error">Password is reqiured</p>
                    <span :class="accountPassword? 'input input--nao input--filled': 'input input--nao'">
                        <input type="password" class="field input__field input__field--nao" v-model="accountPassword" @focus="handleFocus"/>
                        <label class="input__label input__label--nao" >
                            <span class="input__label-content input__label-content--nao">Password
                            </span>
                        </label>
                        <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                            <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                        </svg>
                    </span>
                </div>
                <div class="buttons">
                    <button class="ok button button--shikoba" @click="handledeployContract($event)">
                        <img class="button__icon" src="../../../assets/img/add.svg">
                        <span>Deploy</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import './DeployContract'
    import ace from 'vue2-ace-editor';
    const fs = require("fs");
    import { ipcRenderer } from 'electron';
    import {web3} from '../../../../main/libs/config';
    // var web3 = startConnectWeb();
    import Multiselect from 'vue-multiselect'

    export default {
        name: 'WatchContracts',
        components: {
            editor: ace, 
            'multiselect': Multiselect,       
        },
        data() {
            return {
                AddressFrom: '',
                optionFrom: '',
                loading: true,
                accountPassword: '',
                amount: '',
                sendAllAmount: false,
                range: '50',
                AddressFromError: false,
                accountPasswordError: false,
                amountError: false,
                content: '',
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
            }, 3000);
        },
        methods: {
            editorInit: function () {
                require('brace/ext/language_tools') //language extension prerequsite...
                require('brace/mode/html')
                require('brace/mode/javascript')    //language
                require('brace/mode/less')
                require('brace/theme/chrome')
                require('brace/snippets/javascript') //snippet
            },
            hide1 () {
                this.$modal.hide('deployContract');
            },
            handledeployContract(e) {
                e.preventDefault();
                var from ,bytecode,gasEstimate,Contract,gasPrice,source;
                console.log("FRom001", this.AddressFrom.value,"Password",this.accountPassword,"Amount",this.amount);
                return false;
                if(this.AddressFrom.value && this.accountPassword && this.amount && this.range) {
                    try {
                        console.log(web3);
                        web3.eth.personal.unlockAccount(this.AddressFrom.value, this.accountPassword  , 10000);
                        console.log("SUCCESSfully unlocked Account");
                    } catch(e) {
                        console.log("Error",e);
                        this.accountPasswordError = true;
                        return false;
                    }
                    source = this.content;//'contract test { uint256 a; uint256 b; constructor(uint256 _a, uint256 _b) public  {  a = _a;  b = _b; }  function set (uint256 _a, uint256 _b) public {   a = _a;      b = _b; }  function add() public view returns(uint256) { return a + b; } }';
                    ipcRenderer.send('ComplieContract', source);
                    ipcRenderer.on('CompliedContract', (event, res) => {
                        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
                        // console.log("Compiled Contract", res);
                        res.contracts.map((contractName) => {
                            let abi = JSON.parse(res.contracts[contractName].interface);
                            // console.log(contractName + ': ' + res.contracts[contractName].bytecode)
                            // console.log(JSON.parse(res.contracts[contractName].interface));
                            let compiledContract = res;

                            bytecode = '0x'+res.contracts[contractName].bytecode;
                            web3.eth.estimateGas({data: bytecode}).then(function(res){
                                gasEstimate = res;
                            } );
                            Contract = new web3.eth.Contract(abi);//,"0xeef425109ae820daae1058b22abfbf04ecf2e66d"

                            Contract.methods.add().call({from: from})
                                .then(function(receipt){
                                    console.log("Result", receipt);
                                    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
                                });
                            console.log("MY CONTRACT", Contract);

                            web3.eth.getGasPrice().then((price)=>{
                                gasPrice = price;
                            });
                            console.log(bytecode,from,gasEstimate);
                            Contract.deploy({
                                data: bytecode,
                                arguments : [0 , 0]
                            })
                            .send({
                                from: from,
                                gas: gasEstimate,
                                gasPrice: gasPrice
                            }, function(error, transactionHash){ console.log("Error",error,"TransactionHash",transactionHash); })
                            .on('error', function(error){ console.log(error)})
                            .on('transactionHash', function(transactionHash){ console.log(transactionHash) })
                            .on('receipt', function(receipt){ console.log(receipt)
                                console.log(receipt.contractAddress) // contains the new contract address
                            })
                            .on('confirmation', function(confirmationNumber, receipt){ console.log(confirmation, receipt); })
                            .then(function(newContractInstance){
                                console.log(newContractInstance.options.address) // instance with the new contract address
                            });
                        });
                    })
                } else {
                    if(!this.AddressFrom.value) {
                        this.AddressFromError = true;
                    }
                    if(!this.accountPassword) {
                        this.accountPasswordError = true;
                    }
                    if(!this.amount) {
                        this.amountError = true;
                    }
                }
            },
            handleFocus() {
                this.AddressFromError = false;
                this.amountError = false;
                this.accountPasswordError = false;
            },
        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
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

    .deploy-modal .multiselect__option--selected .multiselect__option--highlight  {
        background: #ffffff;
        color: #000;
    }

    .deploy-modal .multiselect__option--highlight {
        background: #ffffff;
        color: #000;
    }

    .deploy-modal .multiselect__element {
        background: #ffffff;
        color: #000;
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

</style>
