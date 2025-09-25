document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login");
  if (loginBtn) {
    loginBtn.addEventListener("click", recebe);
  }

  const forgotPasswordBtn = document.getElementById('Esqueci');
  if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener('click', async () => {
      await window.electronAPI.trocarPagina('Esqueci');
    });
  }
});

async function recebe() {
  const n1 = document.getElementById("nome").value;
  const n2 = document.getElementById("senha").value;
  if (!n1 || !n2) {
    document.getElementById("rep").innerText = "Por favor, preencha todos os campos";
    return;
  }

  const data = new URLSearchParams();
  data.append("n1", n1);
  data.append("n2", n2);

  try {
    const response = await fetch("http://localhost/banco/Php/login.php", {
    method: "POST",
    credentials: "include",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data.toString(),
});
if (response.ok) {
    const pata = await response.json();
    if (pata.data != "usuario ou senha incorreto") {
      if (pata.data[0].funcao == "adm") {
        alert("Administrador logado com sucesso")
        window.name = JSON.parse(pata.data[0].id); //variavel global window, não le JSON
        await window.electronAPI.trocarPagina('pagina');
      }else{
        alert("Funcionario logado com sucesso")
        await window.electronAPI.trocarPagina('entrada');
        window.name = pata.data[0].nome;
      }        
    } else {
        document.getElementById("rep").innerText = pata.data;
    }
    
}

  } catch (error) {
    console.error("Request failed: " + error.message);
    document.getElementById("rep").innerText = "Erro de conexão. Tente novamente.";
  } finally {
    console.log("Requisição finalizada");
  }
}

async function outrapagina() {
  const result = await window.electronAPI.trocarPagina("Cadastro");
  if (!result.success) {
    console.error("Erro ao trocar página:", result.error);
  }
}
