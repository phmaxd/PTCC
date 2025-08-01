document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login");
  // const cadastroBtn = document.getElementById("cadastro"); // 'cadastro' não existe no login.html

  if (loginBtn) {
    loginBtn.addEventListener("click", recebe);
  }

  // Adicionar listener para o botão "Esqueci minha senha"
  const forgotPasswordBtn = document.querySelector('button:last-of-type'); // Seleciona o último botão
  if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener('click', () => {
      // Trocar para a página de "Esqueci minha senha"
      window.electronAPI.trocarPagina('Esqueci'); // Assumindo que você terá um Esqueci.html
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
    const response = await fetch("http://localhost/banco/login.php", {
    method: "POST",
    credentials: "include",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data.toString(),
});

if (response.ok) {
    const pata = await response.json();
    if (pata.data !== "usuario ou senha incorreto") {
        const userData = {
            id: pata.data,
            // outras informações que você deseja salvar
        };
        const result = await window.electronAPI.setUser (userData);
        // Verifique se o usuário foi salvo com sucesso
        console.log("Usuário salvo:", result);
        alert(userData['id']);
        await window.electronAPI.trocarPagina('pagina');
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
