const pagina = window.pagina;
async function modalizar() {
  const modal = document.getElementById("modal");

  modal.innerHTML = `
    <div class="modal-content">
      <p>Sucesso</p>
    </div>
    <div class="modal-actions">
      <button id="cancel-btn">Cancelar</button>
      <button id="continue-btn">Continuar</button>
    </div>
  `;

  modal.style.display = "block"; // mostra o modal

  // Adiciona eventos aos botões
  document.getElementById("cancel-btn").addEventListener("click", puxa);
  document.getElementById("continue-btn").addEventListener("click", aperta);
}

async function Login() {
  const modal = document.getElementById("modal");
  modal.innerHTML = `
        <div class="modal-box" style="
        font-size: 18px;
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      max-width: 400px;
      text-align: center;
      overflow: hidden;
      font-family: sans-serif;
      padding: 15px 0px 0px 0px;
  ">
       <p style="margin-bottom: 20px;">Logado com sucesso!</p>

      
      <button onclick="aperta()" style="
          background: #ffffff;
          border: 1px solid #e5e5e5;
          font-size: 18px;
          height: 40px;
          width: 100%;
          padding: 0px;
          color: #333;
          cursor: pointer;
      " 
      onmouseenter="this.style.background='#d1e7dd'" 
      onmouseleave="this.style.background='#ffffff'">
        Prosseguir
      </button>

        </div>
        `;
  modal.style.display = "block"; // mostra o modal
}

async function Sair() {
  const modal = document.getElementById("modal");
  modal.innerHTML = `
<div style="
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
">
  <div class="modal-box" style="
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      max-width: 600px;
      text-align: left;
      overflow: hidden;
      font-family: sans-serif;
      padding: 25px 0px 0px 0px;
  ">
      <p style="margin:0px 25px 0px 25px">Deseja realmente sair?</p>
      <div style="display: flex; border-top: 1px solid #e5e5e5; margin-top: 20px;">
          <button onclick="puxa()" style="
              flex: 1;
              padding: 12px 0;
              background: #ffffff;
              border: none;
              border-right: 1px solid #e5e5e5;
              font-size: 15px;
              color: #333;
              cursor: pointer;
              transition: background 0.2s;
              
          " onmouseenter="this.style.background='#ffe4e4ff'" onmouseleave="this.style.background='#ffffff'">Não</button>

          <button onclick="aperta()" style="
              flex: 1;
              padding: 12px 0;
              background: #ffffff;
              border: none;
              font-size: 15px;
              color: #333;
              cursor: pointer;
              transition: background 0.2s;
          " onmouseenter="this.style.background='#d1e7dd'" onmouseleave="this.style.background='#ffffff'">Sair</button>
      </div>
  </div>
</div>
`;

  modal.style.display = "block"; // mostra o modal
}

async function Alteração() {
  const modal = document.getElementById("modal");
  modal.innerHTML = `
        <div class="modal-box" style="
        font-size: 18px;
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      max-width: 400px;
      text-align: center;
      overflow: hidden;
      font-family: sans-serif;
      padding: 15px 0px 0px 0px;
  ">
       <p style="margin-bottom: 20px;">Nome alterado com sucesso!</p>

      
      <button onclick="puxa()" style="
          background: #ffffff;
          border: 1px solid #e5e5e5;
          font-size: 18px;
          height: 40px;
          width: 100%;
          padding: 0px;
          color: #333;
          cursor: pointer;
      " 
      onmouseenter="this.style.background='#d1e7dd'" 
      onmouseleave="this.style.background='#ffffff'">
        Entendi
      </button>

        </div>
        `;
  modal.style.display = "block"; // mostra o modal
}

async function Incorreto() {
  const modal = document.getElementById("modal");
  modal.innerHTML = `
        <div class="modal-box" style="
        font-size: 18px;
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      max-width: 400px;
      text-align: center;
      overflow: hidden;
      font-family: sans-serif;
      padding: 15px 0px 0px 0px;
  ">
       <p style="margin-bottom: 20px;">Usuário ou senha incorretos.</p>

      
      <button onclick="puxa()" style="
          background: #ffffff;
          border: 1px solid #e5e5e5;
          font-size: 18px;
          height: 40px;
          width: 100%;
          padding: 0px;
          color: #333;
          cursor: pointer;
      " 
      onmouseenter="this.style.background='#ffe4e4ff'" 
      onmouseleave="this.style.background='#ffffff'">
        Finalizar
      </button>

        </div>
        `;
  modal.style.display = "block"; // mostra o modal
}

