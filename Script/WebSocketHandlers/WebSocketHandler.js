import WebSocket, { WebSocketServer } from 'ws';
import { cadastrar_digital } from '../WebSocketHandlers/cadastrar_digital.js';
import { validar_digital } from '../WebSocketHandlers/validar_digital.js';
let esp32Client = null;

export function setupWebSocket(mainWindow, ipcMain) {

  const wss = new WebSocketServer({ port: 8080 });
  console.log('Servidor WS rodando na porta 8080');

  // Função para cadastrar digital
  async function cadastrar(jsonData) {
    const result = await cadastrar_digital(jsonData);
    if (result.status === 'sucesso') {
      console.log('Digital cadastrada com sucesso');
    } else {
      console.error('Erro ao cadastrar digital:', result.error);
    }
    return result;    
  }

  // Função para validar digital
  async function validar(jsonData) {
    const result = await validar_digital(jsonData);
    if (result.status === 'sucesso') {
      console.log('Digital validada com sucesso');
    } else {
      console.error('Erro ao validar digital:', result.error);
    }
    return result;
  }

  wss.on('connection', (ws) => {
    console.log('Novo cliente conectado!');
    esp32Client = ws;

    esp32Client.on('message', async (data) => {
      const jsonData = JSON.parse(data);
      console.log('Mensagem recebida do ESP32:', jsonData);

      if (jsonData.acao === 'digital_cadastrada') {
        let resultadoCadastro = await cadastrar(jsonData);
        if (resultadoCadastro.status === 'sucesso' && esp32Client.readyState === WebSocket.OPEN) {
          esp32Client.send(JSON.stringify(resultadoCadastro));
          console.log('Mensagem enviada para o ESP32:', resultadoCadastro);
        }
      } else if (jsonData.acao === 'verificacao_ok') {
        let resultadoValidacao = await validar(jsonData);
        if (resultadoValidacao.status === 'sucesso') {
          mainWindow.webContents.send('esp32-msg', jsonData);
        }
      }

      // Sempre envia a mensagem pro Renderer
      mainWindow.webContents.send('esp32-msg', jsonData);
    });
  });

  // IPCMain para enviar mensagens do Renderer pro ESP32
  ipcMain.on("fromRenderer", (event, msg) => {
    console.log("Main recebeu do Renderer:", msg);
    if (esp32Client && esp32Client.readyState === WebSocket.OPEN) {
      esp32Client.send(JSON.stringify(msg));
    } else {
      console.log("ESP32 não está conectado!");
    }
  });
};
