<?php
header('Content-Type: application/json; charset=utf-8');
include 'conecta.php';

$query = $conn->query("SELECT slot FROM digitais ORDER BY slot ASC");
$ocupados = $query->fetchAll(PDO::FETCH_COLUMN);

// encontra o menor slot disponível (ex: 1 a 127)
$menorSlot = 1;
for ($i = 1; $i <= 127; $i++) {
    if (!in_array($i, $ocupados)) {
        $menorSlot = $i;
        break;
    }
}

echo json_encode(["menor_slot" => $menorSlot]);
?>