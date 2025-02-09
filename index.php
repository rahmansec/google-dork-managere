<?php
require 'php/db.php';

// Get unique categories from the database
$categories = $db->query("SELECT DISTINCT category FROM dorks")->fetchAll(PDO::FETCH_COLUMN);
?>

<!DOCTYPE html>
<html lang="en"></html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Google Dork Search Tool</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.0/font/bootstrap-icons.min.css">
</head>
<body>
    <div class="container">
        <h2 class="text-center mb-4">🔍 Google Dork Search Tool</h2>

        <div class="mb-3">
            <input type="text" id="domainInput" class="form-control" placeholder="Enter domain">
        </div>

        <div class="row mb-3">
            <div class="col-md-6">
                <select id="categorySelect" class="form-select">
                    <option value="">Select category</option>
                    <?php foreach ($categories as $category): ?>
                        <option value="<?= htmlspecialchars($category) ?>"><?= htmlspecialchars($category) ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div class="col-md-6">
                <input type="text" id="searchInput" class="form-control" placeholder="Search dorks">
            </div>
        </div>
        <div class="text-center mb-3">
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addDorkModal">
             Add New Dork
            <i class="bi bi-plus-circle ms-1"></i>
            </button>
        </div>

        <hr>

        <!-- Modal -->
        <div class="modal fade" id="addDorkModal" tabindex="-1" aria-labelledby="addDorkModalLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="addDorkModalLabel">Add New Dork</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <form id="addDorkForm">
                    <div class="mb-2">
                    <input type="text" name="category" class="form-control" placeholder="Category">
                    </div>
                    <div class="mb-2">
                    <input type="text" name="dork" class="form-control" placeholder="Dork">
                    </div>
                    <div class="mb-2">
                    <textarea name="description" class="form-control" placeholder="Description"></textarea>
                    </div>
                    <button type="submit" class="btn btn-success w-100">Add</button>
                </form>
                </div>
            </div>
            </div>
        </div>

        <ul id="dorkList" class="list-group"></ul>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="assets/script.js"></script>
</body>
</html>
