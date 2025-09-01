const { contextBridge, ipcRenderer } = require("electron")

// Expor APIs seguras para o renderer process
contextBridge.exposeInMainWorld("electronAPI", {
  // trocar de página, podendo enviar um RM junto
  trocarPagina: (pagina) => ipcRenderer.invoke("trocar-pagina", pagina),

});