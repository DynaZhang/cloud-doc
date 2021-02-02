const {app, BrowserWindow} = require('electron')
const isDev = require('electron-is-dev')
let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  console.log(isDev)
  const urlLocation = isDev ? 'http://localhost:3000' : 'null'
  mainWindow.loadURL(urlLocation)
  
})

