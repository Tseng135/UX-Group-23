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
    // 获取 POST 数据，确保字段存在
    $name = $_POST['name'] ?? '';
    $age = $_POST['age'] ?? '';
    $gender = (int)$_POST['gender'] ?? ''; // 转换为整数类型
    echo $name .  $age . $gender ;

    // 准备插入 SQL 语句
    $stmt = $conn->prepare("INSERT INTO patient (name, age, gender) VALUES (?, ?, ?)");
    $stmt->bind_param("ssi", $name, $age, $gender); // 绑定参数，注意数据类型

    $stmt->execute();

    $stmt->close();


}




?>