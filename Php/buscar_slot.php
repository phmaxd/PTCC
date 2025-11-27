<?php
include 'conecta.php';
header('Content-Type: application/json; charset=utf-8');

$rm = $_POST['rm'] ?? '';

try {
    $stmt = $conn->prepare("SELECT slot FROM digitais WHERE rm = :rm");
    $stmt->bindParam(':rm', $rm, PDO::PARAM_INT);
    $stmt->execute();
    $slot = $stmt->fetch(PDO::FETCH_ASSOC); // só uma linha

    if ($slot) {
        echo json_encode($slot, JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['error' => 'Slot não encontrado']);
    }
} catch (Throwable $th) {
    echo json_encode(['error' => $th->getMessage()]);
}
