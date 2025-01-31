<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $category = $_POST['category'] ?? '';
    $dork = $_POST['dork'] ?? '';

    if (!empty($category) && !empty($dork)) {
        $stmt = $db->prepare("INSERT INTO dorks (category, dork) VALUES (?, ?)");
        $stmt->execute([$category, $dork]);
        echo json_encode(["success" => true, "message" => "Dork added successfully."]);
        } else {
        echo json_encode(["success" => false, "message" => "All fields must be filled."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Invalid request."]);
    }
?>
