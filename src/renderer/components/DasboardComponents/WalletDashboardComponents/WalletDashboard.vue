<template>
    <div class="dashboard tabcontent" id="dashboard" v-bind:style="{display: 'block',zIndex: '0'}">
        <div class="content">
            <accounts />
            <!--<div v-if="accdetails">
                <latesttransaction />
            </div> -->
        </div>
    </div>
</template>

<script>
    import Accounts from './Accounts';
    var path = require('path')
    import LatestTransaction from './LatestTransaction';
    export default {
        name: 'WalletDashboard',
        data() {
            return{
                sortedAccountsBalanceArray: [],
                accdetails: true,
            };
        },
        components:{
            'accounts': Accounts,
            'latesttransaction': LatestTransaction,
        },
        created(){

        },
        methods: {
        }
    }
</script>

<style>

</style>
