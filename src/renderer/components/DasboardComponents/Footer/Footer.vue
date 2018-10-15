<template>
    <footer>
        <div class="footer-Data">
            <div class="footer-container">
                <div>
                    <button class="termbtN" @click="handleterm"><img src="../../../assets/img/terminal.svg"/></button>
                </div>
            </div>
        </div>
        <div v-if="terminalup" class="footer-DataUp">
            <div class="footer-container">
                <div>
                    <h1>GEXP LOGS</h1>
                </div>
                <div class="gexplogscontent">
                    <div v-if="gexp" v-for="(gexp, key) in gexpLogData" class="a1">
                        <p class="gexptxt">{{gexp}}</p>
                    </div>
                    <div v-else class="a1">
                        <p class="gexptxt">Loading...</p>
                    </div>
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
                terminalup: true,
                gexplog: [],
            };
        },
        computed: {
            gexpLogData() {
                ipcRenderer.on('gexpLogs', (event, res) => {
                    console.log(res, 'expr------01');
                    this.gexplog.push(res);
                });
                return this.gexplog;
            }
        },
        created(){
        },
        methods: {
            handleterm() {
                if(this.terminalup) {
                    this.terminalup = false;
                } else {
                    this.terminalup = true;
                }
            },
            handleClose() {
                this.terminalup = false;
            },
        }
    }
</script>

<style lang="sass">
    @import "./footer.scss"
</style>
