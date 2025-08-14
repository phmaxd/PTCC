<?php
include "conecta.php";
$n1 = $_POST['n1'];
$n2 = $_POST['n2'];

$select = $conn->prepare('SELECT * FROM teste WHERE nome = :nome LIMIT 1');
$select->execute([':nome' => $n1]);

if ($select && $select->rowCount() != 0) {
    $batata = $select->fetch(PDO::FETCH_ASSOC);
    if ($batata['nome'] == $n1 && password_verify($n2, $batata['senha'])) {
        echo json_encode([ 
            'data'=> [$batata]
        ]); //estilizar no futuro
        
    } else {
        echo json_encode(['data' => "usuario ou senha incorreto"]); 
    }
} else {
    echo json_encode(['data' => "usuario ou senha incorreto"]);
}
?>