
var production = true;
var prod_app_directory = "luna-wallet/";
// var prod_app_directory = "lunawalletvuetest/"
// var Raven = require('raven');
// Raven.config('https://1f1cacb16da5422aa3d91b06dfacc5cd@sentry.io/1274039').install();

import got from 'got';
import Raven from 'raven';
import store from "../../renderer/store";

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

export { production, prod_app_directory, tokenInterface, activeScreen, updateScreen, startConnectWeb, ExpApi, currencies, web3 }