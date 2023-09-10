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

    // Query the database to retrieve file metadata
    $stmt = $conn->prepare("SELECT filename, file_path FROM uploaded_files WHERE id = ?");
    $stmt->bind_param("i", $fileId);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        // File exists; retrieve file metadata
        $stmt->bind_result($filename, $file_path);
        $stmt->fetch();
    
        // Generate the appropriate headers for the download
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . $filename . '"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file_path)); // Use the file_path
    
        // Send the file content
        readfile($file_path); // Use the file_path
    } else {
        // File with the specified ID doesn't exist
        http_response_code(404); // Not Found
        echo json_encode(array('success' => false, 'message' => 'File not found.'));
    }

    $stmt->close();
    $conn->close();
} else {
    // File ID was not provided in the request
    http_response_code(400); // Bad Request
    echo json_encode(array('success' => false, 'message' => 'File ID not provided.'));
}
?>
