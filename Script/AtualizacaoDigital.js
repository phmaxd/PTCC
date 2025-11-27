window.onload = async function Dados() {
  // Ouve as mensagens vindas do ESP32 via Electron
window.electronAPI.onEsp32Msg((msg) => {
  try {
    const data = typeof msg === "string" ? JSON.parse(msg) : msg;
    console.log("Mensagem recebida do ESP32:", data);

    const cleide = document.getElementById("Cleide");
    if (!cleide) return console.error("Elemento 'Cleide' não encontrado");

    // ✅ Se o ESP32 terminou a atualização da digital
    if (data.action === "digital_atualizada") {
      cleide.innerHTML += `
        <div style="margin-top: 10px; color: green; font-weight: bold;">
          Digital de RM ${data.rm} atualizada!<br>
        </div>
      `;
    }

    // ❌ Se o ESP32 mandou erro
    else if (data.action === "erro_digital") {
      cleide.innerHTML += `
        <div style="margin-top: 10px; color: red; font-weight: bold;">
          ❌ Erro ao atualizar a digital. Tente novamente.
        </div>
      `;
    }

  } catch (error) {
    console.error("Erro ao interpretar mensagem do ESP32:", error);
  }
});

  try {
    const rm = window.name;
    console.log("RM recebido:", rm);
    if (!rm) {
      console.error("Nenhum RM em window.name");
      return;
    }

    // nome alterado para evitar confusão
    const params = new URLSearchParams();
    params.append("rm", rm);

    const digital = await fetch("http://ptcc.elementfx.com/dados.php", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString()
    });

    if (!digital.ok) {
      console.error("Erro na requisição dados.php:", digital.status);
      alert("Erro ao carregar dados do aluno");
      return;
    }

    const resultado = await digital.json();
    const aluno = Array.isArray(resultado) ? resultado[0] : resultado;
    if (!aluno || aluno.error) {
      alert("Aluno não encontrado");
      return;
    }

    const modalContent = document.getElementById("Cleide");
    if (!modalContent) return console.error("Elemento 'Cleide' não encontrado");

    modalContent.innerHTML = `
      <strong>Nome:</strong> ${aluno.nome ?? ''} <br>
      <strong>RM:</strong> ${aluno.rm ?? ''}
    `;

    // botão "qualquer coisa" (já no HTML)
    const btnQualquer = document.getElementById("btn");

    if (btnQualquer) {
      btnQualquer.addEventListener("click", async () => {
        // evita múltiplos cliques
        btnQualquer.disabled = true;
        btnQualquer.textContent = "Buscando...";

        try {
          // reutiliza `params` preparado lá em cima
          const response = await fetch("http://ptcc.elementfx.com/buscar_slot.php", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params.toString()
          });

          if (!response.ok) {
            throw new Error("Resposta buscar_slot.php não OK: " + response.status);
          }

          // resultado com nome diferente
          const slotResult = await response.json();
          console.log("Resposta buscar_slot.php:", slotResult);

          const slot_att = {
            action: "atualizar_digital",
            rm: aluno.rm,
            slot: slotResult.slot ?? null
          };

          window.electronAPI.sendToMain(slot_att);
          console.log("JSON enviado para o ESP32:", slot_att);

        } catch (error) {
          console.error("Erro ao buscar slot:", error);
          alert("Erro ao buscar slot. Veja o console para detalhes.");
        } finally {
          // reativa botão
          btnQualquer.disabled = false;
          btnQualquer.textContent = "Atualizar Digital";
        }
      });
    }

  } catch (error) {
    console.error("Erro ao carregar a página:", error);
  }
};


function trocar() {
  window.electronAPI.trocarPagina("entrada");
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
