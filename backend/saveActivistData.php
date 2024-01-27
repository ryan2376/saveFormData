<?php

// Handle CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "saveformdata";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    // Assign the data to variables
    $firstName = $conn->real_escape_string($json_obj["firstName"]);
    $lastName = $conn->real_escape_string($json_obj["lastName"]);
    $email = $conn->real_escape_string($json_obj["email"]);
    $phoneNumber = $conn->real_escape_string($json_obj["phoneNumber"]);
    $location = $conn->real_escape_string($json_obj["location"]);
    $interests = $conn->real_escape_string($json_obj["interests"]);
    $username = $conn->real_escape_string($json_obj["username"]);
    $password = $json_obj["password"]; // Password will be hashed

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO activists (first_name, last_name, email, phone_number, location, interests, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssss", $firstName, $lastName, $email, $phoneNumber, $location, $interests, $username, $hashedPassword);

    // Execute the statement
    if ($stmt->execute()) {
        echo "Activist data added successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close statement
    $stmt->close();
} else {
    echo "Invalid request method";
}

// Close the database connection
$conn->close();
?>
