<template>
    <div class="sendtransaction ">
        <div class="popup md-content">
            <a href="#" @click="hide" class="btn-close md-close"></a>
            <div class="Allowance-popup">
                <div class="allowance-header">
                    <h1>Allowance Calculation</h1>
                </div>
                <div class="allowance-content">
                    <div class="all-form">
                        <label>Amount</label>
                        <div class="all-input">
                            <input type="number" placeholder="Amount"/>
                            <span>EXP</span>
                        </div>
                    </div>
                    <div class="all-form">
                        <label>Gas Limit</label>
                        <div class="all-input">
                            <input type="number" placeholder="Gas Limit"/>
                            <span>Units</span>
                        </div>
                    </div>
                    <div class="all-form">
                        <label>Gas Price</label>
                        <div class="progressBar">
                            <input id="gasprice" v-model="gasprice" type="range" min="53" max="212"/>
                            <div class="ranges">
                                <span>Cheaper</span>
                                <span>Faster</span>
                            </div>
                            <p>{{gasprice}} gwei</p>
                        </div>
                    </div>
                    <div class="all-fee">
                        <p>FEE: 0.00{{gasprice}} EXP</p>
                    </div>
                    <div class="all-form">
                        <label>Password</label>
                        <div class="all-input">
                            <input type="text" v-model="password" placeholder="Enter Password"/>
                        </div>
                    </div>
                </div>
                <div class="all-btn">
                    <button>Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {web3} from '../../../../../../main/libs/config';
    import { clipboard,remote } from 'electron';
    const app = remote.app;

    export default {
        name: 'AllowancePopup',
        data() {
            return{
                web3,
                gasprice: 20,
                password: '',
            };
        },
        components:{
        },
        created(){

        },
        methods: {
            hide () {
                this.$modal.hide('allowancePopup');
            },
        }
    }
</script>

<style>
</style>
