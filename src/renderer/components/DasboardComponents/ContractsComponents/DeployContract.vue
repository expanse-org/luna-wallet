<template>
    <div class="popup md-content ">
        <a href="#" @click="hide1" class="btn-close md-close"></a>
        <div class="deploy-modal">
            <div>
                <h1>Deploy Contract</h1>
                <div class="row">
                    <p v-if="AddressFromError" class="error-message from-error">FROM is reqiured</p>
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
                    <p v-if="amountError" class="error-message amount-error">Amount is reqiured</p>
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
                    <button class="ok button button--shikoba createAccount" @click="handledeployContract($event)">
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
                if(this.AddressFrom && this.accountPassword && this.amount && this.tokenType1 && this.range) {

                } else {
                    if(!this.AddressFrom) {
                        this.AddressFromError = true;
                    }
                    if(!this.amount) {
                        this.amountError = true;
                    }
                }
            },
            handleFocus() {
                this.AddressFromError = false;
                this.amountError = false;
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
