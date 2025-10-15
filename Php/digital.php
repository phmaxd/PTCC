<?php
header('Content-Type: application/json; charset=utf-8');
include 'conecta.php';

$Rm = trim($_POST['Rm'] ?? '');

try {
    $resposta = $conn->prepare("SELECT * FROM alunos WHERE rm = :Rm");
    $resposta->bindParam(":Rm", $Rm, PDO::PARAM_STR); // use STR para aceitar números e strings
    $resposta->execute();

    if ($resposta && $resposta->rowCount() > 0) {
        $dados = $resposta->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode([
            'success' => true,
            'data' => $dados
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => "Usuário não encontrado",
            'rm_recebido' => $Rm
        ]);
    }
} catch (Throwable $th) {
    echo json_encode([
        'success' => false,
        'message' => "Erro: " . $th->getMessage()
    ]);
}
