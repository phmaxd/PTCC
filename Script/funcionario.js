const ID = window.name;
      console.log(ID);
window.onload = function () {
    try {
       $.ajax({
		url: "http://localhost/BANCO/Php/funcionario.php",
	    type: "POST",
	    dataType: "json"
		}).done(function(resposta) {
			if(resposta){
                resposta.forEach(function (dados) {
                    adicionarFuncionario(dados);
                });
            }else{
                console.log("Nenhum dado recebido");
            }
		}).fail(function(jqXHR, textStatus ) {
			console.log("Request failed: " + textStatus);
		}).always(function() {
			console.log("Foi");
          });
    } catch (error) {
        console.error("Erro ao carregar a página:", error);
    }
    

}
function Excluir(botao){
    if(!confirm("Deseja realmente excluir este funcionário?")) {return;}
    const row = botao.closest(".funcionario-card");
    const id = row.dataset.id;
    if(ID == id){
        mesmo();
        return;
    }
    try {
        $.ajax({
            url: "http://localhost/BANCO/Php/Excluir.php",
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            contentType: "application/json; charset=UTF-8"
        }).done(function(resposta) {
            console.log();
            if(resposta.status === "sucesso"){ 
                row.remove();
                Apague();
            } else {
                console.log("Nenhum dado recebido");
            }
        }).fail(function(jqXHR, textStatus ) {
            console.log("Request failed: " + textStatus);
        }).always(function() {
            console.log("Foi");
        });
    } catch (error) {
        console.error(error);
    }


}
function adicionarFuncionario(dados) {
    // Decide em qual tabela adicionar
    var tbody;
    if (dados.funcao === "funcionario") {
        tbody = document.getElementById("tabela-funcionarios");
    } else if (dados.funcao === "adm") {
        tbody = document.getElementById("tabela-adms");
    } else {
        return; // ignora se for outra função
    }

    // Cria a linha
    var tr = document.createElement("tr");
tr.classList.add("funcionario-card"); // Adicione isso
tr.setAttribute("data-id", dados.id);
    tr.innerHTML = `
        <td>${dados.nome}</td>
        <td>${dados.funcao}</td>
        <td>${dados.id}</td>
        <td><button onclick="Excluir(this)" class="btn-excluir">Excluir</button>    <button onclick="Editar(this)" class="btn">Editar</button></td>
      `;

    // Insere na tabela correspondente
    tbody.appendChild(tr);
}

// Exemplo de como rodar com array vindo do PHP


function Editar(botao) {
    const row = botao.closest(".funcionario-card");
    const id = row.dataset.id;
    const nome = row.children[0].textContent;
    const funcao = row.children[1].textContent;

    const modal = document.getElementById('modal');
modal.innerHTML = `
  <div class="modal-box" style="
    border: #ccc solid 1px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    max-width: 300px;
    text-align: left;
    overflow: hidden;
    font-family: 'Poppins', sans-serif;
  ">
    <h3 style="
      font-size: 18px;
            padding-left: 16px;

    //   color: #225b42;
    ">Editar Funcionário</h3>

    <label style="
      font-size: 14px;
      color: #444;
      display: block;
      margin-bottom: 6px;
      padding-left: 16px;
    ">Nome:</label>

    <input type="text" id="editNome" value="${nome}" style="
      width: 80%;
      padding-left: 16px;
margin-left: 16px;
      padding: 8px 10px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 14px;
      margin-bottom: 16px;
      outline: none;
      transition: border 0.2s, box-shadow 0.2s;
    " onfocus="this.style.border='1px solid #225b42'; this.style.boxShadow='0 0 4px rgba(34,91,66,0.3)';"
      onblur="this.style.border='1px solid #ccc'; this.style.boxShadow='none';">

    <div style="
      display: flex;
      border-top: 1px solid #e5e5e5;
    ">
      <button id="cancelBtn" onclick="fecharModal()" style="
        flex: 1;
        padding: 12px 0;
        background: #fff;
        border: none;
        border-right: 1px solid #e5e5e5;
        font-size: 15px;
        color: #333;
        cursor: pointer;
        transition: background 0.2s;
        border-bottom-left-radius: 12px;
      " 
      onmouseover="this.style.background='#f2f2f2'" 
      onmouseout="this.style.background='#fff'">
        Cancelar
      </button>

      <button id="btnSalvar" style="
        flex: 1;
        padding: 12px 0;
        background: #fff;
        border: none;
        font-size: 15px;
        color: #225b42;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
        border-bottom-right-radius: 12px;
      " 
      onmouseover="this.style.background='#e8f5ee'" 
      onmouseout="this.style.background='#fff'">
        Salvar
      </button>
    </div>          
  </div>
`;

    modal.style.display = 'block';

      // Hover correto
      btnSalvar.addEventListener("mouseenter", () => btnSalvar.style.background = "#d1e7dd");
      cancelBtn.addEventListener("mouseenter", () => cancelBtn.style.background = "#ffe4e4ff");
      btnSalvar.addEventListener("mouseleave", () => btnSalvar.style.background = "#ffffffff");
      cancelBtn.addEventListener("mouseleave", () => cancelBtn.style.background = "#ffffff");

    // Adiciona o listener depois que o modal existe no DOM
    document.getElementById('btnSalvar').addEventListener('click', function() {
        salvarEdicao(id);
    });
}


async function salvarEdicao(id) {
    const novoNome = document.getElementById('editNome').value.trim();

    if (!novoNome) {
        alert("O nome não pode ficar vazio!");
        return;
    }

    const data = new URLSearchParams();
    data.append('id', id);
    data.append('nome', novoNome);

    try {
        const response = await fetch('http://localhost/PTCC-BRENDA/Php/editarFuncionario.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: data.toString()
        });

        if (!response.ok) throw new Error('Erro na requisição: ' + response.statusText);

        const resultado = await response.text(); // pode retornar mensagem simples

            Alteração();
        // Atualiza tabela na tela
        const row = document.querySelector(`.funcionario-card[data-id='${id}']`);
        row.children[0].textContent = novoNome;
    } catch (error) {
        alert("Erro ao atualizar o nome: " + error.message);
    }
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}


function Deslogar(){
Sair();
window.pagina = "login";

}
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const perfilBtn = document.getElementById("perfilBtn");
    const closeSidebar = document.getElementById("closeSidebar");

    perfilBtn.addEventListener("click", () => {
      sidebar.classList.add("open");
      overlay.classList.add("active");
    });

    closeSidebar.addEventListener("click", () => {
      sidebar.classList.remove("open");
      overlay.classList.remove("active");
    });

    overlay.addEventListener("click", () => {
      sidebar.classList.remove("open");
      overlay.classList.remove("active");
    });

    async function mesmo() {
const modal = document.getElementById('modal');
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
          <p>Você não pode excluir a si mesmo.</p>
          <button onclick="puxa()" style="margin-right:10px;">Entendi</button>
        </div>
        `;

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
       <p style="margin-bottom: 20px;">Você não pode excluir a si mesmo.</p>

      
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
modal.style.display = 'block'; // mostra o modal
}