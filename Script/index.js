import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { setupWebSocket } from "./WebSocketHandlers/WebSocketHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let splash;
let mainWindow;



function createWindows() {
  // Splash screen
  splash = new BrowserWindow({
    width: 300,
    height: 230,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    resizable: false,
    center: true,
  });

  splash.loadFile(path.join(__dirname, "../Html/splash.html"));

  // Fechar splash e abrir mainWindow depois de 2 segundos
  splash.once("ready-to-show", () => {
    setTimeout(() => {
      splash.close();

      // Agora cria a janela principal
      mainWindow = new BrowserWindow({
        show: false,
        title: "BIOID",
        icon: path.join(__dirname, "../Imagens/favicon.ico"),
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true,
          enableRemoteModule: false,
          preload: path.join(__dirname, "../Script/preload.js"),
        },
        
      });
setupWebSocket(mainWindow, ipcMain);

      mainWindow.loadFile(path.join(__dirname, "../Html/login.html"))
        .then(() => console.log("login.html carregado"))
        .catch((err) => console.error("erro", err));

      mainWindow.once("ready-to-show", () => {
        mainWindow.show();
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
              await mainWindow.loadFile("Html/Cadastro.html");
              break;
            case "login":
              await mainWindow.loadFile("Html/login.html");
              break;
            case "pagina":
              await mainWindow.loadFile("Html/pagina.html");
              break;
            case "entrada":
              await mainWindow.loadFile("Html/entrada.html");
              break;
            case "Esqueci":
              await mainWindow.loadFile("Html/Esqueci.html");
              break;
            case "CadastroDigital":
              await mainWindow.loadFile("Html/CadastroDigital.html");
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

    }, 2000); // Delay opcional
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
