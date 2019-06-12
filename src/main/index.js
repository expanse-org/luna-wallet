import { electron, app, BrowserWindow, Menu , shell , ipcMain } from 'electron'
import { spawn } from 'child_process';
import shelljs from 'shelljs';
var path = require('path')
const low = require('lowdb')

import * as $ from 'jquery';
import {production} from "./libs/config";
import appPath from 'path';
import Raven from 'raven';
import solc from 'solc';
import os from 'os';
import {connectWeb3} from "../common/web3Config";
const { autoUpdater } = require("electron-updater");

var gexpProc ;


ipcMain.on('ComplieContract', (event , sourceCode) => {
        // var source = 'contract myFirstContract { function g() {} }'
        // Setting 1 as second paramateractivates the optimiser
        let compiledContract = solc.compile(sourceCode, 1);
        setTimeout(function(){
            event.sender.send('CompliedContract', compiledContract)
        },500)


});


/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
   console.log(path.join(__dirname))
  mainWindow = new BrowserWindow({
    height: 763,
    useContentSize: true,
    width: 1400,
  })


  mainWindow.loadURL(winURL)
  try {
      const menu = Menu.buildFromTemplate(template)
      Menu.setApplicationMenu(menu)
  } catch (e) {
      console.log("Error:",e);
  }

    ipcMain.on('startGexp', (event, path) => {
        // console.log("startGexp:path ipcMain",path);
        let res = runGexp(path);
        // console.log("res:gexpresgexpresgexpres",res);
        event.sender.send('startGexpResponse', res)
    });
    mainWindow.webContents.on('will-navigate', (event) => event.preventDefault());


    mainWindow.on('closed', () => {
    mainWindow = null;
    gexpProc.kill();
      app.quit();
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', (event) => {
    event.preventDefault();

    console.log("i called")
    gexpProc.kill();
   // app.quit();
   //
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
});



let chainError = false;
const runGexp = (path) => {
    // console.log("startGexp:path",path);
    try {
        console.log("startingGEXP");
        var runFile = '';
        if (os.type() == 'Windows_NT') { runFile = 'gexp.exe' } else { runFile = './gexp' }

        shelljs.cd(path);
        try {
            var keyArgs = ['--ws', '--wsaddr=0.0.0.0', '--wsorigins=*', '--wsapi=db,eth,net,web3,personal,utils'];

            console.log("keyArgs", keyArgs);
            gexpProc = spawn(runFile, keyArgs, {maxBuffer: 1024 * 5000}, {
                shell: true
            });
            // console.log("gexpProc",gexpProc);
            try{
                gexpProc.stdout.on('data', (data) => {
                    console.log(`stdout: ${data}`);
                // mainWindow.webContents.send('gexpLogs', JSON.stringify(data));

                    let textChunk = data.toString('utf8');
                    if(mainWindow){
                        mainWindow.webContents.send('gexpLogs', JSON.stringify(textChunk));
                    }

                    // process utf8 text chunk
                });
            }catch(e){
                console.log("erroer", e);
            }
            try{
                gexpProc.stderr.on('data', (data) => {
                    console.log(`stderr: ${data}`);
                    let textChunk = data.toString('utf8');
                        if(mainWindow){
                            mainWindow.webContents.send('gexpLogsstder', JSON.stringify(textChunk));
                            if(textChunk.includes('Rewinding blockchain')){
                            // if(data.toString('utf8') && data.toString('utf8').split(' ')[2] === "Head" && data.toString('utf8').split(' ')[3] === "state" && data.toString('utf8').split(' ')[4] === "missing,"  && data.toString('utf8').split(' ')[5] === "repairing" && data.toString('utf8').split(' ')[6] === "chain"){
                                console.log("chainrRepairError ");
                                chainError = true;
                                gexpProc.kill();
                                mainWindow.webContents.send('chainrRepairError', true);
                            } else if (!chainError) {
                                if(textChunk.includes('WebSocket endpoint opened') || textChunk.includes('url=ws://[::]:9657')){
                                    mainWindow.webContents.send('connectwebgexp', true);
                                }
                                if(textChunk === "Fatal: Error starting protocol stack: datadir already used by another process\n"){
                                    console.log("gexpStartAlready");
                                    mainWindow.webContents.send('gexpStartAlready', true);
                                    runMineGexp();
                                }
                            }
                        }
                        // process utf8 text chunk
                });
            }catch(e){
                console.log("Error",e);
            }
            try{
                gexpProc.on('close', (code) => {
                    console.log(`child process exited with code ${code}`);
                    // var textChunk = code.toString('utf8');
                    // mainWindow.webContents.send('gexpLogs', JSON.stringify(textChunk));
                });
            }catch(e){
                console.log("Error",e);
            }
        } catch (e) {
            console.log("Error:", e);
        }
        return true;
    } catch (e) {

        console.log(e);
    }
};

