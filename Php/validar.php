<?php
header('Content-Type: application/json; charset=utf-8');
include 'conecta.php';
error_reporting(E_ALL & ~E_NOTICE);
ini_set('display_errors', 0);

try {
    // Recebe o slot enviado pelo frontend
    $slot = $_POST['slot'] ?? null;
    if (!$slot) {
        echo json_encode(['status' => 'erro', 'mensagem' => 'Parâmetros insuficientes.']);
        exit;
    }

    // Pega o RM associado ao slot na tabela de digitais
    $stmt1 = $conn->prepare("SELECT `rm` FROM `digitais` WHERE `slot` = :slot");
    $stmt1->bindParam(':slot', $slot, PDO::PARAM_INT);
    $stmt1->execute();
    $rm = $stmt1->fetchColumn();

    if (!$rm) {
        echo json_encode(['status' => 'erro', 'mensagem' => 'Nenhum aluno encontrado para esse slot.']);
        exit;
    }

    // Pega o nome do aluno na tabela de alunos usando o RM
    $stmt2 = $conn->prepare("SELECT `nome` FROM `alunos` WHERE `rm` = :rm");
    $stmt2->bindParam(':rm', $rm, PDO::PARAM_INT);
    $stmt2->execute();
    $nome = $stmt2->fetchColumn();

    echo json_encode([
        'status' => 'sucesso',
        'rm' => $rm,
        'nome_aluno' => $nome
    ]);

} catch (\Throwable $th) {
    echo json_encode(['status' => 'erro', 'mensagem' => $th->getMessage()]);
}
