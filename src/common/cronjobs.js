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

const expexAddress = '0x48d5936bC69b6e7b61842c84F7473BAD5e197250';
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
                 console.log(blockNo, allMarketPairs, "pastlogs");
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
                             let insertData = [0, 0 ,0 ,0 ,0 ,blockNumber,txHash,timeStamp,alphaSymbol,alpha,alphaDecimals,betaSymbol,beta,betaDecimals];
                             let sql = "INSERT or IGNORE INTO marketPair(perChange, maxPrice, minPrice, Price, volume, blockNo, txHash ,createdAt , alphaSymbol , alphaAddress, alphaDecimal ,  betaSymbol , betaAddress, betaDecimal) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                             sqldb.run(sql, insertData, function(err) {
                                 if (err) {
                                     return console.error(err.message);
                                 }
                                 console.log(`Rows inserted `);
                             });
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
                             let new_data = [alpha, beta];
                             let sql = "DELETE FROM marketPair WHERE alphaAddress = ? AND betaAddress = ?";
                             sqldb.run(sql, new_data, function(err) {
                                 if (err) {
                                     return console.error(err.message);
                                 }
                                 console.log(`Rows inserted `);
                             });
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
const getRecentCancelOrders = cron.schedule('0 */1 * * * *', async () =>  {
    console.log("Cron RUnning")
    if(isGetPastLogCronRunning) {
        return;
    }
    isGetPastLogCronRunning = true;
    let netIsListening = await web3http.eth.net.isListening();
     if(netIsListening) {
         try{
             const blockNo = await getCancelOrderBlock();
             console.log(blockNo, "blockno")
             if(blockNo) {
                 const allCancelOrders = await dexContract.getPastEvents("Cancel", {
                     fromBlock : blockNo,
                     toBlock: "latest"
                 })
                 console.log(allCancelOrders, "pastlogs");
                 for(let i =0 ;i< allCancelOrders.length; i++) {
                     const orderHash = allCancelOrders[i].returnValues.orderHash;
                     try {
                         let new_data = [marketENUM.CANCELED, orderHash];
                         let sql = "UPDATE Orders SET status = ? WHERE orderHash = ?";
                         sqldb.run(sql, new_data, function(err) {
                             if (err) {
                                 return console.error(err.message);
                             }
                             // console.log(`Rows inserted `);
                         });
                     } catch(err) {
                         console.log(err)
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

                            let new_data = [timeStamp,orderHash,tokenBuy ,amountBuy,tokenSell,amountSell ,maker,tokenId,orderdata.price ,orderblockNumber,decimalBuy,decimalSell ,status,orderdata.marketType,orderdata.betaSymbol ,orderdata.alphaSymbol,orderdata.orderFilled, 0, 0];
                            let sql = "INSERT or IGNORE INTO Orders(createdAt,orderHash,tokenBuy , amountBuy,tokenSell,amountSell , maker,tokenId,price ,blockNo,decimalBuy,decimalSell ,status,marketType,betaSymbol , alphaSymbol,orderFilled,amountBuyFilled , amountSellFilled) VALUES (?,?,?,?,? ,?,?,?,?,? ,?,?,?,?,? ,?,?,?,?)";
                            sqldb.run(sql, new_data, function(err) {
                                if (err) {
                                    return console.error(err.message);
                                }
                                console.log(`Rows inserted orders`);
                            });
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
                            let amountBuy = tradeEvent.returnValues.amountBuy;
                            let amountSell = tradeEvent.returnValues.amountSell;
                            let price  = tradeEvent.returnValues.price;
                            const orderdata = await getmarketpairorder(tokenBuy, tokenSell, amountSell, amountBuy, price, decimalBuy, decimalSell);

                            amountBuy = web3http.utils.fromWei(tradeEvent.returnValues.amountBuy);
                            amountSell = web3http.utils.fromWei(tradeEvent.returnValues.amountSell);
                            const bnumber = await web3http.eth.getBlock(blockNumber);
                            const timeStamp = bnumber.timestamp;

                            try {
                                await updatemarketTabel(tokenBuy, tokenSell);
                            } catch(err) {
                                console.log(err, "Trade Insert Error")
                            }
                            if(orderdata.marketType && orderdata.marketType !== -1) {
                                try {
                                    let new_data = [blockNumber,timeStamp,orderHash, orderdata.marketType,orderdata.betaSymbol,orderdata.alphaSymbol ,matchingOrderHash,tokenBuy,tokenSell ,amountBuy,amountSell,taker ,maker,tokenId,orderdata.price];
                                    let sql = "INSERT or IGNORE INTO Trade (blockNo,createdAt,orderHash ,marketType,betaSymbol,alphaSymbol ,  matchinOrderHash,tokenBuy,tokenSell, amountBuy,amountSell,taker, maker,tokenId,price) VALUES (?,?,?,?,? ,?,?,?,?,? ,?,?,?,?,?)";
                                    sqldb.run(sql, new_data, function(err) {
                                        if (err) {
                                            return console.error(err.message);
                                        }
                                        console.log(`Rows inserted trade `);
                                    });
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

};

const getCancelOrderBlock = async () =>  {
    return new Promise(async function (resolve, reject) {
        let data = 1;
        let paramData = [marketENUM.CANCELED];
         await sqldb.get("select * from Orders where status = ? order by blockNo desc limit 1",paramData, function(err, row) {
            if(err) {
                reject(err);
            }
            if(!row) {
                resolve(data);
            }
            if(row) {
                data = parseInt(row["blockNo"]) + 1;
                console.log(row, data,"data");
                resolve(data);
            }
        });
    })
}



const updatemarketmaxmin = async (tokenBuy, tokenSell) => {
    return new Promise(async function (resolve, reject) {
        let ts = Math.round(new Date().getTime() / 1000);
        let tsYesterday = ts - (24 * 3600);
        let paramData = [tsYesterday,tokenBuy,tokenSell,tokenSell,tokenBuy];
        await sqldb.get("SELECT MAX(price) as maxPrice,MIN(Price) as minPrice FROM Trade WHERE createdAt >= ? and ((tokenBuy = ? and tokenSell = ?) or (tokenBuy = ? and tokenSell = ?)) order by createdAt desc ",paramData, (err, row) => {
            if(err) {
                reject(err);
            }
            if(row && row.maxPrice) {
                mainWindow && mainWindow.forEach(win => {
                    win.webContents.send('updatemarketPair', {tokenSell,tokenBuy});
                });
                let paramData = [row.maxPrice,row.minPrice,tokenBuy,tokenSell,tokenSell,tokenBuy];
                sqldb.run("UPDATE marketPair SET maxPrice = ?, minPrice = ? where ((alphaAddress = ? and betaAddress = ?) or (alphaAddress = ? and betaAddress = ?))", paramData, function(err) {
                    if (err) {
                        return console.error(err.message);
                    }
                    // console.log(`Rows inserted `);
                });
                resolve(row);
            } else {
                mainWindow && mainWindow.forEach(win => {
                    win.webContents.send('updatemarketPair', {tokenSell,tokenBuy});
                });
                let paramData = [0,0,tokenBuy,tokenSell,tokenSell,tokenBuy];
                sqldb.run("UPDATE marketPair SET maxPrice = ?, minPrice = ? where ((alphaAddress = ? and betaAddress = ?) or (alphaAddress = ? and betaAddress = ?))", paramData, function(err) {
                    if (err) {
                        return console.error(err.message);
                    }
                    // console.log(`Rows inserted `);
                });
                resolve(-1);
            }
        });
    });
}

const updatemarketvol = async (tokenBuy, tokenSell, marketTableArray) => {
    return new Promise(async function (resolve, reject) {
        let ts = Math.round(new Date().getTime() / 1000);
        let tsYesterday = ts - (24 * 3600);
        let paramData = [tsYesterday,tokenBuy,tokenSell,tokenSell,tokenBuy];
        await sqldb.get("SELECT * FROM Trade WHERE createdAt >= ? and ((tokenBuy = ? and tokenSell = ?) or (tokenBuy = ? and tokenSell = ?))",paramData, (err, row) => {
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
            let paramData = [marketTableArray[0].price, volume,100,tokenBuy,tokenSell,tokenSell,tokenBuy];
            sqldb.run("UPDATE marketPair SET price = ?, volume = ?,perChange = ?  where ((alphaAddress = ? and betaAddress = ?) or (alphaAddress = ? and betaAddress = ?))", paramData, function(err) {
                if (err) {
                    return console.error(err.message);
                }
                // console.log(`Rows inserted `);
            });
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
            let paramData = [marketTableArray[marketTableArray.length].price,volume,changePercentage,tokenBuy,tokenSell,tokenSell,tokenBuy];
            sqldb.run("UPDATE marketPair SET price = ?, volume = ?,perChange = ?  where ((alphaAddress = ? and betaAddress = ?) or (alphaAddress = ? and betaAddress = ?))", paramData, function(err) {
                if (err) {
                    return console.error(err.message);
                }
                // console.log(`Rows inserted `);
            });
        } else {
            let paramData = [0,0,0,tokenBuy,tokenSell,tokenSell,tokenBuy];
            sqldb.run("UPDATE marketPair SET price = ?, volume = ?,perChange = ?  where ((alphaAddress = ? and betaAddress = ?) or (alphaAddress = ? and betaAddress = ?))", paramData, function(err) {
                if (err) {
                    return console.error(err.message);
                }
                // console.log(`Rows inserted `);
            });
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
        let paramData = [tokenBuy,tokenSell,tokenSell,tokenBuy];
        await sqldb.get("select * from marketPair where (alphaAddress = ? and betaAddress = ?) or (alphaAddress = ? and betaAddress = ?) order by blockNo desc limit 1",paramData, function(err, row) {
             if(row) {
                 console.log("row.alphaAddress == tokenBuy",(web3http.utils.toBN(amountBuy)/web3http.utils.toBN(amountSell)),amountBuy,amountSell,row.alphaAddress == tokenBuy,row.alphaAddress , tokenBuy)
                 if(row.alphaAddress == tokenBuy) {
                     price = ((web3http.utils.toBN(amountBuy)/web3http.utils.toBN(amountSell)).toString());
                     marketType = marketENUM.SELL // SELL

                 }else {
                     price = ((web3http.utils.toBN(amountSell)/web3http.utils.toBN(amountBuy)).toString());
                     // price = (amountSell/Math.pow(10, decimalSell)) / (amountBuy/Math.pow(10, decimalBuy));
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
        let paramData = [orderHash];
        console.log(`Rows inserted `,orderHash);
        await sqldb.get("select * from Orders where orderHash = ?",paramData, function(err, row) {
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

                     let paramData = [status,(row.amountBuyFilled + amountBuy),(row.amountSellFilled + amountSell),orderbuyFilledPercentage,orderHash];
                     sqldb.run("UPDATE Orders SET status = ?,amountBuyFilled = ?,amountSellFilled = ?,orderFilled = ? WHERE orderHash = ?", paramData, function(err) {
                         if (err) {
                             return console.error(err.message);
                         }
                         // console.log(`Rows inserted `);
                     });
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
            getRecentCancelOrders.start();
        }
    });
}


export { sqldb }
