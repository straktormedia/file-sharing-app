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

    // Initialize a database connection
    $conn = new mysqli("localhost", "root", "", "file-sharing-app");

    if ($conn->connect_error) {
        // Handle database connection error
        http_response_code(500); // Internal Server Error
        echo json_encode(array('success' => false, 'message' => 'Database connection failed.'));
        exit();
    }

    // Query the database to get the user ID of the uploader and the filename
    $stmt = $conn->prepare("SELECT user_id, filename FROM uploaded_files WHERE id = ?");
    $stmt->bind_param("i", $fileId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $fileInfo = $result->fetch_assoc();
        $uploaderUserId = $fileInfo['user_id'];
        $filename = $fileInfo['filename'];

        // Generate the real file location based on the uploader's ID and filename
        $shareableLink = "http://localhost/file-sharing-app/uploads/user_$uploaderUserId/$filename";

        $response = array('success' => true, 'message' => 'File shared successfully.', 'shareable_link' => $shareableLink);
    } 
    else {
        // File with the specified ID doesn't exist
        $response = array('success' => false, 'message' => 'File not found.');
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
