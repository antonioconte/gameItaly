<?php

    $list = json_decode(file_get_contents("./citta.json"), true);
    $regionList = json_decode(file_get_contents("./regioni.json"), true);
    $obj = json_decode($_GET["data"]);
    $regione = $regionList[$_GET["regione"]]["nome"];
    
    function check($idCitta, $regione, $list){
         if($regione == $list[$idCitta]["Regione"]) return 1;
         else return 0;
    }
    for($i=0; $i<count($obj); $i=$i+1){
        $res = check($obj[$i], $regione, $list);
        if($res != 1){
            echo "0";
            exit();
        }
    }
    echo "1";
?>