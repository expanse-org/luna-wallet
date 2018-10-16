<template>
    <div>
        <div class="main-container">
            <sidebar-app />
            <div class="container-outer">
                <div class="contant-outer">
                    <header-app />
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import AddToken from './TokensComponents/AddToken';
import {getAllAcounts, checkupdate} from './WalletDashboardComponents/walletcommon';
import {web3, startConnectWeb} from '../../../main/libs/config';

export default {
    name: 'Dashboard-page',
    components:{
        'header-app': Header,
        'sidebar-app': SideBar,
        'addtoken-app': AddToken,
    },
    data(){
        return {
            price: 0
        };
    },
    created(){
        if (typeof web3 !== 'undefined') {
            console.log("else web condition");
            getAllAcounts();
            setInterval(() => {
                getAllAcounts();
            }, 5000);
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
    },
    methods: {

    }
}
</script>

<style>

</style>
