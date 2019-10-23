import os from "os";
const Web3 = require("web3");
import { ipcRenderer, ipcMain, BrowserWindow } from 'electron'
const cron = require('node-cron');
import {
    expexABI,
    wexpABI,
    marketENUM,
    prod_app_directory, web3, startConnectWeb
} from '../main/libs/config';
import shell from "shelljs";
let mainWindow;

const expexAddress = '0xD3627766D0584Ed23f8D1acd2E493F8c281C9EF9';
let startAction = false;

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

var sqlite3 = require('sqlite3').verbose();
var sqldb = new sqlite3.Database( './expexmarket.sqlite3db', (err, result) => {
    console.log(err, result, "connect DB");
});

sqldb.serialize(function() {
    // sqldb.run("DROP TABLE Trade");
    sqldb.run("CREATE TABLE if not exists Orders (createdAt TEXT not null,orderHash VARCHAR(255) collate nocase not null UNIQUE, tokenBuy TEXT collate nocase not null, amountBuy REAL not null, tokenSell TEXT collate nocase not null, amountSell REAL not null, maker TEXT collate nocase not null, tokenId INTEGER not null, price REAL not NULL, blockNo INTEGER not null, decimalBuy INTEGER not null, " +
        "decimalSell INTEGER not null, status TEXT not null, marketType TEXT collate nocase not null, betaSymbol TEXT not null, alphaSymbol TEXT NOT NULL, orderFilled REAL NOT NULL, amountBuyFilled REAL NOT NULL, amountSellFilled REAL NOT NULL)");
    sqldb.run("CREATE TABLE if not exists marketPair (perChange REAL not null, maxPrice REAL not null,minPrice REAL not null,Price REAL not null, volume REAL not NULL, blockNo INTEGER not null , txHash VARCHAR(255) not null,createdAt TEXT not null, alphaSymbol TEXT not null, alphaAddress VARCHAR(255) collate nocase not null, alphaDecimal INTEGER not null,  betaSymbol TEXT not null, betaAddress VARCHAR(255) collate nocase not null, betaDecimal INTEGER not null, PRIMARY KEY (alphaAddress, betaAddress))");
    sqldb.run("CREATE TABLE if not exists Trade (blockNo INTEGER not null ,createdAt TEXT not null,orderHash VARCHAR(255) collate nocase not null, marketType TEXT collate nocase not null, betaSymbol TEXT not null, alphaSymbol TEXT NOT NULL,  matchinOrderHash VARCHAR(255) collate nocase not null, tokenBuy TEXT collate nocase not null , tokenSell TEXT collate nocase not null , amountBuy REAL not null , amountSell REAL not null , taker TEXT collate nocase not null , maker TEXT collate nocase not null , tokenId INTEGER not null , price REAL not null, PRIMARY KEY (orderHash, matchinOrderHash) )");

});

