<?php
include_once("db_connect.php"); // Ensure this points to your actual DB connection script

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $conn->prepare("INSERT INTO activists (firstName, lastName, email, phoneNumber, location, interests) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $data['firstName'], $data['lastName'], $data['email'], $data['phoneNumber'], $data['location'], $data['interests']);
        $stmt->execute();
        echo json_encode(["id" => $conn->insert_id]);
        break;
    case 'GET':
        $id = $_GET['id'];
        $stmt = $conn->prepare("SELECT * FROM activists WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_assoc();
        echo json_encode($result);
        break;
    case 'PUT':
        parse_str(file_get_contents("php://input"), $data);
        $stmt = $conn->prepare("UPDATE activists SET firstName = ?, lastName = ?, email = ?, phoneNumber = ?, location = ?, interests = ? WHERE id = ?");
        $stmt->bind_param("ssssssi", $data['firstName'], $data['lastName'], $data['email'], $data['phoneNumber'], $data['location'], $data['interests'], $data['id']);
        $stmt->execute();
        echo json_encode(["message" => "Profile updated successfully."]);
        break;
    default:
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        break;
}

$conn->close();
?>
