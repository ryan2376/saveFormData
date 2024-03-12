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
    $name = $json_obj["name"];
    $location = $json_obj["location"];
    $activities = $json_obj["activities"];
    $contactPerson = $json_obj["contactPerson"];
    $contactEmail = $json_obj["contactEmail"];
    $contactPhone = $json_obj["contactPhone"];
    $username = $json_obj["username"];
    $password = $json_obj["password"];

    // Additional parameters for latitude and longitude
    $latitude = $json_obj["latitude"];
    $longitude = $json_obj["longitude"];

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO institutions (name, location, activities, contact_person, contact_email, contact_phone, username, password, latitude, longitude) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssssdd", $name, $location, $activities, $contactPerson, $contactEmail, $contactPhone, $username, $hashedPassword, $latitude, $longitude);

    // Execute the statement
    if ($stmt->execute()) {
        echo "Institution data added successfully";
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
