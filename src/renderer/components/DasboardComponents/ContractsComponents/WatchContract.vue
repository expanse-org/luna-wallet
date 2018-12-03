<template>
    <div>
        <div v-if="!EditForm" class="popup md-content ">
            <a href="#" @click="hide" class="btn-close md-close"></a>
            <h1>Watch Contract</h1>
            <form id="watchContract">
                <input class="add_or_update_contract" type="hidden" value="0" />
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
                <div class="row">
                    <p v-if="contractAddressError" class="error-message contractAddress-error">{{contractAddressError}}</p>
                    <span :class="contractAddress? 'input input--nao input--filled': 'input input--nao'" >
                        <input type="text" class="field input__field input__field--nao" v-model="contractAddress" @focus="handleFocus" name="contractAddress" />
                        <label class="input__label input__label--nao" >
                            <span class="input__label-content input__label-content--nao">CONTRACT ADDRESS
                                <span class="mandatory">*</span>
                            </span>
                        </label>
                        <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                            <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                        </svg>
                    </span>
                </div>
                <div class="row">
                    <p v-if="jsonAbiError" class="error-message jsonabi-error">{{jsonAbiError}}</p>
                    <span :class="jsonAbi? 'input input--nao input--filled': 'input input--nao'">
                        <input class="private-key input__field input__field--nao input" v-model="jsonAbi" @focus="handleFocus" name="jsonAbi"></input>
                        <label class="input__label input__label--nao" >
                            <span class="input__label-content input__label-content--nao">JSON INTERFACE
                                <span class="mandatory">*</span>
                            </span>
                        </label>
                        <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                            <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                        </svg>
                    </span>
                </div>
                <div class="alert-sucess contract_alert-sucess hide">
                    <p>Contract Saved</p>
                </div>
                <div class="buttons">
                    <button class="ok button button--shikoba" @click="handleCreate()" type="button">
                        <img class="button__icon" src="../../../assets/img/create.svg">
                        <span>Create</span>
                    </button>
                </div>
            </form>
        </div>
        <div v-if="EditForm" class="popup md-content ">
            <a href="#" @click="hide" class="btn-close md-close"></a>
            <h1>Update Contract</h1>
            <form id="updateContract">
                <input class="add_or_update_contract" type="hidden" value="0" />
                <div class="row">
                    <p v-if="contractNameError" class="error-message contractName-error">Contract Name is required</p>
                    <span :class="contractName? 'input input--nao input--filled': 'input input--nao'" >
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
                <div class="row">
                    <p v-if="contractAddressError" class="error-message contractAddress-error">{{contractAddressError}}</p>
                    <span :class="contractAddress? 'input input--nao input--filled': 'input input--nao'" >
                        <input type="text" class="field input__field input__field--nao" v-model="contractAddress" @focus="handleFocus" name="contractAddress" />
                        <label class="input__label input__label--nao" >
                            <span class="input__label-content input__label-content--nao">CONTRACT ADDRESS
                                <span class="mandatory">*</span>

                            </span>
                        </label>
                        <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                            <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                        </svg>
                    </span>
                </div>
                <div class="row">
                    <p v-if="jsonAbiError" class="error-message jsonabi-error">{{jsonAbiError}}</p>
                    <span :class="jsonAbi? 'input input--nao input--filled': 'input input--nao'" >
                        <input class="private-key input__field input__field--nao input" v-model="jsonAbi" @focus="handleFocus" name="jsonAbi"></input>
                        <label class="input__label input__label--nao" >
                            <span class="input__label-content input__label-content--nao">JSON INTERFACE
                                <span class="mandatory">*</span>
                            </span>
                        </label>
                        <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                            <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                        </svg>
                    </span>
                </div>
                <div class="alert-sucess contract_alert-sucess hide">
                    <p>Contract Saved</p>
                </div>
                <div class="buttons">
                    <button class="ok button button--shikoba" @click="handleCreate()" type="button">
                        <img class="button__icon" src="../../../assets/img/create.svg">
                        <span>Update</span>
                    </button>
                </div>
            </form>
        </div>
    </div>

