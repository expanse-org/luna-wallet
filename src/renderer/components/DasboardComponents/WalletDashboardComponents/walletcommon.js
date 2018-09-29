

import {getRandomColor} from '../../AccountsData/commonFunc';
import {db} from '../../../../../lowdbFunc';
import {startConnectWeb} from '../../../../main/libs/config';
import Raven from 'raven';
import * as $ from 'jquery';
import _ from 'underscore';
import store from '../../../store';
import object_hash from 'object-hash';
import numberToBN from 'number-to-bn';


var web3 = startConnectWeb();
var price = 0;

const reOrderAccountsbyBalance = () => {
    var accountsBalanceArray = [];
    var sortedAccountsBalanceArray = [];
    let balance;
    try {
        web3.eth.getAccounts(function (error, accounts) {
            if (accounts.length > 0) {
                _.each(accounts, function (account_hash, key) {
                    let color = getRandomColor();
                    web3.eth.getBalance(account_hash).then((bal) => {
                        balance = web3.utils.fromWei(bal, "ether");
                        balance = price * bal;
                        store.dispatch('addAcbalance', balance);
                        get_tokens_balance_by_address(account_hash).then((res) => {
                            if (res) {
                                console.log('accounts_addresses res', res);
                                accountsBalanceArray.push({
                                    "hash": account_hash,
                                    "balance": balance,
                                    tokens: true,
                                    token_icons: res
                                });
                            } else {
                                accountsBalanceArray.push({
                                    "hash": account_hash,
                                    "balance": balance,
                                    tokens: false
                                });
                            }
                            if (key === (accounts.length - 1)) {
                                sortedAccountsBalanceArray = accountsBalanceArray.sort(
                                    function (a, b) {
                                        return parseFloat(b.balance) - parseFloat(a.balance);
                                    });
                                listAccounts(sortedAccountsBalanceArray);
                                console.log('listing accounst');
                            }
                        })
                    });
                });
            }
        })
    } catch (e) {
        console.log("Exception Error:", e);
        Raven.captureException(e);
    }
};

