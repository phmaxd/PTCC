const { app, BrowserWindow, ipcMain } = import('electron');
const path = import('path');
const store = import('./store.js');

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

    win.loadFile('login.html');
  
ipcMain.handle('set-user', (event, user) => {
  store.set('user', user);
});

ipcMain.handle('get-user', () => {
  return store.get('user');
});
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
      console.log('como assim caralho?', arg);
    }
})
}
    app.whenReady().then(() => {
        createWindow()
    });
    app.on('ready', () => {
  console.log('App pronto');
});

process.on('uncaughtException', (err) => {
  console.error('ERRO NÃO TRATADO: ', err);
});
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    });