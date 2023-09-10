<?php
session_start();

if (isset($_SESSION["username"])) {
    // Get the username from the session
    $username = $_SESSION["username"];

    // Replace with your database connection logic
    $conn = new mysqli("localhost", "root", "", "file-sharing-app");
    if ($conn->connect_error) {
        http_response_code(500); // Internal Server Error
        echo json_encode(array('success' => false, 'message' => 'Database connection failed'));
        exit();
    }

    // Query the database to retrieve user data based on the username
    $sql = "SELECT * FROM users WHERE username = '$username'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        // You can retrieve additional user data here
        $email = $row["email"];

        // Send a success JSON response with user data
        echo json_encode(array('success' => true, 'username' => $username, 'email' => $email));
    } else {
        // Send an error JSON response
        http_response_code(404); // Not Found
        echo json_encode(array('success' => false, 'message' => 'User not found'));
    }

    $conn->close();
} else {
    // Send an error JSON response if the username is not set in the session
    http_response_code(401); // Unauthorized
    echo json_encode(array('success' => false, 'message' => 'Username not found.'));
}
?>
