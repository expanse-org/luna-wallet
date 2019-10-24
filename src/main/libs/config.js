
var production = true;
var prod_app_directory = "luna-wallet/";
// var prod_app_directory = "lunawalletvuetest/"
// var Raven = require('raven');
// Raven.config('https://1f1cacb16da5422aa3d91b06dfacc5cd@sentry.io/1274039').install();

import got from 'got';
import * as Raven from 'raven-js';
import store from "../../renderer/store";

const  apiurl="https://api.tokenlab.io";
// const  apiurl="http://172.25.33.167:8090";
// const  apiurl="http://stagingapi.tokenlab.io";

var activeScreen = 'config';

import Web3 from 'web3';
var web3 ;

const updateScreen = (screen) => {
    activeScreen = screen;
};

const startConnectWeb = () => {

    const RINKEBY_WSS = "ws://127.0.0.1:9657";
    var provider = new Web3.providers.WebsocketProvider(RINKEBY_WSS);
    web3 = new Web3(provider);

    provider.on('error', e => console.log('WS Error', e));
    provider.on('end', e => {
        console.log('WS closed');
        console.log('Attempting to reconnect...');
        provider = new Web3.providers.WebsocketProvider(RINKEBY_WSS);

        provider.on('connect', function () {
            console.log('WSS Reconnected');
        });

        web3.setProvider(provider);
    });

    // web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9656"));
    // web3 = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:9657'));
    return web3;
};

const startConnectWebHttp = () => {

    const web3http = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9656"));
    return web3http;
};

const marketENUM = {
    'CANCELED' : "CANCELED",
    'COMPLETE' : "COMPLETE",
    'ERROR' : "ERROR",
    'OPEN' : "OPEN",
    'BUY' : "BUY",
    'SELL' : "SELL"
};



var wexpABI= [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}]


var expexABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "orderHash",
                "type": "bytes32"
            }
        ],
        "name": "CancelOrderErc20",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "buyFilled",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "cancelled",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "tokens",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "pairs",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "sellFilled",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "signer",
                "type": "address"
            },
            {
                "name": "hash",
                "type": "bytes32"
            },
            {
                "name": "v",
                "type": "uint8"
            },
            {
                "name": "r",
                "type": "bytes32"
            },
            {
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "isValidSignature",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "isOwner",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "token1",
                "type": "address"
            },
            {
                "name": "token2",
                "type": "address"
            },
            {
                "name": "status",
                "type": "bool"
            }
        ],
        "name": "marketPairStatus",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "orderHash",
                "type": "bytes32"
            }
        ],
        "name": "getRemainingSellTokens",
        "outputs": [
            {
                "name": "matcherRemaining",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "orders",
        "outputs": [
            {
                "name": "maker",
                "type": "address"
            },
            {
                "name": "tokenBuy",
                "type": "address"
            },
            {
                "name": "tokenSell",
                "type": "address"
            },
            {
                "name": "amountBuy",
                "type": "uint256"
            },
            {
                "name": "amountSell",
                "type": "uint256"
            },
            {
                "name": "price",
                "type": "uint256"
            },
            {
                "name": "orderHash",
                "type": "bytes32"
            },
            {
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "name": "status",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "orderAddresses",
                "type": "address[2]"
            },
            {
                "name": "orderValues",
                "type": "uint256[2]"
            },
            {
                "name": "matchOrderHashes",
                "type": "bytes32[5]"
            }
        ],
        "name": "OrderErc20",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "isAdmin",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "orderHash",
                "type": "bytes32"
            }
        ],
        "name": "getRemainingBuyTokens",
        "outputs": [
            {
                "name": "matcherRemaining",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "orderAddress1",
                "type": "address"
            },
            {
                "name": "orderAddress2",
                "type": "address"
            }
        ],
        "name": "getMarketPairHash",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "traded",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "orderHashes",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "orderAddresses",
                "type": "address[2]"
            },
            {
                "name": "orderValues",
                "type": "uint256[2]"
            }
        ],
        "name": "getOrderHash",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "orderFills",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_user",
                "type": "address"
            },
            {
                "name": "status",
                "type": "bool"
            }
        ],
        "name": "adminRole",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "token1",
                "type": "address"
            },
            {
                "name": "token2",
                "type": "address"
            }
        ],
        "name": "marketPairStatusCheck",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "VERSION",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "orderHash",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "name": "tokenBuy",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "amountBuy",
                "type": "uint256"
            },
            {
                "indexed": true,
                "name": "tokenSell",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "amountSell",
                "type": "uint256"
            },
            {
                "indexed": true,
                "name": "maker",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "Order",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "orderHash",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "tokenBuy",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "amountBuy",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "amountBuyCancelled",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "tokenSell",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "amountSell",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "amountSellCancelled",
                "type": "uint256"
            },
            {
                "indexed": true,
                "name": "maker",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "Cancel",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "orderHash",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "matchinOrderHash",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "tokenBuy",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "amountBuy",
                "type": "uint256"
            },
            {
                "indexed": true,
                "name": "tokenSell",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "amountSell",
                "type": "uint256"
            },
            {
                "indexed": true,
                "name": "maker",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "taker",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "Trade",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "token1",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "token2",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "status",
                "type": "bool"
            }
        ],
        "name": "MarketPair",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    }
];