const runMineGexp = () => {
    // console.log("startGexp:path",path);
    try {
        console.log("startingGEXP");

        mainWindow.webContents.send('connectwebgexp', true);
        return true;
    } catch (e) {

        console.log(e);
    }
};



ipcMain.on('killGexp', (event) => {
    try{
        let res = gexpProc.kill();
        console.log(res);
        setTimeout(function(){
            event.sender.send('killGexpresponse', res);
        },500)
    }catch(e){
        Raven.captureException(e);
    }
});

const template = [
    {
        label: 'Edit',
        submenu: [
            {role: 'undo'},
            {role: 'redo'},
            {type: 'separator'},
            {role: 'cut'},
            {role: 'copy'},
            {role: 'paste'},
            {role: 'pasteandmatchstyle'},
            {role: 'delete'},
            {role: 'selectall'}
        ]
    },
    {
        label: 'View',
        submenu: [
            {role: 'reload'},
            {role: 'forcereload'},
            {role: 'toggledevtools'},
            {type: 'separator'},
            {role: 'resetzoom'},
            {role: 'zoomin'},
            {role: 'zoomout'},
            {type: 'separator'},
            {role: 'togglefullscreen'}
        ]
    },
    {
        role: 'window',
        submenu: [
            {role: 'minimize'},
            {role: 'close'}
        ]
    },
    {
        label: 'Develop',
        submenu: [
            {
                label: 'Main Net',
                click () { startMainNet();}
            },
            {
                label: 'Test Net',
                click () { startTestNet();}
            },
            {
                label: 'Back Up',
                click () { backup();}
            },
            {
                label: 'Archived Accounts',
                click () { archievedAccounts();}
            }
        ]
    }
]

if (process.platform === 'darwin') {
    template.unshift({
        label: app.getName(),
        submenu: [
            {role: 'about'},
            {type: 'separator'},
            {role: 'services', submenu: []},
            {type: 'separator'},
            {role: 'hide'},
            {role: 'hideothers'},
            {role: 'unhide'},
            {type: 'separator'},
            {role: 'quit'}
        ]
    })

    // Edit menu
    template[1].submenu.push(
        {type: 'separator'},
        {
            label: 'Speech',
            submenu: [
                {role: 'startspeaking'},
                {role: 'stopspeaking'}
            ]
        }
    )

    // Window menu
    template[3].submenu = [
        {role: 'close'},
        {role: 'minimize'},
        {role: 'zoom'},
        {type: 'separator'},
        {role: 'front'}
    ]
}


function backup(){
    try{
        let userPath = app.getPath('home');
        let appDataPath = app.getPath('appData');
        if (process.platform === 'darwin') {
            userPath += '/Library/Expanse/keystore';
        }

        if (
            process.platform === 'freebsd' ||
            process.platform === 'linux' ||
            process.platform === 'sunos'
        ) {
            userPath += '/.expanse/keystore';
        }

        if (process.platform === 'win32') {
            userPath = `${appDataPath}\\Expanse\\keystore`;
        }
        shell.showItemInFolder(userPath);
    }catch(e){
        Raven.captureException(e);
    }
}


