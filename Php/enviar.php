<?php
include "conecta.php"; 

$Rm = $_POST['Rm'];

$select = $conn->prepare('SELECT * FROM alunos WHERE rm = :Rm LIMIT 1');
$select->execute([':Rm' => $Rm]);

if ($select && $select->rowCount() != 0) {
    $batata = $select->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode([ 
            'data'=> [$batata]
        ]); 
     } else {
        echo json_encode(['data' => "usuario ou senha incorreto"]); 
    }