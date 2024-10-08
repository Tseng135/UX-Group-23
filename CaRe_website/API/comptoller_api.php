<?php
include "config.php";

function getTherapistWorkload($pdo) {
    $stmt = $pdo->query("
        SELECT 
            t.id AS therapist_id, 
            t.name AS therapist_name, 
            COUNT(a.id) AS patient_count,
            SUM(TIMESTAMPDIFF(MINUTE, a.appointment_time, a.end_time)) AS total_duration,
            GROUP_CONCAT(DISTINCT p.gender) AS patient_genders
        FROM therapists t
        LEFT JOIN appointments a ON t.id = a.therapist_id
        LEFT JOIN patients p ON a.patient_id = p.id
        GROUP BY t.id
    ");
    $report = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($report);
}

function getPatientStats($pdo) {
    $ageGroups = [
        '0-17' => [0, 17],
        '18-34' => [18, 34],
        '35-54' => [35, 54],
        '55+' => [55, 120],
    ];

    $result = [];
    foreach ($ageGroups as $group => $ageRange) {
        $stmt = $pdo->prepare("
            SELECT COUNT(*) AS count FROM patients 
            WHERE age BETWEEN ? AND ?
        ");
        $stmt->execute([$ageRange[0], $ageRange[1]]);
        $result[$group] = $stmt->fetchColumn();
    }

    $stmt = $pdo->query("
        SELECT gender, COUNT(*) AS count FROM patients 
        GROUP BY gender
    ");
    $genderStats = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($genderStats as $genderStat) {
        $result[$genderStat['gender']] = $genderStat['count'];
    }

    echo json_encode($result);
}

function getAppointmentDurationStats($pdo) {
    $stmt = $pdo->query("
        SELECT 
            t.id AS therapist_id, 
            t.name AS therapist_name, 
            SUM(TIMESTAMPDIFF(MINUTE, a.appointment_time, a.end_time)) AS total_duration
        FROM therapists t
        LEFT JOIN appointments a ON t.id = a.therapist_id
        GROUP BY t.id
    ");
    $report = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($report);
}

$method = $_GET['method'];
switch ($method) {
    case 'getTherapistWorkload':
        getTherapistWorkload($pdo);
        break;
    case 'getPatientStats':
        getPatientStats($pdo);
        break;
    case 'getAppointmentDurationStats':
        getAppointmentDurationStats($pdo);
        break;
    default:
        echo json_encode(['error' => 'Invalid method']);
        break;
}
?>
