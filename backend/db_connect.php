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


// Close the database connection
$conn->close();

?>


