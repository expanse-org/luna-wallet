<template>
    <footer>
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
    export default {
        name: 'Footer-page',
        data() {
            return {
                terminalup: false,
                gexplog: [],
                pauseimg: "pause",
                pausegexp: true,
                server: null
            };
        },
        computed: {
            gexpLogData() {
                console.log("computed");
                if(this.gexplog.length > 6) {
                    var objDiv = document.getElementById("gexpcontent");
                    objDiv.scrollTop = objDiv.scrollHeight;
                }
                if(this.gexplog.length > 50) {
                    this.gexplog = this.gexplog.slice(this.gexplog.length - 50, 50);
                    console.log(this.gexplog.length, this.gexplog.length - 50);
                }
                ipcRenderer.on('gexpLogs', (event, res) => {
                    console.log(res, 'expr------01', this.gexplog.length);
                    if(this.gexplog[this.gexplog.length-1] === res)
                    {

                    } else{
                        if(this.pausegexp){
                            this.gexplog.push(res);
                        }
                    }
                });
                ipcRenderer.on('gexpLogsstder', (event, res) => {
                    console.log(res, 'exprerrrrr------01', this.gexplog.length);
                    if(this.gexplog[this.gexplog.length-1] === res)
                    {

                    } else{
                        if(this.pausegexp){
                            this.gexplog.push(res);
                        }
                    }
                });
                return this.gexplog;
            }
        },
        created(){
        },
        methods: {
            handleterm() {
                if(this.gexplog.length > 6) {
                    var objDiv = document.getElementById("gexpcontent");
                    objDiv.scrollTop = objDiv.scrollHeight;
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
                this.pauseimg = "pause";
            }
        }
    }
</script>

<style lang="sass">
    @import "./footer.scss"
</style>
