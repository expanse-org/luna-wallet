import os from "os";
const Web3 = require("web3");
import { ipcRenderer } from 'electron'
const cron = require('node-cron');
import {
    expexABI,
    wexpABI,
    marketENUM,
    prod_app_directory
} from '../main/libs/config';
import store from '../renderer/store';
import shell from "shelljs";
const expexAddress = '0xD3627766D0584Ed23f8D1acd2E493F8c281C9EF9';
let today = new Date().toISOString().slice(0, 10)

let appPath = "~/Library/Application Support/"+prod_app_directory;
if(os.type() == 'Windows_NT') {
    appPath = "~/AppData/Roaming/"+prod_app_directory;
    shell.cd(appPath);

}
if(os.type() == 'Linux') {
    appPath = "~/.config/"+prod_app_directory;
    shell.cd(appPath);

}
if(os.type() == 'Darwin') {
    appPath = "~/Library/Application Support/"+prod_app_directory;
    shell.cd(appPath);
}

console.log(store);


var sqlite3 = require('sqlite3').verbose();
var sqldb = new sqlite3.Database( './expexmarket.sqlite3db', (err, result) => {
    console.log(err, result, "connect DB");
});

sqldb.serialize(function() {
    // sqldb.run("DROP TABLE Orders");
    sqldb.run("CREATE TABLE if not exists Orders (createdAt TEXT not null,orderHash VARCHAR(255) not null UNIQUE, tokenBuy TEXT not null, amountBuy REAL not null, tokenSell TEXT not null, amountSell REAL not null, maker TEXT not null, tokenId INTEGER not null, price REAL not NULL, blockNo INTEGER not null, decimalBuy INTEGER not null, " +
        "decimalSell INTEGER not null, status TEXT not null, marketType TEXT not null, betaSymbol TEXT not null, alphaSymbol TEXT NOT NULL, orderFilled REAL NOT NULL, amountBuyFilled REAL NOT NULL, amountSellFilled REAL NOT NULL)");
    sqldb.run("CREATE TABLE if not exists marketPair (blockNo INTEGER not null , txHash VARCHAR(255) not null,createdAt TEXT not null, alphaSymbol TEXT not null, alphaAddress VARCHAR(255) not null, alphaDecimal INTEGER not null,  betaSymbol TEXT not null, betaAddress VARCHAR(255) not null, betaDecimal INTEGER not null, PRIMARY KEY (alphaAddress, betaAddress))");
    sqldb.run("CREATE TABLE if not exists Trade (orderHash TEXT, matchinOrderHash TEXT, tokenBuy TEXT, tokenSell TEXT, amountBuy REAL, amountSell REAL, taker TEXT, maker TEXT, tokenId INTEGER, price REAL)");

});

const web3http = new Web3("https://gexp.gander.tech");

const dexContract = new web3http.eth.Contract(expexABI, expexAddress);

let isGetPastLogCronRunning  = false;
const marketPairFetchCron = cron.schedule('0 */1 * * * *', async () =>  {
    console.log("Cron RUnning")
    if(isGetPastLogCronRunning) {
        return;
    }
    isGetPastLogCronRunning = true;
    let netIsListening = await web3http.eth.net.isListening();
     if(netIsListening) {
         try{
             const blockNo = await getRecentBlock();
             if(blockNo) {
                 const allMarketPairs = await dexContract.getPastEvents("MarketPair", {
                     fromBlock : blockNo,
                     toBlock: "latest"
                 })
                 // console.log(allMarketPairs, "pastlogs");
                 for(let i =0 ;i< allMarketPairs.length; i++) {
                     const alpha = allMarketPairs[i].returnValues["token1"]
                     const beta = allMarketPairs[i].returnValues["token2"]
                     const status = allMarketPairs[i].returnValues["status"]
                     const blockNumber = allMarketPairs[i].blockNumber
                     const txHash = allMarketPairs[i].transactionHash;
                     if(status ) {
                         // TODO for enabling status
                         const alphaContract = new web3http.eth.Contract(wexpABI, alpha);
                         const betaContract = new web3http.eth.Contract(wexpABI, beta);
                         const alphaName =await alphaContract.methods.name().call();
                         const alphaSymbol =await alphaContract.methods.symbol().call();

                         const alphaDecimals =await alphaContract.methods.decimals().call();

                         const betaName =await betaContract.methods.name().call();
                         const betaSymbol =await betaContract.methods.symbol().call();
                         const betaDecimals =await betaContract.methods.decimals().call();

                         // insert into market pair value( ? , ? ,? ,? , ? , ? ,? )
                         try {
                             var stmt = sqldb.prepare("INSERT or IGNORE INTO marketPair VALUES ('"+blockNumber+"','"+txHash+"','"+today+"', '"+alphaSymbol+"', '"+alpha+"', '"+alphaDecimals+"', '"+betaSymbol+"', '"+beta+"', '"+betaDecimals+"')");
                             stmt.run();
                             stmt.finalize();
                             store.dispatch('addCronToast', {message: 'Market Pair Table Update', type: 'Success'});

                         } catch(err) {
                             console.log(err)
                         }
                     }else{
                         // TODO query for disabling list
                         // delete from marketpair where alphaaddress = alpha and betaaddress = beta
                         try {
                             var stmt = sqldb.prepare("DELETE FROM marketPair WHERE alphaAddress = '"+alpha+"' AND betaAddress = '"+beta);
                             stmt.run();
                             stmt.finalize();
                             store.dispatch('addCronToast', {message: 'Market Pair Table Update', type: 'Success'});

                         } catch(err) {
                             console.log(err)
                         }

                     }

                 }
             }
         }catch(err) {
             console.log(err, "err");
         }
         isGetPastLogCronRunning = false;
     }
});

