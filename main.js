const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({center: true, width: 1300, height: 700, minWidth: 1300, minHeight: 700, fullscreenable: true, center: true})
  mainWindow.loadURL(`file://${__dirname}/app/index.html`)

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)
