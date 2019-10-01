<template>
    <div class="content">
        <div class="curconverter-Info">
            <div class="curve"></div>
            <div class="curconverter-content">
                <div class="curconverter-headings">
                    <h1>Currency Converter</h1>
                </div>
            </div>
        </div>
        <div class="curconverter-para">
            <p> In order to trade your expanse against tokens you need to have equivalent expanse (WEXP). They have same
                value as the expanse only wrapped in token form to make them tradeable. Convert below to trade with ease!
            </p>
        </div>
        <div class="curconverter-body">
            <div class="content">
                <div class="calculate-div">
                    <div class="send-div">
                        <h2> You Send: </h2>
                        <input type="number" v-model="sendValue" />
                        <div @click="handleCurrChange" class="send-select slecth">
                           <div >{{sendCurr}}</div>
                        </div>
                    </div>
                    <div class="send-div">
                        <h2> You Receive: </h2>
                        <input type="number" v-model="recieveValue" />
                        <div @click="handleCurrChange" class="send-select slecth">
                           <div>{{receiveCurr}}</div>
                        </div>
                    </div>
                    <div class="exchange-btn">
                        <button @click="show">Exchange Now <img src="../../../../assets/img/Polygonwhitearrow.png"/></button>
                    </div>
                </div>
                <div class="partition-bar"></div>
                <div class="detail-div">
                    <div class="txt-div">
                        <h1>Exchange Rate</h1>
                        <p>1 EXP = 1 WEXP</p>
                    </div>
                    <!--<div class="txt-div">-->
                        <!--<h1>Exchange Fee</h1>-->
                        <!--<p>0.098 ETH1</p>-->
                    <!--</div>-->
                    <div class="txt-div network-rate">
                        <h1>Network Rate</h1>
                        <!--<p>0.098 ETH1</p>-->
                        <div class="progressBar">
                            <input id="price" v-model="price" @focus="handleFocus" type="range" min="53" max="212"/>
                            <div class="ranges">
                                <span>53</span>
                                <span>212</span>
                            </div>
                            <p>{{price}} EXP</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <modal class="tmodal" name="exchangeNow">
            <allowance-popup></allowance-popup>
        </modal>
    </div>
</template>

<script>
    import AllowancePopup from '../ExpDetailsComponents/AllowancePopup/AllowancePopup'
    export default {
        name: 'currencyConverter',
        data() {
            return {
                initialPage: 1,
                forcePage: 1,
                sendValue: 0,
                recieveValue: 0,
                totalcount: 100,
                price: 64,
                sendCurr: 'EXP',
                receiveCurr: 'WEXP',
            };
        },
        components : {
            'allowance-popup': AllowancePopup,
        },
        created(){
        },
        methods: {
            show () {
                this.$modal.show('exchangeNow');
            },
            hide () {
                this.$modal.hide('exchangeNow');
            },
            clickCallback (pageNum) {
                console.log(pageNum)
            },
            handleFocus() {

            },
            handleCurrChange (){
                var temp = this.sendCurr;
                this.sendCurr = this.receiveCurr;
                this.receiveCurr = temp;

            },
            handleExchange() {

            }
        }
    }
</script>

<style>

</style>
