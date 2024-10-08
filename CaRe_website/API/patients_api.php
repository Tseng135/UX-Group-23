<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include "config.php";

function getPatient($pdo, $id) {
    $stmt = $pdo->prepare("SELECT * FROM patients WHERE id = ?");
    $stmt->execute([$id]);
    $patient = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($patient);
}

function getPatients($pdo, $page, $search, $gender, $ageMin, $ageMax) {
    $limit = 10;
    $offset = ($page - 1) * $limit;

    $query = "SELECT * FROM patients WHERE (name LIKE :search OR contact LIKE :search)";
    $params = [':search' => $search];

    if ($gender) {
        $query .= " AND gender = :gender";
        $params[':gender'] = $gender;
    }

    if ($ageMin) {
        $query .= " AND age >= :ageMin";
        $params[':ageMin'] = $ageMin;
    }
    if ($ageMax) {
        $query .= " AND age <= :ageMax";
        $params[':ageMax'] = $ageMax;
    }

    $query .= " LIMIT :limit OFFSET :offset";
    $stmt = $pdo->prepare($query);
    $stmt->bindValue(':search', $search, PDO::PARAM_STR);
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);

    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }

    $stmt->execute();
    $patients = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($patients);
}

function addPatient($pdo, $data) {
    if (isset($data['name'], $data['age'], $data['gender'], $data['contact'])) {
        if (!is_numeric($data['age']) || $data['age'] <= 0) {
            echo json_encode(["error" => "Age must be a positive integer!"]);
            return;
        }

        if (!in_array($data['gender'], ['Male', 'Female'])) {
            echo json_encode(["error" => "Gender must be 'Male' or 'Female'!"]);
            return;
        }

        if (!preg_match('/^\d{10,15}$/', $data['contact'])) {
            echo json_encode(["error" => "Contact must be 10 to 15 digits!"]);
            return;
        }

        $stmt = $pdo->prepare("INSERT INTO patients (name, age, gender, contact) VALUES (:name, :age, :gender, :contact)");
        $stmt->execute([
            ':name' => $data['name'],
            ':age' => $data['age'],
            ':gender' => $data['gender'],
            ':contact' => $data['contact']
        ]);
        echo json_encode(["message" => "Patient added successfully!"]);
    } else {
        echo json_encode(["error" => "Missing required fields!"]);
    }
}

function updatePatient($pdo, $data) {
    if (isset($data['id'], $data['name'], $data['age'], $data['gender'], $data['contact'])) {
        if (!is_numeric($data['age']) || $data['age'] <= 0) {
            echo json_encode(["error" => "Age must be a positive integer!"]);
            return;
        }

        if (!in_array($data['gender'], ['Male', 'Female'])) {
            echo json_encode(["error" => "Gender must be 'Male' or 'Female'!"]);
            return;
        }

        if (!preg_match('/^\d{10,15}$/', $data['contact'])) {
            echo json_encode(["error" => "Contact must be 10 to 15 digits!"]);
            return;
        }

        $stmt = $pdo->prepare("UPDATE patients SET name = :name, age = :age, gender = :gender, contact = :contact WHERE id = :id");
        $stmt->execute([
            ':id' => $data['id'],
            ':name' => $data['name'],
            ':age' => $data['age'],
            ':gender' => $data['gender'],
            ':contact' => $data['contact']
        ]);
        echo json_encode(["message" => "Patient information updated successfully!"]);
    } else {
        echo json_encode(["error" => "Missing required fields!"]);
    }
}

$functionname = $_GET['functionname'];
if ($functionname) {
    switch ($functionname) {
        case 'getPatient':
            if (isset($_GET['id'])) {
                getPatient($pdo, $_GET['id']);
            } else {
                echo json_encode(["error" => "Missing patient ID!"]);
            }
            break;
        case 'getPatients':
            $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
            $search = isset($_GET['search']) ? '%' . $_GET['search'] . '%' : '%';
            $gender = isset($_GET['gender']) ? $_GET['gender'] : '';
            $ageMin = isset($_GET['ageMin']) ? intval($_GET['ageMin']) : null;
            $ageMax = isset($_GET['ageMax']) ? intval($_GET['ageMax']) : null;
            getPatients($pdo, $page, $search, $gender, $ageMin, $ageMax);
            break;
        case 'addPatient':
            $data = json_decode(file_get_contents("php://input"), true);
            addPatient($pdo, $data);
            break;
        case 'updatePatient':
            $data = json_decode(file_get_contents("php://input"), true);
            updatePatient($pdo, $data);
            break;
        default:
            echo json_encode(["error" => "Invalid function call!"]);
            break;
    }
} else {
    echo json_encode(["error" => "Missing function name!"]);
}
?>
