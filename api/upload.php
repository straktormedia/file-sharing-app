<?php
session_start();

// Check if file was uploaded
if (isset($_FILES['file'])) {
    $file = $_FILES['file'];

    // Get the user's ID or username from your authentication system
    $userId = $_SESSION['user_id']; // You can replace this with your actual user ID retrieval logic
    // Alternatively, you can use the username:
    // $username = $_SESSION['username'];

    // Create a folder for the user if it doesn't exist
    $userUploadDirectory = "../uploads/user_$userId/"; // Modify the folder structure as needed

    if (!is_dir($userUploadDirectory)) {
        mkdir($userUploadDirectory, 0777, true); // Create the user's directory if it doesn't exist
    }

    // Move the uploaded file to the user's directory
    if (move_uploaded_file($file['tmp_name'], $userUploadDirectory . $file['name'])) {
        // File upload was successful
        $response = array('success' => true, 'message' => 'File uploaded successfully.');
    } else {
        // File upload failed
        $response = array('success' => false, 'message' => 'File upload failed.');
    }
} else {
    // No file was uploaded
    $response = array('success' => false, 'message' => 'No file was selected for upload.');
}

// Send a JSON response
header('Content-Type: application/json');
echo json_encode($response);

?>
