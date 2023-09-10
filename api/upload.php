<?php
session_start();

// Check if file was uploaded
if (isset($_FILES['file'])) {
    $file = $_FILES['file'];

    // Get the user's ID, role, and username from your authentication system
    $userId = $_SESSION['user_id']; // You can replace this with your actual user ID retrieval logic
    $userRole = $_SESSION['role']; // Retrieve the user's role
    $username = $_SESSION['username']; // Retrieve the username

    // Create a folder for the user if it doesn't exist
    $userUploadDirectory = "../uploads/user_$userId/"; // Modify the folder structure as needed

    if (!is_dir($userUploadDirectory)) {
        mkdir($userUploadDirectory, 0777, true); // Create the user's directory if it doesn't exist
    }

    // Move the uploaded file to the user's directory
    if (move_uploaded_file($file['tmp_name'], $userUploadDirectory . $file['name'])) {
        // File upload was successful
        $response = array('success' => true, 'message' => 'File uploaded successfully.');
    
        // Insert file metadata into the database
        $conn = new mysqli("localhost", "root", "", "file-sharing-app");
        if ($conn->connect_error) {
            // Handle database connection error
            $response = array('success' => false, 'message' => 'Database connection failed.');
        } else {
            // Prepare and execute the SQL query to insert file metadata
            $sql = "INSERT INTO uploaded_files (user_id, username, filename, file_path, user_role) VALUES (?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $file_path = $userUploadDirectory . $file['name']; // Absolute file path
            $stmt->bind_param("issss", $userId, $username, $file['name'], $file_path, $userRole); // Use the original filename, absolute file path, username, and user role
    
            if ($stmt->execute()) {
                $response = array('success' => true, 'message' => 'File uploaded successfully.');
            } else {
                // Handle database insert error
                $response = array('success' => false, 'message' => 'File metadata insertion failed.');
            }
    
            $stmt->close();
            $conn->close();
        }
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
