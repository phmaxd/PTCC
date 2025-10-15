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

  async function puxa() {
    modal.style.display = "none";
  };