async function Apague() {
  const modal = document.getElementById("modal");
  modal.innerHTML = `
        <div class="modal-box" style="
        font-size: 18px;
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      max-width: 400px;
      text-align: center;
      overflow: hidden;
      font-family: sans-serif;
      padding: 15px 0px 0px 0px;
  ">
       <p style="margin-bottom: 20px;">Usuário excluído com sucesso!</p>

      
      <button onclick="puxa()" style="
          background: #ffffff;
          border: 1px solid #e5e5e5;
          font-size: 18px;
          height: 40px;
          width: 100%;
          padding: 0px;
          color: #333;
          cursor: pointer;
      " 
      onmouseenter="this.style.background='#d1e7dd'" 
      onmouseleave="this.style.background='#ffffff'">
        Finalizar
      </button>

        </div>
        `;
  modal.style.display = "block"; // mostra o modal
}

// Fecha o modal ao clicar em Cancelar
function puxa() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
  console.log("Cancelar clicado");
}

// Fecha o modal e redireciona ao clicar em Continuar
async function aperta() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
  console.log("Continuar clicado");

  // Redireciona para entrada.html
  window.location.href = "../Html/" + window.pagina + ".html";
}

function outrapagina() {
  window.location.href = "cadFuncionario.html";
}

async function Preencher() {
  const modal = document.getElementById("modal");
  modal.innerHTML = `
        <div class="modal-box" style="
        font-size: 18px;
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      max-width: 400px;
      text-align: center;
      overflow: hidden;
      font-family: sans-serif;
      padding: 15px 0px 0px 0px;
  ">
       <p style="margin-bottom: 20px;">Preencha todos os campos.</p>

      
      <button onclick="puxa()" style="
          background: #ffffff;
          border: 1px solid #e5e5e5;
          font-size: 18px;
          height: 40px;
          width: 100%;
          padding: 0px;
          color: #333;
          cursor: pointer;
      " 
      onmouseenter="this.style.background='#d1e7dd'" 
      onmouseleave="this.style.background='#ffffff'">
        Entendi
      </button>

        </div>
        `;
  modal.style.display = "block"; // mostra o modal
}

async function Erro() {
  const modal = document.getElementById("modal");
  modal.innerHTML = `
        <div class="modal-box">
          <p>Erro interno da estrutura do codigo</p>
          <button onclick="puxa()" style="margin-right:10px;">Entendi</button>
        </div>
        `;
  modal.style.display = "block"; // mostra o modal
}

// async function letras() {
// const modal = document.getElementById('modal');
//         modal.innerHTML = `
//         <div class="modal-box">
//           <p>O nome deve conter apenas letras!</p>
//           <button onclick="puxa()" style="margin-right:10px;">Entendi</button>
//         </div>
//         `;

// modal.style.display = 'block';
// }

// async function Cadastro() {
// const modal = document.getElementById('modal');
//         modal.innerHTML = `
//         <div class="modal-box">
//           <p>Usuario Cadastrado com sucesso!</p>
//           <button onclick="aperta()" style="margin-right:10px;">Entendi</button>
//         </div>
//         `;
// modal.style.display = 'block';
// }

// async function numeros() {
// const modal = document.getElementById('modal');
//         modal.innerHTML = `
//         <div class="modal-box">
//           <p>A senha deve conter apenas numeros</p>
//           <button onclick="puxa()" style="margin-right:10px;">Entendi</button>
//         </div>
//         `;
// modal.style.display = 'block'; // mostra o modal
// }

// async function fnc() {
// const modal = document.getElementById('modal');
//         modal.innerHTML = `
//         <div class="modal-box">
//           <p>Selecione uma função!</p>
//           <button onclick="puxa()" style="margin-right:10px;">Entendi</button>
//         </div>
//         `;
// modal.style.display = 'block'; // mostra o modal
// }

// async function falha() {
// const modal = document.getElementById('modal');
//         modal.innerHTML = `
//         <div class="modal-box">
//           <p>Esse usuario já está cadastrado</p>
//           <button onclick="puxa()" style="margin-right:10px;">Entendi</button>
//         </div>
//         `;
// modal.style.display = 'block'; // mostra o modal
// }

async function mesmo() {
  const modal = document.getElementById("modal");
  modal.innerHTML = `
        <div class="modal-box"
        style="
        font-size: 18px;
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      max-width: 400px;
      text-align: center;
      overflow: hidden;
      font-family: sans-serif;
      padding: 15px 0px 0px 0px;
  ">
       <p style="margin-bottom: 20px;">❌ Você não pode excluir a si mesmo.</p>
 <button onclick="puxa()" style="
          background: #ffffff;
          border: 1px solid #e5e5e5;
          font-size: 18px;
          height: 40px;
          width: 100%;
          padding: 0px;
          color: #333;
          cursor: pointer;
      " 
      onmouseenter="this.style.background='#d1e7dd'" 
      onmouseleave="this.style.background='#ffffff'">
        Entendi
      </button>        </div>
        `;
  modal.style.display = "block"; // mostra o modal
}
