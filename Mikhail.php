<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendar</title>  
    <link rel="stylesheet" href="Mstyle.css">
    <?php
    include_once "func.php";
    include_once "langUtil.php";

    $d = is_null($_GET["d"]) || $_GET["d"] == "" ? date("j") : $_GET["d"];
    $m = is_null($_GET["m"]) || $_GET["m"] == "" ? date("n") : $_GET["m"];
    $y = is_null($_GET["y"]) || $_GET["y"] == "" ? date("Y") : $_GET["y"];
    $date = mktime(0,0,0,$m,$d,$y);
    $today = mktime(0,0,0,date("n"),date("j"),date("Y"));

    $link = $_SERVER["SCRIPT_NAME"];
    ?>
</head>
<body>    
  <div class="container">
  <div class="look-calendar">
    <table id="calendar">
      <thead>
      <tr>
      <td><div id='prev' class="primary">
          <a href="<?php echo $link."?y=".$y."&m=".($m-1)."&d=".$d?>">‹‹ Пред</a>
          </div>
      <td colspan="5"><?php echo $months[date("m",$date)].date(" Y",$date); ?></td>
      <td><div id='next' class="primary">
          <a href="<?php echo $link."?y=".$y."&m=".($m+1)."&d=".$d?>">След ››</a>
          </div>
      <tr class="dn"><td>Понедельник<td>Вторник<td>Среда<td>Четверг<td>Пятница<td>Суббота<td>Воскресенье
      </thead>
      <tbody>
        <?php
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
                if(mktime(0,0,0,$m,$i-$offset,$y) == $today){ echo "<td class='day' id='today'>".$i-$offset;}
                else{ echo "<td class='day'>".$i-$offset;}
                
                $dayDate = mktime(0,0,0,$m,$i-$offset,$y);
                $payments = getTotal(date("Y-m-d 00:00:00",$dayDate));
                if($payments[0] > 0){
                    echo "<br>";
                    echo "<p class='parag'>".$payments[1]." ".ending($payments[1])."</p>";
                    echo "<p class='parag'>".prettyNum($payments[0])." руб</p>"; 
                }
                echo "</td>";
            }
            echo "</tr>";
        }
        ?>
      </tbody>
    </table>
    </div>
    <div class="events">
      <p>Платежи за <?php echo date("j.m.Y",$date) ?></p>
      <div class="content">
        <table id="event">  
          <tbody>
            <?php
             $payments = getPayments(date("Y-m-d 00:00:00",$date));
             foreach($payments as &$payment){
                 echo "<tr><td>".prettyNum($payment)." руб</td></tr>";
             }
            ?>
          </tbody>
        </table>

      </div>
    </div>
  </div>

  <!-- <script src="Mscript.js"></script> -->
</body>
</html>