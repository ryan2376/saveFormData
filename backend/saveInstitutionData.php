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
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get JSON as a string
    $json_str = file_get_contents('php://input');

    // Decode the JSON into an associative array
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

    // Validate data if needed

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert data into the database, including username and hashed password
    $sql = "INSERT INTO institutions (name, location, activities, contact_person, contact_email, contact_phone, username, password) 
            VALUES ('$name', '$location', '$activities', '$contactPerson', '$contactEmail', '$contactPhone', '$username', '$hashedPassword')";

    if ($conn->query($sql) === TRUE) {
        echo "Institution data added successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Invalid request method";
}

// Close the database connection
$conn->close();

?>
