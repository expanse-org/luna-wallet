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
            gexpLogData() {
                console.log("computed");
                if(this.gexplog.length > 50) {
                    this.gexplog = this.gexplog.slice((this.gexplog.length + 15) - 50 , 50);
                    // console.log(this.gexplog.length, this.gexplog.length - 50);
                }
                ipcRenderer.on('gexpLogs', (event, res) => {
                    // console.log(res, 'expr------01', this.gexplog.length);
                    if(this.gexplog[this.gexplog.length-1] === res)
                    {

                    } else{
                        if(this.pausegexp){
                            this.gexplog.push(res);
                        }
                    }
                });
                ipcRenderer.on('gexpLogsstder', (event, res) => {
                    // console.log(res, 'exprerrrrr------01', this.gexplog.length);
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
            this.gexpLogData;
            let that = this;
            // interact('.resize-drag')
            //     .draggable({
            //         onmove: window.dragMoveListener,
            //         restrict: {
            //             restriction: 'parent',
            //             elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            //         },
            //     })
            //     .resizable({
            //         // resize from all edges and corners
            //         edges: { left: false, right: false, bottom: false, top: true },
            //
            //         // keep the edges inside the parent
            //         restrictEdges: {
            //             outer: 'parent',
            //             endOnly: true,
            //         },
            //
            //         // minimum size
            //
            //         inertia: true,
            //     })
            //     .on('resizemove', function (event) {
            //         var target = event.target,
            //             y = (parseFloat(target.getAttribute('data-y')) || 0);
            //
            //         // update the element's style
            //         if (event.rect.height > 300) {
            //             target.style.height =  event.rect.height + 'px';
            //             that.setheight =  event.rect.height + 'px'
            //         }
            //         // translate when resizing from top or left edges
            //         y += event.deltaRect.top;
            //
            //         target.setAttribute('data-y', y);
            //     });
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
