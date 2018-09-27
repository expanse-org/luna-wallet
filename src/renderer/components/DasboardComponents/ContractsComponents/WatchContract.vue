<template>
    <div>
        <h1>Watch Contract</h1>
        <form id="watchContract" method="#">
            <input class="add_or_update_contract" type="hidden" value="0" />
            <div class="row">
                <p v-if="contractNameError" class="error-message contractName-error">Contract Name is required</p>
                <span class="input input--nao">
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
                <p v-if="contractAddressError" class="error-message contractAddress-error">Contract Address is required</p>
                <span class="input input--nao">
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
                <p v-if="jsonAbiError" class="error-message jsonabi-error">JSON is required</p>
                <span class="input input--nao">
                            <textarea class="private-key input__field input__field--nao input" v-model="jsonAbi" @focus="handleFocus" name="jsonAbi"></textarea>
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

                <button class="ok button button--shikoba" @click="handleCreate($event)" type="submit">
                    <img class="button__icon" src="../../../assets/img/create.svg">
                    <span>Create</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'WatchContracts',
        data() {
            return {
                contractName: '',
                contractAddress: '',
                jsonAbi: '',
                contractNameError: false,
                contractAddressError: false,
                jsonAbiError: false,
            };
        },
        created() {
        },
        methods: {
            handleCreate(e) {
                e.preventDefault();
                if(this.contractName && this.contractAddress && this.jsonAbi) {

                } else if(!this.contractName) {
                    this.contractNameError = true;
                } else if(!this.contractAddress) {
                    this.contractAddressError = true;
                } else if(!this.jsonAbi) {
                    this.jsonAbiError = true;
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
