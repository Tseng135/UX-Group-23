// 显示心情语句
function showMoodMessage(mood) {
    let message = '';
    switch (mood) {
        case 'Happy':
            message = 'Keep spreading positivity!';
            break;
        case 'Sad':
            message = 'It’s okay to feel sad, take your time.';
            break;
        case 'Stressed':
            message = 'Breathe, everything will be alright.';
            break;
        case 'Anxious':
            message = 'Stay calm and take things one step at a time.';
            break;
        case 'Excited':
            message = 'That’s great! Enjoy your excitement.';
            break;
        case 'Calm':
            message = 'Peaceful mind, peaceful life.';
            break;
    }
    document.getElementById('mood-message').textContent = message;
}

// 添加健康记录
function addHealthRecord() {
    const formData = new FormData();
    formData.append('action', 'add_health_record');
    formData.append('recordType', document.getElementById('recordType').value);
    formData.append('recordDescription', document.getElementById('recordDescription').value);
    formData.append('fileUpload', document.getElementById('fileUpload').files[0]);

    fetch('patient.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Health record added successfully!');
            loadHealthRecords();  // 刷新记录列表
        } else {
            alert('Error adding health record.');
        }
    });
}

// 加载健康记录
function loadHealthRecords() {
    const formData = new FormData();
    formData.append('action', 'get_health_records');

    fetch('patient.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const recordList = document.getElementById('healthRecordList');
        recordList.innerHTML = '';  // 清除已有记录
        data.records.forEach(record => {
            const recordElement = document.createElement('div');
            recordElement.classList.add('list-group-item');
            recordElement.innerHTML = `
                <strong>${record.type}</strong>
                <p>${record.description}</p>
                <a href="uploads/${record.file}" target="_blank">View File</a>
                <button class="btn btn-danger btn-sm" onclick="deleteHealthRecord(${record.id})">Delete</button>
            `;
            recordList.appendChild(recordElement);
        });
    });
}

// 删除健康记录
function deleteHealthRecord(id) {
    const formData = new FormData();
    formData.append('action', 'delete_health_record');
    formData.append('id', id);

    fetch('patient.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Record deleted successfully!');
            loadHealthRecords();
        } else {
            alert('Error deleting record.');
        }
    });
}

// 添加预约
function bookAppointment() {
    const formData = new FormData();
    formData.append('action', 'book_appointment');
    formData.append('type', document.getElementById('appointmentType').value);
    formData.append('date', document.getElementById('appointmentDate').value);
    formData.append('time', document.getElementById('appointmentTime').value);

    fetch('patient.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Appointment booked successfully!');
            loadAppointmentHistory();  // 刷新预约历史
        } else {
            alert('Error booking appointment.');
        }
    });
}

// 加载预约历史
function loadAppointmentHistory() {
    const formData = new FormData();
    formData.append('action', 'get_appointments');

    fetch('patient.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const historyList = document.getElementById('appointmentHistory');
        historyList.innerHTML = '';  // 清除已有预约
        data.appointments.forEach(appointment => {
            const appointmentElement = document.createElement('a');
            appointmentElement.classList.add('list-group-item', 'list-group-item-action');
            appointmentElement.textContent = `${appointment.type} - ${appointment.date} at ${appointment.time}`;
            historyList.appendChild(appointmentElement);
        });
    });
}

// 页面加载时加载健康记录和预约历史
window.onload = function() {
    loadHealthRecords();
    loadAppointmentHistory();
}
