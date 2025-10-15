<?php
include 'conecta.php';
header('Content-Type: application/json; charset=utf-8');

$rm = $_POST['rm'] ?? '';

try {
    $stmt = $conn->prepare("SELECT * FROM alunos WHERE rm = :rm");
    $stmt->bindParam(':rm', $rm);
    $stmt->execute();
    $aluno = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($aluno) {
        echo json_encode($aluno);
    } else {
        echo json_encode(['error' => 'Aluno não encontrado']);
    }
} catch (\Throwable $th) {
    throw $th;
}