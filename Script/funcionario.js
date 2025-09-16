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
}

function Deslogar(){
if(confirm("Deseja realmente deslogar?")){
    window.electronAPI.trocarPagina("login");
}else{
    return;
}

}