import Web3 from "web3";
var cron = require('node-cron');
import { startConnectWeb, startConnectWebHttp } from '../main/libs/config';

var sqlite3 = require('sqlite3').verbose();
var sqldb = new sqlite3.Database( './expexmarket.sqlite3db', (err, result) => {
    console.log(err, result, "connect DB");

});
sqldb.serialize(function() {
    // sqldb.run("DROP TABLE marketPair");

    sqldb.run("CREATE TABLE if not exists Orders (orderHash TEXT, tokenBuy TEXT, amountBuy TEXT, tokenSell TEXT, amountSell REAL, maker TEXT, tokenId INTEGER, price REAL)");
    sqldb.run("CREATE TABLE if not exists Trade (orderHash TEXT, matchinOrderHash TEXT, tokenBuy TEXT, tokenSell TEXT, amountBuy REAL, amountSell REAL, taker TEXT, maker TEXT, tokenId INTEGER, price REAL)");
    sqldb.run("CREATE TABLE if not exists marketPair (blockNo INTEGER, txHash TEXT, createdAt TEXT, alphaSymbol TEXT,alphaAddress TEXT,alphaDecimal TEXT, betaSymbol TEXT,betaAddress TEXT,betaDecimal TEXT, status TEXT)");
    sqldb.run("CREATE TABLE if not exists Tokens (tokenId INTEGER, tokenAddress TEXT, tokenName TEXT, tokenType TEXT, tokenSymbol TEXT, decimalPlaces REAL)");

    let today = new Date().toISOString().slice(0, 10)
    // var stmt = sqldb.prepare("DELETE FROM TokenPairs WHERE alpha = 'WEXP'");
    // var stmt = sqldb.prepare("INSERT INTO Tokens VALUES (1, '0xa887adb722cf15bc1efe3c6a5d879e0482e8d197', 'Token Lab', 'LAB', 'erc20', 18)");
    // var stmt = sqldb.prepare("INSERT INTO marketPair VALUES ('"+today+"', 'PEX','0x4f5ec5a69dbe12c48ca1edc9c52b1e8896aed932','18', 'WEXP','0x270ff59e03e69db4600900a2816587e7cd3e2f11','18', 'active')");
    // var stmt = sqldb.prepare("INSERT INTO marketPair VALUES ('"+today+"', 'LAB','0xa887adb722cf15bc1efe3c6a5d879e0482e8d197','18', 'WEXP','0x270ff59e03e69db4600900a2816587e7cd3e2f11','18', 'active')");
    // stmt.run();
    // stmt.finalize();

    sqldb.each("SELECT * FROM marketPair", function(err, row) {
        console.log(row, "rowsss");
    });
});

const web3http = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9656"));

let isGetPastLogCronRunning  = false;
const taskwebhttp = cron.schedule('0 */1 * * * *', async () =>  {
    let netIsListening = await web3http.eth.net.isListening();
    if(netIsListening) {
        console.log(netIsListening, "netIsListening")
        if(isGetPastLogCronRunning) {
            return;
        }
        isGetPastLogCronRunning = true;
        try{
            const blockNo = await getRecentBlock();
            console.log(blockNo, "blockNo");
            if(blockNo) {
                let pastLogs = await web3http.eth.getPastLogs({
                    address: "0xD3627766D0584Ed23f8D1acd2E493F8c281C9EF9",
                    topics: null,
                    fromBlock: '0x0',
                });
                console.log(pastLogs, "pastlogs");
            }
        }catch(err) {
            console.log(err, "err");
        }
        isGetPastLogCronRunning = false;
    }
});


const getRecentBlock = async () =>  {
    console.log("11 -");
    return new Promise(function (resolve, reject) {
        let data = 0;
        sqldb.each("select * from marketPair order by blockNo desc limit 1", function(err, row) {
            if(err) {
                reject(err);
            }
            if(row) {
                console.log(row,"if");
                data = parseInt(row["blockNo"]) + 1;
            }
        });
        resolve(data);
    })

}

setTimeout( ()=> {
    taskwebhttp.start();
}, 5000)
