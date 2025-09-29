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
        <div class="modal-box">
            <h3>Editar Funcionário</h3>
            <label>Nome:</label>
            <input type="text" id="editNome" value="${nome}">
            </select>
            <div style="margin-top: 10px;">
                <button id="btnSalvar" >Salvar</button>
                <button onclick="fecharModal()">Cancelar</button>
            </div>
        </div>
    `;
    modal.style.display = 'block';

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
        const response = await fetch('http://localhost/BANCO/Php/editarFuncionario.php', {
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
        <div class="modal-box">
          <p>Você não pode excluir a si mesmo.</p>
          <button onclick="puxa()" style="margin-right:10px;">Entendi</button>
        </div>
        `;
modal.style.display = 'block'; // mostra o modal
}