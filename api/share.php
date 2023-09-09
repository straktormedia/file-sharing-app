<?php
session_start();

if (!isset($_SESSION["user_id"])) {
    http_response_code(401); // Unauthorized
    echo json_encode(array('success' => false, 'message' => 'User not authenticated'));
    exit();
}

if (isset($_GET["id"])) {
    // Extract the file ID from the request
    $fileId = $_GET["id"];

    // Get the user ID of the logged-in user
    $userId = $_SESSION["user_id"];

    // Initialize a database connection
    $conn = new mysqli("localhost", "root", "", "file-sharing-app");

    if ($conn->connect_error) {
        // Handle database connection error
        http_response_code(500); // Internal Server Error
        echo json_encode(array('success' => false, 'message' => 'Database connection failed.'));
        exit();
    }

    // Query the database to check if the file belongs to the user
    $stmt = $conn->prepare("SELECT id FROM uploaded_files WHERE id = ? AND user_id = ?");
    $stmt->bind_param("ii", $fileId, $userId);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // For example, you can generate a shareable link to the file

        // For demonstration purposes, let's assume sharing is successful
        $shareableLink = "http://localhost/file-sharing-app/uploads/user_7/?id=$fileId";
        $response = array('success' => true, 'message' => 'File shared successfully.', 'shareable_link' => $shareableLink);
    } else {
        // File with the specified ID doesn't belong to the user
        $response = array('success' => false, 'message' => 'File not found or unauthorized.');
    }

    $stmt->close();
    $conn->close();
} else {
    // File ID was not provided in the request
    $response = array('success' => false, 'message' => 'File ID not provided.');
}

// Send a JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>
