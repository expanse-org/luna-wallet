<template>
  <div id="gexplogs">
    <div class="title">Gexp Logs</div>
    <div class="items">
      {{gexpLogData}}
    </div>
  </div>
</template>

<script>
  import {ipcRenderer} from 'electron';
  // import {callgexplog} from './gexplog';
  import {db} from '../../../../lowdbFunc';
  export default {
    name: 'gexpLogs',
    computed: {
        gexpLogData() {
            ipcRenderer.on('gexpLogs', (event, res) => {
                console.log(res, 'expr------01');
                this.gexplog = res;
            });
            // console.log(this.gexpLogData,"computed dsadada");
            return this.gexplog;
        }
    },
    data () {
      return {
          gexplog: '',
      }
    },
    created() {
        // this.intervalid1 = setInterval(() => {
            ipcRenderer.on('gexpLogs', (event, res) => {
                console.log(res, 'expresssss');
                $('#gexplogs .items').append( "<p>" + res + "</p>")
                gexplog.push(res);
                console.log(gexplog, 'gexplogs');
            });
            // clearInterval(this.intervalid1)
        // }, 1000);
        console.log(gexplogs, 'gexplog');
        console.log(this.gexpLogData,"dsadada");
    }
  }

</script>

<style scoped>
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items { margin-top: 8px; }

  .item {
    display: flex;
    margin-bottom: 6px;
  }

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .item .value {
    color: #35495e;
    font-weight: bold;
  }
</style>
