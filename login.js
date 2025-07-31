const { ipcRenderer } = import('electron');

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

    if (!response.ok) throw new Error('Erro na requisição: ' + response.statusText);

    const html = await response.text();

    if (html === 'usuario ou senha incorreto') {
      document.getElementById('rep').innerHTML = html;
    } else {
      // Salva no store via ipcRenderer
      await ipcRenderer.invoke('set-user', { id: html });

      // Troca para a página principal
      ipcRenderer.send('trocar-pagina', 'pagina');
    }
  } catch (error) {
    console.error('Request failed: ' + error.message);
  } finally {
    console.log('Requisição finalizada');
  }
}

function outrapagina() {
  ipcRenderer.send('trocar-pagina', 'Cadastro');
}