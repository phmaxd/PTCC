 <?php
 header('Content-Type: application/json');
include 'conecta.php';
$n1 = $_POST['n1'];
$n2 = $_POST['n2'];
$n3 = $_POST['n3'];

$select = $conn ->prepare('SELECT * FROM teste WHERE nome = :nome');
$select -> execute(array(
    ':nome' => $n1
));
$batata = $select -> fetch(PDO::FETCH_ASSOC);
if (($select) && $select->rowCount() != 0) {
    echo json_encode(["status" => "exists"]);
} else {
    $hash = password_hash($n2, PASSWORD_DEFAULT); 
    $INSERT = 'INSERT INTO teste (nome, senha, funcao) VALUES (:nome, :senha, :funcao)';

    $cadastro = $conn->prepare($INSERT);
    $cadastro->execute(array(
        ":nome" => $n1,
        ":senha" => $hash,
        ":funcao" => $n3 
    ));

    echo json_encode(["status" => "success"]);
}
