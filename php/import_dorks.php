<?php
require 'db.php';

$directory = __DIR__ . '/../dorks/';
$files = scandir($directory);

foreach ($files as $file) {
    if ($file !== '.' && $file !== '..' && pathinfo($file, PATHINFO_EXTENSION) === 'txt') {
        $category = pathinfo($file, PATHINFO_FILENAME); 
        $filePath = "$directory$file";
        
        $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if ($lines) {
            $stmt = $db->prepare("INSERT INTO dorks (category, dork, description) VALUES (:category, :dork, :description)");
            
            foreach ($lines as $line) {
                $parts = explode('=>', $line);
                $dork = trim($parts[0]);
                $description = isset($parts[1]) ? trim($parts[1]) : '';
                
                $stmt->execute([
                    'category' => $category,
                    'dork' => $dork,
                    'description' => $description
                ]);
            }
        }
    }
}

echo "✅ تمام دورک‌ها از پوشه `dorks/` به پایگاه داده اضافه شدند.";
