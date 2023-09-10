<?php
header("Content-Type: application/json"); // Set the content-type to JSON

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve user input from the form
    $username = $_POST["username"];
    $email = $_POST["email"]; 
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT); // Hash the password
    $role = $_POST["role"]; 

    // Replace with your database connection logic
    $conn = new mysqli("localhost", "root", "", "file-sharing-app");
    if ($conn->connect_error) {
        // Send an error JSON response
        http_response_code(500); 
        echo json_encode(array('success' => false, 'message' => 'Database connection failed'));
        exit();
    }

    // Check if the username already exists
    $checkUsernameQuery = "SELECT * FROM users WHERE username = '$username'";
    $usernameResult = $conn->query($checkUsernameQuery);

    // Check if the email already exists
    $checkEmailQuery = "SELECT * FROM users WHERE email = '$email'";
    $emailResult = $conn->query($checkEmailQuery);

    if ($usernameResult->num_rows > 0) {
        // Send an error JSON response indicating duplicate username
        http_response_code(400); // Bad Request
        echo json_encode(array('success' => false, 'message' => 'Username already exists'));
    } elseif ($emailResult->num_rows > 0) {
        // Send an error JSON response indicating duplicate email
        http_response_code(400); // Bad Request
        echo json_encode(array('success' => false, 'message' => 'Email already exists'));
    } else {
        // Insert user data into the database
        $insertQuery = "INSERT INTO users (username, email, password, role) VALUES ('$username', '$email', '$password', '$role')"; 
        if ($conn->query($insertQuery) === TRUE) {
            // Send a success JSON response
            echo json_encode(array('success' => true, 'message' => 'Registration successful'));
        } else {
            // Send an error JSON response
            http_response_code(400); // Bad Request
            echo json_encode(array('success' => false, 'message' => 'Registration failed: ' . $conn->error));
        }
    }

    $conn->close();
}
?>
