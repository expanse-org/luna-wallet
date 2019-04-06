import {prod_app_directory, production} from './src/main/libs/config';
import os from 'os';
import fs from 'fs';
import shell from 'shelljs';
var adapter;
// const cryptoJSON = require('crypto-json');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')


if (production) {
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

    console.log("check path11111", shell.ls(''), shell.ls('') && shell.ls('').find((ele)=> console.log(ele)));
    adapter = new FileSync('db.json');
    console.log(adapter, "lowdbfunc");

} else {
    adapter = new FileSync('/Users/farina/Desktop/Projects/LunaWalletVueTest/db.json');
}

let db = low(adapter);

//
// const algorithm = 'camellia-128-cbc';
// const encoding = 'hex';
//
// const input = {
//     accounts: db.get('accounts').value(),
//     contracts: db.get('contracts').value(),
//     tokens: db.get('tokens').value(),
//     accountsAdresses: db.get('accountsAdresses').value(),
//     hdWallets: db.get('hdWallets').value(),
//     transactions: db.get('transactions').value(),
// }
//
// // console.log(db.get('accounts').value());
//
// const password = '123123123'
//
// // keys act like a white list, so for example if you want to encrypt a nested
// // key "test" you also need to specify its parent keys,
// // i.e. "b", "a", "baz", "hello" in the above input object
//
//
//
// const keys = ['accounts', 'accountTitle', 'hash', 'archive', 'isHd',
//     'contracts','id','contract_name','contract_address','contract_json','constant','inputs','name','outputs','type','payable',
//                 'stateMutability','signature','anonymous','indexed','token_address','token_name','token_symbol','tokenType',
//     'tokens', 'accountsAdresses', 'hdWallets', 'transactions', 'logs','address', 'topics' ];
//
// const output = cryptoJSON.encrypt(
//     input, password, {encoding, keys, algorithm}
// );
//
// console.log(output);

db.defaults({ accounts: [], contracts: [], tokens: [
        {
            "id": "DrZsGjQIZ",
            "token_address": "0xa887adb722cf15bc1efe3c6a5d879e0482e8d197",
            "token_name": "Token Lab",
            "token_symbol": "LAB",
            "tokenType": "erc20",
            "decimal_places": 18,
            "color": "#fa0fa0"
        },
        {
            "id": "6zxjBkREl",
            "token_address": "0x4f5ec5a69dbe12c48ca1edc9c52b1e8896aed932",
            "token_name": "Pex Token",
            "token_symbol": "PEX",
            "tokenType": "erc20",
            "decimal_places": 18,
            "color": "#0297da"
        },
    ] , accountsAdresses:[] , hdWallets:[] , transactions : [] })
    .write();

export {
    db, adapter, low
}
