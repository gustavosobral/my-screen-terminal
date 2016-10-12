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

// Pusher

// Get X-Terminal-Token from auth response
const Pusher = require('pusher-js/node')
const pusher = new Pusher('02cdc5ce216d575e7d41', {
  encrypted: true,
  authEndpoint: 'http://localhost:3000/api/v1/login_channel',
    auth: {
      headers: {
        'X-Api-Token': '',
        'X-Terminal-Token': '',
        'X-Terminal-Title': ''
      }
    }
})

// Get ownerId from auth response
var presenceChannel = pusher.subscribe('presence-user-' + ownerId);

// Get terminal id from auth response
var privateChannel = pusher.subscribe('private-terminal-' + id);
privateChannel.bind('new_playlist', function(data) {
  console.log(data)
})
