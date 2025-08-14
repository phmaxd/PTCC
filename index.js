import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let splash;
let mainWindow;

function createWindows() {
  // Splash screen
  splash = new BrowserWindow({
    width: 800,
    height: 700,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    resizable: false,
    center: true,
  });

  splash.loadFile(path.join(__dirname, "splash.html"));

  // Janela principal (escondida até estar pronta)
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    title: "BIOID",
    icon: path.join(__dirname, "favicon.ico"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile(path.join(__dirname, "login.html"))
    .then(() => {
      console.log("login.html carregado");
    })
    .catch((err) => {
      console.error("erro", err);
    });

  mainWindow.once("ready-to-show", () => {
    setTimeout(() => {
      splash.close();
      mainWindow.show();
    }, 2000); // Delay opcional
  });

  mainWindow.on("closed", () => {
    console.log("Janela foi fechada");
    mainWindow = null;
  });

  mainWindow.webContents.on("did-finish-load", () => {
    console.log("A página foi carregada/recarregada");
  });

  // Trocar páginas via IPC
  ipcMain.handle("trocar-pagina", async (event, pagina) => {
    console.log(`Tentando carregar a página: ${pagina}`);
    try {
      switch (pagina) {
        case "Cadastro":
          await mainWindow.loadFile("Cadastro.html");
          break;
        case "login":
          await mainWindow.loadFile("login.html");
          break;
        case "pagina":
          await mainWindow.loadFile("pagina.html");
          break;
        case "entrada":
          await mainWindow.loadFile("entrada.html");
          break;
        case "Esqueci":
          await mainWindow.loadFile("Esqueci.html");
          break;
        default:
          console.log("Página desconhecida", pagina);
          return { success: false, error: "Página desconhecida" };
      }
      return { success: true };
    } catch (error) {
      console.error("Erro ao trocar página:", error);
      return { success: false, error: error.message };
    }
  });
}

app.whenReady().then(() => {
  createWindows();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
  console.log("App encerrado");
});

process.on("uncaughtException", (err) => {
  console.error("ERRO NÃO TRATADO: ", err);
});
