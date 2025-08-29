<?php
include 'conecta.php';

$Rm = "";

if($_POST['acao'] == "inserir" ){

try {
    $resposta = $conn->prepare("SELECT * FROM alunos WHERE rm = :Rm");
    $resposta->bindParam(":Rm", $Rm, PDO::PARAM_INT);
    $resposta->execute();

    if ($resposta && $resposta->rowCount() > 0) {
        $dados = $resposta->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode([
            'success' => true,
            'data' => $dados
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => "Usuário não encontrado",
            'rm_recebido' => $Rm
        ]);
    }
} catch (Throwable $th) {
    echo json_encode([
        'success' => false,
        'message' => "Erro: " . $th->getMessage()
    ]);
}
} else {
    $Rm = $_POST['Rm'];
}