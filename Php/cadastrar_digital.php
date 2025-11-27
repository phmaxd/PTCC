<?php
header('Content-Type: application/json; charset=utf-8');
include 'conecta.php';
error_reporting(E_ALL & ~E_NOTICE);
ini_set('display_errors', 0);

try {
    $rm = $_POST['rm'] ?? null;
    $slot = $_POST['slot'] ?? null;

    if (!$rm || !$slot) {
        echo json_encode(['status' => 'erro', 'mensagem' => 'Parâmetros insuficientes.']);
        exit;
    }

    $stmt = $conn->prepare("UPDATE digitais SET slot = :slot WHERE rm = :rm");
    $stmt->bindParam(':rm', $rm);
    $stmt->bindParam(':slot', $slot);
    $stmt->execute();

    echo json_encode(['status' => 'sucesso', 'mensagem' => 'Digital cadastrada com sucesso']);

} catch (\Throwable $th) {
    echo json_encode(['status' => 'erro', 'mensagem' => $th->getMessage()]);
}
