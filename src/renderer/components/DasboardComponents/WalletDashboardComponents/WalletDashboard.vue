<template>
    <div class="dashboard tabcontent" id="dashboard" style="display: block">
        <div class="content">
            <accounts />
            <latesttransaction />
        </div>
    </div>
</template>

<script>
    import {reOrderAccountsbyBalance} from './walletcommon';
    import Accounts from './Accounts';
    import LatestTransaction from './LatestTransaction';
    export default {
        name: 'WalletDashboard',
        data() {
            return{
                sortedAccountsBalanceArray: []
            };
        },
        components:{
            'accounts': Accounts,
            'latesttransaction': LatestTransaction,
        },
        created(){
            // reOrderAccountsbyBalance();
        },
        methods: {
        }
    }
</script>

<style>

</style>
