<?php
$dbhost = 'localhost';
$dbname = 'test_student1';
$dbuser = 'student_usr';
$dbpass = '6gEr62@xu!d';
$conn = new mysqli($dbhost,$dbuser,$dbpass,$dbname);
$conn->set_charset("utf8");
if ($conn->connect_error) die($conn->connect_error);

function queryMysql($query){
    global $conn;
    $result = $conn->query($query);
    
	if (!$result) die ($conn->error);
    return $result;    
}
?>