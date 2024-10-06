function showModule(moduleId) {
    const modules = document.querySelectorAll('.module');
    modules.forEach(module => {
        module.classList.remove('active');
    });
    document.getElementById(moduleId).classList.add('active');
    if (moduleId==="appointmentModule"){
        initializeCalendar();
    }else if(moduleId==="reportModal2"){
        updateChart()
    }
}

let currentPage = 1;

function loadPatients() {
    const searchQuery = document.getElementById('search').value;
    const endpoint = searchQuery ? `patients_api.php?functionname=getPatients&search=${searchQuery}` : `patients_api.php?functionname=getPatients&page=${currentPage}`;

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#patientTable tbody');
            tbody.innerHTML = ''; // 清空表格
            data.forEach(patient => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${patient.name}</td>
                    <td>${patient.age}</td>
                    <td>${patient.gender}</td>
                    <td>${patient.contact}</td>
                    <td><button class="edit-btn" onclick="openPatientForm(${patient.id})">edit</button></td>
                `;
                tbody.appendChild(row);
            });
            document.getElementById('currentPage').textContent = currentPage;
        });
}

function changePage(direction) {
    currentPage += direction;
    loadPatients();
}


document.addEventListener('DOMContentLoaded', () => {
    loadPatients();
});

function addPatient() {
    const newPatient = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        contact: document.getElementById('contact').value
    };

    fetch('patients_api.php?functionname=addPatient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPatient)
    }).then(() => {
        closeAddPatientForm("addPatientModal");
        loadPatients();
    });
}

function searchPatients() {
    const searchQuery = document.getElementById('search').value;
    const genderFilter = document.getElementById('genderFilter').value;
    const ageMin = document.getElementById('ageMin').value;
    const ageMax = document.getElementById('ageMax').value;
    let queryString = `patients_api.php?search=${searchQuery}&gender=${genderFilter}&ageMin=${ageMin}&ageMax=${ageMax}&functionname=getPatients`;

    fetch(queryString)
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#patientTable tbody');
            tbody.innerHTML = '';
            data.forEach(patient => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${patient.name}</td>
                    <td>${patient.age}</td>
                    <td>${patient.gender}</td>
                    <td>${patient.contact}</td>
                    <td><button class="edit-btn" onclick="openPatientForm(${patient.id})">edit</button></td>
                `;
                tbody.appendChild(row);
            });
        });
}

function closeAddPatientForm(idname) {
    const modal = document.getElementById(idname);
    if (modal) {
        modal.style.display = 'none';
        if (idname === "appointmentModal") {
            document.getElementById('modalTitle2').innerText = 'Add Appointment';
        }
    }
}

function openPatientForm(id = null) {
    let modal = document.getElementById('addPatientModal');
    if (typeof id === 'number' && !isNaN(id)) {
        fetch(`patients_api.php?functionname=getPatient&id=${id}`)
            .then(response => response.json())
            .then(patient => {
                document.getElementById('modalTitle').textContent = 'Edit Patient Information';
                document.getElementById('patientId').value = patient.id;
                document.getElementById('name').value = patient.name;
                document.getElementById('age').value = patient.age;
                document.getElementById('gender').value = patient.gender;
                document.getElementById('contact').value = patient.contact;
                modal.style.display = 'block';
            });
    } else if (typeof id === 'string') {
        modal = document.getElementById(id);
        modal.style.display = 'block';
        if (id === "reportModal") {
            generateCharts();
        } else if (id === "appointmentModal") {
            loadTherapists();
            loadTreatmentRooms();
        }
    } else {
        document.getElementById('modalTitle').textContent = 'Add New Patient';
        document.getElementById('patientId').value = '';
        document.getElementById('name').value = '';
        document.getElementById('age').value = '';
        document.getElementById('gender').value = 'Male';
        document.getElementById('contact').value = '';
        modal.style.display = 'block';
    }
}

function submitPatientForm(functionanme) {
    if (functionanme === "addPatientModal") {
        const patientId = document.getElementById('patientId').value;
        const newPatient = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            gender: document.getElementById('gender').value,
            contact: document.getElementById('contact').value
        };
        const endpoint = `patients_api.php?functionname=${patientId ? 'updatePatient' : 'addPatient'}`;
        fetch(endpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: patientId, ...newPatient })
        }).then(response => response.json())
            .then(data => {
                alert(data.message || data.error);
                closeAddPatientForm("addPatientModal");
                loadPatients();
            });
    } else if (functionanme === "appointmentModal") {
        fetch('schedule_api.php?functionname=getAppointments')
            .then(response => response.json())
            .then(data => {
                data.appointments.forEach(appointment => {
                    calendar.addEvent({
                        title: appointment.title,
                        start: appointment.start,
                        end: appointment.end
                    });
                });
            })
            .catch(error => console.error('Error fetching appointments:', error));
    }
}

