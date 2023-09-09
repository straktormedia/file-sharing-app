<?php
session_start();
 // Check If user is logged in and send response to JavaScript
if (!isset($_SESSION["user_id"])) {
    header("HTTP/1.1 401 Unauthorized");
    exit();
}
?>