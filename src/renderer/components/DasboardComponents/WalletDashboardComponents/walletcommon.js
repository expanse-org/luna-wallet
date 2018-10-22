

import {getRandomColor} from '../../AccountsData/commonFunc';
import {db, adapter, low} from '../../../../../lowdbFunc';
import {web3, currencies, ExpApi} from '../../../../main/libs/config';
import Raven from 'raven';
import * as $ from 'jquery';
import _ from 'underscore';
import store from '../../../store';
import object_hash from 'object-hash';
import numberToBN from 'number-to-bn';
import axios from 'axios';
import {tokens, tokens_list_hash, updated_tokens_list_hash} from "../TokensComponents/listTokenfunc";

var watchOnlyAccounts = [];
var archiveAccounts = [];
var unarchiveAccounts = [];
var addresshashAccounts = [];
var sortbyEXPBalance = [];
var sortbyTOKENBalance = [];
// var web3 = startConnectWeb();
let balance = 0;
let total_balance = 0;


const checkupdate = () => {
    web3.eth.getAccounts(function (error, accounts) {
        if (accounts && accounts.length > 0 && accounts >= unarchiveAccounts.length) {
            getAllAcounts();
        }
    })
}

const getAllAcounts = () => {
    archiveAccounts = [];
    unarchiveAccounts = [];
    addresshashAccounts = [];
    let db2 = low(adapter);
    try {
        web3.eth.getAccounts(function (error, accounts) {
            if (accounts && accounts.length > 0) {
                total_balance = 0;
                accounts.map((account_hash , index) => {
                    addresshashAccounts.push(account_hash.toLowerCase());
                    // console.log(db.getState());
                    let account = db2.get('accounts').find({
                        hash: account_hash.toLowerCase()
                    }).value();
                    if(account){
                        if(account && !account.accountTitle) {
                            console.log(account);
                            db2.get('accounts').chain().filter({hash: account_hash.toLowerCase()}).first()
                                .assign({accountTitle: "Account "+index }).write();
                        }
                        if(account.hash){
                            if(account.archive === false) {
                                if(account && !account.isHd) {
                                    account = Object.assign({isHd: false}, account);
                                }
                                unarchiveAccounts.push(account);
                            } else if(account.archive !== true && (account && !account.archive)) {
                                if(account&& !account.isHd) {
                                    account = Object.assign({isHd: false}, account);
                                }
                                account = Object.assign({archive: false}, account);
                                unarchiveAccounts.push(account);
                            }
                        }
                    }
                    else {
                        let accountTest = db2.get('accounts').find({
                            hash: account_hash
                        }).value();
                        if(!accountTest) {
                            console.log(account_hash ,"else Account in Db account_hash", account, accountTest);
                            let accountdata = accAdddb(account_hash, index);
                            unarchiveAccounts.push(accountdata);
                        }else {
                            if(accountTest && !accountTest.accountTitle) {
                                console.log(account);
                                db2.get('accounts').chain().filter({hash: account_hash.toLowerCase()}).first()
                                    .assign({accountTitle: "Account "+index }).write();
                            }
                            if(accountTest.hash){
                                if(accountTest.archive === false) {
                                    if(accountTest && !accountTest.isHd) {
                                        accountTest = Object.assign({isHd: false}, accountTest);
                                    }
                                    unarchiveAccounts.push(accountTest);
                                } else if(accountTest.archive !== true && (accountTest && !accountTest.archive)) {
                                    if(accountTest && !accountTest.isHd) {
                                        accountTest = Object.assign({isHd: false}, accountTest);
                                    }
                                    accountTest = Object.assign({archive: false}, accountTest);
                                    unarchiveAccounts.push(accountTest);
                                }
                            }
                        }
                    }
                    if(index === accounts.length -1) {
                        getallExpBalance();
                        getalltokenBalance();
                    }
                });
            }
        });
    } catch (e) {
        console.log("Exception Error:", e);
        Raven.captureException(e);
    }
};

const getArchiveaccounts = () => {
    store.dispatch('addUserAcc', []);
    archiveAccounts = [];
    let db2 = low(adapter);
    archiveAccounts = db2.get('accounts').filter({archive: true}).value()
    storeActionArchive();
};

const accAdddb = (account_hash , key) => {
    let color = getRandomColor();
    let accountdata = {
        accountTitle: "Account "+key ,
        hash : account_hash.toLowerCase(),
        color:color,
        archive: false,
        isHd: false
    };
    // console.log(account_hash ,"Add Account in Db account_hash", accountdata);
    let db2 = low(adapter);
    db2.get('accounts')
        .push(accountdata)
        .write();
    return accountdata;
};

const getallExpBalance = () => {
    unarchiveAccounts.map((account, index) => {
        web3.eth.getBalance(account.hash).then((bal) => {
            balance = web3.utils.fromWei(bal, "ether");
            if(balance> 0){
                total_balance += parseFloat(balance);
            }
            store.dispatch('addTotalBalance',total_balance);
            unarchiveAccounts[index] = Object.assign({balance: balance}, unarchiveAccounts[index]);
        }, (error) => {
            console.log(error, "getallExpBalance");
            Raven.captureException(error);
        });
    });
};

