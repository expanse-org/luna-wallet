
import {getClientInfo } from './clientInfo';
import {loadingProgress } from './loadingProgress';
import {connectWeb3 } from '../common/web3Config';
import {production, activeScreen, updateScreen} from '../main/libs/config';
import os from 'os';
import shell from 'shelljs';
import fs from 'fs';
import {ipcRenderer} from 'electron';
import {exec} from 'child_process';
import * as $ from 'jquery';
import Raven from 'raven';
import store from '../renderer/store'
let gexpDir = 'binaries';

const action = (screen) => {
    // console.log("storee Action");
    store.dispatch('addScreen', screen)
};

const downloadGexp = () => {
    // console.log(store,"store========")
    var dlData =  getClientInfo();
    var appPath = dlData.appPath;
    var cmd ;
    try{
        updateScreen("downloadNode");
        action("downloadNode");
        if(os.type === 'Windows_NT')
            cmd = 'ping www.google.com';
        else
            cmd = 'ping -c 1 www.google.com';
    }catch(e){
        Raven.captureException(e);
        console.log(e);
    }
    try{
        var child = exec(cmd, function(er, stdout, stderr){
            if(er !== null){
                updateScreen("downloadNode");
                action("downloadNode");
                console.log('No Internet Connection');
            }else{
                console.log("Connection Available");
                if(production === true){
                    shell.cd(appPath);
                    console.log("production");
                    console.log(shell.ls(''));
                }
                // Create Folder For gexp
                // console.log(gexpDir, "gexpDir");
                console.log(shell.ls(''));
                if (!fs.existsSync(gexpDir)){
                    fs.mkdirSync(gexpDir);
                    console.log("directory Not Found");
                    exec('mkdir '+gexpDir);
                    // console.log(shell.ls(''));
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

const startingGexp = () => {
    // console.log(store,"store========,GexpStart")
    var dlData =   getClientInfo();
    console.log("dlData========,GexpStart")
    setTimeout(function(){
        let path;
        if(production === true)
            path = dlData.appPath+ dlData.dirPath;
        else path =  dlData.dirPath;
        // console.log('startingGexp path path', path)

        // Node start Animation
        updateScreen("nodeStart");
        action("nodeStart");
        console.log(activeScreen,"activeScreen");

        // console.log('startingGexp', path)
        ipcRenderer.send('startGexp', path);
        console.log(store.getters.getGexpres,"store.gexpRes");
        // if(store.getters.getGexpres === true){
            setTimeout(function(){
                connectWeb3();
            },2000)
        // }
        // else{
        //     updateScreen("connectionError");
        //     action("connectionError");
        // }
        ipcRenderer.on('startGexpResponse', (event, res) => {

            console.log(event)
        });
    },1000);
};

export { startingGexp, downloadGexp }