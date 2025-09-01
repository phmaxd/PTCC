window.onload = async function Dados() {
  try {
    const rm = window.name;
    console.log("RM recebido:", rm);
    const data = new URLSearchParams();
    data.append("rm", rm);
    const digital = await fetch("http://localhost/banco/Php/dados.php", {
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
  <strong>RM:</strong> ${aluno.rm ?? ''} <br>
  <button id="Digital" style="margin-right:10px;">Cadastrar Digital</button>
`;
}
catch(error) {
    console.error("Erro ao carregar a página:", error);
  }
}