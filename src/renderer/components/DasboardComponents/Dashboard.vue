<template>
    <div>
        <div class="main-container">
            <sidebar-app @changeColorHead="changeColorHead" />
            <div class="container-outer">
                <div class="contant-outer">
                    <header-app :tabClass="tabClass"/>
                    <keep-alive>
                        <router-view />
                    </keep-alive>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import {getAllAcounts, checkupdate, getAllWatchOnlyAcounts} from './WalletDashboardComponents/walletcommon';
import {web3, startConnectWeb} from '../../../main/libs/config';

export default {
    name: 'Dashboard-page',
    components:{
        'header-app': Header,
        'sidebar-app': SideBar,
    },
    data(){
        return {
            price: 0,
            tabClass: 'top-bar red'
        };
    },
    created(){
        console.log(this.$router, "router");
        if (typeof web3 !== 'undefined') {
            // console.log("if (typeof web3 !== 'undefined')");
            getAllAcounts();
            getAllWatchOnlyAcounts();
        } else {
            // set the provider you want from Web3.providers
            startConnectWeb();
            this.intervalid1 = setInterval(() => {
                if(typeof web3 !== 'undefined' ){
                    getAllAcounts();
                    getAllWatchOnlyAcounts();
                    clearInterval(this.intervalid1)
                }
            }, 100);
        }
    },
    methods: {
        changeColorHead(tab) {
            console.log(tab, "--------------");
            switch (tab){
                case '/wallet':
                    this.tabClass = 'red';
                    console.log(this.tabClass, "--------------");
                    break;
                case '/market':
                    this.tabClass = 'green';
                    break;
                case '/tokenlab':
                    this.tabClass = 'blue';
                    break;
            }
        }

    }
}
</script>

<style>

</style>
