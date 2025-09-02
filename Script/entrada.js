document.getElementById("Enviar").addEventListener("click", enviar);

async function enviar(event) {
  event.preventDefault(); // impede refresh do form
  try {
    var Rm = document.getElementById("Rm").value.trim();

    const data = new URLSearchParams();
    data.append('Rm', Rm);

    const response = await fetch("http://localhost/ETEC/3MIN/TCC/bioid/Php/digital.php", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: data.toString()
    });

    const text = await response.text();
    const info = JSON.parse(text);

    if (info.success && info.data.length > 0) {
      let aluno = info.data[0]; // pega o primeiro registro
      let modal = document.getElementById("confirmModal");
      let modalContent = document.getElementById("modalContent");

      modalContent.innerHTML = `
  <strong>Nome:</strong> ${aluno.nome} <br>
  <strong>RM:</strong> ${aluno.rm} <br>
  <button id="confirmBtn" style="margin-right:10px;">Confirmar</button>
  <button id="cancelBtn">Cancelar</button>
`;
      modal.style.display = "flex";

      // Ações do modal
      document.getElementById("confirmBtn").onclick = async function() {
        window.name = document.getElementById("Rm").value.trim();
        await window.electronAPI.trocarPagina("CadastroDigital");
        modal.style.display = "none";
      };
      document.getElementById("cancelBtn").onclick = function() {
        modal.style.display = "none";
        alert("❌ Cancelado, não é o aluno correto.");
      };
    } else {
      alert(info.message || "Usuário não encontrado");
    }
  } catch (error) {
    console.error("Erro ao carregar a página:", error);
  }
}

// Carrega cards na tela
window.onload = async function () {
  try {
    const response = await fetch("http://localhost/ETEC/3MIN/TCC/bioid/Php/acesso.php", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (response.ok) {
      const info = await response.json();
      var texto = document.getElementById('content');
      if (texto && Array.isArray(info.data)) {
        if (!document.getElementById('cards-style')) {
          const style = document.createElement('style');
          style.id = 'cards-style';
          style.innerHTML = `
            #content {
              display: flex; flex-wrap: wrap; gap: 16px;
              margin-top: 16px; justify-content: flex-start; padding: 0;
            }
            #content .linha-tabela {
              display: flex; padding: 0; border: none; background: none; width: auto;
            }
            #content .card {
              width: 100%; min-width: 180px; max-width: 250px; box-sizing: border-box;
            }
            @media (max-width: 600px) {
              #content { flex-direction: column; align-items: stretch; }
              #content .linha-tabela { width: 100%; }
              #content .card { max-width: 100%; }
            }
          `;
          document.head.appendChild(style);
        }

        texto.innerHTML = '';
        info.data.forEach(function(dados) {
          var linha = document.createElement('tr');
          linha.classList.add('linha-tabela');
          linha.innerHTML = `
            <td style="padding:0; border:none;">
              <div class="card" style="
                box-sizing: border-box; padding: 10px; border: 1px solid #ccc;
                margin: 0; display: flex; flex-direction: column;
                min-width: 180px; max-width: 100%;
              ">
                <img src="http://localhost/imagens/${dados.imagem}" 
                     alt="Imagem do Card" 
                     style="width: 80px; height: 80px; object-fit: cover;
                            border-radius: 4px; margin-bottom: 8px;">
                <div><strong>Nome:</strong> ${dados.nome}</div>
                <div><strong>RM:</strong> ${dados.rm}</div>
              </div>
            </td>
          `;
          texto.appendChild(linha);
        });
      }
    }
  } catch (error) {
    console.error("Erro ao carregar a página:", error);
  }
}
        async function outrapagina() {
  const result = await window.electronAPI.trocarPagina("CadastroDigital");
  if (!result.success) {
    console.error("Erro ao trocar página:", result.error);
  }
}

function Deslogar(){
if(confirm("Deseja realmente deslogar?")){
    window.electronAPI.trocarPagina("login");
}else{
    return;
}

}