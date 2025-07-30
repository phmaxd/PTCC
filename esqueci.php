<?php
include "conecta.php";

$n1 = $_POST["n1"];

$n1 = password_hash($n1, PASSWORD_DEFAULT);




?>