

import {getRandomColor} from '../../AccountsData/commonFunc';
import {db} from '../../../../../lowdbFunc';
import {startConnectWeb, currencies, ExpApi} from '../../../../main/libs/config';
import Raven from 'raven';
import * as $ from 'jquery';
import _ from 'underscore';
import store from '../../../store';
import object_hash from 'object-hash';
import numberToBN from 'number-to-bn';

var watchOnlyAccounts = [];
var archiveAccounts = [];
var unarchiveAccounts = [];
var sortbyEXPBalance = [];
var sortbyTOKENBalance = [];
var web3 = startConnectWeb();
let balance = 0;
let total_balance = 0;

const getAllAcounts = () => {
    archiveAccounts = [];
    unarchiveAccounts = [];
    try {
        web3.eth.getAccounts(function (error, accounts) {
            if (accounts.length > 0) {
                total_balance = 0;
                accounts.map((account_hash , index) => {
                    let account = db.get('accounts').find({
                        hash: account_hash.toLowerCase()
                    }).value();
                    if(account){
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
                            getExpBalance(account_hash, index);
                            gettokensBalance(account_hash, index);
                        } else {
                            if(account.isHd === true || account.isHd === false){}
                            else {
                                account = Object.assign({isHd: false}, account);
                            }
                            account = Object.assign({archive: false}, account);
                            unarchiveAccounts.push(account);
                            getExpBalance(account_hash, index);
                            gettokensBalance(account_hash, index);
                        }
                    }
                    else {
                        console.log(account_hash ,"else Account in Db account_hash", account);
                        let accountdata = accAdddb(account_hash, index);
                        unarchiveAccounts.push(accountdata);
                        getExpBalance(account_hash, index);
                        gettokensBalance(account_hash, index);
                    }
                });
            }
        });
    } catch (e) {
        console.log("Exception Error:", e);
        Raven.captureException(e);
    }
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


const getExpBalance = (account_hash, key) => {
    web3.eth.getBalance(account_hash).then((bal) => {
        balance = web3.utils.fromWei(bal, "ether");
        if(balance> 0){
            console.log(total_balance,"total_balance");
            total_balance += parseFloat(balance);
        }
        unarchiveAccounts[key] = Object.assign({balance: balance}, unarchiveAccounts[key]);
        if(unarchiveAccounts.length-1 == key){
            console.log(total_balance,"total_balance unarchiveAccounts");
            store.dispatch('addTotalBalance',total_balance);
        }
    }, (error) => {
        console.log(error, "getExpBalance");
        Raven.captureException(error);
    });
};

const gettokensBalance = (account_hash, key) => {
    get_tokens_balance_by_address(account_hash).then((res) => {
        if(res){
                unarchiveAccounts[key] = Object.assign({token_icons: res, tokens: true}, unarchiveAccounts[key]);
        } else {
                unarchiveAccounts[key] = Object.assign({tokens: false}, unarchiveAccounts[key]);
        }
        if(key === unarchiveAccounts.length - 1) {
            sortByEXPBalances();
            sortByTokenBalances();
        }
    }, (error) => {
        console.log(error, "getExpBalance");
        Raven.captureException(error);
    });
};

const storeAction = (sortbyEXPBalance) => {
    store.dispatch('addAllAccounts', sortbyEXPBalance);
}

const sortByEXPBalances = () => {
    sortbyEXPBalance = unarchiveAccounts.sort(
        function (a, b) {
            return parseFloat(b.balance) - parseFloat(a.balance);
        }
    );
    storeAction(sortbyEXPBalance);
    console.log(sortbyEXPBalance ,"unarchiveAccounts sortbyEXPBalance")
    console.log(archiveAccounts ,"archiveAccounts sortbyEXPBalance")
};

const sortByTokenBalances = () => {
    sortbyTOKENBalance = sortbyEXPBalance.sort(
        function (a, b) {
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

export { getAllAcounts, sortbyEXPBalance, watchOnlyAccounts }