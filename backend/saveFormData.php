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

// // Handle form submission
// $requestMethod = $_SERVER["REQUEST_METHOD"];
// if ($requestMethod === "POST") {
//     // Get JSON as a string
//     $json_str = file_get_contents('php://input');

//     // Decode the JSON into an associative array
//     $json_obj = json_decode($json_str, true);

//     // Sanitize input data
//     $firstName = $conn->real_escape_string($json_obj["firstName"]);
//     $lastName = $conn->real_escape_string($json_obj["lastName"]);
//     $email = $conn->real_escape_string($json_obj["email"]);
//     $phoneNumber = $conn->real_escape_string($json_obj["phoneNumber"]);
//     $course = $conn->real_escape_string($json_obj["course"]);

//     // Insert data into the database
//     $sql = "INSERT INTO students (firstName, lastName, email, phoneNumber, course) 
//             VALUES ('$firstName', '$lastName', '$email', '$phoneNumber', '$course')";

//     if ($conn->query($sql) === TRUE) {
//         echo "Record added successfully";
//     } else {
//         echo "Error: " . $conn->error;
//     }
// } else {
//     echo "Invalid request method: $requestMethod";
// }

// Close the database connection

// SQL query to create the institutions table
$sqlInstitution = "CREATE TABLE institutions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    activities TEXT,
    contact_person VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

// SQL query to create the activists table
$sqlActivist = "CREATE TABLE activists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    location VARCHAR(255) NOT NULL,
    interests TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

// SQL query to create the admins table
$sqlAdmin = "CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

// Execute queries
if ($conn->query($sqlInstitution) === TRUE) {
    echo "Table 'institutions' created successfully.<br>";
} else {
    echo "Error creating table 'institutions': " . $conn->error . "<br>";
}

if ($conn->query($sqlActivist) === TRUE) {
    echo "Table 'activists' created successfully.<br>";
} else {
    echo "Error creating table 'activists': " . $conn->error . "<br>";
}

if ($conn->query($sqlAdmin) === TRUE) {
    echo "Table 'admins' created successfully.<br>";
} else {
    echo "Error creating table 'admins': " . $conn->error . "<br>";
}

// Close the database connection
$conn->close();

?>


