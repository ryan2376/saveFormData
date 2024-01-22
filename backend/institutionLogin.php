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

// Handle institution login
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get JSON as a string
    $json_str = file_get_contents('php://input');

    // Decode the JSON into an associative array
    $loginDetails = json_decode($json_str, true);

    // Assign the data to variables
    $username = $loginDetails["username"];
    $password = $loginDetails["password"];

    // Validate data if needed

    // Perform login validation and verification against the database using prepared statements
    $stmt = $conn->prepare("SELECT * FROM institutions WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        // Fetch the hashed password from the result
        $row = $result->fetch_assoc();
        $hashedPassword = $row['password'];

        // Verify the password
        if (password_verify($password, $hashedPassword)) {
            // Login successful
            echo "Login successful";
        } else {
            // Incorrect password
            echo "Login failed: Incorrect password";
        }
    } else {
        // Username not found
        echo "Login failed: Username not found";
    }
} else {
    echo "Invalid request method";
}

$conn->close();
?>