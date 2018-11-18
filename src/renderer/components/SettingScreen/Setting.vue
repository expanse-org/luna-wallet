<template>
    <div class="network-settings" :class="{'close-network': networkSetting}">
        <div class="content">
            <div class="open-btn" @click="networkSetting = !networkSetting">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="23" viewBox="0 0 25 23">
                    <path id="Forma_1" data-name="Forma 1" class="set-wheel"
                          d="M1529.26,639.945a6.6,6.6,0,0,0,1.36-1.122l1.43,0.811,1.3-2.215-1.43-.81a6.119,6.119,0,0,0,.31-1.719l1.62-.281-0.45-2.519-1.62.282a6.551,6.551,0,0,0-.89-1.511l1.06-1.241-2-1.644-1.05,1.241a6.36,6.36,0,0,0-1.67-.6V627h-2.61v1.618a6.167,6.167,0,0,0-1.66.6l-1.06-1.241-2,1.644,1.06,1.241a6.551,6.551,0,0,0-.89,1.511l-1.62-.282-0.45,2.519,1.62,0.281a6.132,6.132,0,0,0,.31,1.72l-1.43.809,1.31,2.215,1.42-.811a6.6,6.6,0,0,0,1.36,1.122l-0.56,1.522,2.44,0.875,0.57-1.521a6.347,6.347,0,0,0,1.77,0l0.57,1.521,2.44-.875Zm-3.33-2a3.266,3.266,0,1,1,3.32-3.266A3.3,3.3,0,0,1,1525.93,637.95Zm14.51,3.915-1.12.357a4.445,4.445,0,0,0-.78-0.985l0.63-.983-1.58-.972-0.63.983a4.529,4.529,0,0,0-1.24-.263l-0.16-1.147-1.85.253,0.16,1.147a4.631,4.631,0,0,0-1.12.586l-0.88-.776-1.24,1.359,0.87,0.777a4.71,4.71,0,0,0-.48,1.157l-1.17-.042-0.07,1.83,1.18,0.042a4.013,4.013,0,0,0,.39,1.189l-0.93.712,1.14,1.444,0.93-.714a4.684,4.684,0,0,0,1.08.664l-0.25,1.135,1.83,0.382,0.24-1.133a4.537,4.537,0,0,0,.64-0.043,4.7,4.7,0,0,0,.62-0.129l0.55,1.023,1.65-.858-0.55-1.024a4.777,4.777,0,0,0,.85-0.928l1.09,0.436,0.7-1.7-1.09-.436a4.334,4.334,0,0,0,.04-1.249l1.13-.357Zm-4.71,4.88a2.339,2.339,0,1,1,2.03-2.638A2.369,2.369,0,0,1,1535.73,646.745Zm7.23-11.224,0.04-1.445-0.93-.027a3.292,3.292,0,0,0-.32-0.937l0.73-.567-0.91-1.134-0.73.567a3.649,3.649,0,0,0-.85-0.517l0.19-.9-1.44-.293-0.19.9a3.547,3.547,0,0,0-.99.142l-0.45-.806-1.29.686,0.44,0.805a3.713,3.713,0,0,0-.67.737l-0.86-.338-0.55,1.343,0.87,0.339a3.249,3.249,0,0,0-.03.985l-0.88.287,0.46,1.373,0.88-.288a3.377,3.377,0,0,0,.62.775l-0.49.778,1.26,0.759,0.49-.779a3.558,3.558,0,0,0,.98.2l0.13,0.906,1.46-.209-0.14-.9a3.365,3.365,0,0,0,.46-0.2,4.138,4.138,0,0,0,.43-0.265l0.69,0.609,0.98-1.079-0.7-.609a3.132,3.132,0,0,0,.37-0.917Zm-3.51.774a1.893,1.893,0,0,1-2.54-.75,1.833,1.833,0,0,1,.76-2.5,1.906,1.906,0,0,1,2.55.75A1.836,1.836,0,0,1,1539.45,636.295Z"
                          transform="translate(-1518 -627)"/>
                </svg>
            </div>
            <h2>Network Settings</h2>
            <span class="input input--nao">
                <p v-if="chainError" class="error-message">{{chainError}}</p>
                <input class="accountName input__field input__field--nao" @focus="handleFocus('1')" v-model="chain" name="chain" type="text" id="input-1" />
                <label class="input__label input__label--nao" for="input-1">
                <span class="input__label-content input__label-content--nao">Chain</span>
                </label>
                <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60"
                     preserveAspectRatio="none">
                <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                </svg>
            </span>
            <span class="input input--nao">
                <p v-if="rpcEnableError" class="error-message">{{rpcEnableError}}</p>
                <input class="accountName input__field input__field--nao" @focus="handleFocus('2')"  v-model="rpcEnable" name="rpcEnable" type="text" id="input-2"/>
                <label class="input__label input__label--nao" for="input-2">
                <span class="input__label-content input__label-content--nao">RPC enabled</span>
                </label>
                <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60"
                     preserveAspectRatio="none">
                <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                </svg>
            </span>
            <span class="input input--nao">
                <p v-if="rpcInterfaceError" class="error-message">{{rpcInterfaceError}}</p>
                <input class="accountName input__field input__field--nao" @focus="handleFocus('3')"  v-model="rpcInterface" name="rpcInterface" type="text" id="input-3"/>
                <label class="input__label input__label--nao" for="input-3">
                <span class="input__label-content input__label-content--nao">RPC interface</span>
                </label>
                <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60"
                     preserveAspectRatio="none">
                <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                </svg>
            </span>
            <span class="input input--nao">
                <p v-if="rpcPortError" class="error-message">{{rpcPortError}}</p>
                <input class="accountName input__field input__field--nao" @focus="handleFocus('4')"  v-model="rpcPort"  name="rpcPort" type="text" id="input-4"/>
                <label class="input__label input__label--nao" for="input-4">
                <span class="input__label-content input__label-content--nao">RPC Port</span>
                </label>
                <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60"
                     preserveAspectRatio="none">
                <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                </svg>
            </span>
            <span class="input input--nao">
                <p v-if="enodeError" class="error-message">{{enodeError}}</p>
                <input class="accountName input__field input__field--nao" @focus="handleFocus('5')" v-model="enode" name="enode" type="text" id="input-5"/>
                <label class="input__label input__label--nao" for="input-5">
                <span class="input__label-content input__label-content--nao">Enode (optional)</span>
                </label>
                <svg class="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60"
                     preserveAspectRatio="none">
                <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
                </svg>
            </span>
            <div >
                <button id="launchApp" @click="handleSettings" class="button--moema">Save Settings</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {web3} from '../../../main/libs/config';
    import {downloadGexp} from '../../../common/gexpfunc';
    import {ipcRenderer} from 'electron';
    import {getAllAcounts} from '../DasboardComponents/WalletDashboardComponents/walletcommon';

    export default {
        name: 'Splash-screen',
        data() {
            return {
                networkSetting: true,
                chain: '',
                rpcEnable: '',
                rpcInterface: '',
                rpcPort: '',
                enode: '',
                chainError: '',
                rpcEnableError: '',
                rpcInterfaceError: '',
                rpcPortError: '',
                enodeError: '',
            };
        },
        created(){
        },
        methods: {
            handleFocus(num){
                if(num === '1'){
                    this.chainError = '';
                }
                else if(num === '2'){
                    this.rpcEnableError = '';
                }
                else if(num === '3'){
                    this.rpcInterfaceError = '';
                }
                else if(num === '4'){
                    this.rpcPortError = '';
                }
                else if(num === '5'){
                    this.enodeError = '';
                }
            },
            handleSettings(){
                if(this.chain && this.rpcEnable && this.rpcInterface && this.rpcPort && this.enode){

                }
                else {
                    if(!this.chain) {
                        this.chainError = 'Chain is required'
                    }
                    if(!this.rpcEnable) {
                        this.rpcEnableError = 'RPC Enable is required'
                    }
                    if(!this.rpcInterface) {
                        this.rpcInterfaceError = 'RPC Interface is required'
                    }
                    if(!this.rpcPort) {
                        this.rpcPortError = 'RPC Port is required'
                    }
                    if(!this.enode) {
                        this.enodeError = 'Enode is required'
                    }
                }
            }
        }
    }
