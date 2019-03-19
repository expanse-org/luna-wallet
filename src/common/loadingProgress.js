

import {production, updateScreen} from '../main/libs/config';
import {getClientInfo } from '../common/clientInfo';
import {connectWeb3 } from '../common/web3Config';
import os from 'os';
import shell from 'shelljs';
import fs from 'fs';
import request from 'request';
import progress from 'request-progress';
import {ipcRenderer} from 'electron';
import {exec} from 'child_process';
import * as $ from 'jquery';
import targz from 'targz';
const decompress = require('decompress');
import Raven from 'raven';
import store from "../renderer/store";

const action = (screen) => {
    // console.log("storee Action")
    store.dispatch('addScreen', screen)
}

const loadingProgress = (dlData) =>{
    console.log(dlData,"loadingProgress Func11");
    progress(request({
            url:  dlData.url,
            timeout: 20000       // duration to wait for request fulfillment in milliseconds, default is 2 seconds
        },

    )).on('progress', function (state) {
        console.log(state,"state Progres=====");
        $('.down_load_info').show();
        let percentage = (state.size.transferred / state.size.total) * 100;
        $('.download-bar-fill').width(percentage+'%');
        $(".file_donwload_size").text(state.size.transferred/1024+" mb ")
        $(".file_total_size").text(state.size.total/1024 +" mb ")
        $(".file_donwload_time_elapsed").text(Math.round(state.time.elapsed)+" sec ")
        $(".file_donwload_time_remaining").text(Math.round(state.time.remaining)+" sec ")
    }).on('error', function (error) {
        try{
            updateScreen("error-downloading");
            action("error-downloading");
        }catch(e){
            Raven.captureException(e);
            console.log(e);
        }

    }).on('end', function () {

        var filePath = 'gexp.zip';

        // decompress files from tar.gz archive
        if(os.type() !== 'Windows_NT'){
            console.log( shell.ls(),"loadingProgress shell if");
            try{
                targz.decompress({
                    src: filePath,
                    dest: './'
                }, function(err){
                    if(err) {
                        console.log(err);
                    } else {
                        // Back to root directory
                        shell.cd('..');
                        console.log("Decompressed!");
                        updateScreen("downloadNode");
                        action("downloadNode");
                        //  MAKE GEXP FILE EXECUTABLE
                        try{
                            shell.cd(dlData.dirPath);
                            exec('chmod u+x gexp', {maxBuffer: 1024 * 5000}, (err, stdout, stderr) => {
                                if (err) {
                                    console.log(`error: ${err}`);
                                    return;
                                }

                                console.log("Executable created");
                                // Start Gexp Application
                                setTimeout(function(){
                                    let path;
                                    if(production == true)
                                        path = getClientInfo().appPath+getClientInfo().dirPath;
                                    else path =  getClientInfo().dirPath;
                                    // Node start Animation
                                    updateScreen("nodeStart");
                                    action("nodeStart");

                                    ipcRenderer.send('startGexp', path);
                                    ipcRenderer.on('startGexpResponse', (event, res) => {
                                        console.log(res)
                                        if(res == true){
                                            setTimeout(function(){
                                                connectWeb3();
                                                console.log("connectWeb3");
                                            },2000)
                                        }else{
                                            updateScreen("connectionError");
                                            action("connectionError");
                                        }
                                        console.log(event)
                                    });
                                },1000)

                            });
                        }catch(e){
                            Raven.captureException(e);
                            console.log(e);
                        }
                    }
                });
            }catch(e){
                Raven.captureException(e);
                console.log(e);
            }
        }else if(os.type() == 'Windows_NT'){
            try{

                decompress(filePath, './').then(files => {
                    shell.cd('..');
                    console.log("Decompressed!");
                    updateScreen("downloadNode");
                    action("downloadNode");
                    //  MAKE GEXP FILE EXECUTABLE
                    shell.cd(dlData.dirPath);

                    setTimeout(function(){
                        let path;
                        if(production == true)
                            path = getClientInfo().appPath+getClientInfo().dirPath;
                        else path =  getClientInfo().dirPath;
                        // Node start Animation
                        updateScreen("nodeStart");
                        action("nodeStart");

                        ipcRenderer.send('startGexp', path);
                        ipcRenderer.on('startGexpResponse', (event, res) => {
                            console.log(res)
                            if(res == true){
                                setTimeout(function(){
                                    connectWeb3();
                                    console.log("connectWeb3");
                                },2000)
                            }else{
                                updateScreen("connectionError");
                                action("connectionError");
                            }
                            console.log(event)
                        });
                    },1000)
                });
            }catch(e){
                Raven.captureException(e);
                console.log(e);
            }
        }
        // Do something after request finishes
    }).pipe(fs.createWriteStream('gexp.zip'));
}



const chainErrorHandle = () => {
    shell.cd('');
    shell.cd("AppData\\Roaming\\Expanse");
    console.log(shell.ls(''));
    try{
        shell.rm('-rf','/gexp');
        // exec('del gexp', {maxBuffer: 1024 * 5000}, (err, stdout, stderr) => {
        //     console.log("Folder Delete",err, stdout, stderr);
        //     if (err) {
        //         console.log(`error: ${err}`);
        //         return;
        //     }
        //     console.log("Folder Delete");
        // });
    }catch(e){
        Raven.captureException(e);
        console.log(e);
    }
}

export { loadingProgress, chainErrorHandle }