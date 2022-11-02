<?php
session_start();

$id = hash('ripemd160', $_POST['id']);
$name = $_POST['name'];
$email = $_POST['email'];

$username = "root";
$password = "";

try 
{
  $db = new PDO('mysql:host=localhost;dbname=dossier'.';port=' . 3306, $username, $password, );
  // set the PDO error mode to exception
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $query = "SELECT '$id' FROM users";

  $result = $db->query($query);
  
  if($result != false)
  {
    $_SESSION['id']= $id;
    
    echo "user deja existant";
  }else
  {
    $query = "INSERT INTO users VALUES ('$id', '$name', '$email')";
    $db->query($query);
    $_SESSION['id']= $id;
;
    echo "user ajouté";
  }
  //fermeture db 
  $db = null;
} 
catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}
?>