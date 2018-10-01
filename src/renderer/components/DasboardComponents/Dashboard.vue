<template>
    <div class="main-container">
        <sidebar-app />
        <div class="container-outer">
            <div class="contant-outer">
                <header-app />
                <router-view />
            </div>
        </div>
        <div class="md-modal md-effect-1" id="modal-2">
            <div class="popup popup1 md-content ">
                <a href="#" class="btn-close md-close"></a>
                <addtoken-app />
            </div>
        </div>
    </div>
</template>

<script>
import Header from './Header/Header';
import Footer from './Footer/Footer';
import SideBar from './SideBar/SideBar';
import AddToken from './TokensComponents/AddToken';
import {getAllAcounts} from './WalletDashboardComponents/walletcommon';

export default {
    name: 'Dashboard-page',
    components:{
        'header-app': Header,
        'footer-app': Footer,
        'sidebar-app': SideBar,
        'addtoken-app': AddToken,
    },
    data(){
        return {
            price: 0
        };
    },
    created(){
        // getAllAcounts();
        // setInterval(() => {
        //     getAllAcounts();
        // }, 500000);
    },
    methods: {

    }
}
</script>

<style>

</style>
