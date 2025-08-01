import { app, BrowserWindow, ipcMain } from "electron"; // Usando import para ESM
import path from "path"; // Usando import para ESM
import store from "./store.js"; // Importando o store como um módulo ES

// __dirname não está disponível em módulos ES por padrão.
// Precisamos recriá-lo ou usar import.meta.url
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "BIOID",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.webContents.openDevTools();

  win
    .loadFile("login.html")
    .then(() => {
      console.log("login.html carregado");
    })
    .catch((err) => {
      console.error("erro", err);
    });

 ipcMain.handle("set-user", async (event, userData) => {
    try {
        store.set("user", userData); // Salva o usuário
        return { success: true };
    } catch (error) {
        console.error("Erro ao salvar usuário:", error);
        return { success: false, error: error.message };
    }
});

ipcMain.handle("get-user", async () => {
    try {
        return store.get("user"); // Retorna o usuário salvo
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        return null; // Retorna null se houver erro
    }
});


  ipcMain.handle("trocar-pagina", async (event, pagina) => {
    console.log(`tentando carregar a pagina: ${pagina}`);
    try {
      switch (pagina) {
        case "Cadastro":
          await win.loadFile("Cadastro.html");
          break;
        case "login":
          await win.loadFile("login.html");
          break;
        case "pagina":
          await win.loadFile("pagina.html");
          break;
        default:
          console.log("pagina desconhecida", pagina);
          return { success: false, error: "Página desconhecida" };
      }
      return { success: true };
    } catch (error) {
      console.error("Erro ao trocar página:", error);
      return { success: false, error: error.message };
    }
  });

  win.on("closed", () => {
    console.log("janela foi fechada");
  });

  win.webContents.on("did-finish-load", () => {
    console.log("a pagina foi carregada/recarregada");
  });
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
  console.log("App encerrado");
});

process.on("uncaughtException", (err) => {
  console.error("ERRO NÃO TRATADO: ", err);
});
