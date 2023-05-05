<?php
include_once "conn.php";
include_once "langUtil.php";
		
function getTotal($date){
	$sumsql = queryMysql("SELECT sum FROM payment WHERE date_reestr = '$date'");
	if($sumsql->num_rows == 0){
		return 0;
	}

	$sum = floatval(0.0);
	while($row = $sumsql->fetch_assoc()){
		$sum += floatval($row["sum"]);
	}
	$sql = queryMysql("SELECT COUNT(sum) AS amount FROM payment WHERE date_reestr = '$date' ORDER BY date_reestr");
	$row = $sql->fetch_assoc();
	
	return [prettyNum($sum)." руб",$row["amount"]." ".ending($row["amount"])];
}

function getPayments($date){
	$res = queryMysql("SELECT sum FROM payment WHERE date_reestr = '$date' ORDER BY date_reestr");
	$payments = array();
	while($row = $res->fetch_assoc()){
		$payments[] = prettyNum($row["sum"])." руб";
	}
	if(empty($payments)){return 0;}	
	return $payments;
}
 ?>