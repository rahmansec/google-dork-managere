<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $category = $_POST['category'] ?? '';
    $dork = $_POST['dork'] ?? '';
    $description = $_POST['description'] ?? '';

    if (!empty($category) && !empty($dork) && !empty($description)) {
        $stmt = $db->prepare("INSERT INTO dorks (category, dork, description) VALUES (?, ?, ?)");
        $stmt->execute([$category, $dork, $description]);
        echo json_encode(["success" => true, "message" => "Dork added successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "All fields must be filled."]);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str(file_get_contents("php://input"), $_DELETE);
    $id = $_DELETE['id'] ?? '';

    if (!empty($id)) {
        $stmt = $db->prepare("DELETE FROM dorks WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["success" => true, "message" => "Dork deleted successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "ID must be provided."]);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    parse_str(file_get_contents("php://input"), $_PUT);
    $id = $_PUT['id'] ?? '';
    $category = $_PUT['category'] ?? '';
    $dork = $_PUT['dork'] ?? '';

    if (!empty($id) && !empty($category) && !empty($dork)) {
        $stmt = $db->prepare("UPDATE dorks SET category = ?, dork = ? WHERE id = ?");
        $stmt->execute([$category, $dork, $id]);
        echo json_encode(["success" => true, "message" => "Dork updated successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "All fields must be filled."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request."]);
}

?>