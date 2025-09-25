async function modalizar() {
const modal = document.getElementById('modal');
        modal.innerHTML = `
        <div class="modal-box">
          <p>Sucesso</p>
          <button onclick="aperta()" style="margin-right:10px;">Continuar</button>
          <button onclick="puxa()">Cancelar</button> 
        </div>
        `;
modal.style.display = 'block'; // mostra o modal
}

async function aperta() {
  await window.electronAPI.trocarPagina(window.pagina);
  alert(window.pagina)
  };
  async function puxa() {
    modal.style.display = "none";
  };