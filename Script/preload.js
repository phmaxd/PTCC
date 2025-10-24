  const { contextBridge, ipcRenderer } = require("electron")

  // Expor APIs seguras para o renderer process
  contextBridge.exposeInMainWorld("electronAPI", {
    // trocar de página, podendo enviar um RM junto
    trocarPagina: (pagina) => ipcRenderer.invoke("trocar-pagina", pagina),

    sendToMain: (msg) => {
      console.log("Preload: enviando para o Main ->", msg);
      ipcRenderer.send("fromRenderer", msg);
    },
    onEsp32Msg: (callback) => {
      ipcRenderer.on("esp32-msg", (event, msg) => {
        console.log("Preload: recebeu do Main ->", msg);
        callback(msg);
      });
    }});