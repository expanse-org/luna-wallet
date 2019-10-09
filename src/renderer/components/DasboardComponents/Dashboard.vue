<template>
    <div>
        <div class="main-container">
            <sidebar-app @changeColorHead="changeColorHead" />
            <div class="container-outer">
                <div class="contant-outer">
                    <header-app :tabClass="tabClass"/>
                    <router-view />
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
var sqlite3 = require('sqlite3').verbose();

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
        var sqldb = new sqlite3.Database( './expexmarket.sqlite3db', (err, result) => {console.log(err, result)});
        sqldb.serialize(function() {
            sqldb.run("CREATE TABLE if not exists Orders (orderHash TEXT, tokenBuy TEXT, amountBuy TEXT, tokenSell TEXT, amountSell REAL, maker TEXT, tokenId INTEGER, price REAL)");
            sqldb.run("CREATE TABLE if not exists Trade (orderHash TEXT, matchinOrderHash TEXT, tokenBuy TEXT, tokenSell TEXT, amountBuy REAL, amountSell REAL, taker TEXT, maker TEXT, tokenId INTEGER, price REAL)");
            sqldb.run("CREATE TABLE if not exists marketPair (createdAt TEXT, alphaSymbol TEXT,alphaAddress TEXT,alphaDecimal TEXT, betaSymbol TEXT,betaAddress TEXT,betaDecimal TEXT, status TEXT)");
            sqldb.run("CREATE TABLE if not exists Tokens (tokenId INTEGER, tokenAddress TEXT, tokenName TEXT, tokenType TEXT, tokenSymbol TEXT, decimalPlaces REAL)");
            // sqldb.run("DROP TABLE marketPair");

            let today = new Date().toISOString().slice(0, 10)
            // var stmt = sqldb.prepare("DELETE FROM TokenPairs WHERE alpha = 'WEXP'");
            // var stmt = sqldb.prepare("INSERT INTO Tokens VALUES (1, '0xa887adb722cf15bc1efe3c6a5d879e0482e8d197', 'TokenLab', 'LAB', 'erc20', 18)");
            // var stmt = sqldb.prepare("INSERT INTO marketPair VALUES ('"+today+"', 'PEX','0x4f5ec5a69dbe12c48ca1edc9c52b1e8896aed932','18', 'WEXP','0x270ff59e03e69db4600900a2816587e7cd3e2f11','18', 'active')");
            // var stmt = sqldb.prepare("INSERT INTO marketPair VALUES ('"+today+"', 'LAB','0xa887adb722cf15bc1efe3c6a5d879e0482e8d197','18', 'WEXP','0x270ff59e03e69db4600900a2816587e7cd3e2f11','18', 'active')");
            // stmt.run();
            // stmt.finalize();

            sqldb.each("SELECT * FROM Tokens", function(err, row) {
                console.log(row, "rowsss");
            });
        });

        sqldb.close();
    },
    methods: {
        changeColorHead(tab) {
            console.log(tab, "--------------");
            switch (tab){
                case '/walletdashboard':
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
