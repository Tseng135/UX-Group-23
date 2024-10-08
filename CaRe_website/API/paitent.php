<?php
// 数据库连接信息
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "patient_dashboard"; // 使用你实际的数据库名

// 创建数据库连接
$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 获取请求的 action 类型
$action = $_POST['action'];

// 添加健康记录
if ($action == 'add_health_record') {
    $recordType = $_POST['recordType'];
    $recordDescription = $_POST['recordDescription'];
    $fileName = '';

    // 处理文件上传
    if (isset($_FILES['fileUpload']) && $_FILES['fileUpload']['error'] == 0) {
        $fileName = basename($_FILES['fileUpload']['name']);
        $targetDir = "uploads/";
        $targetFile = $targetDir . $fileName;

        // 移动上传的文件到目标文件夹
        if (!move_uploaded_file($_FILES['fileUpload']['tmp_name'], $targetFile)) {
            echo json_encode(['success' => false, 'error' => 'File upload failed']);
            exit();
        }
    }

    // 插入健康记录到数据库
    $sql = "INSERT INTO health_records (type, description, file, date) VALUES ('$recordType', '$recordDescription', '$fileName', NOW())";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $conn->error]);
    }
}

// 获取健康记录
if ($action == 'get_health_records') {
    $sql = "SELECT * FROM health_records";
    $result = $conn->query($sql);
    $records = [];

    while ($row = $result->fetch_assoc()) {
        $records[] = $row;
    }

    echo json_encode(['records' => $records]);
}

// 删除健康记录
if ($action == 'delete_health_record') {
    $id = $_POST['id'];
    $sql = "DELETE FROM health_records WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $conn->error]);
    }
}

// 添加预约记录
if ($action == 'book_appointment') {
    $appointmentType = $_POST['type'];
    $appointmentDate = $_POST['date'];
    $appointmentTime = $_POST['time'];

    $sql = "INSERT INTO appointments (type, date, time) VALUES ('$appointmentType', '$appointmentDate', '$appointmentTime')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $conn->error]);
    }
}

// 获取预约记录
if ($action == 'get_appointments') {
    $sql = "SELECT * FROM appointments";
    $result = $conn->query($sql);
    $appointments = [];

    while ($row = $result->fetch_assoc()) {
        $appointments[] = $row;
    }

    echo json_encode(['appointments' => $appointments]);
}

// 关闭数据库连接
$conn->close();
?>
