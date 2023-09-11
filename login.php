<?php
header("Content-Type: application/json"); // Set the content-type to JSON

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve user input from the login form
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Check user credentials against the database
    $conn = new mysqli("localhost", "root", "", "file-sharing-app");
    if ($conn->connect_error) {
        // Send an error JSON response with both HTTP status code and a custom message
        echo json_encode(array('success' => false, 'http_status' => 500, 'message' => 'Database connection failed'));
        exit();
    }

    $sql = "SELECT id, username, password, role FROM users WHERE username = '$username'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row["password"])) {
            // Start a session for the authenticated user
            session_start();
            $_SESSION["user_id"] = $row["id"];
            $_SESSION["username"] = $row["username"];
            $_SESSION["role"] = $row["role"]; // Include the role in the session

            // Send a success JSON response with both HTTP status code and a custom message
            echo json_encode(array('success' => true, 'http_status' => 200, 'message' => 'Login successful', 'role' => $row["role"]));
        } else {
            // Send an error JSON response with both HTTP status code and a custom message
            echo json_encode(array('success' => false, 'http_status' => 401, 'message' => 'Incorrect password'));
        }
    } else {
        // Send an error JSON response with both HTTP status code and a custom message
        echo json_encode(array('success' => false, 'http_status' => 404, 'message' => 'User not found'));
    }

    $conn->close();
}
?>
