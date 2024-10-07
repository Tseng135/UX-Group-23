<?php
include "config.php";
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
        case 'addAppointment':
            $data = json_decode(file_get_contents("php://input"), true);
            addAppointment($pdo, $data);
            break;
        case 'getAppointments':
            getAppointments($pdo);
            break;
        case 'updateAppointment':
            $data = json_decode(file_get_contents("php://input"), true);
            updateAppointment($pdo, $data);
            break;
        case 'cancelAppointment':
            if (isset($_GET['id'])) {
                cancelAppointment($pdo, $_GET['id']);
            } else {
                echo json_encode(["error" => "Missing appointment ID!"]);
            }
            break;
        case 'generatePatientReport':
            generatePatientReport($pdo);
            break;
        case 'generateAppointmentReport':
            generateAppointmentReport($pdo);
            break;
        case 'getTherapists':
            getTherapists($pdo);
            break;
        case 'getTreatmentRooms':
            getTreatmentRooms($pdo);
            break;
        case 'getPatientStats':
            getPatientStats($pdo);
            break;
        case 'getAppointmentStats':
            getAppointmentStats($pdo);
            break;
        case 'getAppointment':
            getAppointment($pdo);
            break;
        default:
            echo json_encode(["error" => "Invalid function call!"]);
            break;
    }
} else {
    echo json_encode(["error" => "Missing function name!"]);
}

function updateAppointment($pdo) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['id']) && isset($data['patient_name']) && isset($data['therapist_id']) &&
            isset($data['appointment_start_time']) && isset($data['appointment_end_time']) &&
            isset($data['treatment_room'])) {

            $appointmentId = intval($data['id']);
            $patientName = $data['patient_name'];
            $therapistId = intval($data['therapist_id']);
            $appointmentStart = $data['appointment_start_time'];
            $appointmentEnd = $data['appointment_end_time'];
            $treatmentRoom = $data['treatment_room'];

            $stmt = $pdo->prepare("SELECT id FROM patients WHERE name = :patient_name");
            $stmt->execute(['patient_name' => $patientName]);
            $patient = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$patient) {
                echo json_encode(['success' => false, 'message' => 'Patient not found.']);
                return;
            }
            $patientId = $patient['id'];

            $stmt = $pdo->prepare("SELECT name FROM therapists WHERE id = :therapist_id");
            $stmt->execute(['therapist_id' => $therapistId]);
            $therapist = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$therapist) {
                echo json_encode(['success' => false, 'message' => 'Therapist not found.']);
                return;
            }
            $therapistName = $therapist['name'];

            $stmt = $pdo->prepare("UPDATE appointments 
                                    SET patient_id = :patient_id, 
                                        therapist_id = :therapist_id, 
                                        appointment_time = :appointment_time, 
                                        end_time = :end_time, 
                                        treatment_room = :treatment_room 
                                    WHERE id = :id");

            $result = $stmt->execute([
                'patient_id' => $patientId,
                'therapist_id' => $therapistId,
                'appointment_time' => $appointmentStart,
                'end_time' => $appointmentEnd,
                'treatment_room' => $treatmentRoom,
                'id' => $appointmentId
            ]);

            if ($result) {
                echo json_encode(['success' => true, 'message' => 'Appointment updated successfully.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to update appointment.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    }
}

function getTreatmentRooms($pdo) {
    $stmt = $pdo->query("SELECT room_name FROM Rooms");
    $report = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($report);
}

function addAppointment($pdo, $data) {
    $stmt = $pdo->prepare("SELECT id FROM patients WHERE name = ?");
    $stmt->execute([$data['patient_name']]);
    $patient = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$patient) {
        echo json_encode(["error" => "Patient does not exist!"]);
        return;
    }

    $patient_id = $patient['id'];

    $stmt = $pdo->prepare("SELECT * FROM appointments WHERE (appointment_time < ? AND end_time > ?) AND treatment_room = ?");
    $stmt->execute([$data['appointment_end_time'], $data['appointment_start_time'], $data['treatment_room']]);
    if ($stmt->rowCount() > 0) {
        echo json_encode(["error" => "The time and treatment room are already booked!"]);
        return;
    }

    $stmt = $pdo->prepare("INSERT INTO appointments (patient_id, therapist_id, appointment_time, end_time, treatment_room) VALUES (?, ?, ?, ?, ?)");
    if ($stmt->execute([$patient_id, $data['therapist_id'], $data['appointment_start_time'], $data['appointment_end_time'], $data['treatment_room']])) {
        echo json_encode(["success" => "Appointment successful!"]);
    } else {
        echo json_encode(["error" => "Appointment failed!"]);
    }
}

function getAppointments($pdo) {
    $stmt = $pdo->query("SELECT a.*, p.name as patient_name, t.name as therapist_name FROM appointments a 
                          JOIN patients p ON a.patient_id = p.id 
                          JOIN therapists t ON a.therapist_id = t.id");
    $appointments = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($appointments);
}

function cancelAppointment($pdo, $id) {
    $stmt = $pdo->prepare("DELETE FROM appointments WHERE id = ?");
    if ($stmt->execute([$id])) {
        echo json_encode(["success" => "Appointment cancelled successfully!"]);
    } else {
        echo json_encode(["error" => "Failed to cancel appointment!"]);
    }
}

function generatePatientReport($pdo) {
    $stmt = $pdo->query("SELECT gender, COUNT(*) as count FROM patients GROUP BY gender");
    $report = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($report);
}

function generateAppointmentReport($pdo) {
    $stmt = $pdo->query("SELECT therapist_id, COUNT(*) as count FROM appointments GROUP BY therapist_id");
    $report = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($report);
}

function getTherapists($pdo) {
    $stmt = $pdo->query("SELECT id, name FROM therapists");
    $report = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($report);
}

function getPatientStats($pdo) {
    $stmt = $pdo->query("SELECT gender, COUNT(*) AS count FROM patients GROUP BY gender");
    $report = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $stats = [
        'maleCount' => 0,
        'femaleCount' => 0
    ];

    foreach ($report as $row) {
        if ($row['gender'] === 'Male') {
            $stats['maleCount'] = $row['count'];
        } elseif ($row['gender'] === 'Female') {
            $stats['femaleCount'] = $row['count'];
        }
    }

    echo json_encode($stats);
}

function getAppointmentStats($pdo) {
    $stmt = $pdo->query("SELECT DATE(appointment_time) AS appointment_date, COUNT(*) AS count FROM appointments GROUP BY appointment_date ORDER BY appointment_date");
    $report = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $stats = [
        'labels' => [],
        'values' => []
    ];

    foreach ($report as $row) {
        $stats['labels'][] = $row['appointment_date'];
        $stats['values'][] = $row['count'];
    }

    echo json_encode($stats);
}

function getAppointment($pdo) {
    if (isset($_GET['id'])) {
        $appointmentId = intval($_GET['id']);

        $stmt = $pdo->prepare("SELECT a.*, p.name AS patient_name, t.name AS therapist_name
                                FROM appointments a
                                JOIN patients p ON a.patient_id = p.id
                                JOIN therapists t ON a.therapist_id = t.id
                                WHERE a.id = :id");
        $stmt->execute(['id' => $appointmentId]);
        $appointment = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($appointment) {
            echo json_encode($appointment);
        } else {
            echo json_encode(['error' => 'Appointment not found.']);
        }
    } else {
        echo json_encode(['error' => 'Missing appointment ID.']);
    }
}
?>
