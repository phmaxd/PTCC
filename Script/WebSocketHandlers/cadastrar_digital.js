export async function cadastrar_digital(data) {
 const dados_digital = new URLSearchParams();
 dados_digital.append('rm', data.rm);
 dados_digital.append('slot', data.slot);
 try {
    const response = await fetch('http://ptcc.elementfx.com/cadastrar_digital.php', {
     method: 'POST',
     headers: { "Content-Type": "application/x-www-form-urlencoded" },
     body: dados_digital
    });
    const result = await response.json();
    console.log('Resposta do servidor:', result);
    return {
      ...result,
      rm: data.rm,
    };
 } catch (error) {
    console.log('Erro ao cadastrar digital labubu:', error);
    return { success: false, error: error.message };
 }
}

