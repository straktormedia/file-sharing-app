<?php
// Check if file was uploaded
if (isset($_FILES['file'])) {
    $file = $_FILES['file'];

    // Set Uploads directory
    $uploadDirectory = '.././uploads/';

    // If the directory doesn't exist, create it
    if (!is_dir($uploadDirectory)) {
        mkdir($uploadDirectory, true); 
    }

    // move_uploaded_file() moves the uploaded file from a temporary file path on the server where the uploaded file is stored temporarily after the user has submitted it("tmp_name") to the directory specified by $uploadDirectory, using the original filename (accessed via $file['name']).
    if (move_uploaded_file($file['tmp_name'], $uploadDirectory . $file['name'])) {
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
