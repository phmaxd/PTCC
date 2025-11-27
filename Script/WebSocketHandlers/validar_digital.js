
export async function validar_digital(data) {
  try {
    // data deve conter pelo menos o slot da digital
    const slot = data.slot;
    if (slot === undefined || slot === null) {
      return { status: 'erro', error: 'Slot não fornecido' };
    }

    // Faz a requisição pro PHP que retorna o aluno pelo slot
    const response = await fetch('http://ptcc.elementfx.com/validar.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ slot })
    });

    const result = await response.json();

    if (result.status === 'sucesso') {
      return {
        status: 'sucesso',
        rm: result.rm,
        nome_aluno: result.nome_aluno,
        slot
      };
    } else {
      return { status: 'erro', error: result.mensagem || 'Erro desconhecido' };
    }
  } catch (err) {
    console.error('Erro validar_digital:', err);
    return { status: 'erro', error: err.message };
  }
}
