const div = document.getElementById('mensagens'); 

console.log('Renderer: script carregado');

// Recebe mensagem do main (via preload) 
window.electronAPI.onEsp32Msg((msg) => {
    console.log("Renderer: recebeu do Main ->", msg);
   div.innerHTML += `<p>${msg}</p>`;
});

