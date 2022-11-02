<!DOCTYPE html>
<?php
    session_start();
    try 
    {
        
        if(isset($_SESSION['id']))
        {
            $db = new PDO('mysql:host=localhost;dbname=dossier'.';port=' . 3306, "root", "", );
            // set the PDO error mode to exception
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $id = $_SESSION['id'];
            $query = "SELECT * FROM formulaire WHERE user ='$id'";

            $result = $db->query($query);
?>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Menu</title>
    <link rel="stylesheet" href="../style/style.css">
    <link rel="shortcut icon" href="../img/ico.png">
</head>
<header>
    <a href="../views/menu.php"><img class = "logo" src="../img/Logo_HEPL.jpg"></a>
</header>
<body>
    <ul class="menu">
    <?php 
        foreach  ($db->query($query) as $row) : 
    ?>
        <li>
            <p><u>Nom du formulaire </u> : <?php echo $row['nom'] ?> </p>
            <p><u>Mot de passe du formulaire </u> : <?php echo $row['mdp'] ?> </p>
            <div id="<?php echo $row['id'] ?>"> <!-- numero formulaire  -->
                <button>Modifier</button>
                <button onclick="getFormLire(this)">Lire</button>
                <button onclick="getFormSupprimer(this)">Supprimer</button>
                <!-- <input id="giveDroit" type="text"> <button onclick="getFormAddDroit(this)">Ajout Droit</button> -->
            </div>
        </li>
    <?php 
            endforeach;
            //fermeture db 
            $db = null;
        }
    } 
    catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
    ?>
        <li>
            <a href="../views/create.html"><button>Créer un formulaire</button></a>
            <a href="../index.php"><button>Sign Out</button>
        </li>
    </ul>
    
</body>
<footer>
    <script src="../js/menu.js"></script>
</footer>
</html>