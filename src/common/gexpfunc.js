import {getClientInfo } from './clientInfo';
import {loadingProgress} from './loadingProgress';
import {connectWeb3 } from '../common/web3Config';
import {production, activeScreen, updateScreen} from '../main/libs/config';
import os from 'os';
import shell from 'shelljs';
import fs from 'fs';
import {ipcRenderer} from 'electron';
import {exec} from 'child_process';
import * as $ from 'jquery';
import  * as child_process from 'child_process';
import * as Raven from 'raven-js';
import store from '../renderer/store'
let gexpDir = 'binaries';

const action = (screen) => {
    // console.log("storee Action");
    store.dispatch('addScreen', screen)
};

const downloadGexp = () => {
    console.log("Starting Downloading");
    var dlData =  getClientInfo();
    var appPath = dlData.appPath;
    var cmd ;
    try{
        updateScreen("downloadNode");
        action("downloadNode");
        if(os.type == 'Windows_NT')
            cmd = 'ping www.github.com';
        else
            cmd = 'ping -c 1 www.github.com';
    }catch(e){
        Raven.captureException(e);
        console.log(e);
    }
    try{
        var child = exec(cmd, function(er, stdout, stderr){
            if(er !== null){
                updateScreen("error-downloading");
                action("error-downloading");
                console.log('No Internet Connection');
            }else{
                console.log("Connection Available");
                if(production == true){
                    shell.cd(appPath);
                }
                // Create Folder For gexp
                if (!fs.existsSync(gexpDir)){
                    fs.mkdirSync(gexpDir);
                    exec('mkdir '+gexpDir);
                }

                shell.cd(gexpDir);
                // download and Extract gexp
                loadingProgress(dlData);
            } // Check Connection
        });
    }catch(e){
        Raven.captureException(e);
        console.log(e);
    }

};
const downloadGexpChina = () => {
    var dlData =  getClientInfo();
    var appPath = dlData.appPath;
    var cmd ;
    try{
        updateScreen("downloadNode");
        action("downloadNode");
        if(os.type == 'Windows_NT')
            cmd = 'ping 159.203.121.142';
        else
            cmd = 'ping -c 1 159.203.121.142';
    }catch(e){
        Raven.captureException(e);
        console.log(e);
    }
    try{
        var child = exec(cmd, function(er, stdout, stderr){
            if(er !== null){
                updateScreen("error-downloading");
                action("error-downloading");
                console.log('No Internet Connection');
            }else{
                console.log("Connection Available");
                if(production == true){
                    shell.cd(appPath);
                    // console.log(shell.ls(''));
                }
                // Create Folder For gexp
                if (!fs.existsSync(gexpDir)){
                    fs.mkdirSync(gexpDir);
                    exec('mkdir '+gexpDir);
                }

                shell.cd(gexpDir);
                // download and Extract gexp

                if(os.type() == 'Windows_NT') {
                    if(os.arch() == 'ia32') {
                        dlData.url = 'http://159.203.121.142:8080/gexp-windows-386.zip'
                    }else if(os.arch() == 'x64'){
                        dlData.url = 'http://159.203.121.142:8080/gexp-windows-amd64.zip'
                    }
                }
                if(os.type() == 'Linux') {
                    if(os.arch() == 'ia32') {
                        dlData.url = 'http://159.203.121.142:8080/gexp-linux-386.tar.gz'
                    }else if(os.arch() == 'x64'){
                        dlData.url = 'http://159.203.121.142:8080/gexp-linux-amd64.tar.gz'
                    }
                }
                if(os.type() == 'Darwin') {
                    if(os.arch() == 'ia32') {
                        dlData.url = 'http://159.203.121.142:8080/gexp-darwin-386.tar.gz'
                    }else if(os.arch() == 'x64'){
                        dlData.url = 'http://159.203.121.142:8080/gexp-darwin-amd64.tar.gz'
                    }
                }
                loadingProgress(dlData);
            } // Check Connection
        });
    }catch(e){
        Raven.captureException(e);
        console.log(e);
    }

};

const startingGexp = () => {
    console.log("GexpStart")
    var dlData =   getClientInfo();
    setTimeout(function(){
        let path;
        if(production)
            path = dlData.appPath+ dlData.dirPath;
        else path =  dlData.dirPath;

        // Node start Animation
        updateScreen("nodeStart");
        action("nodeStart");
        // console.log(activeScreen,"activeScreen");
        ipcRenderer.send('startGexp', path);
        ipcRenderer.on('gexpStartAlready', (event, res) => {
            if(res){
                // console.log("Gexp Rest",res, event)

            }
            else{
                updateScreen("connectionError");
                action("connectionError");
            }
        });
        ipcRenderer.on('startGexpResponse', (event, res) => {
            console.log(res,"res");
            if(res){
                // console.log("Gexp Rest",res, event)
            }
            else{
                updateScreen("connectionError");
                action("connectionError");
            }
        });
        ipcRenderer.on('connectwebgexp', (event, res) => {
            console.log(res, 'expr------01', 'connectwebgexp------01');
            if(res)
            {
                connectWeb3();
                console.log("connectweb3 funcction start")

            }
        });
    },1000);
};

let gexplogs = [];

ipcRenderer.on('connectwebhttp', (event, res) => {
    console.log(res, 'expresssss  1231312');
});

//
// myEmitter.on('newMarketPairevent', () => {
//     console.log('an newMarketPairevent occurred !');
//     ipcRenderer.send('newMarketPair', true);
// });

export { startingGexp, downloadGexp, gexplogs, downloadGexpChina }
