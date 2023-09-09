<?php
// Check if a file was uploaded
if (isset($_FILES['file'])) {
    $file = $_FILES['file'];

    // Define the directory where uploaded files will be saved
    $uploadDirectory = 'uploads/';

    // Ensure the directory exists, or create it if necessary
    if (!is_dir($uploadDirectory)) {
        mkdir($uploadDirectory, 0755, true);
    }

    // Generate a unique filename for the uploaded file
    $filename = $uploadDirectory . uniqid() . '_' . $file['name'];

    // Move the uploaded file to the destination directory
    if (move_uploaded_file($file['tmp_name'], $filename)) {
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
