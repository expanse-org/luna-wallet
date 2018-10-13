<template>
  <div class="main-container dashboard archive-accounts">
    <div class="create-acccount content">
      <div class="accounts">
        <div class="top">
          <label>Gexp Logs</label>
          <!-- <label>No Records Found</label> -->
        </div>
        <div class="accounts-list gexplistdiv">
          <div v-for="(gexp, key) in gexpLogData" class="a1">
            <p class="gexptxt">{{gexp}}</p>
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
            // console.log(that.gexplog,"computed dsadada");
            return that.gexplog;
        }
    },
    data () {
      return {
          gexplog: [],
      }
    },
    created() {
    }
  }

</script>

<style scoped>
  .gexplistdiv{
    width: 610px!important;
    max-height: 806px!important;
  }

  .gexplistdiv div{
    display: block!important;
  }

  .gexptxt {
    color: #ffffff;
  }
</style>
