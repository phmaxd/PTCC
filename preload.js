const { contextBridge, ipcRenderer } = require("electron")

// Expor APIs seguras para o renderer process
contextBridge.exposeInMainWorld("electronAPI", {
  trocarPagina: (pagina) => ipcRenderer.invoke("trocar-pagina", pagina),
});
