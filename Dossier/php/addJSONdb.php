<?php

session_start();

$json =  $_POST['json'];
$nom = $_POST['nom'];
$mdp = $_POST['mdp'];
$idUser = $_SESSION['id'];
        
$username = "root";
$password = "";

try 
{
  $db = new PDO('mysql:host=localhost;dbname=dossier'.';port=' . 3306, $username, $password, );
  // set the PDO error mode to exception
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $query = "INSERT INTO formulaire (id, nom, json, mdp, user)
  VALUES
  (NULL, '$nom' ,'$json', '$mdp', '$idUser');";

  $result = $db->query($query);
  
  if($result != false)
  {
    echo "Ajout reussi";
    //fermeture db 
    $db = null;
  }else
  {
    echo "Ajout raté";
    //fermeture db 
    $db = null;
  }
  

} 
catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}

?>