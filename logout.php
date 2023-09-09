<?php
session_start(); 

 // If user is logged in destroy the session
if (isset($_SESSION["user_id"])) {
   
    session_destroy();
}

// Redirect to the login page 
header("Location: index.html"); 
exit();
?>