let isGetPastEventsCronRunning  = false;
const getRecentBlockCron = cron.schedule('0 */1 * * * *', async () =>  {
    if(isGetPastEventsCronRunning) {
        return;
    }
    isGetPastEventsCronRunning = true;
    let netIsListening = await web3http.eth.net.isListening();
    if(netIsListening) {
        try{
            const blockNo = await getRecentBlockorder();
            // console.log(blockNo, "blockno");
            if(blockNo) {
                const allOrders = await dexContract.getPastEvents("Order", {
                    fromBlock : blockNo,
                    toBlock: "latest"
                })
                console.log(allOrders, "allOrders");
                store.dispatch('addCronToast', {message: 'Open Orders Table Update', type: 'Success'});

                for(const order of allOrders) {
                    const orderHash = order.returnValues["orderHash"]
                    const tokenBuy = order.returnValues["tokenBuy"]
                    const amountBuy = order.returnValues["amountBuy"]
                    const tokenSell = order.returnValues["tokenSell"]
                    const amountSell = order.returnValues["amountSell"]
                    const maker = order.returnValues["maker"]
                    const tokenId = order.returnValues["tokenId"]
                    let price = order.returnValues["price"]
                    const blockNumber = order.blockNumber
                    const transactionHash = order.transactionHash

                    const tokenBuyContract = new web3http.eth.Contract(wexpABI, tokenBuy);
                    const tokenSellContract = new web3http.eth.Contract(wexpABI, tokenSell);
                    const decimalBuy =await tokenBuyContract.methods.decimals().call();
                    const decimalSell =await tokenSellContract.methods.decimals().call();
                    const status = marketENUM.OPEN // OPEN

                    //select  *  from marketpair where (alpha = tokenBuy and beta = tokenSell) or (alpha = tokenSell and beta = tokenBuy)
                    //Only process first row

                    const orderdata = await getmarketpairorder(tokenBuy, tokenSell, price, decimalBuy, decimalSell);
                    // console.log(orderdata, "orderdata");
                    if(orderdata.marketType && orderdata.marketType !== -1) {
                        try {
                            var stmt = sqldb.prepare("INSERT or IGNORE INTO Orders VALUES ('"+today+"','"+orderHash+"','"+tokenBuy+"',"+amountBuy+", '"+tokenSell+"', "+amountSell+", '"+maker+"', "+tokenId+", "+orderdata.price+", "+blockNo+", "+decimalBuy+", "+decimalSell+", '"+status+"', '"+orderdata.marketType+"', '"+orderdata.betaSymbol+"', '"+orderdata.alphaSymbol+"', "+orderdata.orderFilled+", 0, 0)");
                            stmt.run();
                            stmt.finalize();
                            store.dispatch('addCronToast', {message: 'Open Orders Table Update', type: 'Success'});
                        } catch(err) {
                            console.log(err)
                        }
                    }
                }
            }
        }catch(err) {
            console.log(err, "err");
        }
        isGetPastEventsCronRunning = false;
    }
});

const getRecentBlock = async () =>  {
    return new Promise(async function (resolve, reject) {
        let data = 1;
         await sqldb.get("select * from marketPair order by blockNo desc limit 1", function(err, row) {
            if(err) {
                reject(err);
            }
            if(!row) {
                resolve(data);
            }
            if(row) {
                data = parseInt(row["blockNo"]) + 1;
                // console.log(row, data,"data");
                resolve(data);
            }
        });
    })

}

const getRecentBlockorder = async () =>  {
    return new Promise(async function (resolve, reject) {
        let data = 1;
         await sqldb.get("select * from Orders order by blockNo desc limit 1", function(err, row) {
             // console.log(row, err, "blockno");
            if(err) {
                reject(err);
            }
            if(!row) {
                resolve(data);
            }
            if(row) {
                data = parseInt(row["blockNo"]) + 1;
                // console.log(row, data,"data");
                resolve(data);
            }
        });
    })

}

const getmarketpairorder = async (tokenBuy, tokenSell, price, decimalSell, decimalBuy) =>  {
    return new Promise(async function (resolve, reject) {
        let marketType = -1;
        var alphaAddress = '';
        var betaAddress = '';
        await sqldb.get("select * from marketPair where (alphaAddress = '"+tokenBuy+"' and betaAddress = '"+tokenSell+"') or (alphaAddress = '"+tokenSell+"' and betaAddress = '"+tokenBuy+"') order by blockNo desc limit 1", function(err, row) {
             if(row) {
                 if(row.alphaAddress == tokenBuy) {
                     price = (tokenSell/Math.pow(10, decimalSell)) / (tokenBuy/Math.pow(10, decimalBuy));
                     marketType = marketENUM.SELL // SELL

                 }else {
                     price = (tokenBuy/Math.pow(10, decimalBuy)) / (tokenSell/Math.pow(10, decimalSell));
                     marketType = marketENUM.BUY // BUY
                 }
                 let data = {
                     price: price,
                     marketType: marketType,
                     orderFilled : 0,
                     alphaSymbol : row.alphaSymbol,
                     betaSymbol : row.betaSymbol
                 }
                 resolve(data);
             } else {
                 let data = {
                     price: price,
                     marketType: marketType,
                     orderFilled : 0,
                     alphaSymbol : row.alphaSymbol,
                     betaSymbol : row.betaSymbol
                 }
                 resolve(data);
             }
        });
    })

}

marketPairFetchCron.start();
getRecentBlockCron.start();


export { sqldb }
