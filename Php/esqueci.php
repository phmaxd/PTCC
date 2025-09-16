<?php
include "conecta.php";

$n1 = $_POST["n1"];
$n3 = $_POST["n3"];

$n1 = password_hash($n1, PASSWORD_DEFAULT);
$sql = "SELECT nome FROM teste WHERE nome = :nome";
$result = $conn->prepare($sql);
$result->bindParam(':nome', $n3);
$result->execute();
if ($result->rowCount() > 0) {
    $sql = "UPDATE teste SET senha = :senha WHERE nome = :nome";
    $result = $conn->prepare($sql);
    $result->bindParam(':senha', $n1);
    $result->bindParam(':nome', $n3);
    if ($result->execute()) {
        echo "Senha alterada com sucesso!";
    } else {
        echo "Erro ao alterar a senha.";
    }
} else {
    echo "Usuário não encontrado.";
}




?>