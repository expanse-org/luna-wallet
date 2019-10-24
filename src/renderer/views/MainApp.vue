<template>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
</template>

<script>
    import { ExpApi} from '../../main/libs/config';
    import {getAllAcounts, checkupdate} from '../components/DasboardComponents/WalletDashboardComponents/walletcommon';
    import {web3, startConnectWeb} from '../../main/libs/config';

    export default {
        name: 'MainApp',
        created(){
            ExpApi();
            setInterval(() => {
                if (typeof web3 !== 'undefined') {
                    // console.log("setInterval getAllAcounts 5000 inetda");
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
            };
        },
        methods: {
        }
    }
</script>

<style>
    @import "../assets/css/style.css";
</style>
