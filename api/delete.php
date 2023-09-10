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

        // Get the user ID of the logged-in user
        $loggedInUserId = $_SESSION["user_id"];

        // Check if the logged-in user has the privilege to delete the file
        // You can add additional logic here to determine the privileges, e.g., user roles
        if ($uploaderUserId) {
            // Delete the file from the folder
            $userUploadDirectory = "../uploads/user_$uploaderUserId/";
            $filePath = $userUploadDirectory . $filename;

            if (unlink($filePath)) {
                // File deleted from the folder successfully
                // Now, delete the file from the database
                $stmt->close();

                $deleteStmt = $conn->prepare("DELETE FROM uploaded_files WHERE id = ?");
                $deleteStmt->bind_param("i", $fileId);

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
            // Unauthorized: The logged-in user doesn't have permission to delete this file
            $response = array('success' => false, 'message' => 'Unauthorized to delete this file.');
        }
    } else {
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
