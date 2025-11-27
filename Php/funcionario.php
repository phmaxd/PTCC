<?php

include 'conecta.php';

header('Content-Type: application/json; charset=utf-8');

$query = $conn -> prepare("SELECT * FROM funcionario ");

$query -> execute();
$resposta = $query -> fetchAll(PDO::FETCH_ASSOC);

if ($resposta) {
    echo json_encode($resposta);
} else {
    echo json_encode(['error' => 'Nenhum funcionario encontrado']);
}