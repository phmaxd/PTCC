<?php
include ('conecta.php');

if (isset($_FILES['imagem']) && isset($_POST['nome'])) {
    $arquivo = $_FILES['imagem'];
    $caminhoTemporario = $arquivo['tmp_name'];
    if (!file_exists('imagens/')) {
        mkdir('imagens/', 0777, true);
    }
    $extensao = strtolower(pathinfo($arquivo['name'], PATHINFO_EXTENSION));
    $novoNome = "imagens/" . uniqid() . '.' . $extensao;
    if (move_uploaded_file($caminhoTemporario, $novoNome)) {
        try {
            $nome = $_POST['nome'];
            $sql = "INSERT INTO alunos (nome, imagem) VALUES(:nome, :imagem)";
            $stmt = $conn->prepare($sql);
            $stmt->execute(array[
                ':nome' => $nome,
                ':imagem' => $novoNome
            ]);
            echo json_encode([
                "success" => true,
                "message" => "Arquivo enviado com sucesso",
                "filename" => $novoNome
            ]);
        } catch (\Throwable $th) {
            echo json_encode([
            "success" => false,
            "message" => "Erro ao enviar o arquivo => " . $th->getMessage()
        ]);
        }
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Erro ao enviar o arquivo"
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Nenhum arquivo foi enviado"
    ]);
}
?>