</template>

<script>
    import { getRandomColor } from '../../AccountsData/commonFunc';
    import {db} from '../../../../../lowdbFunc';
    import  ethereum_address from 'ethereum-address';
    import  shortid from 'shortid';
    import  * as $ from 'jquery';
    import {listContracts} from './DeployFunc';

    export default {
        name: 'WatchContracts',
        props:['contractid', 'updatedata'],
        data() {
            return {
                contractID: '',
                contractName: '',
                contractAddress: '',
                jsonAbi: '',
                contractNameError: false,
                contractAddressError: false,
                jsonAbiError: false,
                EditForm: false,
                success: false,
            };
        },
        created() {
            if(this.contractid) {
                this.EditForm = true;
                let contracts =  db.get('contracts').find({id: this.contractid}).value();
                this.contractID =  this.contractid;
                this.contractName =  contracts.contract_name;
                this.contractAddress =  contracts.contract_address;
                this.jsonAbi = JSON.stringify(contracts.contract_json);
                console.log(this.contracts, "contracts")
            }
        },
        methods: {
            hide () {
                this.$modal.hide('watchContract');
            },
            handleCreate() {
                if(this.contractName && this.contractAddress && this.jsonAbi) {
                    if(!this.EditForm) {
                        if(ethereum_address.isAddress(this.contractAddress)){
                            let contract = db.get('contracts').find({
                                contract_address: this.contractAddress
                            }).value();
                            let contract1 = db.get('contracts').find({
                                contract_name: this.contractName
                            }).value();
                            if(contract) {
                                this.contractAddressError = "Contract Address is already exists";
                                return false;
                            }
                            if(contract1) {
                                this.contractNameError = 'Contract Name is already exists';
                            } else {
                                try {
                                    this.jsonAbi = JSON.parse(this.jsonAbi);
                                    if (isNaN(this.jsonAbi)) {
                                        db.get('contracts').push({
                                            id: shortid.generate(),
                                            contract_name: this.contractName,
                                            contract_address: this.contractAddress,
                                            contract_json: this.jsonAbi,
                                            color: getRandomColor(),
                                        }).write();
                                        this.updatedata();
                                        listContracts();
                                        this.success = true;
                                        this.contractName = '';
                                        this.contractAddress = '';
                                        this.jsonAbi = '';
                                        console.log('saving contracts', this.jsonAbi);
                                        $('.contract_alert-sucess').show(300).delay(5000).hide(330);
                                        $('form').trigger('reset');
                                    } else {
                                        this.jsonAbiError = 'Invalid JSON';
                                    }
                                } catch (err) {
                                    console.log(err);
                                    this.jsonAbiError = 'Invalid JSON';
                                }
                            }
                        } else {
                            this.contractAddressError = 'Invalid Address';
                        }
                    }else {
                        try {
                            var jsonabiupdate = JSON.parse(this.jsonAbi);
                            if(isNaN(this.jsonAbi)) {
                                console.log('update tokens');
                                db.get('contracts').find({
                                    id: this.contractID
                                }).assign({
                                    contract_name: this.contractName,
                                    contract_address: this.contractAddress,
                                    contract_json: jsonabiupdate,
                                    color: getRandomColor(),
                                }).write();
                                $('.contract_alert-sucess').show(300).delay(5000).hide(330);
                            }else {
                                this.jsonAbiError = 'Invalid JSON';
                            }
                        } catch (err) {
                            console.log(err);
                            this.jsonAbiError = 'Invalid JSON';
                        }
                    }
                } else {
                    if(!this.contractName) {
                        this.contractNameError = true;
                    }
                    if(!this.contractAddress) {
                        this.contractAddressError = "Address is required";
                    }
                    if(!this.jsonAbi) {
                        this.jsonAbiError = 'JSON is required';
                    }
                }
            },
            handleFocus() {
                this.contractNameError = false;
                this.contractAddressError = false;
                this.jsonAbiError = false;
            }
        }
    }
</script>

<style>

</style>
