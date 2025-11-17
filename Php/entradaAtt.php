<?php
include 'conecta.php';
header("Content-Type: application/json");

// Pegando valores enviados do JS
if (!isset($_POST['rm']) || !isset($_POST['minutosAgora']) || !isset($_POST['limite'])) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Dados incompletos"
    ]);
    exit;
}

$rm = intval($_POST['rm']);
$minutosAgora = intval($_POST['minutosAgora']);
$limite = intval($_POST['limite']);

// AQUI A COMPARAÇÃO DOS HORÁRIOS
if ($minutosAgora > $limite) {
    // Horário MAIOR que 08:10
    $status = "atrasado";
} else {
    // Horário MENOR/IGUAL a 08:10
    $status = "sim";
}

// -----------------------
// ATUALIZANDO NO BANCO
// -----------------------
try {

    // Supondo que a coluna se chama "entrada_status"
    $sql = "UPDATE alunos SET entrada = :status WHERE rm = :rm";
    $stmt = $conn->prepare($sql);

    $stmt->execute([
        ":status" => $status,
        ":rm" => $rm
    ]);

    echo json_encode([
        "status" => "sucesso",
        "mensagem" => "Entrada atualizada",
        "statusAluno" => $status
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Falha no banco: " . $e->getMessage()
    ]);
}
