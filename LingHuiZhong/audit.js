function showModule(moduleId) {
    const modules = document.querySelectorAll('.module');
    modules.forEach(module => {
        module.classList.remove('active');
    });
    document.getElementById(moduleId).classList.add('active');
    if (moduleId === "appointmentModule") {
        initializeCalendar();
    } else if (moduleId === "reportModal2") {
        updateChart();
    } else if (moduleId === "workloadAnalysisContent") {
        console.log(1);
        generateWorkloadChart();
    } else if (moduleId === "patientStatisticsContent") {
        console.log(2);
        generatePatientStatisticsChart();
    } else if (moduleId === "sessionDurationStatisticsContent") {
        console.log(3);
        generateSessionDurationChart();
    }
}

let chart;
function updateChart() {
    const timeFrame = document.getElementById('timeFrame').value;
    const ctx = document.getElementById('reportChart').getContext('2d');

    const data = getDataByTimeFrame(timeFrame);

    if (chart) {
        chart.destroy();
    }
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Statistical Data',
                data: data.values,
                backgroundColor: 'rgba(74, 144, 226, 0.6)',
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
function getDataByTimeFrame(timeFrame) {
    const data = {
        daily: {
            labels: ['Patient 1', 'Patient 2', 'Patient 3'],
            values: [10, 15, 8]
        },
        weekly: {
            labels: ['Week 1', 'Week 2', 'Week 3'],
            values: [50, 40, 70]
        },
        monthly: {
            labels: ['January', 'February', 'March'],
            values: [200, 150, 300]
        },
        yearly: {
            labels: ['2022', '2023'],
            values: [1200, 1500]
        }
    };
    return data[timeFrame];
}

async function generateWorkloadChart() {
    const ctx = document.getElementById('workloadChart').getContext('2d');
    const response = await fetch('comptoller_api.php?method=getTherapistWorkload');
    const data = await response.json();
    const labels = data.map(item => item.therapist_name);
    const patientCounts = data.map(item => item.patient_count);
    const totalDurations = data.map(item => item.total_duration);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Number of Patients',
                    data: patientCounts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Total Session Duration (minutes)',
                    data: totalDurations,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

let patientCountChart;

async function generatePatientStatisticsChart() {
    const ctx = document.getElementById('patientCountChart').getContext('2d');
    const response = await fetch('comptoller_api.php?method=getPatientStats');
    const data = await response.json();
    const ageLabels = ['0-17', '18-34', '35-54', '55+'];
    const maleCounts = [data['0-17'] || 0, data['18-34'] || 0, data['35-54'] || 0, data['55+'] || 0];
    const femaleCounts = [data['0-17'] || 0, data['18-34'] || 0, data['35-54'] || 0, data['55+'] || 0];

    if (patientCountChart) {
        patientCountChart.destroy();
    }

    patientCountChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ageLabels,
            datasets: [
                {
                    label: 'Male',
                    data: maleCounts,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Female',
                    data: femaleCounts,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true
        }
    });
}

async function generateSessionDurationChart() {
    const ctx = document.getElementById('sessionDurationChart').getContext('2d');
    const response = await fetch('comptoller_api.php?method=getAppointmentDurationStats');
    const data = await response.json();
    const labels = data.map(item => item.therapist_name);
    const totalDurations = data.map(item => item.total_duration);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Duration (minutes)',
                data: totalDurations,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Duration (minutes)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Therapist'
                    }
                }
            },
            responsive: true
        }
    });
}


