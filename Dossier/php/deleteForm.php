<?php

    session_start();
    $id = $_SESSION['id'];
    $idForm = $_POST['name'];

    $username = "root";
    $password = "";
    try 
    {
        $db = new PDO('mysql:host=localhost;dbname=dossier'.';port=' . 3306, $username, $password, );
        // set the PDO error mode to exception
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $query = "DELETE FROM formulaire WHERE id = '$idForm';";
        
        $result = $db->query($query);
       
        echo $result;
        //fermeture db 
        $db = null;

    } 
    catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
?>