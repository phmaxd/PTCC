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
    Preencher();
    return;
  }

  const data = new URLSearchParams();
  data.append("n1", n1);
  data.append("n2", n2);

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
    const pata = await response.json();
    if (pata.data != "usuario ou senha incorreto") {
      if (pata.data[0].funcao == "adm") {
       Login();
       window.pagina = "pagina";
        window.name = JSON.parse(pata.data[0].id); //variavel global window, não le JSON

      }else{
        Login();
        window.pagina = "entrada";
        window.name = pata.data[0].nome;
      }        
    } else {
        Incorreto();
    }
    
}

  } catch (error) {
    console.error("Request failed: " + error.message);
    Erro();
  } finally {
    console.log("Requisição finalizada");
  }
}

