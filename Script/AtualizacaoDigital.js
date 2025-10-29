window.onload = async function Dados() {
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
    // ==->CÓDIGO DE ATUALIZAÇÃO DIGITAL (ws)<-==
    const response = await fetch("http://localhost/ETEC/3MIN/TCC/bioid/Php/buscar_slot.php", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: data.toString()
    });
    const  data = await response.json();
    const slot_att = {
      action: "atualizar_digital",
      rm: aluno.rm,
      slot: data.slot
    };
    window.electronAPI.sendToMain(slot_att);
    console.log("JSON enviado para o ESP32:", slot_att);

    }catch (error) {
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
