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

    fetch('../API/patient.php', {
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

    fetch('../API/patient.php', {
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

    fetch('../API/patient.php', {
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
function bookAppointment(event) {
    event.preventDefault();  // 阻止表单默认提交
    const type = document.getElementById('appointmentType').value;
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;

    // 使用AJAX将数据发送到PHP
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../API/patient.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
                alert("Appointment booked successfully!");
            } else {
                alert("Error: " + response.error);
            }
        }
    };

    // 发送数据
    xhr.send("action=book_appointment&type=" + encodeURIComponent(type) + "&date=" + encodeURIComponent(date) + "&time=" + encodeURIComponent(time));
}




// 加载预约历史
function loadAppointmentHistory() {
    const formData = new FormData();
    formData.append('action', 'get_appointments');  // 发送请求类型

    fetch('../API/patient.php', {
        method: 'POST',  // 使用 POST 方法发送请求
        body: formData   // 发送表单数据
    })
    .then(response => response.json())  // 解析后端返回的 JSON 数据
    .then(data => {
        const historyList = document.getElementById('appointmentHistory');
        historyList.innerHTML = '';  // 清空已有的预约历史
        data.appointments.forEach(appointment => {  // 遍历获取的预约数据
            const appointmentElement = document.createElement('a');  // 创建新的 <a> 标签
            appointmentElement.classList.add('list-group-item', 'list-group-item-action');
            appointmentElement.textContent = `${appointment.type} - ${appointment.date} at ${appointment.time}`;  // 动态设置预约信息
            historyList.appendChild(appointmentElement);  // 将新元素插入到预约历史列表中
        });
    })
    .catch(error => {
        console.error('Error loading appointments:', error);  // 错误处理
    });
}

// 加载睡眠数据并显示图表
function loadSleepData() {
    fetch('patient.php?action=get_sleep_data')  // 通过GET请求获取数据
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const sleepData = data.sleep_data;
            const dates = sleepData.map(d => d.date);
            const sleepHours = sleepData.map(d => d.sleep_hours);

            // 创建柱状图显示睡眠时间
            const ctx = document.getElementById('sleepChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: dates,
                    datasets: [{
                        label: 'Sleep Hours',
                        data: sleepHours,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } else {
            console.error('Error loading sleep data:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}

// 加载饮食数据并显示图表
function loadDietData() {
    fetch('patient.php?action=get_diet_data')  // 通过GET请求获取数据
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const dietData = data.diet_data;
            const dates = dietData.map(d => d.date);
            const mealsPerDay = dietData.map(d => d.meals_per_day);
            const healthyMeals = dietData.map(d => d.healthy_meals);

            // 创建饼状图显示每日餐数和健康餐
            const ctx = document.getElementById('dietChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: dates,
                    datasets: [{
                        label: 'Healthy Meals',
                        data: healthyMeals,
                        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true
                }
            });
        } else {
            console.error('Error loading diet data:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}



// 页面加载时加载健康记录和预约历史
window.onload = function() {
    loadHealthRecords();
    loadAppointmentHistory();
    loadSleepData();
    loadDietData();
}
