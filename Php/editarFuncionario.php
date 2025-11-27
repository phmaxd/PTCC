<?php
include 'conecta.php'; // conexão pronta

if (!isset($_POST['id'], $_POST['nome'])) {
    echo "Dados inválidos!";
    exit;
}

$id = $_POST['id'];
$nome = trim($_POST['nome']);

if (!$nome) {
    echo "O nome não pode ficar vazio!";
    exit;
}

// Atualiza apenas o nome
$sql = "UPDATE funcionario SET nome = :nome WHERE id = :id";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':nome', $nome);
$stmt->bindParam(':id', $id);

if ($stmt->execute()) {
    echo "Nome alterado com sucesso!";
} else {
    echo "Erro ao alterar o nome.";
}
?>
