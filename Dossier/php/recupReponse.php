<?php
    // var_dump($_POST) ;
    $json = json_encode($_POST);

    $username = "root";
    $password = "";
    $nomForm = $_POST["question0"];
    
    try 
    {
        $db = new PDO('mysql:host=localhost;dbname=dossier'.';port=' . 3306, $username, $password, );
        // set the PDO error mode to exception
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $query = "SELECT id FROM formulaire WHERE nom ='$nomForm'";
        
        foreach  ($db->query($query) as $row) {
            $numForm = $row['id'] ;
        }

        $query = "INSERT INTO reponse (id, json, numFormulaire)
        VALUES
        (NULL, '$json', '$numForm');";
        
        $result = $db->query($query);

        //fermeture db 
        $db = null;

        require '../views/valider.html';
    } 
    catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
?>