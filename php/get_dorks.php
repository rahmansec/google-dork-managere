<?php
require 'db.php';
$category = $_GET['category'] ?? '';

if (!empty($category)) {
    $stmt = $db->prepare("SELECT * FROM dorks WHERE category = ?");
    $stmt->execute([$category]);
} else {
    $stmt = $db->query("SELECT * FROM dorks");
}

$dorks = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($dorks);
?>
