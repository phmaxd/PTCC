    window.onload = async function () {
      try {
        const conecta = await fetch("http://localhost/banco/Php/acesso.php", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          }
        });

        if (conecta.ok) {
          const info = await conecta.json();
          var texto = document.getElementById('content');
          if (texto && Array.isArray(info.data)) {
            // Cria o style global apenas uma vez
            if (!document.getElementById('cards-style')) {
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
                    <div><strong>Nome:</strong> ${dados.nome}</div>
                    <div><strong>RM:</strong> ${dados.rm}</div>
                  </div>
                </td>
              `;
              texto.appendChild(linha);
            });
          } else {
            console.log("Elemento com id 'content' não encontrado ou info.data não é um array.");
          }
        } else {
          console.log("Erro ao conectar ao servidor.");
        }
      } catch (error) {
        console.log(error);
      }
    }
    document.getElementById('enviar').onclick = async function (e) {
      e.preventDefault();
      var Rm = document.getElementById('Rm').value;
        try {
        const response = await fetch("http://localhost/banco/Php/enviar.php", {
          method: "POST",
          credentials: "include",
          body: Rm
        });
        if (response.ok) {
          
          if (confirm("")) {
          const response = await fetch("http://localhost/banco/Php/enviar.php", {
          method: "POST",
          credentials: "include",
          body: Rm
        });
} else {
  document.getElementById("Rm").value = ""
}
        } else {
          alert('Erro');
        }
      } catch (error) {
        alert('Erro: ' + error.message);
      }
    };
  