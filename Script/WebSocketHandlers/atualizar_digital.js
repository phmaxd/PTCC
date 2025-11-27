export async function atualizar_digital(data) {
  try {
    // Só valida se veio com os campos certos
    if (!data.rm || !data.slot) {
      throw new Error("Dados inválidos para atualização da digital");
    }

    console.log(`Digital atualizada no ESP32 → RM ${data.rm}, Slot ${data.slot}`);

    // Retorna o mesmo JSON, confirmando o sucesso
    return {
      status: "sucesso",
      acao: "digital_atualizada",
      rm: data.rm,
      slot: data.slot
    };
  } catch (erro) {
    console.error("Erro no handler atualizar_digital:", erro);
    return {
      status: "erro",
      acao: "erro_digital",
      msg: erro.message
    };
  }
}
