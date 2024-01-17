<?php
// Handle CORS
header("Access-Control-Allow-Origin: *"); // Adjust this depending on your security requirements
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
$requestMethod = $_SERVER["REQUEST_METHOD"];
if ($requestMethod === "POST") {
    // Get JSON as a string
    $json_str = file_get_contents('php://input');

    // Decode the JSON into an associative array
    $json_obj = json_decode($json_str, true);

    // Sanitize input data
    $firstName = $conn->real_escape_string($json_obj["firstName"]);
    $lastName = $conn->real_escape_string($json_obj["lastName"]);
    $email = $conn->real_escape_string($json_obj["email"]);
    $phoneNumber = $conn->real_escape_string($json_obj["phoneNumber"]);
    $course = $conn->real_escape_string($json_obj["course"]);

    // Insert data into the database
    $sql = "INSERT INTO students (firstName, lastName, email, phoneNumber, course) 
            VALUES ('$firstName', '$lastName', '$email', '$phoneNumber', '$course')";

    if ($conn->query($sql) === TRUE) {
        echo "Record added successfully";
    } else {
        echo "Error: " . $conn->error;
    }
} else {
    echo "Invalid request method: $requestMethod";
}

// Close the database connection
$conn->close();
?>
