const { contextBridge, ipcRenderer } = require("electron")

// Expor APIs seguras para o renderer process
contextBridge.exposeInMainWorld("electronAPI", {
  setUser: (userData) => ipcRenderer.invoke("set-user", userData),
  getUser: () => ipcRenderer.invoke("get-user"),
  trocarPagina: (pagina) => ipcRenderer.invoke("trocar-pagina", pagina),
});
