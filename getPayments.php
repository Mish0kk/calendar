<?php
include_once "func.php";

$d = $_POST['d'];
$m = $_POST['m'];
$y = $_POST['y'];

$date = date("Y-m-d 00:00:00",mktime(0,0,0,$m,$d,$y));

echo json_encode(getPayments($date));
?>