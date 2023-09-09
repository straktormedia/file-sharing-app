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

    // Query the database to get the filename associated with the file ID
    $stmt = $conn->prepare("SELECT filename FROM uploaded_files WHERE id = ? AND user_id = ?");
    $stmt->bind_param("ii", $fileId, $userId);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($filename);
        $stmt->fetch();

        // Delete the file from the folder
        $userUploadDirectory = "../uploads/user_$userId/";
        $filePath = $userUploadDirectory . $filename;

        if (unlink($filePath)) {
            // File deleted from the folder successfully
            // Now, delete the file from the database
            $stmt->close();

            $deleteStmt = $conn->prepare("DELETE FROM uploaded_files WHERE id = ? AND user_id = ?");
            $deleteStmt->bind_param("ii", $fileId, $userId);
            
            if ($deleteStmt->execute()) {
                // File deleted from the database successfully
                $response = array('success' => true, 'message' => 'File deleted successfully.');
            } else {
                // Handle database deletion error
                $response = array('success' => false, 'message' => 'Failed to delete file from the database.');
            }

            $deleteStmt->close();
        } else {
            // Handle file deletion from folder error
            $response = array('success' => false, 'message' => 'Failed to delete file from the folder.');
        }
    } else {
        // File with the specified ID doesn't belong to the user
        $response = array('success' => false, 'message' => 'File not found or unauthorized.');
    }

    $conn->close();
} else {
    // File ID was not provided in the request
    $response = array('success' => false, 'message' => 'File ID not provided.');
}

// Send a JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>
