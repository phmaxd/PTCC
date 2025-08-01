<?
include "conecta.php";

$select = $conn ->prepare('SELECT * FROM alunos WHERE entrou = sim');
$select->execute();

$dados = $select -> fetchall(PDO::FETCH_ASSOC);
echo json_encode($dados);







?>