const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const store = require('./store');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'BIOID',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.webContents.openDevTools();

  win.loadFile('login.html').then(() => {
    console.log('login.html carregado');
  }).catch(err => {
    console.error('erro', err);
  });

  ipcMain.handle('set-user', (event, html) => {
    store.set('user', html);
  });

  ipcMain.handle('get-user', () => {
    return store.get('user');
  });

  ipcMain.on('trocar-pagina', (event, arg) => {
    console.log(`tentando carregar a pagina: ${arg}`);
    switch (arg) {
      case 'Cadastro':
        win.loadFile('Cadastro.html').catch(console.error);
        break;
      case 'login':
        win.loadFile('login.html').catch(console.error);
        break;
      case 'pagina':
        win.loadFile('pagina.html').catch(console.error);
        break;
      default:
        console.log('pagina desconhecida', arg);
    }
  });

  win.on('closed', () => {
    console.log('janela foi fechada');
  });

  win.webContents.on('did-finish-load', () => {
    console.log('a pagina foi carregada/recarregada');
  });
};

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
  console.log('App encerrado');
});

process.on('uncaughtException', (err) => {
  console.error('ERRO NÃO TRATADO: ', err);
});
