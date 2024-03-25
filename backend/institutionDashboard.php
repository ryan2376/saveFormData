<?php
// Include database connection
include_once("db_connect.php");

// CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// Respond to preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Return only the headers and not the content
    // Only allow CORS if we're doing a GET - i.e. no saving for now.
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']) && $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'GET') {
        header('Access-Control-Allow-Origin: http://localhost:3000');
        header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Access-Control-Allow-Credentials: true');
    }
    exit(0);
}

// Connect to the database
// $conn assumed to be your database connection variable from "db_connect.php"

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        // Assuming you're sending data as JSON in the body of the request
        $data = json_decode(file_get_contents("php://input"));

        // Retrieve the institution_id from the decoded JSON data
        $institutionId = $data->institution_id ?? '';

        // Check if the institution_id is set
        if (empty($institutionId)) {
            // Return an error message if institution_id is not set
            http_response_code(400);
            echo json_encode(["error" => "Institution ID is required."]);
            exit();
        }

        // Inserting a new activity with the institution_id
        $stmt = $conn->prepare("INSERT INTO activities (institution_id, name, description, location, date) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("issss", $institutionId, $data->name, $data->description, $data->location, $data->date);
        $stmt->execute();

        // Check for errors
        if ($stmt->error) {
            // Return error message if there is an error in SQL query execution
            http_response_code(500);
            echo json_encode(["error" => "Error inserting activity: " . $stmt->error]);
            exit();
        }

        // Return success message if insertion is successful
        echo json_encode(["message" => "Activity inserted successfully."]);
        break;
    
    case 'GET':
        // Fetch institution details
        $institutionId = $_GET['institution_id'] ?? '';
        if (!empty($institutionId)) {
            $stmt = $conn->prepare("SELECT * FROM institutions WHERE id = ?");
            $stmt->bind_param("i", $institutionId);
            $stmt->execute();
            $result = $stmt->get_result();
            $institution = $result->fetch_assoc();

            // Check if institution exists
            if (!$institution) {
                http_response_code(404);
                echo json_encode(["error" => "Institution not found."]);
                exit();
            }

            // Fetch all activities for the specific institution
            $stmt = $conn->prepare("SELECT * FROM activities WHERE institution_id = ?");
            $stmt->bind_param("i", $institutionId);
            $stmt->execute();
            $result = $stmt->get_result();
            $activities = $result->fetch_all(MYSQLI_ASSOC);

            // Combine institution details and activities into a single JSON response
            $response = [
                "institution" => $institution,
                "activities" => $activities
            ];
            echo json_encode($response);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Institution ID is required."]);
        }
        break;
    
    case 'PUT':
        // Assuming you're sending data as JSON in the body of the request
        $data = json_decode(file_get_contents("php://input"));

        // Retrieve the activity ID from the decoded JSON data
        $activityId = $data->id ?? '';

        // Check if the activity ID is set
        if (empty($activityId)) {
            // Return an error message if activity ID is not set
            http_response_code(400);
            echo json_encode(["error" => "Activity ID is required."]);
            exit();
        }

         // Update the activity with the provided ID
        $stmt = $conn->prepare("UPDATE activities SET name = ?, description = ?, location = ?, date = ? WHERE id = ?");
        $stmt->bind_param("ssssi", $data->name, $data->description, $data->location, $data->date, $activityId);
        $stmt->execute();

        // Check for errors
        if ($stmt->error) {
            // Return error message if there is an error in
        // SQL query execution
        http_response_code(500);
        echo json_encode(["error" => "Error updating activity: " . $stmt->error]);
        exit();
    }

    // Return success message if update is successful
    echo json_encode(["message" => "Activity updated successfully."]);
    break;

case 'DELETE':
    // Extracting id from URL
    $id = $_GET['id'] ?? '';
    if (empty($id)) {
        // Return an error message if activity ID is not set
        http_response_code(400);
        echo json_encode(["error" => "Activity ID is required."]);
        exit();
    }

    // Delete the activity with the provided ID
    $stmt = $conn->prepare("DELETE FROM activities WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    // Check for errors
    if ($stmt->error) {
        // Return error message if there is an error in SQL query execution
        http_response_code(500);
        echo json_encode(["error" => "Error deleting activity: " . $stmt->error]);
        exit();
    }

    // Return success message if deletion is successful
    echo json_encode(["message" => "Activity deleted successfully."]);
    break;

// Add more cases as needed

default:
    // Method not supported
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    break;
}

// Close connection
$conn->close();
?>
