<<<<<<< HEAD
=======
const ID = window.name;
      console.log(ID);
>>>>>>> origin/bap
window.onload = function () {
    try {
       $.ajax({
		url: "http://localhost/banco/Php/funcionario.php",
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
<<<<<<< HEAD
    if(!confirm("Deseja realmente excluir este funcionário?")) return;

    const row = botao.closest(".funcionario-card");
    const id = row.querySelector("strong").textContent;

=======
    if(!confirm("Deseja realmente excluir este funcionário?")) {return;}
    const row = botao.closest(".funcionario-card");
    const id = row.dataset.id;
    if(ID == id){
        alert("❌ Você não pode excluir a si mesmo.");
        return;
    }
>>>>>>> origin/bap
    try {
        $.ajax({
            url: "http://localhost/banco/Php/Excluir.php",
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            contentType: "application/json; charset=UTF-8"
        }).done(function(resposta) {
            console.log();
            alert(resposta.mensagem);
            if(resposta.status === "sucesso"){ 
                row.remove();
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
<<<<<<< HEAD
function adicionarFuncionario(dados){
    var funcionariosDiv = document.getElementById("funcionarios");
    var funcionarioCard = document.createElement("div");
    funcionarioCard.classList.add("funcionario-card");
    funcionarioCard.innerHTML = `
        <h3>${dados.nome}</h3>
        <p><div>Função:</div> ${dados.funcao}</p>
        <strong style="display:none;">${dados.id}</strong>
        <button onclick="Excluir(this)">Excluir</button>
    `;
    funcionariosDiv.appendChild(funcionarioCard);
=======
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


function Editar(botao){
    // Editar depois
>>>>>>> origin/bap
}

function Deslogar(){
if(confirm("Deseja realmente deslogar?")){
    window.electronAPI.trocarPagina("login");
}else{
    return;
}

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
