import { electron, app, BrowserWindow, Menu , shell , ipcMain } from 'electron'
import { spawn } from 'child_process';
import shelljs from 'shelljs';

import {production} from "./libs/config";
import appPath from 'path';
import Raven from 'raven';
import solc from 'solc';
import os from 'os';
var gexpProc ;

ipcMain.on('ComplieContract', (event , sourceCode) => {
        // var source = 'contract myFirstContract { function g() {} }'
        // Setting 1 as second paramateractivates the optimiser
        let compiledContract = solc.compile(sourceCode, 1);
        setTimeout(function(){
            event.sender.send('CompliedContract', compiledContract)
        })
    
    
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
  mainWindow = new BrowserWindow({
    height: 763,
    useContentSize: true,
    width: 1400
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



    // ipcMain.on('ChangeWindowSize', (event, obj) => {
  //   windowSize = obj
  // })


  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})


const runGexp = (path) => {
    // console.log("startGexp:path",path);
    try {
        console.log("startingGEXP");
        let runFile = './gexp';
        //if (os.type() == 'Windows_NT') { runFile = 'gexp.exe' } else { runFile = './gexp' }

        shelljs.cd(path);
        try {
            var keyArgs = ['--rpc', '--rpcapi=eth,web3,personal,admin,miner,db,net,utils']
            console.log("Starting Gexp Process");
            gexpProc = spawn(runFile, keyArgs, {maxBuffer: 1024 * 5000}, {
                shell: true
            });
            gexpProc.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
                // mainWindow.webContents.send('gexpLogs', JSON.stringify(data));
                
                    var textChunk = data.toString('utf8');
                    mainWindow.webContents.send('gexpLogs', JSON.stringify(textChunk));
                    // process utf8 text chunk
            });

            gexpProc.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
               
                    var textChunk = data.toString('utf8');
                    mainWindow.webContents.send('gexpLogs', JSON.stringify(textChunk));
                    // process utf8 text chunk
               
               
            });

            gexpProc.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
                mainWindow.webContents.send('gexpLogs', JSON.stringify(data));
            });
        } catch (e) {
            console.log("Error:", e);
        }
        return true
    } catch (e) {

        console.log(e);
    }
};



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

function archievedAccounts()
{
    var ArchievedAccountsWindow = new BrowserWindow({
        width: 750,
        height: 500,
        frame: true,
        transparent: false,
        show: true, //  show the main window
        resizable: true
    });
    // create a new Add Account
    ArchievedAccountsWindow.loadURL(`http://localhost:9080/archiveAccounts`);
    // if main window is ready to show, then destroy the splash window and show up the main window
    ArchievedAccountsWindow.once('ready-to-show', () => {
        ArchievedAccountsWindow.show();
    });
}

// Starting Main Net from menu
function startMainNet(){
    try{
        gexpProc.kill();
        mainWindow.webContents.send('showLoading')

        setTimeout(function(){
            let runFile;
            if(os.type() == 'Windows_NT')
                runFile = 'gexp.exe --rpc --rpcaddr="0.0.0.0" --rpccorsdomain="*" --rpcapi="db,eth,net,web3,personal,utils"'
            else
                runFile = './gexp --rpc --rpcaddr="0.0.0.0" --rpccorsdomain="*" --rpcapi="db,eth,net,web3,personal,utils"'

            try{
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
        console.log("STarting TEST NET");
        gexpProc.kill();
        console.log("text net starting");
        // mainWindow.webContents.send('showLoading')
        console.log(shelljs.ls(''));
        setTimeout(function(){
            let runFile;
            if(os.type() == 'Windows_NT')
                runFile = 'gexp.exe --rpc --rpcaddr="0.0.0.0" --rpccorsdomain="*" --rpcapi="db,eth,net,web3,personal,utils" --testnet'
            else
                runFile = './gexp --rpc --rpcaddr="0.0.0.0" --rpccorsdomain="*" --rpcapi="db,eth,net,web3,personal,utils" --testnet'
            try{
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
                Raven.captureException(e);
            }
            // setTimeout(function(){
            //     mainWindow.reload();
            // },4000)
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
