window.onload = async function Dados() {
  window.electronAPI.onEsp32Msg((msg) => {
  try {
    const data = typeof msg === "string" ? JSON.parse(msg) : msg;
    console.log("Mensagem recebida do ESP32:", data);

    const cleide = document.getElementById("Cleide");
    if (!cleide) return console.error("Elemento 'Cleide' não encontrado");

    // ✅ Se o ESP32 terminou a atualização da digital
    if (data.status === "sucesso") {
      cleide.innerHTML += `
        <div style="margin-top: 10px; color: green; font-weight: bold;">
          Digital de RM ${data.rm} cadastrada!<br>
        </div>
      `;
    }

    // ❌ Se o ESP32 mandou erro
    else if (data.action === "erro_digital") {
      cleide.innerHTML += `
        <div style="margin-top: 10px; color: red; font-weight: bold;">
          ❌ Erro ao cadastrar a digital. Tente novamente.
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
    const data = new URLSearchParams();
    data.append("rm", rm);
    
    const digital = await fetch("http://localhost/ETEC/3MIN/TCC/bioid/Php/dados.php", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: data.toString()

    });
    
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
  btnQualquer.addEventListener("click", async() => {
    try {
      // Busca o menor slot disponível
      const response = await fetch("http://localhost/ETEC/3MIN/TCC/bioid/Php/menor_slot.php");
      const data = await response.json();

      const cadastrar_digital = {
      action: "cadastrar_digital",
      rm: aluno.rm,
      slot: data.menor_slot
    };

    // Envia para o main via preload
    window.electronAPI.sendToMain(cadastrar_digital);
    console.log("JSON enviado para o ESP32:", cadastrar_digital);
    } catch (error) {
    console.error("Erro ao buscar slot:", error);
    }
   
  });
}

}
catch(error) {
    console.error("Erro ao carregar a página:", error);
  }
}

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