const getalltokenBalance = () => {
    unarchiveAccounts.map((account, index) => {
        get_tokens_balance_by_address(account.hash).then((res) => {
            if(res){
                unarchiveAccounts[index] = Object.assign({token_icons: res, tokens: true}, unarchiveAccounts[index]);
            } else {
                unarchiveAccounts[index] = Object.assign({tokens: false}, unarchiveAccounts[index]);
            }
        }, (error) => {
            console.log(error, "getalltokenBalance");
            Raven.captureException(error);
        });
        if(index === unarchiveAccounts.length-1){
            setTimeout(() =>{
                store.dispatch('addTotalBalance',total_balance);
                sortByEXPBalances();
            }, 1000);
        }
    });
};

const storeActionArchive = () => {
    store.dispatch('addUserAcc', archiveAccounts);
}

const storeAction = () => {
    let updated_account_list_hash, updated_watch_list_hash;
    let account_list_hash = object_hash(unarchiveAccounts);
    if (account_list_hash == updated_account_list_hash) {
        return false;
    } else {
        // First Clear Previous Listed Tokens
        updated_account_list_hash = account_list_hash;
        if(updated_account_list_hash){
            store.dispatch('addAllAccounts', sortbyEXPBalance);
        }
    }
    store.dispatch('addAddreshash', addresshashAccounts);
}

const sortByEXPBalances = () => {
    // console.log(unarchiveAccounts[0],  "unarchiveAccount getalltokenBalances");
    sortbyEXPBalance = unarchiveAccounts.sort(
         (a, b) => {
            return parseFloat(b.balance && b.balance) - parseFloat(a.balance && a.balance);
        }
    );
    storeAction();
    // console.log(sortbyEXPBalance ,"unarchiveAccounts sortbyEXPBalance");
};

const storeWatchAccounts = () => {
    let  updated_watch_list_hash;
    let watch_list_hash = object_hash(watchOnlyAccounts);
    if (watch_list_hash == updated_watch_list_hash) {
        return false;
    } else {
        // First Clear Previous Listed Tokens
        updated_watch_list_hash = watch_list_hash;
        if(updated_watch_list_hash){
            store.dispatch('addWatchAccounts', watchOnlyAccounts);
        }
    }
    // console.log(sortbyEXPBalance ,"unarchiveAccounts sortbyEXPBalance");
};

const sortByTokenBalances = () => {
    sortbyTOKENBalance = sortbyEXPBalance.sort(
        (a, b) => {
            console.log(a, b, "sortbyTOKENBalance sortbyTOKENBalance");
            return parseFloat(b.token_icons && b.token_icons.balance) - parseFloat(a.token_icons && a.token_icons.balance);
        }
    );
    // console.log(sortbyTOKENBalance ,"unarchiveAccounts sortbyTOKENBalance")
};


const get_tokens_balance_by_address = (accountHash = '') => {
    return new Promise(resolve => {
        let tokens = db.get('tokens').value();
        var accounts_addresses = [];
        if (tokens.length > 0) {
            try {
                _.each(tokens, function (tokenHash, key) {
                    var addr = accountHash;
                    var contractAddr = tokenHash.token_address;
                    var tknAddress = (addr).substring(2);
                    var contractData = ('0x70a08231000000000000000000000000' + tknAddress);
                    web3.eth.call({
                        to: contractAddr,
                        data: contractData
                    }, function (err, result) {
                        if (result) {
                            // console.log(result, "result");
                            var tokens = numberToBN(result); // Convert the result to a usable number string
                            // console.log(tokens, "tokens");
                            var balance = web3.utils.fromWei(tokens, 'ether');
                            if (balance > 0) {
                                accounts_addresses.push({
                                    tokenHash: tokenHash.token_address,
                                    color: tokenHash.color,
                                    token_symbol: tokenHash.token_symbol,
                                    token_name: tokenHash.token_name,
                                    balance: balance
                                });
                                // console.log('accounts_addresses', accounts_addresses);
                            }
                        }
                    });
                    if (key === tokens.length - 1) {
                        setTimeout(function () {
                            resolve(accounts_addresses.length > 0 ? accounts_addresses :
                                false);
                        }, 1000)

                    }
                }); // each
            } catch (e) {
                console.log("Error: ",e);
                Raven.captureException(e);
            }
        } else {
            resolve(false);
        }
    });
};



const getAllWatchOnlyAcounts = () => {
    watchOnlyAccounts = [];
    let color ;
    let db2 = low(adapter);
    let address_accounts = db2.get('accountsAdresses').value();
    try {
        if(address_accounts) {
            address_accounts.map((account , index) => {
                web3.eth.getBalance(account.hash).then((bal) => {
                    // console.log(bal);
                    balance = web3.utils.fromWei(bal, "ether");
                    if(!account.archive) {
                        account = Object.assign({archive: false}, account);
                        db2.get('accountsAdresses').chain().filter({hash: account.hash}).first()
                            .assign({ archive: false }).write();
                    }
                    if(!account.color) {
                        color = getRandomColor();
                        account = Object.assign({color: color}, account);
                        db2.get('accountsAdresses').chain().find({hash: account.hash}).first()
                            .assign({ color: color }).write();
                    }
                    account = Object.assign({balance: balance}, account);
                    watchOnlyAccounts.push(account);
                    if(index === address_accounts.length-1){
                        setTimeout(() =>{
                            storeWatchAccounts();
                        }, 2000);
                    }
                }, (error) => {
                    console.log(error, "getExpBalance");
                    Raven.captureException(error);
                });
            });
        }
    } catch (e) {
        console.log("Exception Error:", e);
        Raven.captureException(e);
    }
};


export { getAllAcounts, sortbyEXPBalance, watchOnlyAccounts ,getArchiveaccounts, checkupdate, getAllWatchOnlyAcounts}