function chainRepair(){
    try{
        let userPath = app.getPath('home');
        let appDataPath = app.getPath('appData');
        if (process.platform === 'darwin') {
            userPath += '/Library/Expanse';
        }
        if (
            process.platform === 'freebsd' ||
            process.platform === 'linux' ||
            process.platform === 'sunos'
        ) {
            userPath += '/.expanse';
        }
    
        if (process.platform === 'win32') {
            userPath = `${appDataPath}\\Expanse`;
        }
        //console.log("chainrRepairError ", shell.openItem(userPath));
    }catch(e){
        console.log("chainRepair  function call -----------------catch----------", e);
        Raven.captureException(e);
    }
}
var ArchievedAccountsWindow;
function archievedAccounts()
{
    ArchievedAccountsWindow = new BrowserWindow({
        width: 750,
        height: 500,
        frame: true,
        transparent: false,
        show: true, //  show the main window
        resizable: true
    });
    // create a new Add Account
    const winURL1 = process.env.NODE_ENV === 'development'
        ? `http://localhost:9080/#/archiveAccounts`
        : `file://${__dirname}/index.html#archiveAccounts`

    ArchievedAccountsWindow.loadURL(winURL1);
    // if main window is ready to show, then destroy the splash window and show up the main window
    ArchievedAccountsWindow.once('ready-to-show', () => {
        ArchievedAccountsWindow.show();
    });
}
var gexpLogsWindow ;
function gexpLogs(){
    gexpLogsWindow = new BrowserWindow({
        width: 750,
        height: 500,
        frame: true,
        transparent: false,
        show: true, //  show the main window
        resizable: true
    });
    // create a new Add Account
    gexpLogsWindow.loadURL(`http://localhost:9080/#/gexpLogs`);
    // if main window is ready to show, then destroy the splash window and show up the main window
    gexpLogsWindow.once('ready-to-show', () => {
        gexpLogsWindow.show();
    });
}

// Starting Main Net from menu
function startMainNet(){
    try{
        gexpProc.kill();
        // mainWindow.webContents.send('showLoading')

        setTimeout(function(){
            let runFile;
            if (os.type() == 'Windows_NT') { runFile = 'gexp.exe' } else { runFile = './gexp' }

            try{
                var keyArgs = ['--ws', '--wsaddr=0.0.0.0', '--wsorigins=*', '--wsapi=db,eth,net,web3,personal,utils'];
                // var keyArgs = ['--rpc', '--rpcapi=eth,web3,personal,admin,miner,db,net,utils']
                console.log("Starting Gexp Process");
                gexpProc = spawn(runFile, keyArgs, {maxBuffer: 1024 * 5000}, {
                    shell: true
                });
                gexpProc.stdout.on('data', (data) => {
                    console.log(`stdout: ${data}`);
                });

                gexpProc.stderr.on('data', (data) => {
                    console.log(`stderr: ${data}`);
                });

                gexpProc.on('close', (code) => {
                    console.log(`child process exited with code ${code}`);
                });
            }catch(e){
                Raven.captureException(e);
            }
            setTimeout(function(){
                mainWindow.reload();
            },4000)

        },1000);
    }catch(e){
        Raven.captureException(e);
    }

}
// Start Test Net From Menu
function startTestNet(){
    try{
        gexpProc.kill();
        // mainWindow.webContents.send('showLoading')
        console.log(shelljs.ls(''));
        setTimeout(function(){
            let runFile;
            if (os.type() == 'Windows_NT') { runFile = 'gexp.exe' } else { runFile = './gexp' }

            try{
                var keyArgs = ['--ws', '--wsaddr=0.0.0.0', '--wsorigins=*', '--wsapi=db,eth,net,web3,personal,utils', '--testnet'];
                // var keyArgs = ['--rpc', '--rpcapi=eth,web3,personal,admin,miner,db,net,utils', '--testnet']
                console.log("Starting Gexp Process");
                gexpProc = spawn(runFile, keyArgs, {maxBuffer: 1024 * 5000}, {
                    shell: true
                });

                gexpProc.stdout.on('data', (data) => {
                    console.log(`stdout: ${data}`);
                });

                gexpProc.stderr.on('data', (data) => {
                    console.log(`stderr: ${data}`);
                });

                gexpProc.on('close', (code) => {
                    console.log(`child process exited with code ${code}`);
                });
                console.log("STARTED TEST NET");
            }catch(e){
               console.log("Exception", e);
            }
            setTimeout(function(){
                mainWindow.reload();
            },4000)
        },5000);
    }catch(e){
        Raven.captureException(e);
    }

}

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
