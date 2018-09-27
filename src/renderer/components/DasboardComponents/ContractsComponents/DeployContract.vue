<template>
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

            <div class="row">
                <div class="accounts">
                    <div class="row">
                        <div class="name">
                            <img src="../../../assets/img/red-logo.png" alt="red">
                            <label>EXP</label>
                        </div>
                        <label>8.91 USD (9.00 EXP)</label>
                    </div>
                    <div class="row">
                        <div class="name">
                            <img src="../../../assets/img/blue-logo.png" alt="blue">
                            <label>Credits</label>
                        </div>
                        <label>0.246913 T$</label>
                    </div>
                    <div class="row">
                        <div class="name">
                            <img src="../../../assets/img/red-logo.png" alt="red">
                            <label>Jeff’s Euros</label>
                        </div>
                        <label>5.00 €</label>
                    </div>
                    <div class="row">
                        <div class="name">
                            <img src="../../../assets/img/blue-logo.png" alt="blue">
                            <label>Robot Credits</label>
                        </div>
                        <label>1,000.16 C$</label>
                    </div>
                    <div class="row">
                        <div class="name">
                            <img src="../../../assets/img/red-logo.png" alt="red">
                            <label>EXP</label>
                        </div>
                        <label>8.91 USD (9.00 EXP)</label>
                    </div>
                    <div class="row">
                        <div class="name">
                            <img src="../../../assets/img/blue-logo.png" alt="blue">
                            <label>Credits</label>
                        </div>
                        <label>0.246913 T$</label>
                    </div>
                    <div class="row">
                        <div class="name">
                            <img src="../../../assets/img/red-logo.png" alt="red">
                            <label>Jeff’s Euros</label>
                        </div>
                        <label>5.00 €</label>
                    </div>
                    <div class="row">
                        <div class="name">
                            <img src="../../../assets/img/blue-logo.png" alt="blue">
                            <label>Robot Credits</label>
                        </div>
                        <label>1,000.16 C$</label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="cont_select_center">
                    <div class="select_mate" data-mate-select="active">
                        <select name="tokenType1" class="tokenType1" v-model="tokenType1" @focus="handleFocus">
                        </select>
                        <p class="selecionado_opcion" onclick="open_select(this)"></p>
                        <span onclick="open_select(this)" class="icon_select_mate">
                            <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
                                <path d="M0-.75h24v24H0z" fill="none" />
                            </svg>
                        </span>
                        <div class="cont_list_select_mate">
                            <ul class="cont_select_int"> </ul>
                        </div>
                    </div>
                </div>
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
</template>

<script>
    export default {
        name: 'WatchContracts',
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
            };
        },
        created() {
        },
        methods: {
            handledeployContract(e) {
                e.preventDefault();
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
                }
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
            open_select(idx) {
                console.log("open_select");
                var idx1 = idx.getAttribute('data-n-select');
                var ul_cont_li = document.querySelectorAll("[data-indx-select='" + idx1 + "'] .cont_select_int > li");
                var hg = 0;
                var slect_open = document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].getAttribute(
                    'data-selec-open');
                var slect_element_open = document.querySelectorAll("[data-indx-select='" + idx1 + "'] select")[0];
                if (this.isMobileDevice()) {
                    if (window.document.createEvent) { // All
                        var evt = window.document.createEvent("MouseEvents");
                        evt.initMouseEvent("mousedown", false, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0,
                            null);
                        slect_element_open.dispatchEvent(evt);
                    } else if (slect_element_open.fireEvent) { // IE
                        slect_element_open.fireEvent("onmousedown");
                    } else {
                        slect_element_open.click();
                    }
                } else {


                    for (var i = 0; i < ul_cont_li.length; i++) {
                        hg += ul_cont_li[i].offsetHeight;
                    };
                    if (slect_open == 'false') {
                        document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].setAttribute('data-selec-open',
                            'true');
                        document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul")[0].style
                            .height = hg + "px";
                        document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .icon_select_mate")[0].style.transform =
                            'rotate(180deg)';
                    } else {
                        document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].setAttribute('data-selec-open',
                            'false');
                        document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .icon_select_mate")[0].style.transform =
                            'rotate(0deg)';
                        document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul")[0].style
                            .height = "0px";
                    }
                }

            }
        }
    }
</script>

<style>

</style>
