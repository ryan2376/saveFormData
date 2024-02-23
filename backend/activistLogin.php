<?php

// Handle CORS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(200);
    exit;
}

// Handle CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "saveformdata";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["message" => "Connection failed: " . $conn->connect_error]);
    exit; // Exit the script with a failure message
}

// Handle activist login
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $json_str = file_get_contents('php://input');
    $loginDetails = json_decode($json_str, true);

    $username = $loginDetails["username"];
    $password = $loginDetails["password"];

    $stmt = $conn->prepare("SELECT id, password FROM activists WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            // Return the activist ID for client-side use
            echo json_encode(["message" => "Login successful", "activistId" => $row['id']]);
        } else {
            http_response_code(401);
            echo json_encode(["message" => "Login failed: Incorrect password"]);
        }
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Login failed: Username not found"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Invalid request method"]);
}

$conn->close();
?>
