document.getElementById("funcionarios").addEventListener("click", listaFuncionarios);
function listaFuncionarios() {
  window.electronAPI.trocarPagina("pagina");
}
// document.getElementById("sair").addEventListener("click", Deslogar);

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
      let aluno = info.data[0];
      let modal = document.getElementById("confirmModal");

      modal.innerHTML = `
<div class="modal-box" style="
border: #ccc solid 1px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    max-width: 300px;
    text-align: left;
    overflow: hidden;
    font-family: sans-serif;
  ">
    <div style="padding: 25px 20px 25px 20px;">
      <strong>Nome:</strong> ${aluno.nome} <br>
      <strong>RM:</strong> ${aluno.rm} <br>
    </div>

    <div style="
      display: flex;
      border-top: 1px solid #e5e5e5;
    ">
      <button id="cancelBtn" style="
        flex: 1;
        padding: 12px 0;
        background: #ffffff;
        border: none;
        border-right: 1px solid #e5e5e5;
        font-size: 15px;
        color: #333;
        cursor: pointer;
        transition: background 0.2s;
      ">Cancelar</button>

      <button id="confirmBtn" style="
        flex: 1;
        padding: 12px 0;
        background: #ffffffff;
        border: none;
        font-size: 15px;
        color: #333;
        cursor: pointer;
        transition: background 0.2s;
      ">Continuar</button>
    </div>
  </div>
`;

      // Pega os botões do DOM
      const confirmBtn = document.getElementById("confirmBtn");
      const cancelBtn = document.getElementById("cancelBtn");

      // Hover correto
      confirmBtn.addEventListener("mouseenter", () => confirmBtn.style.background = "#d1e7dd");
      cancelBtn.addEventListener("mouseenter", () => cancelBtn.style.background = "#ffe4e4ff");
      confirmBtn.addEventListener("mouseleave", () => confirmBtn.style.background = "#ffffffff");
      cancelBtn.addEventListener("mouseleave", () => cancelBtn.style.background = "#ffffff");

      // deixa o modal visível
      modal.style.display = "block";

      // ações dos botões
      confirmBtn.onclick = async function() {
        window.name = Rm;
        await window.electronAPI.trocarPagina("CadastroDigital");
      };

      cancelBtn.onclick = function() {
        modal.style.display = "none";
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
          const imgPath = `../imagens/img_alunos/${dados.rm}.png`; // ou .png dependendo do formato
          dados.imagem = `<img src="${imgPath}" alt="Foto do aluno" style="width:150px;border-radius:10px;">`;
          
          var linha = document.createElement('tr');
          linha.classList.add('linha-tabela');
          linha.innerHTML = `
            <td style="padding:0; border:none;">
              <div class="card" style="
                box-sizing: border-box; padding: 10px; border: 1px solid #ccc;
                margin: 0; display: flex; flex-direction: column;
                min-width: 180px; max-width: 100%;
              ">
                <img src="${imgPath}" 
                     alt="Imagem do Card" 
                     style="width:100px;border-radius:10px;">
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

    document.getElementById("EnviarAtt").addEventListener("click", enviarAtualizacao);
    async function enviarAtualizacao(event) {
      event.preventDefault(); // impede refresh do form
      try {
        var Rm = document.getElementById("RmAtt").value.trim();

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
          let aluno = info.data[0];
          let modal = document.getElementById("confirmModal");

          modal.innerHTML = `
      <div class="modal-box" style="
      border: #ccc solid 1px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      max-width: 300px;
      text-align: left;
      overflow: hidden;
      font-family: sans-serif;
      ">
      <div style="padding: 25px 20px 25px 20px;">
        <strong>Nome:</strong> ${aluno.nome} <br>
        <strong>RM:</strong> ${aluno.rm} <br>
      </div>

      <div style="display: flex; border-top: 1px solid #e5e5e5;">
        <button id="cancelBtn" style="
          flex: 1; padding: 12px 0; background: #ffffff;
          border: none; border-right: 1px solid #e5e5e5;
          font-size: 15px; color: #333; cursor: pointer;
          transition: background 0.2s;
        ">Cancelar</button>

        <button id="confirmBtn" style="
          flex: 1; padding: 12px 0; background: #ffffffff;
          border: none; font-size: 15px; color: #333;
          cursor: pointer; transition: background 0.2s;
        ">Atualizar</button>
      </div>
    </div>
    `;

          // Pega os botões do DOM
          const confirmBtn = document.getElementById("confirmBtn");
          const cancelBtn = document.getElementById("cancelBtn");

          // Efeitos de hover
          confirmBtn.addEventListener("mouseenter", () => confirmBtn.style.background = "#d1e7dd");
          cancelBtn.addEventListener("mouseenter", () => cancelBtn.style.background = "#ffe4e4ff");
          confirmBtn.addEventListener("mouseleave", () => confirmBtn.style.background = "#ffffffff");
          cancelBtn.addEventListener("mouseleave", () => cancelBtn.style.background = "#ffffff");

          // Mostra o modal
          modal.style.display = "block";

          // Ação dos botões
          confirmBtn.onclick = async function() {
            window.name = Rm;
            await window.electronAPI.trocarPagina("AtualizacaoDigital");
          };

          cancelBtn.onclick = function() {
            modal.style.display = "none";
          };

        } else {
          alert(info.message || "Usuário não encontrado");
        }
      } catch (error) {
        console.error("Erro ao carregar a página:", error);
      }
    }


async function Deslogar(){
    Sair();
    window.pagina = 'Login';
}
