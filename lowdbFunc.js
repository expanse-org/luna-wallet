import {prod_app_directory, production} from './src/main/libs/config';
import os from 'os';
import shell from 'shelljs';
import {ipcRenderer} from "electron";
var adapter;
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

let db;
console.log("Ress 3 startAppRes lowdb 2")

if (production) {
    let appPath = "~/Library/Application Support/"+prod_app_directory;
    if(os.type() == 'Windows_NT') {
        appPath = "~/AppData/Roaming/"+prod_app_directory;
        if(appPath) {
            shell.cd(appPath);
        }
    }
    if(os.type() == 'Linux') {
        appPath = "~/.config/"+prod_app_directory;
        shell.cd(appPath);

    }
    if(os.type() == 'Darwin') {
        appPath = "~/Library/Application Support/"+prod_app_directory;
        shell.cd(appPath);
    }

    adapter = new FileSync('db.json');
    console.log(adapter, "lowdbfunc");
} else {
    adapter = new FileSync('/Users/farina/Desktop/Projects/LunaWalletVueTest/db.json');
}

db = low(adapter);

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
