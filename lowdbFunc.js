

import {production} from './src/main/libs/config';
import appPath from 'path';
import shell from 'shelljs';
import fs from 'fs';
import {remote} from 'electron';
const app = remote.app;

var adapter;
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const dir = appPath.resolve(__dirname)
// console.log(dir, "dir Lowdb")
// console.log(appPath.resolve('user'), "dir Lowdb")
// console.log(shell.ls(''), "dir Lowdb fs" )
if (production) {
    let appPath = app.getPath('userData');
    console.log(appPath, "dir Lowdb")
    shell.cd(appPath);
    adapter = new FileSync('db.json');
    console.log(adapter, "dir Lowdb if")
} else {
    adapter = new FileSync(dir + '/db.json');
    console.log(adapter, "dir Lowdb else")
}
// const adapter = new FileSync('db.json')
const db = low(adapter);

db.defaults({ accounts: [], contracts: [], tokens: [
        {
            "id": "DrZsGjQIZ",
            "token_address": "0xa887adb722cf15bc1efe3c6a5d879e0482e8d197",
            "token_name": "Tokan Lab",
            "token_symbol": "LAB2",
            "tokenType": "erc20",
            "decimal_places": 18,
            "color": "#fa0fa0"
        },
        {
            "id": "6zxjBkREl",
            "token_address": "0x4f5ec5a69dbe12c48ca1edc9c52b1e8896aed932",
            "token_name": "PEX TOKEN",
            "token_symbol": "PEX2",
            "tokenType": "erc20",
            "decimal_places": 18,
            "color": "#0297da"
        },
    ] , accountsAdresses:[] , hdWallets:[] , transactions : [] })
    .write();



export {
    db
}