var tokenInterface = [
    {
        type: 'function',
        name: 'name',
        constant: true,
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'string'
            }
        ]
    },
    {
        type: 'function',
        name: 'decimals',
        constant: true,
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint8'
            }
        ]
    },
    {
        type: 'function',
        name: 'balanceOf',
        constant: true,
        inputs: [
            {
                name: '',
                type: 'address'
            }
        ],
        outputs: [
            {
                name: '',
                type: 'uint256'
            }
        ]
    },
    {
        type: 'function',
        name: 'symbol',
        constant: true,
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'string'
            }
        ]
    },
    {
        type: 'function',
        name: 'transfer',
        constant: false,
        inputs: [
            {
                name: '_to',
                type: 'address'
            },
            {
                name: '_value',
                type: 'uint256'
            }
        ],
        outputs: []
    },
    {
        type: 'constructor',
        inputs: [
            {
                name: '_supply',
                type: 'uint256'
            },
            {
                name: '_name',
                type: 'string'
            },
            {
                name: '_decimals',
                type: 'uint8'
            },
            {
                name: '_symbol',
                type: 'string'
            }
        ]
    },
    {
        name: 'Transfer',
        type: 'event',
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: 'from',
                type: 'address'
            },
            {
                indexed: true,
                name: 'to',
                type: 'address'
            },
            {
                indexed: false,
                name: 'value',
                type: 'uint256'
            }
        ]
    },
    {
        constant: false,
        inputs: [
            {
                name: '_spender',
                type: 'address'
            },
            {
                name: '_value',
                type: 'uint256'
            }
        ],
        name: 'approve',
        outputs: [
            {
                name: 'success',
                type: 'bool'
            }
        ],
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            {
                name: '',
                type: 'address'
            },
            {
                name: '',
                type: 'address'
            }
        ],
        name: 'allowance',
        outputs: [
            {
                name: '',
                type: 'uint256'
            }
        ],
        type: 'function'
    }
];

let currencies;
let Dprice;
const ExpApi = () => {
    got('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=EXP&tsyms=USD,BTC,EXP', {
        json: true
    }).then(response => {
        if(response){
            currencies = response.body.DISPLAY.EXP;
            console.log(currencies);
            let price = currencies["USD"].PRICE.replace(/[^0-9\.]/g, '');
            console.log(price, "price");
            store.dispatch('addCurrencies',currencies);
            return currencies;
        }
    }).catch(error => {
        Raven.captureException(error);
    });
}

var expexAddress = '0xD3627766D0584Ed23f8D1acd2E493F8c281C9EF9';

export {
    production, prod_app_directory, tokenInterface, activeScreen, updateScreen, startConnectWeb, ExpApi,
    currencies, web3, apiurl, expexABI, wexpABI, startConnectWebHttp, marketENUM, expexAddress
}
