<?php
    session_start();

    $_SESSION['idFormulaire'] = $_POST['name'];
    echo $_SESSION['idFormulaire']
?>