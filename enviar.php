<?php
include "conecta.php"; 

if (isset($_POST['nome']) && isset($_FILES['imagem'])) {
    $nome = $_POST['nome'];
    $imagem = $_FILES['imagem']['name'];

    $extensao = strtolower(pathinfo($imagem, PATHINFO_EXTENSION));
    $newNameFile = uniqid() . '.' . $extensao;
    $diretorio = "imagens/";

    // Corrige a query: remove aspas dos parâmetros
    // Corrige o array de parâmetros para corresponder à query

    if (!is_dir($diretorio)) {
        mkdir($diretorio, 0777, true);
    }
    $destino = $diretorio . $newNameFile;

    if (move_uploaded_file($_FILES['imagem']['tmp_name'], $destino)) {
        $salvar = $conn->prepare("INSERT INTO alunos (nome, imagem) VALUES (:nome, :imagem)");
        $salvar->execute(array(
            ':nome' => $nome,
            ':imagem' => $newNameFile
        ));
    } else {
        echo "Erro ao enviar dados";
        exit;
    }
} else {
    echo "Nome ou imagem não foram enviados.";
    exit;
}


?>