<?php
session_start();

// require './views/repondant.php';
require './views/login.html';

if (isset($_SESSION['errors'])) {

    $_SESSION = array();
    // Détruire completement la session
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    // Finalement, on détruit la session.
    session_destroy();
    // var_dump("session detruite");
}

$_SESSION['errors'] = "out";