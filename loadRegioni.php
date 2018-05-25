<?php
    header('Content-Type: application/json'); //per la stampa in JSON
    
    $mysqli = new mysqli('localhost', 'root', '', 'test'); //Scelta Database e connessione al dbms
    if ($mysqli->connect_errno) {                          //Controllo
        die('Connect Error: ' . $mysqli->connect_errno);
    }
    
    $query = "SELECT DISTINCT Regione FROM Italia ";       
    $res = mysqli_query($mysqli, $query);
    
    $json = [];
    
    while ($row = mysqli_fetch_assoc($res)) {
        array_push($json, array($row["Regione"]));
    }
    
   echo json_encode($json, JSON_PRETTY_PRINT);
    
    mysqli_close($mysqli);      
?>