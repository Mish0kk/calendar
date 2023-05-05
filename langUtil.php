<?php
function ending($num){
        $lastTwo = $num % 100;
        if(20 > $lastTwo && $lastTwo > 10){
                return "платежей";
        }
        $lastDigit = $num % 10;
        switch($lastDigit){
                case 1:
                        return "платеж";
                case 2:
                        return "платежа";
                case 3:
                        return "платежа";
                case 4:
                        return "платежа";
                default:
                        return "платежей";
        }
}

function prettyNum($num){
        $strNum = explode(".",$num);
        $rub = trim(strrev(chunk_split(strrev($strNum[0]),3,' '))); // с конца каждые 3 символа добавить пробел
        if($strNum[1] == "") return $rub;
        return $rub.",".$strNum[1];
}
?>