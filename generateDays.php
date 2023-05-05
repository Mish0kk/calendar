<?php
include_once "func.php";

$m = is_null($_POST["m"]) || $_POST["m"] == "" ? date("n") : $_POST["m"];
$y = is_null($_POST["y"]) || $_POST["y"] == "" ? date("Y") : $_POST["y"];
$today = mktime(0,0,0,date("n"),date("j"),date("Y"));

$daysToDisplay = array();
$offset = -1;
for($i = 1; $i < date("N",mktime(0,0,0,$m,1,$y));$i++){$daysToDisplay[] = 0; $offset++;} // пустые дни
for($day = 1;$day<=date("t",$date);$day++){$daysToDisplay[] = $day;}

for($day = 0; $day <= count($daysToDisplay); $day +=7){
    echo "<tr>";
    for($i = $day; $i <= $day+6; $i++){
        if($daysToDisplay[$i] == 0){
            echo "<td class='day'></td>";
            continue;
        }
        if(mktime(0,0,0,$m,$i-$offset,$y) == $today){ echo "<td name=".$i-$offset." tabindex='0' class='day' id='today'>".$i-$offset;}
        else{ echo "<td name=".$i-$offset." tabindex='0' class='day'>".$i-$offset;}
        
        $dayDate = mktime(0,0,0,$m,$i-$offset,$y);
        $payments = getTotal(date("Y-m-d 00:00:00",$dayDate));
        if($payments[0] > 0){
            echo "<br>";
            echo "<p id='large' class='parag'>".$payments[1]."</p>";
            echo "<p id='large' class='parag'>".$payments[0]."</p>"; 
            echo "<div id='small' class='point'>".explode(" ",$payments[1])[0]."</div>";
        }
        echo "</td>";
    }
    echo "</tr>";
}
?>