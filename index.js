const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');
const Store = require('electron-store').default;
const store = new Store();

const createWindow = () => {
    const win = new BrowserWindow({
        width:800,
        height: 600,
        title:'Meu projeto',
        webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    })

    win.loadFile('login.html')

    ipcMain.on('trocar-pagina', (event, arg) => {
    if  (arg === 'Cadastro') {
      win.loadFile('Cadastro.html')
    }
    else if (arg === 'login') {
      win.loadFile('login.html')
    } 
    else if(arg === 'pagina'){
      win.loadFile('pagina.html')
    }
    else{
      alert ("como assim caralho?")
    }
})
}
    app.whenReady().then(() => {
        createWindow()
    })
    app.on('window-all-closed', () => {
        if (process.plataform !== 'darwin') app.quit()
    })