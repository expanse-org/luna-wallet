import { electron, app, BrowserWindow, Menu , shell , ipcMain } from 'electron'
import { spawn } from 'child_process';
import shelljs from 'shelljs';


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
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)
  try {
      const menu = Menu.buildFromTemplate(template)
      Menu.setApplicationMenu(menu)
  } catch (e) {
      console.log("Error:",e);
  }


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

// ipcMain.on('asynchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.sender.send('asynchronous-reply', 'pong')
// })
//
// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.returnValue = 'pong'
// })

import store from '../renderer/store'

const action = (gexpres) => {
    console.log("storee Action");
    console.log(gexpres,"gexpres gexpres gexpres gexpres");
    store.dispatch('addGexpres', gexpres)
};

// Recieving call from loading html and starting gexp
ipcMain.on('startGexp', (event, path) => {
    console.log("startGexp:path ipcMain",path);
    let res = runGexp(path);
    console.log("res:gexpresgexpresgexpresgexpres",res);
    action(res);
    // event.returnValue = res
    // if(res)
    //     splash.webContents.send('startGexpResponse', res)
})

// setTimeout(function() {
//     runGexp('binaries');
// }, 2000);

const runGexp = (path) => {
    console.log("startGexp:path",path);
    try {
        console.log("startingGEXP");
        let runFile = './gexp';
        var gexpProc ;
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
            });

            gexpProc.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
            });

            gexpProc.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
            });
        } catch (e) {
            console.log("Error:", e);
        }
        return true
    } catch (e) {

        console.log(e);
    }
}

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
                label: 'Back Up',
                click () { backup() }
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


// Menu.setApplicationMenu(null)
// Back up Files .. Expanse keystore
function backup () {
    try {
        let userPath = app.getPath('home')
        let appDataPath = app.getPath('appData')
        if (process.platform === 'darwin') {
            userPath += '/Library/Expanse/keystore'
        }

        if (
            process.platform === 'freebsd' ||
            process.platform === 'linux' ||
            process.platform === 'sunos'
        ) {
            userPath += '/.expanse/keystore'
        }

        if (process.platform === 'win32') {
            userPath = `${appDataPath}\\Expanse\\keystore`
        }
        // shell.showItemInFolder(userPath)
    } catch (e) {
        console.log("Error:",e);
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
