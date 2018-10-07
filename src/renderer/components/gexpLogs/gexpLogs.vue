<template>
  <div>
    <div class="title">Gexp Logs</div>
    <div class="items">
      {{gexpLogData}}
    </div>
  </div>
</template>

<script>
  import {ipcRenderer} from 'electron';
  import {callgexplog} from './gexplog';
  export default {
    name: 'gexpLogs',
    computed: {
        gexpLogData() {
            ipcRenderer.on('gexpLogs', (event, res) => {
                console.log(res, 'expresssss');
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

        // let interval = setInterval(() => {
        //     if(this.gexpLogData){
        //         console.log(this.gexpLogData,"dsadada");
        //         clearInterval(interval);
        //     }
        // }, 10000);
        // callgexplog();



        console.log('gexplog');
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
