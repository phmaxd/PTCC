<?php
include "conecta.php";
$n1 = $_POST['n1'];
$n2 = $_POST['n2'];

$select = $conn->prepare('SELECT * FROM teste WHERE nome = :nome AND senha = :senha LIMIT 1');
$select->execute([':nome' => $n1, ':senha' => $n2]);

if ($select && $select->rowCount() != 0) {
    $batata = $select->fetch(PDO::FETCH_ASSOC);
        echo json_encode([ 
            'data'=> [$batata]
        ]); //estilizar no futuro

} else {
    echo json_encode(['data' => "usuario ou senha incorreto"]);
}
