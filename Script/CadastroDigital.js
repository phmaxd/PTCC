window.onload = async function Dados() {
  try {
    const data = new URLSearchParams();
    data.append('acao', 'excluir');
    const digital = await fetch("http://localhost/banco/Php/dados.php", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: data.toString()

    });
    console.log(await digital.json());
}
catch(error) {
    console.error("Erro ao carregar a página:", error);
  }
}
async function Fabricio(params) {
    
}
