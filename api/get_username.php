<?php
session_start();

if (isset($_SESSION["username"])) {
    $username = $_SESSION["username"];
    echo json_encode(array('success' => true, 'username' => $username));
} else {
    echo json_encode(array('success' => false, 'message' => 'Username not found.'));
}
?>
