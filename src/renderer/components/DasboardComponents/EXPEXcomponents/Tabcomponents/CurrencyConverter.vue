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
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.
            </p>
        </div>
        <div class="curconverter-body">
            <div class="content">
                <div class="calculate-div">
                    <div class="send-div">
                        <h2> You Send: </h2>
                        <input type="number" />
                        <div class="send-select">
                            <select >
                                <option>EXP</option>
                                <option>ETH</option>
                                <option>WETH</option>
                            </select>
                            <img src="../../../../assets/img/Polygonwhite2.png"/>
                        </div>
                    </div>
                    <div class="send-div">
                        <h2> You Receive: </h2>
                        <input type="number" />
                        <div class="send-select">
                            <select >
                                <option>EXP</option>
                                <option>ETH</option>
                                <option>WETH</option>
                            </select>
                            <img src="../../../../assets/img/Polygonwhite2.png"/>
                        </div>
                    </div>
                    <div class="exchange-btn">
                        <button>Exchange Now <img src="../../../../assets/img/Polygonwhitearrow.png"/></button>
                    </div>
                </div>
                <div class="partition-bar"></div>
                <div class="detail-div">
                    <div class="txt-div">
                        <h1>Exchange Rate</h1>
                        <p>1 EXP = 0.098 ETH1</p>
                    </div>
                    <div class="txt-div">
                        <h1>Exchange Fee</h1>
                        <p>0.098 ETH1</p>
                    </div>
                    <div class="txt-div">
                        <h1>Network Rate</h1>
                        <p>0.098 ETH1</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'currencyConverter',
        data() {
            return {
                initialPage: 1,
                forcePage: 1,
                totalcount: 100,
            };
        },
        created(){
        },
        methods: {
            clickCallback (pageNum) {
                console.log(pageNum)
            },
        }
    }
</script>

<style>

</style>
