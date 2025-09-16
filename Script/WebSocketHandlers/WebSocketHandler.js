import WebSocket, { WebSocketServer } from 'ws';
import { cadastrar_digital } from '../WebSocketHandlers/cadastrar_digital.js';
let esp32Client = null;

export function setupWebSocket(mainWindow, ipcMain) {

  const wss = new WebSocketServer({ port: 8080 });
  console.log('Servidor WS rodando na porta 8080');


  // Função para pegar o resultado do cadastro de digital------------------------------------------
  async function cadastrar(jsonData) {
    const result = await cadastrar_digital(jsonData);
    if (result.status === 'sucesso') {
      console.log('Digital cadastrada com sucesso');
    }else {
      console.error('Erro ao cadastrar morango do amor digital:', result.error);
    }
    return result
  }
//-----------------------------------------------------------------------------------------------
  wss.on('connection', (ws) => {
    console.log('Novo cliente conectado!');
    esp32Client = ws;

    
    esp32Client.on('message', async (data) => {
    const jsonData = JSON.parse(data);
    console.log(jsonData);

    if (jsonData.acao === 'digital_cadastrada') {
       let resultadoCadastro = await cadastrar(jsonData);
       if (resultadoCadastro.status === 'sucesso') {
          if (esp32Client && esp32Client.readyState === WebSocket.OPEN) {
        esp32Client.send(JSON.stringify(resultadoCadastro));
        console.log('Mensagem enviada para o ESP32:', resultadoCadastro);
      } else {
        console.log('ESP32 não está conectado!');
      }
     }
       }
    console.log('Mensagem recebida do ESP32:', jsonData);

    if(mainWindow){
      mainWindow.webContents.send('esp32-msg', jsonData);
    }
  })

  
  });

//Usa o IPCMain para receber mensagens do Renderer e enviar para o ESP32
  ipcMain.on("fromRenderer", (event, msg) => {
    console.log("Main recebeu do Renderer:", msg);

    if (esp32Client && esp32Client.readyState === WebSocket.OPEN) {
      esp32Client.send(JSON.stringify(msg));
    } else {
      console.log("ESP32 não está conectado!");
    }
  })
};