</script>

<style>
    /* network settings tab starts */
    .loadingMain{
        position: relative;
    }
    .network-settings .error-message {
        padding: 6px 10px !important;
    }

    .network-settings{
        background: #204854;
        width: 40%;
        position: absolute;
        bottom: 120px;
        right: 0;
        transition: all .3s ease;
    }
    .network-settings .content{
        position: relative;
        padding: 47px 33px;
        color: #ffffff;
        transition: all .3s ease;
    }
    .network-settings .content .open-btn{
        padding: 10px;
        background: #204854;
        border-radius: 5px 0 0 5px;
        position: absolute;
        bottom: 0;
        left: -45px;
        cursor: pointer;
    }
    .network-settings .content .open-btn .set-wheel {
        fill: #fff;
        fill-rule: evenodd;
    }
    h2{
        font-size: 18px;
    }
    .input{
        margin-top: 0;
    }
    .close-network{
        width: 0;
    }
    .close-network .content{
        padding: 0;
    }
    .close-network .content h2{
        display: none;
    }
    /* network settings tab ends */
    .update-content{
        padding: 47px 86px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }
    .update-content .cancel{
        width: 24px;
        height: 24px;
        background: #d7523f;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: absolute;
        top: 3px;
        right: 3px;
    }
    .close {
        fill: #540000;
        fill-rule: evenodd;
    }
    .update-content .logo-luna{
        margin-bottom: 20px;
    }
    .update-content h1{
        font-size: 18px;
        color: #ffffff;
        margin-bottom: 28px;
    }
    .update-content h2{
        font-size: 14px;
        color: #ffffff;
        margin-bottom: 28px;
    }
    .update-content h2 span{
        font-weight: bold;
    }
    .update-content button {
        outline:none;
        border:3px solid #d7523f;
        border-radius: 25px;
        font-size: 16px;
        line-height:25px;
        color: #ffffff;
        background-color: inherit;
        padding:10px 35px;
        transition:0.3s;
        cursor: pointer;
    }
    .update-content button:hover{
        background-color: #d7523f;
        transition:0.3s;
    }
</style>
