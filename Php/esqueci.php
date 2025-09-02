<?php
include "conecta.php";

ob_clean(); // limpa qualquer saída anterior
header("Content-Type: application/json; charset=utf-8");

$n1 = $_POST["n1"] ?? null;
$n3 = $_POST["n3"] ?? null;

if (!$n1 || !$n3) {
    echo json_encode(["success" => false, "message" => "Dados incompletos"]);
    exit;
}

try {
    $n1Hash = password_hash($n1, PASSWORD_DEFAULT);

    $sql = "SELECT nome FROM teste WHERE nome = :nome";
    $result = $conn->prepare($sql);
    $result->bindParam(':nome', $n3);
    $result->execute();

    if ($result->rowCount() > 0) {
        $sql = "UPDATE teste SET senha = :senha WHERE nome = :nome";
        $result = $conn->prepare($sql);
        $result->bindParam(':senha', $n1Hash);
        $result->bindParam(':nome', $n3);

        if ($result->execute()) {
            echo json_encode(["success" => true, "message" => "Senha alterada com sucesso!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Erro ao alterar a senha."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Usuário não encontrado."]);
    }
} catch (Exception $e) {
    echo json_encode(["success"=>false, "message"=>$e->getMessage()]);
    exit;
}
