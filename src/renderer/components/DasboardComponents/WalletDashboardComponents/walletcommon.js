

import {getRandomColor} from '../../AccountsData/commonFunc';
import {db} from '../../../../../lowdbFunc';
import {web3, currencies, ExpApi} from '../../../../main/libs/config';
import Raven from 'raven';
import * as $ from 'jquery';
import _ from 'underscore';
import store from '../../../store';
import object_hash from 'object-hash';
import numberToBN from 'number-to-bn';
import axios from 'axios';

var watchOnlyAccounts = [];
var archiveAccounts = [];
var unarchiveAccounts = [];
var addresshashAccounts = [];
var sortbyEXPBalance = [];
var sortbyTOKENBalance = [];
// var web3 = startConnectWeb();
let balance = 0;
let total_balance = 0;

const getAllAcounts = () => {
    archiveAccounts = [];
    unarchiveAccounts = [];
    addresshashAccounts = [];
    try {
        web3.eth.getAccounts(function (error, accounts) {
            if (accounts && accounts.length > 0) {
                total_balance = 0;
                accounts.map((account_hash , index) => {
                    // console.log(account_hash);
                    addresshashAccounts.push(account_hash.toLowerCase());
                    let account = db.get('accounts').find({
                        hash: account_hash.toLowerCase()
                    }).value();
                    if(account){
                        if(account.hash){
                            if(account.archive === true){
                                if(account.isHd === true || account.isHd === false){}
                                else {
                                    account = Object.assign({isHd: false}, account);
                                }
                                archiveAccounts.push(account);
                            } else if(account.archive === false) {
                                if(account.isHd === true || account.isHd === false){}
                                else {
                                    account = Object.assign({isHd: false}, account);
                                }
                                unarchiveAccounts.push(account);
                            } else {
                                if(account.isHd === true || account.isHd === false){}
                                else {
                                    account = Object.assign({isHd: false}, account);
                                }
                                account = Object.assign({archive: false}, account);
                                unarchiveAccounts.push(account);
                            }
                        }
                    }
                    else {
                        let accountTest = db.get('accounts').find({
                            hash: account_hash
                        }).value();
                        if(!accountTest) {
                            console.log(account_hash ,"else Account in Db account_hash", account, accountTest);
                            let accountdata = accAdddb(account_hash, index);
                            unarchiveAccounts.push(accountdata);
                        }else {
                            if(accountTest.hash){
                                if(accountTest.archive === true){
                                    if(accountTest.isHd === true || accountTest.isHd === false){}
                                    else {
                                        accountTest = Object.assign({isHd: false}, accountTest);
                                    }
                                    archiveAccounts.push(accountTest);
                                } else if(accountTest.archive === false) {
                                    if(accountTest.isHd === true || accountTest.isHd === false){}
                                    else {
                                        accountTest = Object.assign({isHd: false}, accountTest);
                                    }
                                    unarchiveAccounts.push(accountTest);
                                } else {
                                    if(accountTest.isHd === true || accountTest.isHd === false){}
                                    else {
                                        accountTest = Object.assign({isHd: false}, accountTest);
                                    }
                                    accountTest = Object.assign({archive: false}, accountTest);
                                    unarchiveAccounts.push(accountTest);
                                }
                            }
                        }
                    }
                });
                getallExpBalance();
                getalltokenBalance();
            }
        });
    } catch (e) {
        console.log("Exception Error:", e);
        Raven.captureException(e);
    }
};

const getArchiveaccounts = () => {
    archiveAccounts = [];
    let accounts = db.get('accounts').value();
    accounts.map((account) => {
        if(account.archive === true){
            archiveAccounts.push(account);
        }
    });
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
    db.get('accounts')
        .push(accountdata)
        .write();
    return accountdata;
};

const getallExpBalance = () => {
    unarchiveAccounts.map((account, index) => {
        web3.eth.getBalance(account.hash).then((bal) => {
            balance = web3.utils.fromWei(bal, "ether");
            console.log(balance, "balance");
            if(balance> 0){
                total_balance += parseFloat(balance);
            }
            unarchiveAccounts[index] = Object.assign({balance: balance}, unarchiveAccounts[index] );
        }, (error) => {
            console.log(error, "getallExpBalance");
            Raven.captureException(error);
        });
    });
    store.dispatch('addTotalBalance',total_balance);
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
        if(index === unarchiveAccounts.length -1) {
            sortByEXPBalances();
        }
    });
};

const storeActionArchive = () => {
    store.dispatch('addUserAcc', archiveAccounts);
}

const storeAction = () => {
    store.dispatch('addAllAccounts', sortbyEXPBalance);
    store.dispatch('addAddreshash', addresshashAccounts);
}

const sortByEXPBalances = () => {
    console.log(unarchiveAccounts[0],  "unarchiveAccount getalltokenBalances");
    sortbyEXPBalance = unarchiveAccounts.sort(
         (a, b) => {
            // console.log(a,  "unarchiveAccount getalltokenBalances");
            //return parseFloat(b.balance && b.balance) - parseFloat(a.balance && a.balance);
        }
    );
    storeAction();
    getAllWatchOnlyAcounts();
    console.log(sortbyEXPBalance ,"unarchiveAccounts sortbyEXPBalance");
    console.log(archiveAccounts ,"archiveAccounts sortbyEXPBalance")
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
    let address_accounts = db.get('accountsAdresses').value();
    try {
        if(address_accounts) {
            address_accounts.map((account , index) => {
                web3.eth.getBalance(account.hash).then((bal) => {
                    // total_balance += bal;
                    // store.dispatch('addTotalBalance',total_balance);
                    balance = web3.utils.fromWei(bal, "ether");
                    if(!account.archive && account.archive !== false) {
                        account = Object.assign({archive: false}, account);
                        db.get('accountsAdresses').chain().filter({hash: account.hash}).first()
                            .assign({ archive: false }).write();
                    }
                    if(!account.color) {
                        color = getRandomColor();
                        account = Object.assign({color: color}, account);
                        db.get('accountsAdresses').chain().find({hash: account.hash}).first()
                            .assign({ color: color }).write();
                    }
                    account = Object.assign({balance: balance}, account);
                    watchOnlyAccounts.push(account);
                    if(index === address_accounts.length -1) {
                        store.dispatch('addWatchAccounts', watchOnlyAccounts);
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


export { getAllAcounts, sortbyEXPBalance, watchOnlyAccounts ,getArchiveaccounts}