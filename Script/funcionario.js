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
    if(!confirm("Deseja realmente excluir este funcionário?")) return;

    const row = botao.closest(".funcionario-card");
    const id = row.querySelector("strong").textContent;

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
    tr.innerHTML = `
        <td>${dados.nome}</td>
        <td>${dados.funcao}</td>
        <td>${dados.id}</td>
        <td><button onclick="Excluir(this)">Excluir</button>    <button onclick="Editar(this)">Editar</button></td>
    `;

    // Insere na tabela correspondente
    tbody.appendChild(tr);
}

// Exemplo de como rodar com array vindo do PHP
dados.forEach(item => {
    adicionarFuncionario(item);
});

function Editar(botao){
    // Editar depois
}

function Deslogar(){
if(confirm("Deseja realmente deslogar?")){
    window.electronAPI.trocarPagina("login");
}else{
    return;
}

}