async function submitAppointmentForm(type) {
    const patientName = document.getElementById('patientName').value;
    const therapistId = document.getElementById('therapist').value;
    const appointmentStartTime = document.getElementById('appointmentStartDate').value;
    const appointmentEndTime = document.getElementById('appointmentEndDate').value;
    const treatmentRoom = document.getElementById('treatmentRoom').value;

    const appointmentData = {
        patient_name: patientName,
        therapist_id: therapistId,
        appointment_start_time: appointmentStartTime,
        appointment_end_time: appointmentEndTime,
        treatment_room: treatmentRoom
    };

    if (type) {
        const appointmentId = type;
        appointmentData.id = appointmentId;
        try {
            const response = await fetch('schedule_api.php?functionname=updateAppointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(appointmentData)
            });

            const result = await response.json();

            if (result.success) {
                alert('Appointment updated successfully!');
                closeAddPatientForm('appointmentModal');
                showModule('appointmentModule');
            } else {
                alert('Failed to update appointment: ' + result.message);
            }
        } catch (error) {
            alert('An error occurred: ' + error.message);
        }
    } else {
        try {
            const response = await fetch('schedule_api.php?functionname=addAppointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(appointmentData)
            });
            const result = await response.json();
            alert(result.message || 'Appointment successful!');
            closeAddPatientForm('appointmentModal');
            showModule('appointmentModule');
        } catch (error) {
            console.error('Error adding appointment:', error);
        }
    }
    document.getElementById('patientName').value = '';
    document.getElementById('therapist').value = '';
    document.getElementById('appointmentStartDate').value = '';
    document.getElementById('appointmentEndDate').value = '';
    document.getElementById('treatmentRoom').value = '';
}

function initializeCalendar() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
        },
        initialView: 'dayGridMonth',
        editable: true,
        selectable: true,
        events: [],
        eventClick: function(info) {
            openEditAppointmentForm(info.event.id);
        },
        dateClick: function(info) {
            console.log(info);
        }
    });

    fetch('schedule_api.php?functionname=getAppointments')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                data.forEach(appointment => {
                    calendar.addEvent({
                        id: appointment.id,
                        title: `${appointment.therapist_name} - ${appointment.treatment_room}`,
                        start: appointment.appointment_time,
                        end: new Date(new Date(appointment.appointment_time).getTime() + 60 * 60 * 1000),
                        extendedProps: {
                            patientName: appointment.patient_name
                        }
                    });
                });
                calendar.render();
            } else {
                console.error('Incorrect data format returned:', data);
            }
        })
        .catch(error => console.error('Error loading calendar events:', error));
}

function openEditAppointmentForm(eventId) {
    document.getElementById('modalTitle2').innerText = 'Edit Appointment';
    document.getElementById('submitBtn').innerText = 'Confirm Changes';
    document.getElementById('submitBtn').onclick = function() { submitAppointmentForm(eventId); };

    const modal = document.getElementById('appointmentModal');
    modal.style.display = 'block';

    fetch(`schedule_api.php?functionname=getAppointment&id=${eventId}`)
        .then(response => response.json())
        .then(appointment => {
            document.getElementById('patientName').value = appointment.patient_name;
            document.getElementById('appointmentStartDate').value = appointment.appointment_time;
            document.getElementById('appointmentEndDate').value = appointment.end_time;

            Promise.all([loadTherapists(), loadTreatmentRooms()]).then(() => {
                document.getElementById('therapist').value = appointment.therapist_id;
                document.getElementById('treatmentRoom').value = appointment.treatment_room;
            });
        })
        .catch(error => {
            console.error('Error fetching appointment details:', error);
        });
}

function generateCharts() {
    const patientCtx = document.getElementById('patientChart').getContext('2d');
    fetch('schedule_api.php?functionname=getPatientStats')
        .then(response => response.json())
        .then(data => {
            const patientChart = new Chart(patientCtx, {
                type: 'bar',
                data: {
                    labels: ['Male', 'Female'],
                    datasets: [{
                        label: 'Patient Count',
                        data: [data.maleCount, data.femaleCount],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 99, 132, 0.2)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 99, 132, 1)'
                        ],
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
        })
        .catch(error => console.error('Error fetching patient stats:', error));

    const appointmentCtx = document.getElementById('appointmentChart').getContext('2d');
    fetch('schedule_api.php?functionname=getAppointmentStats')
        .then(response => response.json())
        .then(data => {
            const appointmentChart = new Chart(appointmentCtx, {
                type: 'line',
                data: {
                    labels: data.labels,
                    datasets: [{
                        label: 'Appointment Count',
                        data: data.values,
                        fill: false,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        tension: 0.1
                    }]
                }
            });
        })
        .catch(error => console.error('Error fetching appointment stats:', error));
}

function loadTherapists() {
    return fetch('schedule_api.php?functionname=getTherapists')
        .then(response => response.json())
        .then(data => {
            console.log("Therapists data:", data);
            const therapistSelect = document.getElementById('therapist');
            therapistSelect.innerHTML = '<option value="">Select Therapist</option>';

            if (Array.isArray(data)) {
                data.forEach(therapist => {
                    const option = document.createElement('option');
                    option.value = therapist.id;
                    option.textContent = therapist.name;
                    therapistSelect.appendChild(option);
                });
            } else {
                console.error("Invalid data format:", data);
            }
        })
        .catch(error => {
            console.error("Error loading therapists:", error);
        });
}


function loadTreatmentRooms() {
    return fetch('schedule_api.php?functionname=getTreatmentRooms')
        .then(response => response.json())
        .then(data => {
            const treatmentRoomSelect = document.getElementById('treatmentRoom');
            treatmentRoomSelect.innerHTML = '<option value="">Select Treatment Room</option>';
            const uniqueRooms = new Set();
            if (Array.isArray(data)) {
                data.forEach(room => {
                    uniqueRooms.add(room.room_name);
                });

                uniqueRooms.forEach(room => {
                    const option = document.createElement('option');
                    option.value = room;
                    option.textContent = room;
                    treatmentRoomSelect.appendChild(option);
                });
            } else {
                console.error("Invalid data format:", data);
            }
        })
        .catch(error => {
            console.error("Error loading treatment rooms:", error);
        });
}




