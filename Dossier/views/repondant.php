<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
    <title>Repondant</title>
    <link rel="stylesheet" href="../style/style.css">
    <link rel="shortcut icon" href="../img/ico.png">
</head>
<header>
    <a href="../views/repondant.php"><img class = "logo" src="../img/Logo_HEPL.jpg"></a>
</header>
<body>
    <form action="../php/log_repondant.php" method="get">
        <label for="name">Encodez le nom du formulaire:</label> <br>
        <input type="text" id="name" name="name"> <br>
        <label for="mdp">Encodez le mot de passe du formulaire:</label> <br>
        <input type="password" id="mdp" name="mdp"> <br> 
        <input type="submit" name="submit" value="Submit">
    </form> 
</body>
</html>