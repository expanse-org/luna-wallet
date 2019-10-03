<template>
    <div class="dashboard tabcontent" id="dashboard" v-bind:style="{display: 'block',zIndex: '0'}">
        <div class="content">
            <accounts />
            <div v-if="accdetails">
                <latesttransaction />
            </div>
        </div>
    </div>
</template>

<script>
    import {getAllAcounts} from './walletcommon';
    var sqlite3 = require('sqlite3').verbose();
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
            var db = new sqlite3.Database( './mygreatdb.sqlite3db', (err, result) => {console.log(err, result)});

            db.serialize(function() {
                db.run("CREATE TABLE lorem (info TEXT)");

                var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
                for (var i = 0; i < 10; i++) {
                    stmt.run("Ipsum " + i);
                }
                stmt.finalize();

                db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
                    console.log(row.id + ": " + row.info);
                });
            });

            db.close();
        },
        methods: {
        }
    }
</script>

<style>

</style>
