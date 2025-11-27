export async function rm_digitado(jsonData) {
  try {
    const rm = jsonData.rm;

    if (!rm) {
      return { status: "erro", error: "RM não fornecido" };
    }

    const response = await fetch(
      "http://ptcc.elementfx.com/buscar_slot.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ rm }),
      }
    );

    const result = await response.json();
    return result; // <-- OK

  } catch (error) {
    return { status: "erro", error: error.message };
  }
}
