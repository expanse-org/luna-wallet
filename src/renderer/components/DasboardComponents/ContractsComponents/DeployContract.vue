<template>
    <div class="popup md-content ">
        <a href="#" @click="hide1" class="btn-close md-close"></a>
        <div class="deploy-modal">
            <div>
                <h1>Deploy Contract</h1>
                <div class="row">
                    <p  class="error-message from-error">FROM is reqiured</p>
                    <span class="input input--nao">
                        <input type="text" class="field input__field input__field--nao"  v-model="AddressFrom" @focus="handleFocus"/>
                        <label class="input__label input__label--nao" >
                            <span class="input__label-content input__label-content--nao">FROM</span>
                        </label>
                        <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                            <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"
                            />
                        </svg>
                    </span>
                </div>
                <div class="row">
                    <p class="error-message amount-error">Amount is reqiured</p>
                    <span class="input input--nao">
                        <input type="text" class="field input__field input__field--nao" v-model="amount" @focus="handleFocus"/>
                        <label class="input__label input__label--nao" >
                            <span class="input__label-content input__label-content--nao">Amount


                            </span>
                        </label>
                        <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                            <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"
                            />
                        </svg>
                    </span>
                </div>
                <div class="chexboxes row">
                    <div class="checkbox perform">
                        <label class="filter__value">
                            <input class="filter__mark showPass" type="checkbox" v-model="accountPassword" @focus="handleFocus" data-target=".accountPassword" data-type="password" id="input-3">
                            <i class="filter__mark"></i>
                            <span class="filter__text">Send All You want to send
                                <span> 0 Jeff’s Euros</span>
                            </span>
                        </label>
                    </div>
                </div>

                <div class="row editorCode">
                    <editor v-model="content" @init="editorInit" lang="html" theme="chrome" width="500" height="100"></editor>
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
    import ace from 'vue2-ace-editor';
    const fs = require("fs");
    import { ipcRenderer } from 'electron';
    import {startConnectWeb} from '../../../../main/libs/config';
    var web3 = startConnectWeb();

    export default {
        name: 'WatchContracts',
        components: {
            editor: ace,
        },
        data() {
            return {
                AddressFrom: '',
                accountPassword: '',
                amount: '',
                tokenType1: '',
                range: '50',
                AddressFromError: false,
                accountPasswordError: false,
                amountError: false,
                tokenType1Error: false,
                rangeError: false,
                content: '',
            };
        },
        created() {
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
                /*
                if(this.AddressFrom && this.accountPassword && this.amount && this.tokenType1 && this.range) {

                } else if(!this.AddressFrom) {
                    this.AddressFromError = true;
                } else if(!this.accountPassword) {
                    this.accountPasswordError = true;
                } else if(!this.amount) {
                    this.amountError = true;
                } else if(!this.tokenType1) {
                    this.tokenType1Error = true;
                } else if(!this.range) {
                    this.rangeError = true;
                }*/
                
                from = "0x9a6cdb7658e66421ead4abd79cf03d63cf987e4f";  //
                var password = "123412341234";
                 try {
                     console.log(web3);
                    web3.eth.personal.unlockAccount(from, password , 10000);
                    console.log("SUCCESS");
                } catch(e) {
                    console.log("Error",e)
                    // $('.sendFundPassword-error').show();$('.sendFundPassword-error').css({visibility:"visible"});
                    return false;
                }
                source = 'contract test { uint256 a; uint256 b; constructor(uint256 _a, uint256 _b) public  {  a = _a;  b = _b; }  function set (uint256 _a, uint256 _b) public {   a = _a;      b = _b; }  function add() public view returns(uint256) { return a + b; } }';
                ipcRenderer.send('ComplieContract', source);
                ipcRenderer.on('CompliedContract', (event, res) => {
                    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
                    console.log("Compiled Contract", res);
                    for (var contractName in res.contracts) {
                        // code and ABI that are needed by web3
                        let abi = JSON.parse(res.contracts[contractName].interface);
                        // console.log(contractName + ': ' + res.contracts[contractName].bytecode)
                        // console.log(JSON.parse(res.contracts[contractName].interface));
                        let compiledContract = res;
                        
                        bytecode = '0x'+res.contracts[contractName].bytecode;
                        web3.eth.estimateGas({data: bytecode}).then(function(res){
                            gasEstimate = res;
                        } );
                        Contract = new web3.eth.Contract(abi);//,"0xeef425109ae820daae1058b22abfbf04ecf2e66d"
                        // Contract.methods.set(12, 34).send({from: from})
                        // .then(function(receipt){
                        //     console.log("Result", receipt);
                        //     // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
                        // });
                        Contract.methods.add().call({from: from})
                        .then(function(receipt){
                            console.log("Result", receipt);
                            // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
                        });
                        console.log("MY CONTRACT", Contract);
                        return false;
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
                    }
                   
                })



                // ------------------------------------------------
                // Setting 1 as second paramateractivates the optimiser
               
              
                
               
                // Deploy contract syncronous: The address will be added as soon as the contract is mined.
                // Additionally you can watch the transaction by using the "transactionHash" property
                // var myContractInstance = MyContract.new(param1, param2, {data: bytecode, gas: 300000, from: mySenderAddress});
                // myContractInstance.transactionHash // The hash of the transaction, which created the contract
                // myContractInstance.address // undefined at start, but will be auto-filled later



            },
            handleFocus() {
                this.AddressFromError = false;
                this.accountPasswordError = false;
                this.amountError = false;
                this.tokenType1Error = false;
                this.rangeError = false;
            },
            isMobileDevice() {
                return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
            },

        }
    }
</script>

<style>

    .editorCode {
        margin-top: 40px;
        margin-bottom: 40px;
    }

</style>