let web3http = new Web3("http://127.0.0.1:9656") ;

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

                         const bnumber = await web3http.eth.getBlock(blockNumber);
                         const timeStamp = bnumber.timestamp;
                         // insert into market pair value( ? , ? ,? ,? , ? , ? ,? )
                         try {
                             var stmt = sqldb.prepare("INSERT or IGNORE INTO marketPair VALUES (0, 0 ,0 ,0 ,0 ,'"+blockNumber+"','"+txHash+"','"+timeStamp+"', '"+alphaSymbol+"', '"+alpha+"', '"+alphaDecimals+"', '"+betaSymbol+"', '"+beta+"', '"+betaDecimals+"')");
                             stmt.run();
                             stmt.finalize();
                             if((allMarketPairs.length -1) === i) {
                                 mainWindow && mainWindow.forEach(win => {
                                     win.webContents.send('newMarketPair', true);
                                 });
                             }
                         } catch(err) {
                             console.log(err)
                         }
                     }else{
                         // TODO query for disabling list
                         // delete from marketpair where alphaaddress = alpha and betaaddress = beta
                         try {
                             var stmt = sqldb.prepare("DELETE FROM marketPair WHERE alphaAddress = '"+alpha+"' AND betaAddress = '"+beta+"' ");
                             stmt.run();
                             stmt.finalize();
                             if((allMarketPairs.length -1) === i) {
                                 mainWindow && mainWindow.forEach(win => {
                                     win.webContents.send('deleteMarketPair', true);
                                 });
                             }
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
     } else {
         web3http = new Web3("http://127.0.0.1:9656")
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
                            // console.log(allEvents)
                            for(const [index, tradeEvent] of allEvents.entries() ) {
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

                                const bnumber = await web3http.eth.getBlock(blockNumber);
                                const timeStamp = bnumber.timestamp;

                                try {
                                    await updatemarketTabel(tokenBuy, tokenSell);
                                } catch(err) {
                                    console.log(err, "Trade Insert Error")
                                }
                                if(orderdata.marketType && orderdata.marketType !== -1) {
                                    try {
                                        var stmt = sqldb.prepare("INSERT or IGNORE INTO Trade VALUES ('"+blockNumber+"','"+timeStamp+"','"+orderHash+"','"+orderdata.marketType+"','"+orderdata.betaSymbol+"', '"+orderdata.alphaSymbol+"','"+matchingOrderHash+"','"+tokenBuy+"','"+tokenSell+"' ,"+amountBuy+", "+amountSell+", '"+taker+"', '"+maker+"', "+tokenId+", "+orderdata.price+")");
                                        stmt.run();
                                        stmt.finalize();
                                        if((allEvents.length - 1) === index ) {
                                            mainWindow && mainWindow.forEach(win => {
                                                win.webContents.send('newTrade', true);
                                            });

                                        }
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
                for(const [index, order] of allOrders.entries()) {
                    const orderHash = order.returnValues["orderHash"]
                    const tokenBuy = order.returnValues["tokenBuy"]
                    const amountBuy = order.returnValues["amountBuy"]
                    const tokenSell = order.returnValues["tokenSell"]
                    const amountSell = order.returnValues["amountSell"]
                    const maker = order.returnValues["maker"]
                    const tokenId = order.returnValues["tokenId"]
                    let price = order.returnValues["price"]
                    const orderblockNumber = order.blockNumber
                    const transactionHash = order.transactionHash

                    const tokenBuyContract = new web3http.eth.Contract(wexpABI, tokenBuy);
                    const tokenSellContract = new web3http.eth.Contract(wexpABI, tokenSell);
                    const decimalBuy =await tokenBuyContract.methods.decimals().call();
                    const decimalSell =await tokenSellContract.methods.decimals().call();
                    const status = marketENUM.OPEN // OPEN

                    const bnumber = await web3http.eth.getBlock(orderblockNumber);
                    const timeStamp = bnumber.timestamp;
                    //select  *  from marketpair where (alpha = tokenBuy and beta = tokenSell) or (alpha = tokenSell and beta = tokenBuy)
                    //Only process first row

                    const orderdata = await getmarketpairorder(tokenBuy, tokenSell, amountSell, amountBuy, price, decimalBuy, decimalSell);

                    if(orderdata.marketType && orderdata.marketType !== -1) {
                        try {
                            mainWindow && mainWindow.forEach(win => {
                                win.webContents.send('notificationOrder', {maker, alphaSymbol: orderdata.alphaSymbol, betaSymbol: orderdata.betaSymbol, amountSell, amountBuy, price: orderdata.price});
                            });
                            var stmt = sqldb.prepare("INSERT or IGNORE INTO Orders VALUES ('"+timeStamp+"','"+orderHash+"','"+tokenBuy+"',"+amountBuy+", '"+tokenSell+"', "+amountSell+", '"+maker+"', "+tokenId+", "+orderdata.price+", "+orderblockNumber+", "+decimalBuy+", "+decimalSell+", '"+status+"', '"+orderdata.marketType+"', '"+orderdata.betaSymbol+"', '"+orderdata.alphaSymbol+"', "+orderdata.orderFilled+", 0, 0)");
                            stmt.run();
                            stmt.finalize();
                            if((allOrders.length - 1) === index ) {
                                mainWindow && mainWindow.forEach(win => {
                                    win.webContents.send('newOrder', {maker, alphaSymbol: orderdata.alphaSymbol, betaSymbol: orderdata.betaSymbol, amountSell, amountBuy, price: orderdata.price});
                                });

                            }
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
    } else {
        web3http = new Web3("http://127.0.0.1:9656")
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



const updatemarketmaxmin = async (tokenBuy, tokenSell) => {
    return new Promise(async function (resolve, reject) {
        let ts = Math.round(new Date().getTime() / 1000);
        let tsYesterday = ts - (24 * 3600);
        await sqldb.get("SELECT MAX(price) as maxPrice,MIN(Price) as minPrice FROM Trade WHERE createdAt >= '"+tsYesterday+"' and ((tokenBuy = '"+tokenBuy+"' and tokenSell = '"+tokenSell+"') or (tokenBuy = '"+tokenSell+"' and tokenSell = '"+tokenBuy+"')) order by createdAt desc ", (err, row) => {
            if(err) {
                reject(err);
            }
            if(row && row.maxPrice) {
                mainWindow && mainWindow.forEach(win => {
                    win.webContents.send('updatemarketPair', {tokenSell,tokenBuy});
                });
                var stmt = sqldb.prepare("UPDATE marketPair SET maxPrice = "+row.maxPrice+", minPrice = "+row.minPrice+" where ((alphaAddress = '"+tokenBuy+"' and betaAddress = '"+tokenSell+"') or (alphaAddress = '"+tokenSell+"' and betaAddress = '"+tokenBuy+"'))" );
                stmt.run();
                stmt.finalize();
                resolve(row);
            } else {
                mainWindow && mainWindow.forEach(win => {
                    win.webContents.send('updatemarketPair', {tokenSell,tokenBuy});
                });
                var stmt = sqldb.prepare("UPDATE marketPair SET maxPrice = "+0+", minPrice = "+0+" where ((alphaAddress = '"+tokenBuy+"' and betaAddress = '"+tokenSell+"') or (alphaAddress = '"+tokenSell+"' and betaAddress = '"+tokenBuy+"'))" );
                stmt.run();
                stmt.finalize();
                resolve(-1);
            }
        });
    });
}

const updatemarketvol = async (tokenBuy, tokenSell, marketTableArray) => {
    return new Promise(async function (resolve, reject) {
        let ts = Math.round(new Date().getTime() / 1000);
        let tsYesterday = ts - (24 * 3600);
        await sqldb.get("SELECT * FROM Trade WHERE createdAt >= '"+tsYesterday+"' and ((tokenBuy = '"+tokenBuy+"' and tokenSell = '"+tokenSell+"') or (tokenBuy = '"+tokenSell+"' and tokenSell = '"+tokenBuy+"'))", (err, row) => {
            if(err) {
                reject(err);
            }
            if(row && row.price) {
                marketTableArray.push(row);
                resolve(marketTableArray);
            } else {
                resolve(marketTableArray);
            }
        });
    });
}


const updatemarketTabel = async (tokenBuy, tokenSell) => {
    return new Promise(async function (resolve, reject) {
        let marketTableArray = [];
        let volume = 0;
        await updatemarketmaxmin(tokenBuy, tokenSell);
        await updatemarketvol(tokenBuy, tokenSell, marketTableArray);
        if(marketTableArray.length === 1 )
        {
            if(marketTableArray[0].marketType === 'BUY') {
                volume = marketTableArray[0].amountBuy ;
            } else {
                volume = marketTableArray[0].amountSell ;
            }
            mainWindow && mainWindow.forEach(win => {
                win.webContents.send('updatemarketPair', {tokenSell,tokenBuy});
            });
            var stmt = sqldb.prepare("UPDATE marketPair SET price = "+marketTableArray[0].price +", volume = "+volume+",perChange = 100  where ((alphaAddress = '"+tokenBuy+"' and betaAddress = '"+tokenSell+"') or (alphaAddress = '"+tokenSell+"' and betaAddress = '"+tokenBuy+"'))" );
            stmt.run();
            stmt.finalize();
            // console.log(marketTableArray, "marketTableArray 1" , volume)
        } else if(marketTableArray.length > 1 ) {
            let changePercentage = ((marketTableArray[marketTableArray.length - 1] - marketTableArray[0]) / marketTableArray[0]) * 100

            if(marketTableArray[0].marketType === 'BUY') {
                volume += marketTableArray[0].amountBuy ;
            } else {
                volume += marketTableArray[0].amountSell ;
            }
            // console.log(marketTableArray, "marketTableArray > 1" , volume);

            mainWindow && mainWindow.forEach(win => {
                win.webContents.send('updatemarketPair', {tokenSell,tokenBuy});
            });
            var stmt = sqldb.prepare("UPDATE marketPair SET price = "+marketTableArray[marketTableArray.length].price +",perChange = "+changePercentage+" , volume = "+volume+"  where ((alphaAddress = '"+tokenBuy+"' and betaAddress = '"+tokenSell+"') or (alphaAddress = '"+tokenSell+"' and betaAddress = '"+tokenBuy+"'))" );
            stmt.run();
            stmt.finalize();
        } else {

            mainWindow && mainWindow.forEach(win => {
                win.webContents.send('updatemarketPair', {tokenSell,tokenBuy});
            });
            var stmt = sqldb.prepare("UPDATE marketPair SET price = "+0+",perChange = "+0+" , volume = "+0+"  where ((alphaAddress = '"+tokenBuy+"' and betaAddress = '"+tokenSell+"') or (alphaAddress = '"+tokenSell+"' and betaAddress = '"+tokenBuy+"'))" );
            stmt.run();
            stmt.finalize();
        }
        resolve(marketTableArray);
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
                     price: parseFloat(price).toFixed(4),
                     marketType: marketType,
                     orderFilled : 0,
                     alphaSymbol : row.alphaSymbol,
                     betaSymbol : row.betaSymbol
                 }
                 resolve(data);
             } else {
                 let data = {
                     price: parseFloat(price).toFixed(4),
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

                     mainWindow && mainWindow.forEach(win => {
                         win.webContents.send('updateOrder', true);
                     });
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

setTimeout (() => {
    try{
        mainWindow = BrowserWindow.getAllWindows();
        console.log(mainWindow)
    } catch (e) {
    }
    web3http = new Web3("http://127.0.0.1:9656");
    if(web3http) {
        startAction = true;
    }
    let interval = setInterval(function() {
        if (web3http === undefined) {
            web3http = new Web3("http://127.0.0.1:9656");
            startAction = false;
        } else {
            startAction = true;
            clearInterval(interval);
        }
    },500);
}, 10000);

if(startAction) {
    ipcRenderer.on('connectwebhttp', (event, res) => {
        if(res){
            console.log("HTTP socket open")
            marketPairFetchCron.start();
            getRecentBlockCron.start();
        }
    });
}


export { sqldb }
