<?php

    session_start();
    $id = $_SESSION['id'];
    $idForm = $_SESSION['idFormulaire'];
    
    $username = "root";
    $password = "";
    try 
    {
        $db = new PDO('mysql:host=localhost;dbname=dossier'.';port=' . 3306, $username, $password, );
        // set the PDO error mode to exception
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $query = "SELECT COUNT(reponse.json) FROM reponse INNER JOIN formulaire ON reponse.numFormulaire = formulaire.id WHERE formulaire.user ='$id' AND formulaire.id = '$idForm'";
        $nRows = $db->query($query)->fetchColumn(); 
        $_SESSION['max'] = $nRows;
        
        $query = "SELECT reponse.json jsonReponse, formulaire.json jsonFormulaire FROM reponse INNER JOIN formulaire ON reponse.numFormulaire = formulaire.id WHERE formulaire.user ='$id'AND formulaire.id = '$idForm'";
        
        $find = 1;
        foreach  ($db->query($query) as $row) {

           if($_SESSION['cptLecture'] == $find)
           {
               $json = $row['jsonReponse'] ;
               echo $json;
               $json = $row['jsonFormulaire'] ;
               echo $json;
           }
           $find++;
        }
        
            echo
        //fermeture db 
        $db = null;

    } 
    catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
?>