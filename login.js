const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('login');
  const cadastroBtn = document.getElementById('cadastro');

  loginBtn.addEventListener('click', recebe);
});

async function recebe() {
  const n1 = document.getElementById("nome").value;
  const n2 = document.getElementById("senha").value;

  const data = new URLSearchParams();
  data.append('n1', n1);
  data.append('n2', n2);

  try {
    const response = await fetch('http://localhost/banco/login.php', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data.toString()
    });

    if (!response.ok) {
      throw new Error('Erro na requisição: ' + response.statusText);
    }

    const html = await response.text();

    if (html === 'usuario ou senha incorreto') {
      document.getElementById('rep').innerText = html;
    } else {
      await ipcRenderer.send('usuario', html);
      ipcRenderer.send('trocar-pagina', 'pagina');
    }
  } catch (error) {
    console.error('Request failed: ' + error.message);
  } finally {
    console.log("Requisição finalizada");
  }
}

function outrapagina() {
  ipcRenderer.send('trocar-pagina', 'Cadastro');
}
