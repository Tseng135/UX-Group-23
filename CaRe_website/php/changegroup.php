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

    $id = (int)$_POST['id'] ?? ''; // 获取 id
    $group = (int)$_POST['group'] ??'';

    // 准备更新 SQL 语句
    $stmt = $conn->prepare("UPDATE patient SET patient_group = ? WHERE id = ?");
    $stmt->bind_param("ii", $group, $id); // 绑定参数，注意数据类型
    $stmt->execute();


    // 关闭语句
    $stmt->close();


}




?>