const get_tokens_balance_by_address = (accountHash = '') => {
    return new Promise(resolve => {
        let tokens = db.get('tokens').value();
        var accounts_addresses = [];
        $('.bottom .currency-account').html('');
        // console.log(tokens);
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
                            console.log(result, "result");
                            var tokens = numberToBN(result); // Convert the result to a usable number string
                            console.log(tokens, "tokens");
                            var balance = web3.utils.fromWei(tokens, 'ether');
                            if (balance > 0) {
                                accounts_addresses.push({
                                    tokenHash: tokenHash.token_address,
                                    "color": tokenHash.color,
                                    "balance": balance
                                });
                                console.log('accounts_addresses', accounts_addresses);
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


const listAccounts = (sortedAccountsBalanceArray) => {
    var accountArray = [];
    var updated_accounts_list_hash = '';
    try {
        web3.eth.getAccounts(function (error, accounts) {
            var accounts_list_hash = object_hash(sortedAccountsBalanceArray);
            if (accounts_list_hash === updated_accounts_list_hash) {
                return false;
            } else {
                accountArray = [];
                updated_accounts_list_hash = accounts_list_hash;
            }
            if (accounts.length > 0) {
                // $('.accounts-list').html('');
                _.each(sortedAccountsBalanceArray, function (account_hash, key) {
                    console.log(account_hash, "account_hash");
                    let accountName;
                    let account = db.get('accounts').find({
                        hash: account_hash.hash
                    }).value();
                    accountArray.push(account_hash.hash);
                    if (account) {
                        console.log(account, "account");
                        if (account.accountTitle !== "") {
                            accountName = account.accountTitle
                        } else {
                            var color = getRandomColor();
                            db.get('accounts').push({
                                accountTitle: "",
                                hash: account_hash.hash,
                                isHd: false,
                                color: color
                            }).write();
                            accountName = "Account " + parseInt(key + 1);
                        }
                    } else {
                        // console.log('dont ---has account name', account_hash.hash);
                        accountName = "Account " + parseInt(key + 1);
                        color = getRandomColor();
                        db.get('accounts').push({
                            accountTitle: "",
                            hash: account_hash.hash,
                            isHd: false,
                            color: color
                        }).write();
                    }
                    let balance = account_hash.balance; // web3.eth.getBalance(account_hash);
                    // balance = web3.fromWei(balance.toNumber(), "ether");
                    // Main Account
                    console.log(web3.eth, "web3.eth");
                    let coinbase = web3.eth.getCoinbase().then((res) => {
                        console.log(res, "res getCoinbase");
                    });
                    if (coinbase == account_hash.hash) {
                        $('.m_name').text(accountName + ' (BASE)')
                        $('.main-account .balance').text(balance +' '+ defaultCurrencySign);
                        $('.main-account-hash').text(account_hash.hash);
                        $('.main-account-hash-input').val(account_hash.hash);
                        $('.publicAddress').text(account_hash.hash);
                        $('.publicAddress_input').val(account_hash.hash);
                        $('.main_view_account').attr('data-val', account_hash.hash);
                        $(".main_view_account").attr("onclick","mainMenu(event,'accountDetail','" + account_hash.hash +"')");
                        QRCode.toCanvas(canvas, account_hash.hash, function (error) {})
                        QRCode.toCanvas(modalQrCode, account_hash.hash, function (error) {})
                    }
                    else {
                        let isHd = false;
                        try {
                            color = account.color;
                        } catch (e) {
                            color = getRandomColor();
                            db.get('accounts').find({
                                hash: account_hash.hash
                            }).assign({
                                color: color
                            }).value();
                        }
                        try {
                            isHd = account.isHd;
                        } catch (e) {
                            isHd = false;
                        }
                        web3.eth.getBalance(account_hash).then((bal) => {
                            balance = web3.utils.fromWei(bal, "ether");
                        });
                        if (isHd) {
                            // accountTemplate += '<div class="wallet-icon">'
                            // accountTemplate += '</div>'
                            store.dispatch('addAccTab', 'accountdetailTab');
                        }

                        if (account_hash.tokens) {
                            let ac_tokens = account_hash.token_icons;
                            if (ac_tokens.length > 0 && ac_tokens.length < 3) {
                                store.dispatch('addAccTab', 'simpleaccountTab');
                                store.dispatch('addActokens', ac_tokens);
                                _.each(ac_tokens, function (ac_token, key) {
                                    // accountTemplate += '<div class="icons">'
                                    // accountTemplate += '<svg   class=" svg-1 svg' +
                                    //     parseInt(key + 1) + '"style="fill:' + ac_token.color +
                                    //     '"';
                                    // accountTemplate +=
                                    //     'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"'
                                    // accountTemplate +=
                                    //     'x="0px" y="0px" width="43px" height="43px" viewBox="0 0 43 43" style="enable-background:new 0 0 43 43;" xml:space="preserve">'
                                    // accountTemplate +=
                                    //     '<circle class="st012" cx="21.5" cy="21.5" r="21.5"/>'
                                    // accountTemplate +=
                                    //     '<rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4"/>'
                                    // accountTemplate +=
                                    //     '<rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4"/>'
                                    // accountTemplate +=
                                    //     '<rect x="28.9" y="9.2" class="st125" width="4.9" height="4.8"/>'
                                    // accountTemplate +=
                                    //     '<rect x="14.3" y="15.6" class="st125" width="14.6" height="8"/>'
                                    // accountTemplate +=
                                    //     '<rect x="9.4" y="9.2" class="st125" width="4.9" height="4.8"/>'
                                    // accountTemplate +=
                                    //     '<rect x="1.2" y="18.7" class="st125" width="6.5" height="6.4"/>'
                                    // accountTemplate +=
                                    //     '<rect x="6.1" y="26.7" class="st125" width="9.7" height="9.6"/>'
                                    // accountTemplate +=
                                    //     '<rect x="17.5" y="25.1" class="st125" width="8.1" height="15.9"/>'
                                    // accountTemplate +=
                                    //     '<rect x="27.3" y="26.7" class="st125" width="9.7" height="9.6"/>'
                                    // accountTemplate += '</svg>'
                                    // accountTemplate += '</div>'
                                });

                            }
                        }

                        // accountTemplate += '<svg   class=" svg-1 svg' + parseInt(key + 1) +
                        //     '"style="fill:' + color + '"';
                        // accountTemplate +=
                        //     'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"'
                        // accountTemplate +=
                        //     'x="0px" y="0px" width="43px" height="43px" viewBox="0 0 43 43" style="enable-background:new 0 0 43 43;" xml:space="preserve">'
                        // accountTemplate +=
                        //     '<circle class="st012" cx="21.5" cy="21.5" r="21.5"/>'
                        // accountTemplate +=
                        //     '<rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4"/>'
                        // accountTemplate +=
                        //     '<rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4"/>'
                        // accountTemplate +=
                        //     '<rect x="28.9" y="9.2" class="st125" width="4.9" height="4.8"/>'
                        // accountTemplate +=
                        //     '<rect x="14.3" y="15.6" class="st125" width="14.6" height="8"/>'
                        // accountTemplate +=
                        //     '<rect x="9.4" y="9.2" class="st125" width="4.9" height="4.8"/>'
                        // accountTemplate +=
                        //     '<rect x="1.2" y="18.7" class="st125" width="6.5" height="6.4"/>'
                        // accountTemplate +=
                        //     '<rect x="6.1" y="26.7" class="st125" width="9.7" height="9.6"/>'
                        // accountTemplate +=
                        //     '<rect x="17.5" y="25.1" class="st125" width="8.1" height="15.9"/>'
                        // accountTemplate +=
                        //     '<rect x="27.3" y="26.7" class="st125" width="9.7" height="9.6"/>'
                        // accountTemplate += '</svg>'
                        // accountTemplate += '</div>'
                        // accountTemplate += '<div class="details">'
                        // accountTemplate += '<div>'
                        // accountTemplate += '<svg '
                        // accountTemplate +=
                        //     'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"'
                        // accountTemplate +=
                        //     'x="0px" y="0px" width="15.2px" height="21.9px" viewBox="0 0 15.2 21.9" style="enable-background:new 0 0 15.2 21.9;"'
                        // accountTemplate += 'xml:space="preserve">'
                        // accountTemplate +=
                        //     '<path class="key1" d="M8.6,2.3c0.3,0.2,0.3,0.5,0.2,0.8C8.6,3.3,8.3,3.4,8,3.3L7,2.7L6.3,3.8C6,4.3,6.1,5,6.6,5.3'
                        // accountTemplate +=
                        //     'c0,0,0,0,0,0L9,6.7l3-5.2L9.7,0.1C9.1-0.2,8.5,0,8.2,0.5c0,0,0,0,0,0L7.5,1.7L8.6,2.3z M7,12.4C7,12.4,7,12.4,7,12.4l-0.6-0.2'
                        // accountTemplate +=
                        //     'c-2.1-1.2-4.7-0.4-5.9,1.7c-1.1,2-0.4,4.6,1.6,5.8l3,1.7c2.1,1.2,4.7,0.4,5.9-1.7c1.1-2,0.4-4.6-1.6-5.8l-0.6-0.3c0,0,0.1,0,0.1,0'
                        // accountTemplate +=
                        //     'L15,3c0.3-0.5,0.2-1.2-0.3-1.5s-1.2-0.2-1.5,0.3c0,0-0.1,0.1-0.1,0.1L7,12.4z M9.1,18.7c-0.6,1-1.9,1.4-2.9,0.8l-3-1.7'
                        // accountTemplate +=
                        //     'c-1-0.6-1.4-1.9-0.8-2.9s1.9-1.4,2.9-0.8l0,0l3,1.7C9.3,16.4,9.6,17.7,9.1,18.7z"/>'
                        // accountTemplate += '</svg>'
                        // accountTemplate += '<label>' + accountName + '</label>'
                        // accountTemplate += '<span> ( ' + balance + ' '+ defaultCurrencySign +'  )</span>'
                        // accountTemplate += '</div>'
                        // accountTemplate += '<div>'
                        // accountTemplate += '<p class="tooltip accoundID wd180">' + account_hash
                        //     .hash
                        // accountTemplate += '<span class="tooltiptext parrentFont">' +
                        //     account_hash.hash
                        // accountTemplate += '</p>'
                        store.dispatch('addAccTab', 'simpleaccountTab');

                        if (account_hash.tokens) {
                            let ac_tokens = account_hash.token_icons;
                            // console.log("response of toknes listing",ac_token.length);
                            if (ac_tokens.length > 2) {
                                // accountTemplate += '<div class="icons2">';
                                store.dispatch('addAccTab', 'simpleaccountTab');
                                store.dispatch('addActokens', ac_tokens);
                                _.each(ac_tokens, function (ac_token, key) {
                                    // accountTemplate += '<div class="icons">'
                                    // accountTemplate += '<svg   class=" svg-1 svg' +
                                    //     parseInt(key + 1) + '"style="fill:' + ac_token.color +
                                    //     '"';
                                    // accountTemplate +=
                                    //     'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"'
                                    // accountTemplate +=
                                    //     'x="0px" y="0px" width="43px" height="43px" viewBox="0 0 43 43" style="enable-background:new 0 0 43 43;" xml:space="preserve">'
                                    // accountTemplate +=
                                    //     '<circle class="st012" cx="21.5" cy="21.5" r="21.5"/>'
                                    // accountTemplate +=
                                    //     '<rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4"/>'
                                    // accountTemplate +=
                                    //     '<rect x="35.4" y="18.7" class="st125" width="6.5" height="6.4"/>'
                                    // accountTemplate +=
                                    //     '<rect x="28.9" y="9.2" class="st125" width="4.9" height="4.8"/>'
                                    // accountTemplate +=
                                    //     '<rect x="14.3" y="15.6" class="st125" width="14.6" height="8"/>'
                                    // accountTemplate +=
                                    //     '<rect x="9.4" y="9.2" class="st125" width="4.9" height="4.8"/>'
                                    // accountTemplate +=
                                    //     '<rect x="1.2" y="18.7" class="st125" width="6.5" height="6.4"/>'
                                    // accountTemplate +=
                                    //     '<rect x="6.1" y="26.7" class="st125" width="9.7" height="9.6"/>'
                                    // accountTemplate +=
                                    //     '<rect x="17.5" y="25.1" class="st125" width="8.1" height="15.9"/>'
                                    // accountTemplate +=
                                    //     '<rect x="27.3" y="26.7" class="st125" width="9.7" height="9.6"/>'
                                    // accountTemplate += '</svg>'
                                    // accountTemplate += '</div>'
                                });
                            }
                        }
                        // $('.accounts-list').append(accountTemplate);
                        if (key === (accounts.length - 1)) {
                            // Now list Watch Only Addresses
                            accountArray = accountArray.slice(0, 49);
                            listWatchOnlyAddresses();
                            var postData = {
                                "skip": 0,
                                "limit": 25,
                                "addresses": accountArray
                            }
                            // listTransactions(postData, 'dashboardTransactionContent');
                        }
                    }
                });
            }

        });
    } catch (err) {
        console.log("Execption Error" + err.message);
        Raven.captureException(err);
    }
};

const listWatchOnlyAddresses = () => {
    let address_accounts = db.get('accountsAdresses').value();
    if (address_accounts) {
        try {
            _.each(address_accounts, function (account, key) {
                try {
                    var color = account.color;
                    // console.log("color", color);
                    if (!color) {
                        console.log('color is undef');
                        color = getRandomColor();
                        db.get('accountsAdresses').chain().find({
                            hash: account.hash
                        }).first().assign({
                            color: color
                        }).write()

                    }
                } catch (e) {
                    // console.log("fdasfadsf", e);
                    color = getRandomColor();
                    db.get('accountsAdresses').chain().find({
                        hash: account.hash
                    }).first().assign({
                        color: color
                    }).write()
                }
                // color = getRandomColor();

                let balance = web3.eth.getBalance(account.hash);
                balance = web3.fromWei(balance.toNumber(), "ether");
                accountdetailTab = true;
                // $('.accounts-list').append(accountTemplate);
            });
        } catch (e) {
            console.log("Exception Error:", e);
            Raven.captureException(e);
        }
    }
}

export { reOrderAccountsbyBalance }