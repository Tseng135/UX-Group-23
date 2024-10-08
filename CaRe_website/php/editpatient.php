<?php

// 数据库连接代码
$servername = "localhost";
$username = "root";  // 默认用户名
$password = "";  // 默认密码（为空）
$dbname = "circle3";  // 假设数据库名是 hospital

// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $age = $_POST['age'] ?? '';
    $gender = (int)$_POST['gender'] ?? '';
    $id = (int)$_POST['id'] ?? ''; // 获取 id

    // 准备更新 SQL 语句
    $stmt = $conn->prepare("UPDATE patient SET name = ?, age = ?, gender = ? WHERE id = ?");
    $stmt->bind_param("ssii", $name, $age, $gender, $id); // 绑定参数，注意数据类型
    $stmt->execute();
    // 执行 SQL 语句
    // if ($stmt->execute()) {
    //     // 更新成功
    //     echo json_encode(['status' => 'success', 'message' => 'Patient data updated successfully.']);
    // } else {
    //     // 更新失败
    //     echo json_encode(['status' => 'error', 'message' => 'Error updating patient data: ' . $stmt->error]);
    // }

    // 关闭语句
    $stmt->close();


}




?>