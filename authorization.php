<?php
session_start();

if (!isset($_SESSION["user_id"])) {
    header("Location: index.html");
    exit();
}

// Check user role (assuming you have a "role" field in your users table)
$user_id = $_SESSION["user_id"];
$conn = new mysqli("localhost", "root", "", "file-sharing-app");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT role FROM users WHERE id = '$user_id'";
$result = $conn->query($sql);

if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    $user_role = $row["role"];

    echo json_encode(["role" => $user_role]); // Send the user's role as JSON
} else {
    header("Location: index.html");
    exit();
}

$conn->close();
?>
