<?php
include_once("db_connect.php");

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$location = isset($_GET['location']) ? $_GET['location'] : '';

if (!empty($location)) {
    // Sample SQL query - adjust according to your database schema and requirements
    $query = "SELECT * FROM institutions WHERE location LIKE '%$location%'";
    $result = $conn->query($query);

    $institutions = array();

    while ($row = $result->fetch_assoc()) {
        $institutions[] = $row;
    }

    echo json_encode($institutions);
} else {
    echo json_encode(["error" => "Location not provided"]);
}

$conn->close();
?>
