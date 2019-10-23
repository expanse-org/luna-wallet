<template>
    <footer >
        <div class="footer-Data">
            <div class="footer-container">
                <div>
                    <button class="termbtN" @click="handlerefresh"><img src="../../../assets/img/refresh.svg"/></button>
                    <button class="termbtN" @click="handlepause"><img :src="getPic(pauseimg)" /></button>
                    <button class="termbtN" @click="handleterm"><img src="../../../assets/img/terminal.svg"/></button>
                </div>
            </div>
        </div>
        <div v-if="terminalup" class="footer-DataUp">
            <div class="footer-container">
                <div>
                    <h1>GEXP LOGS</h1>
                </div>
                <div id="gexpcontent" class="gexplogscontent">
                    <div v-if="gexp" v-for="(gexp, key) in gexpLogData" class="a1">
                        <div class="gexptxt-num">
                            <p>01</p>
                        </div>
                        <p class="gexptxt">{{gexp}}</p>
                    </div>
                    <div v-else class="a1">
                        <p class="gexptxt">Loading...</p>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    import {ipcRenderer} from 'electron';
    import interact from 'interactjs'
    export default {
        name: 'Footer-page',
        data() {
            return {
                terminalup: false,
                gexplog: [],
                pauseimg: "pause",
                pausegexp: true,
                server: null,
                setheight: '300px',
            };
        },
        computed: {
            accounts() {
                var accountsArray = this.$store.state.allAccounts;
                return accountsArray;
            },
            gexpLogData() {
                console.log("computed");
                if(this.gexplog.length > 50) {
                    this.gexplog = this.gexplog.slice((this.gexplog.length + 15) - 50 , 50);
                    // console.log(this.gexplog.length, this.gexplog.length - 50);
                }
                ipcRenderer.on('gexpLogs', (event, res) => {
                    // console.log(res, 'expr------01', this.gexplog.length);
                    if(this.gexplog[this.gexplog.length-1] === res.replace(/\\n/g, '').substring(5))
                    {

                    } else if(this.gexplog[this.gexplog.length-1] !== res.replace(/\\n/g, '').substring(5)){
                        if(this.pausegexp){
                            this.gexplog.push(res.replace(/\\n/g, '').substring(5));
                        }
                    }
                });
                ipcRenderer.on('gexpLogsstder', (event, res) => {
                    // console.log(res, 'expr------01', 'exprerrrrr------01');
                    if(this.gexplog[this.gexplog.length-1] === res.replace(/\\n/g, '').substring(5))
                    {

                    } else if(this.gexplog[this.gexplog.length-1] !== res.replace(/\\n/g, '').substring(5)){
                        if(this.pausegexp){
                            this.gexplog.push(res.replace(/\\n/g, '').substring(5));
                        }
                    }
                });
                ipcRenderer.on('newMarketPair', (res) => {
                    if(res) {
                        this.$notification.success("New Market Pair Inserted", {  timer: 10, showCloseIcn: true });
                    }
                });
                ipcRenderer.on('newTrade', (res) => {
                    console.log(res, "newTrade");
                    if(res) {
                        this.$notification.success("New Trade Inserted", {  timer: 10, showCloseIcn: true });
                    }
                });
                ipcRenderer.on('notificationOrder', (event, res) => {
                    if(res) {
                        console.log("notificationOrder",res)
                        this.accounts.map((val) => {
                            // console.log("notificationOrder",val.hash , res.maker)
                            if(val.hash.toLowerCase() === res.maker.toLowerCase()) {
                                this.$notification.success(res.betaSymbol+'-'+res.alphaSymbol+" order placed with price:"+res.price, {  timer: 10, showCloseIcn: true });
                            }
                        })
                    }
                });
                return this.gexplog;
            }
        },
        created(){
            this.gexpLogData;
            window.setInterval(function() {
                var elem = document.getElementById('gexpcontent');
                // console.log('elemrr------01', elem);
                if(elem){
                    elem.scrollTop = elem.scrollHeight;
                }
            }, 5000);
        },
        methods: {
            handleterm() {
                var elem = document.getElementById('gexpcontent');
                if(elem){
                    elem.scrollTop = elem.scrollHeight;
                }
                if(this.terminalup) {
                    this.terminalup = false;
                } else {
                    this.terminalup = true;
                }
            },
            getPic(index) {
                return require('../../../assets/img/' + index + '.svg');
            },
            handlepause() {
                if(this.pausegexp) {
                    this.pausegexp = false;
                    this.pauseimg = "play";
                } else {
                    this.pausegexp = true;
                    this.pauseimg = "pause";
                }
            },
            handlerefresh(){
                this.pausegexp = true;
                this.gexplog = [];
                this.pauseimg = "pause";
            }
        }
    }
</script>

<style lang="sass">
    @import "./footer.scss"
</style>

<style >
    .resize-drag {
        color: white;
        touch-action: none;
        transform: none;
        /* This makes things *much* easier */
        box-sizing: border-box;
    }
</style>
