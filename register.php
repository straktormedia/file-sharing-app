<?php
header("Content-Type: application/json"); // Set the content-type to JSON

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve user input from the form
    $username = $_POST["username"];
    $email = $_POST["email"]; 
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT); // Hash the password

    // Insert user data into the database
    $conn = new mysqli("localhost", "root", "", "file-sharing-app");
    if ($conn->connect_error) {
        // Send an error JSON response
        http_response_code(500); 
        echo json_encode(array('success' => false, 'message' => 'Database connection failed'));
        exit();
    }

    $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')"; // Include email field
    if ($conn->query($sql) === TRUE) {
        // Send a success JSON response
        echo json_encode(array('success' => true, 'message' => 'Registration successful'));
    } else {
        // Send an error JSON response
        http_response_code(400); // Set a 400 Bad Request status code
        echo json_encode(array('success' => false, 'message' => 'Registration failed: ' . $conn->error));
    }

    $conn->close();
}
?>
