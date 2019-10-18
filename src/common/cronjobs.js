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
console.log( "eventEmitter", ipcRenderer);

// ipcRenderer.send('open-second-window', 'an-argument')


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

// console.log(store);


var sqlite3 = require('sqlite3').verbose();
var sqldb = new sqlite3.Database( './expexmarket.sqlite3db', (err, result) => {
    console.log(err, result, "connect DB");
});

sqldb.serialize(function() {
    // sqldb.run("DROP TABLE Trade");
    sqldb.run("CREATE TABLE if not exists Orders (createdAt TEXT not null,orderHash VARCHAR(255) not null UNIQUE, tokenBuy TEXT not null, amountBuy REAL not null, tokenSell TEXT not null, amountSell REAL not null, maker TEXT not null, tokenId INTEGER not null, price REAL not NULL, blockNo INTEGER not null, decimalBuy INTEGER not null, " +
        "decimalSell INTEGER not null, status TEXT not null, marketType TEXT not null, betaSymbol TEXT not null, alphaSymbol TEXT NOT NULL, orderFilled REAL NOT NULL, amountBuyFilled REAL NOT NULL, amountSellFilled REAL NOT NULL)");
    sqldb.run("CREATE TABLE if not exists marketPair (Price REAL not null, volume REAL not NULL, blockNo INTEGER not null , txHash VARCHAR(255) not null,createdAt TEXT not null, alphaSymbol TEXT not null, alphaAddress VARCHAR(255) not null, alphaDecimal INTEGER not null,  betaSymbol TEXT not null, betaAddress VARCHAR(255) not null, betaDecimal INTEGER not null, PRIMARY KEY (alphaAddress, betaAddress))");
    sqldb.run("CREATE TABLE if not exists Trade (blockNo INTEGER not null ,createdAt TEXT not null,orderHash VARCHAR(255) not null, marketType TEXT not null, betaSymbol TEXT not null, alphaSymbol TEXT NOT NULL,  matchinOrderHash VARCHAR(255) not null, tokenBuy TEXT not null , tokenSell TEXT not null , amountBuy REAL not null , amountSell REAL not null , taker TEXT not null , maker TEXT not null , tokenId INTEGER not null , price REAL not null, PRIMARY KEY (orderHash, matchinOrderHash) )");

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
                             var stmt = sqldb.prepare("INSERT or IGNORE INTO marketPair VALUES (0 ,0 ,'"+blockNumber+"','"+txHash+"','"+today+"', '"+alphaSymbol+"', '"+alpha+"', '"+alphaDecimals+"', '"+betaSymbol+"', '"+beta+"', '"+betaDecimals+"')");
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
                // console.log(allOrders, "allOrders");
                store.dispatch('addCronToast', {message: 'Open Orders Table Update', type: 'Success'});

                if(allOrders)
                {
                    try
                    {
                        const blockNoT = await getRecentBlocktrade();
                        if(blockNoT) {
                            const allEvents = await dexContract.getPastEvents("Trade", {
                                fromBlock : blockNoT,
                                toBlock: "latest"
                            })
                            console.log(allEvents)
                            for(const tradeEvent of allEvents ) {
                                const orderHash = tradeEvent.returnValues.orderHash
                                const matchingOrderHash = tradeEvent.returnValues.matchinOrderHash
                                const tokenBuy = tradeEvent.returnValues.tokenBuy
                                const tokenSell = tradeEvent.returnValues.tokenSell
                                const maker = tradeEvent.returnValues.maker
                                const taker = tradeEvent.returnValues.taker
                                const tokenId = tradeEvent.returnValues.tokenId;
                                const blockNumber = tradeEvent.blockNumber;

                                const tokenBuyContract = new web3http.eth.Contract(wexpABI, tokenBuy);
                                const tokenSellContract = new web3http.eth.Contract(wexpABI, tokenSell);
                                const decimalBuy =await tokenBuyContract.methods.decimals().call();
                                const decimalSell =await tokenSellContract.methods.decimals().call();
                                const amountBuy = tradeEvent.returnValues.amountBuy/Math.pow(10, decimalBuy);
                                const amountSell = tradeEvent.returnValues.amountSell/Math.pow(10, decimalSell);
                                let price  = tradeEvent.returnValues.price;
                                const orderdata = await getmarketpairorder(tokenBuy, tokenSell, amountSell, amountBuy, price, decimalBuy, decimalSell);
                                try {
                                    await updatemarketTabel(tokenBuy, tokenSell);
                                } catch(err) {
                                    console.log(err, "Trade Insert Error")
                                }

                                if(orderdata.marketType && orderdata.marketType !== -1) {
                                    try {
                                        var stmt = sqldb.prepare("INSERT or IGNORE INTO Trade VALUES ('"+blockNumber+"','"+today+"','"+orderHash+"','"+orderdata.marketType+"','"+orderdata.betaSymbol+"', '"+orderdata.alphaSymbol+"','"+matchingOrderHash+"','"+tokenBuy+"','"+tokenSell+"' ,"+amountBuy+", "+amountSell+", '"+taker+"', '"+maker+"', "+tokenId+", "+orderdata.price+")");
                                        stmt.run();
                                        stmt.finalize();
                                    } catch(err) {
                                        console.log(err, "Trade Insert Error")
                                    }
                                }
                                await getorderbyOrderHash(orderHash, amountBuy, amountSell);
                            }
                        }
                    } catch(err) {
                        console.log(err)
                    }
                }
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

                    const orderdata = await getmarketpairorder(tokenBuy, tokenSell, amountSell, amountBuy, price, decimalBuy, decimalSell);
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

const updatemarketTabel = async (tokenBuy, tokenSell) => {
    return new Promise(async function (resolve, reject) {
        let data = -1;
        await sqldb.get("SELECT MAX(price) as maxPrice, MIN(price) as minPrice, *  FROM Trade WHERE createdAt >= date('now', '-1 days') AND createdAt < date('now') and where ((tokenBuy = '"+tokenBuy+"' and tokenSell = '"+tokenSell+"') or (tokenBuy = '"+tokenSell+"' and tokenSell = '"+tokenBuy+"')) order by createdAt desc ", (err, row) => {
            if(err) {
                reject(err);
            }
            if(!row) {
                resolve(data);
            }
            if(row && row.price) {
                let volume = 0 ;
                if(row.marketType === 'BUY') {
                    volume = row.amountBuy * row.price ;
                } else {
                    volume = row.amountSell * row.price ;
                }
                var stmt = sqldb.prepare("UPDATE marketPair SET price = "+row.price +",volume = "+volume+", maxPrice = "+row.maxPrice+", minPrice = "+row.minPrice+" where ((alphaAddress = '"+tokenBuy+"' and betaAddress = '"+tokenSell+"') or (alphaAddress = '"+tokenSell+"' and betaAddress = '"+tokenBuy+"'))" );
                stmt.run();
                stmt.finalize();
                // console.log(row, data,"data");
                resolve(row);
            } else {
                resolve(data);
            }
        });
    });
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

const getRecentBlocktrade = async () =>  {
    return new Promise(async function (resolve, reject) {
        let data = 1;
         await sqldb.get("select * from Trade order by blockNo desc limit 1", function(err, row) {
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

const getmarketpairorder = async (tokenBuy, tokenSell, amountSell, amountBuy, price, decimalSell, decimalBuy) =>  {
    return new Promise(async function (resolve, reject) {
        let marketType = -1;
        await sqldb.get("select * from marketPair where (alphaAddress = '"+tokenBuy+"' and betaAddress = '"+tokenSell+"') or (alphaAddress = '"+tokenSell+"' and betaAddress = '"+tokenBuy+"') order by blockNo desc limit 1", function(err, row) {
             if(row) {
                 if(row.alphaAddress == tokenBuy) {
                     price = (amountBuy/Math.pow(10, decimalSell)) / (amountSell/Math.pow(10, decimalBuy));
                     marketType = marketENUM.SELL // SELL

                 }else {
                     price = (amountSell/Math.pow(10, decimalBuy)) / (amountBuy/Math.pow(10, decimalSell));
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
                     alphaSymbol : '',
                     betaSymbol : ''
                 }
                 resolve(data);
             }
        });
    })

}

const getorderbyOrderHash = async (orderHash, amountBuy, amountSell) =>  {
    return new Promise(async function (resolve, reject) {
        let data = {};
        await sqldb.get("select * from Orders where orderHash = '"+orderHash+"'", function(err, row) {
             if(row) {
                 try {
                     row.amountBuyFilled  =+ amountBuy
                     row.amountSellFilled  =+ amountSell

                     let orderbuyFilledPercentage = (row.amountBuyFilled/(row.amountBuy/Math.pow(10, row.decimalBuy)))  * 100;
                     let status = marketENUM.OPEN;
                     if(row.amountBuyFilled === (row.amountBuy/Math.pow(10, row.decimalBuy))) {
                         status = marketENUM.COMPLETE
                     }
                     else if(row.amountBuyFilled > (row.amountBuy/Math.pow(10, row.decimalBuy))) {
                         status = marketENUM.ERROR
                     }
                     //order.amountFilledBuy += ${amountBuy}
                     // and same
                     // order.amountFilledSell += ${amountSell}
                     // Now we need to calculate percentage if order is Buy  then (order.amountFilledBuy)/order.amountBuy  * 100

                     // and then check if order.amountFilledBuy == order.amountBuy then status = COMPLETE, otherwise OPEN
                     // console.log("UPDATE Orders SET status = '"+status+"',amountBuyFilled = "+row.amountBuyFilled +",amountSellFilled = "+row.amountSellFilled+",orderFilled = "+orderbuyFilledPercentage+" WHERE orderHash = '"+orderHash+"'")
                     var stmt = sqldb.prepare("UPDATE Orders SET status = '"+status+"',amountBuyFilled = "+(row.amountBuyFilled + amountBuy)+",amountSellFilled = "+(row.amountSellFilled + amountSell)+",orderFilled = "+orderbuyFilledPercentage+" WHERE orderHash = '"+orderHash+"'");
                     stmt.run();
                     stmt.finalize();
                 } catch(err) {
                     console.log(err)
                 }
                 resolve(data);
             } else {
                 resolve(data);
             }
        });
    })

}

marketPairFetchCron.start();
getRecentBlockCron.start();


export { sqldb }
