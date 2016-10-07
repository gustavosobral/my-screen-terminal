const electron = require('electron')

const app = electron.app

const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL(`file://${__dirname}/app/index.html`)

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

const Pusher = require('pusher-js/node')

const pusher = new Pusher('02cdc5ce216d575e7d41', {
  encrypted: true
})
const channel = pusher.subscribe('test_channel')

channel.bind('my_event', function(data) {
  console.log(data.message)
})
