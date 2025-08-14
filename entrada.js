async function enviar(event) {
  event.preventDefault(); // Previne o comportamento padrão do formulário
  try{
    var nome = document.getElementById("nome").value;
    var file = document.getElementById("imagem").files[0];
    var formData = new FormData();
    formData.append("nome", nome);
    formData.append("imagem", file);
    const response = await fetch("http://localhost/banco/upload.php", {
      method: "POST",
      credentials: "include",
      body: formData
    });
    if (response.ok) {
      const info = await response.json();
      if (info.success) {
        alert("Upload realizado com sucesso!");
        window.location.reload(); // Recarrega a página para atualizar a lista
      } else {
        console.log("Erro no upload: " + info.message);
      }
    } else {
      alert("Erro na requisição: " + response.statusText);
    }
  }catch(error){
    console.error("Erro ao carregar a página:", error);
}
}
window.onload = async function () {
    try {
        const response = await fetch("http://localhost/banco/acesso.php", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: ""
        });
             if (response.ok) {
          const info = await response.json();
          var texto = document.getElementById('content');
          if (texto && Array.isArray(info.data)) {
            // Cria o style global apenas uma vez
            if (!document.getElementById('')) {
                const style = document.createElement('style');
              style.id = 'cards-style';
              style.innerHTML = `
                #content {
                  display: flex;
                  flex-wrap: wrap;
                  gap: 16px;
                  margin-top: 16px;
                  justify-content: flex-start;
                  padding: 0;
                }
                #content .linha-tabela {
                  display: flex;
                  padding: 0;
                  border: none;
                  background: none;
                  width: auto;
                }
                #content .card {
                  width: 100%;
                  min-width: 180px;
                  max-width: 250px;
                  box-sizing: border-box;
                }
                @media (max-width: 600px) {
                  #content {
                    flex-direction: column;
                    align-items: stretch;
                  }
                  #content .linha-tabela {
                    width: 100%;
                  }
                  #content .card {
                    max-width: 100%;
                  }
                }
              `;
              document.head.appendChild(style);
            }

            // Limpa o conteúdo anterior
            texto.innerHTML = '';


                info.data.forEach(function(dados) {
              var linha = document.createElement('tr');
              linha.classList.add('linha-tabela');
              linha.innerHTML = `
                <td style="padding:0; border:none;">
                  <div class="card" style="
                    box-sizing: border-box;
                    padding: 10px;
                    border: 1px solid #ccc;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    min-width: 180px;
                    max-width: 100%;
                  ">
                  <img src="http://localhost/banco/imagens/${dados.imagem}" alt="Imagem do Card" style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px; margin-bottom: 8px;">
                    <div><strong>Nome:</strong> ${dados.nome}</div>
                    <div><strong>RM:</strong> ${dados.rm}</div>
                  </div>
                </td>
              `;
              texto.appendChild(linha);
            });
        }}}
         catch (error) {
        console.error("Erro ao carregar a página:", error);
         }
    }