<?php
// 1. SETTINGS & SETUP
$upload_dir = 'uploads/';
$base_url = "http://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']) . "/";

// Create uploads folder if it doesn't exist
if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0777, true);
}

$message = "";

// 2. HANDLE IMAGE UPLOAD
if (isset($_POST['upload'])) {
    $file = $_FILES['image'];
    $file_name = $file['name'];
    $file_tmp = $file['tmp_name'];
    $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
    
    // Generate a unique name to prevent overwriting
    $new_name = uniqid("img_", true) . "." . $file_ext;
    $target_file = $upload_dir . $new_name;

    // Validate if it's an image
    $check = getimagesize($file_tmp);
    if ($check !== false) {
        if (move_uploaded_file($file_tmp, $target_file)) {
            $message = "<p class='success'>Image uploaded! URL: <input type='text' value='{$base_url}{$target_file}' readonly id='urlField'> <button onclick='copyURL()'>Copy</button></p>";
        } else {
            $message = "<p class='error'>Error moving file.</p>";
        }
    } else {
        $message = "<p class='error'>File is not a valid image.</p>";
    }
}

// 3. HANDLE IMAGE DELETION
if (isset($_GET['delete'])) {
    $file_to_delete = basename($_GET['delete']); // Security: prevent directory traversal
    $path = $upload_dir . $file_to_delete;
    if (file_exists($path)) {
        unlink($path);
        header("Location: index.php?msg=deleted");
        exit();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="logo.jpg" type="image/x-icon">
    <style>
        body { font-family: 'Segoe UI', sans-serif; background: #f4f7f6; margin: 0; padding: 20px; color: #333; }
        .container { max-width: 900px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        h1 { text-align: center; color: #444; }
        
        /* Upload Form */
        .upload-section { border: 2px dashed #ccc; padding: 20px; text-align: center; margin-bottom: 30px; border-radius: 8px; }
        input[type="file"] { margin: 10px 0; }
        button.btn-upload { background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
        
        /* Messages */
        .success { color: #155724; background: #d4edda; padding: 15px; border-radius: 5px; }
        .error { color: #721c24; background: #f8d7da; padding: 15px; border-radius: 5px; }
        #urlField { width: 70%; padding: 5px; border: 1px solid #ddd; }

        /* Image Management Table */
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 12px; border-bottom: 1px solid #eee; text-align: left; }
        th { background: #f8f9fa; }
        .thumbnail { width: 60px; height: 60px; object-fit: cover; border-radius: 4px; }
        .delete-link { color: #dc3545; text-decoration: none; font-weight: bold; }
        .copy-btn { font-size: 12px; cursor: pointer; background: #007bff; color: white; border: none; padding: 4px 8px; border-radius: 3px; }
    </style>
</head>
<body>

<div class="container">
    <h1>🖼️ Image URL Generator</h1>

    <div class="upload-section">
        <form action="index.php" method="POST" enctype="multipart/form-data">
            <input type="file" name="image" required>
            <br>
            <button type="submit" name="upload" class="btn-upload">Upload & Generate URL</button>
        </form>
    </div>

    <?php echo $message; ?>
    <?php if(isset($_GET['msg']) && $_GET['msg'] == 'deleted') echo "<p class='success'>Image deleted successfully.</p>"; ?>

    <h2>Manage Images</h2>
    <table>
        <thead>
            <tr>
                <th>Preview</th>
                <th>Image Name</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $files = array_diff(scandir($upload_dir), array('.', '..'));
            if (empty($files)) {
                echo "<tr><td colspan='3' style='text-align:center;'>No images uploaded yet.</td></tr>";
            } else {
                foreach ($files as $file) {
                    $full_url = $base_url . $upload_dir . $file;
                    echo "<tr>
                        <td><img src='{$upload_dir}{$file}' class='thumbnail'></td>
                        <td>{$file}</td>
                        <td>
                            <button class='copy-btn' onclick='copyManual(\"{$full_url}\")'>Copy URL</button>
                            <a href='index.php?delete={$file}' class='delete-link' onclick='return confirm(\"Are you sure?\")'>Delete</a>
                        </td>
                    </tr>";
                }
            }
            ?>
        </tbody>
    </table>
</div>

<script>
    function copyURL() {
        var copyText = document.getElementById("urlField");
        copyText.select();
        document.execCommand("copy");
        alert("URL Copied to clipboard!");
    }
    
    function copyManual(text) {
        var input = document.createElement('input');
        input.setAttribute('value', text);
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        alert("URL Copied!");
    }
</script>

</body>
</html>