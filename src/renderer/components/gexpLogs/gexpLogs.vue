<template>
  <div class="main-container dashboard archive-accounts">
    <div class="create-acccount content">
      <div class="accounts">
        <div class="top">
          <label>Gexp Logs</label>
          <!-- <label>No Records Found</label> -->
        </div>
        <div class="accounts-list gexplistdiv">
          <div v-for="(gexplog, key) in gexpLogData" class="a1">
            <p class="gexptxt">{{gexplog}}</p>
          </div>
        </div>
      </div>
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
            let that = this;
            ipcRenderer.on('gexpLogs', (event, res) => {
                console.log(res, 'expr------01');
                that.gexplog.push(res);
            });
            // console.log(this.gexpLogData,"computed dsadada");
            return this.gexplog;
        }
    },
    data () {
      return {
          gexplog: [],
      }
    },
    created() {
        let that = this;
        this.intervalid1 = setInterval(() => {
            ipcRenderer.on('gexpLogs', (event, res) => {
                console.log(res, 'expresssss');
                that.gexplog.push(res);
                console.log(that.gexplog, 'gexplogs');
            });
            clearInterval(this.intervalid1)
        }, 1000);
    }
  }

</script>

<style scoped>
  .gexplistdiv{
    width: 610px;
    max-height: 806px;
  }

  .gexplistdiv div{
    display: block;
  }

  .gexptxt {
    color: #ffffff;
  }
</style>
