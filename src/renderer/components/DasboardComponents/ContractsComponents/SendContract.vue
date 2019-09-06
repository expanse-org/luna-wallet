<template>
    <div class="sendtransaction ">
        <div class="popup md-content">
            <a href="#" @click="hide" class="btn-close md-close"></a>
            <div class="transaction">
                <div class="sendtransaction-inner">
                    <h1>Send Contract</h1>
                    <div class="addresses">
                        <div class="sender">
                            <span class="tooltiptext2">{{contractData.AddressFrom}}</span>
                            <div class="svg">
                                <svg version="1.1" class="svg-red" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                                        y="0px" width="43px" height="43px" viewBox="0 0 43 43" style="enable-background:new 0 0 43 43;"
                                        xml:space="preserve">
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
                            </div>
                            <p class="send_trx_from">{{contractData.AddressFrom}}</p>
                        </div>
                        <div class="exp">
                            <p>EXP</p>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="13px" height="9px">
                                <path fill-rule="evenodd" d="M12.823,4.065 L8.954,0.169 C8.718,-0.069 8.336,-0.069 8.099,0.169 C7.863,0.407 7.863,0.792 8.099,1.030 L10.936,3.887 L0.604,3.887 C0.271,3.887 -0.000,4.159 -0.000,4.495 C-0.000,4.831 0.271,5.104 0.604,5.104 L10.936,5.104 L8.100,7.961 C7.863,8.199 7.863,8.584 8.100,8.822 C8.218,8.941 8.372,9.000 8.527,9.000 C8.682,9.000 8.836,8.941 8.954,8.822 L12.823,4.926 C13.059,4.688 13.059,4.303 12.823,4.065 Z" />
                            </svg>
                        </div>
                        <div class="sender Createcontract">
                            <div class="svg">
                                <svg version="1.1" class="svg-green" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                                        y="0px" width="43px" height="43px" viewBox="0 0 43 43" style="enable-background:new 0 0 43 43;"
                                        xml:space="preserve">
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
                            </div>
                            <p class="send_trx_to">Create Contract</p>
                        </div>
                    </div>
                    <div class="content sendcontractcontent">
                        <div class="transaction-fail hide">
                            <p>It seems this transaction will fail. If you submit it, it may consume all the gas you
                                provide.
                            </p>
                        </div>
                        <div class="props">
                            <div class="name">
                                <div class="hide row">
                                    <p>Estimated fee consumption</p>
                                    <p class="error-p p-right ">( {{estimatedGas}} gas)</p>
                                </div>
                                <div class="row">
                                    <p>Provide maximum fee</p>
                                    <p class="p-right">exp ({{estimatedGas + 100000}} gas)</p>
                                </div>
                                <div class="row">
                                    <p>Gas price</p>
                                    <p class=" p-right gas_price">{{web3.utils.fromWei((gasPrice).toString(), "szabo")}} ether per million gas</p>
                                </div>
                                <div class="row">
                                    <p>Amount</p>
                                    <p  class="p-right amount_transfer">{{contractData.amount}}</p>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="form">
                        <div v-if="rawdata" class="form-heading">
                            <div class="rawData">
                                <div class="heading">RAW DATA
                                    <a href="#">TRY TO DECODE DATA</a>
                                </div>
                                <div class="raw_data">
                                    <strong>{{raw_dataToken}}</strong>
                                </div>
                            </div>

                        </div>

                        <form id="final_transfer_form"  method="#">
                            <input type="hidden" name="from" />
                            <input type="hidden" name="to" />
                            <input type="hidden" name="estimatedGas" />
                            <input type="hidden" name="amount" />
                            <input type="hidden" name="fee" />
                            <input type="hidden" name="final_transfer_form" />
                            <input type="hidden" name="is_contract" />
                            <input type="hidden" name="currency_hash" />
                            <input type="hidden" name="contract_function" />

                            <div class="row">
                                <span :class="password? 'input input--nao input--filled': 'input input--nao'">
                                    <p v-if="passwordError" class="error-message sendFundPassword-error ">{{passwordError}}</p>
                                    <input class="account_password input__field input__field--nao" v-model="password" @focus="handleFocus" name="account_password" type="password" />
                                    <label class="input__label input__label--nao" >
                                        <span class="input__label-content input__label-content--nao">Password
                                            <span class="mandatory">*</span>
                                        </span>
                                    </label>
                                    <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                                        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <div class="buttons">
                                <button @click="hide" class="back button button--shikoba md-close" type="button" >
                                    <img class="button__icon" src="../../../assets/img/cancel.svg">
                                    <span>Close</span>
                                </button>
                                <button @click="sendContract" id="contract_transactions_btn" type="submit" class="ok button button--shikoba">
                                    <img class="button__icon" src="../../../assets/img/send.svg">
                                    <span>Send Contract</span>
                                </button>

                            </div>
                        </form>

                    </div>

                    <div class="alert-sucess trx_alert-sucess hide">
                        <p>Transaction Completed successfully</p>
                    </div>
                    <div class="alert-unsucess trx_alert-unsucess hide">
                        <p>Transaction Failed</p>
                    </div>


                    <div class="alert-unsucess" style="display: none;">
                        <p>ERROR</p>
                    </div>

                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import {web3,tokenInterface} from '../../../../main/libs/config';
    import {getRandomColor} from '../../AccountsData/commonFunc';
    import {db} from '../../../../../lowdbFunc';
    import shortid from 'shortid';
    import { clipboard,remote, ipcRenderer } from 'electron';
    const app = remote.app;
    import  Raven from 'raven';
    import  lodash from 'lodash';
    import  Tx from 'ethereumjs-tx';
    import  keythereum from 'keythereum';
    import  * as $ from 'jquery';

    var currentDate = new Date();

    export default {
        name: 'SendContract',
        props: [
            'contractData', 'updatedata'
        ],
        data() {
            return{
                password: '',
                passwordError: '',
                gasPrice: '',
                gasLimit: 900000,
                estimatedGas : 100000,
                raw_dataToken: 0,
                amount: 0,
                maximumfee: 153000,
                rawdata: true,
                web3,
            };
        },
        components:{
        },
        created(){
            console.log(this.contractData);
            if(this.contractData){
                let bytecode = '0x'+this.contractData.contractdeploy.bytecode;
                this.raw_dataToken = bytecode;
                web3.eth.estimateGas({data: bytecode}).then((res) =>{
                    this.estimatedGas = res + 100000;
                } );

                web3.eth.getGasPrice().then((price)=>{
                    console.log(price);
                    console.log(web3.utils.fromWei("1000000000000000", "ether"));
                    console.log(price * price, "ether");

                    this.gasPrice = price;
                });

                let abi = JSON.parse(this.contractData.contractdeploy.interface);
                var contract = new web3.eth.Contract(abi);
                console.log(contract);

            }
        },
        methods: {
            hide () {
                this.$modal.hide('sendContract');
            },
            handleFocus(){
                this.passwordError = '';
            },
            sendContract(e){
                e.preventDefault();
                console.log("From Nonce:",this.password,this.contractData.AddressFrom, this.estimatedGas, this.gasPrice* 1000000, this.contractData.amount);
                if(this.password){
                    let cid= shortid.generate();
                    web3.eth.personal.unlockAccount(this.contractData.AddressFrom, this.password , 600)
                        .then((response) => {
                            console.log(response, "response");
                            let abi = JSON.parse(this.contractData.contractdeploy.interface);
                            let bytecode = '0x'+this.contractData.contractdeploy.bytecode;

                            let Contract = new web3.eth.Contract(abi);
                            let that = this;
                            Contract.deploy({
                                data: bytecode,
                                arguments : [0 , 0]
                            })
                                .send({
                                        from: this.contractData.AddressFrom,
                                        gas: web3.utils.toHex(this.estimatedGas),
                                        gasPrice: web3.utils.toHex((this.gasPrice).toString()),
                                    }, function(error, transactionHash)
                                    {
                                        if(transactionHash) {
                                            $('form').trigger('reset');
                                            clipboard.writeText(transactionHash, 'selected');
                                            db.get('contracts').push({
                                                "id" : cid,
                                                "transactionHash" : transactionHash,
                                                "color": getRandomColor(),
                                                "contract_json": abi,
                                                "contract_name": that.contractData.contractName,
                                            }).write();
                                            that.updatedata();
                                            $('.trx_alert-sucess p').text("Your Transaction Completed Successfully. Hash:"+transactionHash+" Copied to clipboard");
                                            $('.trx_alert-sucess').show(300).delay(5000).hide(330);
                                        } else {
                                            console.log("send", error);
                                            this.passwordError = "Invalid Password";
                                            $('.trx_alert-unsucess').show(300).delay(5000).hide(330);
                                        }
                                    }
                                )
                                .on('receipt', function(receipt)
                                    {
                                        if(receipt) {
                                            db.get('contracts').chain().filter({id: cid}).first()
                                                .assign({"contract_address": receipt.contractAddress,
                                                    "receipt" : receipt }).write();
                                            that.updatedata();
                                        }
                                        console.log(receipt);
                                        console.log(receipt.contractAddress) // contains the new contract address
                                    }
                                )
                                .then(function(newContractInstance){
                                    console.log(newContractInstance.options.address) // instance with the new contract address
                                });
                    }).catch((error) => {
                        Raven.captureException(error);
                        console.log(error, "error");
                        this.passwordError = "Invalid Password";
                        return false;
                    });

                }else if(!this.password) {
                    this.passwordError = "Enter Password";
                    // this.passwordError = "Invalid Password";
                }
            }
        }
    }
</script>

<style>
    .sendcontractcontent {
      background: #223a45!important;
        box-sizing: border-box;
         padding: 0px!important;
        position: relative;
    }

    .Createcontract {
        width: 180px!important;
    }
</style>
