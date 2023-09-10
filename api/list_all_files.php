<?php
session_start();

if (!isset($_SESSION["user_id"])) {
    http_response_code(401); // Unauthorized
    echo json_encode(array('success' => false, 'message' => 'User not authenticated'));
    exit();
}

// Replace with your database connection logic
$conn = new mysqli("localhost", "root", "", "file-sharing-app");
if ($conn->connect_error) {
    http_response_code(500); // Internal Server Error
    echo json_encode(array('success' => false, 'message' => 'Database connection failed'));
    exit();
}

$user_id = $_SESSION["user_id"];

$sql = "SELECT f.id, f.filename, u.username, u.role FROM uploaded_files f
        INNER JOIN users u ON f.user_id = u.id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $files = array();
    while ($row = $result->fetch_assoc()) {
        $files[] = array(
            'id' => $row['id'],
            'filename' => $row['filename'],
            'username' => $row['username'],
            'user_role' => $row['role']
        );
    }
    echo json_encode(array('success' => true, 'files' => $files));
} else {
    echo json_encode(array('success' => true, 'files' => []));
}

$conn->close();
?>
