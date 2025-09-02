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
  const n3 = 1;
  if (!n1 || !n2) {
    document.getElementById("rep").innerText = "Por favor, preencha todos os campos";
    return;
  }

  const data = new URLSearchParams();
  data.append("n1", n1);
  data.append("n2", n2);
  data.append("n3", n3);
  try {
    const response = await fetch("http://localhost/ETEC/3MIN/TCC/bioid/Php/login.php", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data.toString(),
    });

    if (response.ok) {
      const pata = await response.text();
      console.log("Resposta do servidor:", pata);
      if (pata !== "usuario ou senha incorreto") {
      // Supondo que o servidor retorna "adm" ou "funcionario" como texto
      if (pata === "adm") {
        alert("Administrador logado com sucesso");
        await window.electronAPI.trocarPagina('pagina');
      } else if (pata === "funcionario") {
        alert("Funcionario logado com sucesso");
        await window.electronAPI.trocarPagina('entrada');
      } else {
        document.getElementById("rep").innerText = "Resposta inesperada do servidor.";
      }
      } else {
      document.getElementById("rep").innerText = pata;
      }
    } else {
      document.getElementById("rep").innerText = "Erro ao conectar ao servidor.";
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
