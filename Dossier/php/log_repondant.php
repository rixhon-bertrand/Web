<?php
if ( isset( $_GET['submit'] ) ) {
    
    $nom = $_GET['name']; 
    $mdp = $_GET['mdp']; 

    $username = "root";
    $password = "";

    try 
    {
        $db = new PDO('mysql:host=localhost;dbname=dossier'.';port=' . 3306, $username, $password, );
        // set the PDO error mode to exception
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $query = "SELECT json FROM formulaire WHERE nom = '$nom' AND mdp = '$mdp' ;";
        
        foreach  ($db->query($query) as $row) {
            $json = $row['json'] ;
        }

        if(ISSET($json) != false) //je passe le json
        {
            session_start();
            $_SESSION['json']= $json;
            require '../views/repondantFormulaire.php';
            
        }else // je fais un alert
        {
            require '../views/repondant.php';
            echo "<script>alert(\"Le formulaire n'existe pas ou le mot de passe est pas bon !\")</script>";
        }

        //fermeture db 
        $db = null;

    } 
    catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }

    
}
?>