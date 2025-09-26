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
