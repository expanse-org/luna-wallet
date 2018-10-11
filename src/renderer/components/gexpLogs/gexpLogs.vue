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
  import {callgexplog} from './gexplog';
  import {gexplogs} from '../../../common/gexpfunc';

  export default {
    name: 'gexpLogs',
    computed: {
        gexpLogData() {
            this.gexplog = gexplogs;
            console.log(gexplogs,"computed dsadada");
            console.log(this.$store.state,"$store computed dsadada");
            return this.gexplog;
        }
    },
    data () {
      return {
          gexplog: '',
      }
    },
    created() {
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
