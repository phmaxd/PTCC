     window.onload = function manda() {
  const result = window.electronAPI.getUser ();
  if (result != null) {
    alert('logado com sucesso')
  }
  else{
    alert('vc n ta logad')
    window.electronAPI.trocarPagina('login');
  }
        try {
            const conecta = fetch("http://localhost/banco/acesso.php",{
                method: "POST",
                 credentials: "include",
                     headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data.toString(),
            });
            
        } catch (error) {
            console.log(error)
        }

}
