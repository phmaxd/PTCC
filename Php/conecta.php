<?php

try {
    $conn = new PDO('mysql:host=localhost;port=3306;dbname=banco;charset=utf8mb4', 'root', 'usbw');
    $conn-> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'error: ' . $e->getmessage();
}


?>