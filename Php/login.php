<?php
include "conecta.php";

$n1 = isset($_POST['n1']) ? trim($_POST['n1']) : '';
$n2 = isset($_POST['n2']) ? $_POST['n2'] : '';
$n3 = isset($_POST['n3']) ? $_POST['n3'] : '';
if (empty($n1) || empty($n2)) {
    echo json_encode(['data' => "Usuário ou senha não informados"]);
    exit;
}

try {
    $select = $conn->prepare('SELECT * FROM teste WHERE nome = :nome LIMIT 1');
    $select->execute([':nome' => $n1]);

    if ($select && $select->rowCount() > 0) {
        $batata = $select->fetch(PDO::FETCH_ASSOC);
        if (password_verify($n2, $batata['senha'])) {
            unset($batata['senha']); // Não retorna a senha
            echo $batata['funcao'];
        } else {
            echo "usuario ou senha incorreto";
        }
    } else {
        echo "Usuário ou senha incorretos";
    }
} catch (PDOException $e) {
    echo "Erro no servidor";
}
