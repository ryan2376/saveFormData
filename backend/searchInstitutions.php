<?php
include_once("db_connect.php");

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $location = isset($_GET['location']) ? $_GET['location'] : '';

        if (!empty($location)) {
            $query = "SELECT * FROM institutions WHERE location LIKE '%$location%'";
            $result = $conn->query($query);

            error_log("SQL Query: " . $conn->sqlstate);
            error_log("Number of Rows: " . $result->num_rows);

            $institutions = array();

            while ($row = $result->fetch_assoc()) {
                $institutions[] = $row;
            }

            echo json_encode($institutions, JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Location not provided"]);
        }

        break;
    default:
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        break;
}

$conn->close();
?>
