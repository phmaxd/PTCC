<?php

include 'conecta.php';

$dados = json_decode(file_get_contents("php://input"), true);
file_put_contents("php://stderr", print_r($dados, true));

header('Content-Type: application/json');

if (!isset($dados['id']) || empty($dados['id'])){
    echo json_encode(['status' => 'erro', 'mensagem' => 'ID do funcionário não fornecido.']);
    exit;
}
$FuncionarioID = $dados['id'];

try {
    $conn->beginTransaction();

    
    $sql = $conn->prepare("DELETE FROM teste WHERE id = :id");
    $sql->bindParam(':id', $FuncionarioID);
    $sql->execute();

    if ($sql->rowCount() > 0) {
        echo json_encode(['status' => 'sucesso', 'mensagem' => 'Funcionário excluído com sucesso.']);
    } else {
        echo json_encode(['status' => 'erro', 'mensagem' => 'Nenhum funcionário encontrado com o ID fornecido.']);
    }
} catch (PDOException $e) {
    $conn->rollBack();
    echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao excluir funcionário: ' . $e->getMessage()]);
}