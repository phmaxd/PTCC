<?php
header('Access-Control-Allow-Origin: *'); // Permite acesso de qualquer origem (ajuste conforme necessário)
header('Content-Type: application/json; charset=utf-8');

try {
    include "conecta.php"; // $conn deve ser um PDO válido

    $select = $conn->prepare("SELECT * FROM alunos WHERE entrada = 'sim'");
    $select->execute();

    $dados = $select->fetchAll(PDO::FETCH_ASSOC);

    // O 'data' já está acessível via JSON para o pagina.js através de uma requisição AJAX/fetch
    echo json_encode([
        'success' => true,
        'data' => $dados
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
