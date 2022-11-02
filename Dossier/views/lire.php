<!DOCTYPE html>
<?php
    session_start();
    if (ISSET($_SESSION['cptLecture']))
    {
        if(ISSET($_POST['plus']))
        {
            $_SESSION['cptLecture']++;
            if($_SESSION['cptLecture'] > $_SESSION['max'])
            {
                $_SESSION['cptLecture'] = $_SESSION['max'];
            }
        }
        if(ISSET($_POST['moins']))
        {
            $_SESSION['cptLecture']--;

            if($_SESSION['cptLecture'] < 1)
            {
                $_SESSION['cptLecture'] = 1;
            }
        }
    }else
    {
        $_SESSION['cptLecture'] = 1;
    }
    // echo $_SESSION['cptLecture'];
?>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Lire les formulaires</title>
    <link rel="stylesheet" href="../style/style.css">
    <link rel="shortcut icon" href="../img/ico.png">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.debug.js"></script> <!-- pdf -->
    <script src="../js/lire.js"></script>
    <script src="../js/HtmlToPDF.js"></script>
</head>
<header>
    <a href="../views/menu.php"><img class = "logo" src="../img/Logo_HEPL.jpg"></a>
</header>
<body>
    <div id="formulaire" class="lecture">

    </div>
    <div id="elementH"></div>
    <form action="../views/lire.php" method="post">
        <input type="submit" value="Precedent" name ="moins">
        <input type="submit" value="Suivant" name ="plus">
    </form>
    <button class="valider" onclick="HtmlToPDF();">Générer un PDF</button>
</body>
<footer>
    
</footer>
</html>