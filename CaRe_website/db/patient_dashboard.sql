-- 导出整个数据库的结构和数据
CREATE DATABASE IF NOT EXISTS patient_dashboard;

USE patient_dashboard;

-- 创建健康记录表
CREATE TABLE health_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(100),
    description TEXT,
    file VARCHAR(255),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建预约表
CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(100),
    date DATE,
    time TIME
);

-- 创建睡眠习惯表
CREATE TABLE sleep_habits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    sleep_hours FLOAT,
    date DATE
);

-- 创建饮食习惯表
CREATE TABLE diet_habits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    meals_per_day INT,
    healthy_meals INT,
    date DATE
);

INSERT INTO sleep_habits (patient_id, sleep_hours, date)
VALUES
(1, 7.5, '2024-10-01'),
(1, 6.0, '2024-10-02'),
(1, 8.0, '2024-10-03'),
(1, 7.2, '2024-10-04'),
(1, 6.8, '2024-10-05'),
(1, 7.0, '2024-10-06');

INSERT INTO diet_habits (patient_id, meals_per_day, healthy_meals, date)
VALUES
(1, 3, 2, '2024-10-01'),
(1, 4, 3, '2024-10-02'),
(1, 3, 1, '2024-10-03'),
(1, 5, 4, '2024-10-04'),
(1, 3, 2, '2024-10-05'),
(1, 4, 3, '2024-10-06');
