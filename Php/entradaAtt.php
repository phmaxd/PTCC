<?php
include 'conecta.php';
header("Content-Type: application/json");

if (!isset($_POST['rm']) || !isset($_POST['minutosAgora']) || !isset($_POST['diaSemana'])) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Dados incompletos"
    ]);
    exit;
}

$rm = intval($_POST['rm']);
$minutosAgora = intval($_POST['minutosAgora']);
$diaSemana = intval($_POST['diaSemana']);

$inicioEntrada = 7 * 60 + 30; // 07:30
$limiteNormal  = 8 * 60 + 10; // 08:10
$limiteAtraso  = 8 * 60 + 50; // 08:50

$status = "";
$mensagem = "";

// Final de semana
if ($diaSemana === 0 || $diaSemana === 6) {
    $status = "NAO";
    $mensagem = "Entrada recusada - Final de semana";
}

// Segunda a sexta
else {

    if ($minutosAgora >= $inicioEntrada && $minutosAgora <= $limiteNormal) {
        $status = "SIM";
        $mensagem = "Entrada liberada - Horário normal";
    }

    else if ($minutosAgora > $limiteNormal && $minutosAgora <= $limiteAtraso) {
        $status = "ATRASADO";
        $mensagem = "Entrada liberada - Atrasado";
    }

    else if ($minutosAgora > $limiteAtraso) {
        $status = "NAO";
        $mensagem = "Entrada recusada - Muito tarde";
    }

    else {
        $status = "NAO";
        $mensagem = "Entrada recusada - Antes do horário permitido";
    }
}

try {
    $sql = "UPDATE alunos SET entrada = :status WHERE rm = :rm";
    $stmt = $conn->prepare($sql);
    $stmt->execute([":status" => $status, ":rm" => $rm]);

    echo json_encode([
        "status" => "sucesso",
        "mensagem" => $mensagem,
        "statusAluno" => $status
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Erro ao atualizar banco: " . $e->getMessage()
    ]);
}
