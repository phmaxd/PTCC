const pagina = window.pagina;
async function modalizar() {
  const modal = document.getElementById('modal');

  modal.innerHTML = `
    <div class="modal-content">
      <p>Sucesso</p>
    </div>
    <div class="modal-actions">
      <button id="cancel-btn">Cancelar</button>
      <button id="continue-btn">Continuar</button>
    </div>
  `;

  modal.style.display = 'block'; // mostra o modal

  // Adiciona eventos aos botões
  document.getElementById('cancel-btn').addEventListener('click', puxa);
  document.getElementById('continue-btn').addEventListener('click', aperta);
}

async function Login() {
const modal = document.getElementById('modal');
        modal.innerHTML = `
        <div class="modal-box">
          <p>Logado com sucesso</p>
          <button onclick="aperta()" style="margin-right:10px;">Prosseguir</button>
        </div>
        `;
modal.style.display = 'block'; // mostra o modal
}

async function Sair() {
const modal = document.getElementById('modal');
        modal.innerHTML = `
        <div class="modal-box">
          <p>Deseja realmente sair?</p>
          <button onclick="puxa()" style="margin-right:10px;">Não</button>
          <button onclick="aperta()" style="margin-right:10px;">Sair</button>
        </div>
        `;
modal.style.display = 'block'; // mostra o modal
}



async function Alteração() {
const modal = document.getElementById('modal');
        modal.innerHTML = `
        <div class="modal-box">
          <p>Nome alterado com sucesso</p>
          <button onclick="puxa()" style="margin-right:10px;">Finalizar</button>
        </div>
        `;
modal.style.display = 'block'; // mostra o modal
}

async function Incorreto() {
const modal = document.getElementById('modal');
        modal.innerHTML = `
        <div class="modal-box">
          <p>funcionario ou senha incorreto</p>
          <button onclick="puxa()" style="margin-right:10px;">Finalizar</button>
        </div>
        `;
modal.style.display = 'block'; // mostra o modal
}

async function Apague() {
const modal = document.getElementById('modal');
        modal.innerHTML = `
        <div class="modal-box">
          <p>Usuario Excluido com sucesso</p>
          <button onclick="puxa()" style="margin-right:10px;">Finalizar</button>
        </div>
        `;
modal.style.display = 'block'; // mostra o modal
}

async function Esqueci() {
const modal = document.getElementById('modal');
        modal.innerHTML = `
        <div class="modal-box">
          <p>Senha alterada com sucesso</p>
          <button onclick="aperta()" style="margin-right:10px;">Finalizar</button>
        </div>
        `;
modal.style.display = 'block'; // mostra o modal
}

// Fecha o modal ao clicar em Cancelar
function puxa() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  console.log('Cancelar clicado');
}

// Fecha o modal e redireciona ao clicar em Continuar
async function aperta() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  console.log('Continuar clicado');

  // Redireciona para entrada.html
  window.location.href = window.pagina + '.html';
}

// Função para cadastro (exemplo)
function outrapagina() {
  window.location.href = 'Cadastro.html'; // redireciona para página de cadastro
}

async function Preencher() {
const modal = document.getElementById('modal');
        modal.innerHTML = `
        <div class="modal-box">
          <p>Preencha todos os campos</p>
          <button onclick="puxa()" style="margin-right:10px;">Entendi</button>
        </div>
        `;
modal.style.display = 'block'; // mostra o modal
}

async function Erro() {
const modal = document.getElementById('modal');
        modal.innerHTML = `
        <div class="modal-box">
          <p>Erro interno da estrutura do codigo</p>
          <button onclick="puxa()" style="margin-right:10px;">Entendi</button>
        </div>
        `;
modal.style.display = 'block'; // mostra o modal
}

async function igual() {
const modal = document.getElementById('modal');
        modal.innerHTML = `
        <div class="modal-box">
          <p>As senhas não coincidem</p>
          <button onclick="puxa()" style="margin-right:10px;">Entendi</button>
        </div>
        `;
modal.style.display = 'block'; // mostra o modal
}

async function letras() {
const modal = document.getElementById('modal');
        modal.innerHTML = `
        <div class="modal-box">
          <p>O nome deve conter apenas letras!</p>
          <button onclick="puxa()" style="margin-right:10px;">Entendi</button>
        </div>
        `;
modal.style.display = 'block'; // mostra o modal
}

async function Cadastro() {
const modal = document.getElementById('modal');
        modal.innerHTML = `
        <div class="modal-box">
          <p>Usuario Cadastrado com sucesso!</p>
          <button onclick="aperta()" style="margin-right:10px;">Entendi</button>
        </div>
        `;
modal.style.display = 'block'; // mostra o modal
}

async function numeros() {
const modal = document.getElementById('modal');
        modal.innerHTML = `
        <div class="modal-box">
          <p>A senha deve conter apenas numeros</p>
          <button onclick="puxa()" style="margin-right:10px;">Entendi</button>
        </div>
        `;
modal.style.display = 'block'; // mostra o modal
}

async function fnc() {
const modal = document.getElementById('modal');
        modal.innerHTML = `
        <div class="modal-box">
          <p>Selecione uma função!</p>
          <button onclick="puxa()" style="margin-right:10px;">Entendi</button>
        </div>
        `;
modal.style.display = 'block'; // mostra o modal
}

async function falha() {
const modal = document.getElementById('modal');
        modal.innerHTML = `
        <div class="modal-box">
          <p>Esse usuario já está cadastrado</p>
          <button onclick="puxa()" style="margin-right:10px;">Entendi</button>
        </div>
        `;
modal.style.display = 'block'; // mostra o modal
}

async function mesmo() {
const modal = document.getElementById('modal');
        modal.innerHTML = `
        <div class="modal-box">
          <p>❌ Você não pode excluir a si mesmo.</p>
          <button onclick="puxa()" style="margin-right:10px;">Entendi</button>
        </div>
        `;
modal.style.display = 'block'; // mostra o modal
}