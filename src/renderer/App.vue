<template>
  <div id="app">
    <router-view></router-view>
    <footer-app v-if="!archive"/>
  </div>
</template>

<script>
    import Footer from './components/DasboardComponents/Footer/Footer';
    import {getAllAcounts, checkupdate} from './components/DasboardComponents/WalletDashboardComponents/walletcommon';
    import {web3, startConnectWeb} from '../main/libs/config';
export default {
    name: 'lunawalletvuetest',
    components:{
        'footer-app': Footer,
    },
    created() {
        // console.log(this.$store,"APP");
        console.log(this.$router.history.current.path,"APP");
        if(this.$router.history.current.path === '/archiveAccounts'){
            this.archive = true;
        }

        setInterval(() => {
          if (typeof web3 !== 'undefined') {
              console.log("if (typeof web3 !== 'undefined')");
                  console.log("setInterval getAllAcounts 5000 inetda");
                  getAllAcounts();
          } else {
              // set the provider you want from Web3.providers
              startConnectWeb();
              this.intervalid1 = setInterval(() => {
                  if(typeof web3 !== 'undefined' ){
                      getAllAcounts();
                      clearInterval(this.intervalid1)
                  }
              }, 100);
          }
        }, 5000);
    },
    data() {
        return {
            archive: false,
        };
    },
    methods: {},
}
</script>

<style>
  @import "assets/css/style.css";
</style>
