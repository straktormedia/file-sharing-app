<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "file-sharing-app";

// Create a connection
$conn = new mysqli($servername, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    // If there's an error, display an error message and exit
    die("Connection failed: " . $conn->connect_error);
} else {
    // If the connection is successful, you can perform database operations here
    echo "Connected to the database successfully!";
}
?>