/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 05/10/2024 18:58:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for appointments
-- ----------------------------
DROP TABLE IF EXISTS `appointments`;
CREATE TABLE `appointments`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) NOT NULL,
  `therapist_id` int(11) NOT NULL,
  `appointment_time` datetime(0) NOT NULL,
  `end_time` datetime(0) NOT NULL,
  `treatment_room` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `patient_id`(`patient_id`) USING BTREE,
  INDEX `therapist_id`(`therapist_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of appointments
-- ----------------------------
INSERT INTO `appointments` VALUES (10, 1, 1, '2024-10-05 16:26:00', '2024-10-05 17:27:00', 'Treatment Room A');
INSERT INTO `appointments` VALUES (11, 1, 2, '2024-10-05 16:26:00', '2024-10-05 17:27:00', 'Treatment Room B');
INSERT INTO `appointments` VALUES (12, 1, 3, '2024-10-05 16:26:00', '2024-10-05 17:27:00', 'Consultation Room 1');
INSERT INTO `appointments` VALUES (13, 1, 4, '2024-10-05 16:26:00', '2024-10-05 17:27:00', 'Consultation Room 2');
INSERT INTO `appointments` VALUES (14, 1, 5, '2024-10-05 16:26:00', '2024-10-05 17:27:00', 'Physical Therapy Room');
INSERT INTO `appointments` VALUES (15, 2, 3, '2024-10-05 17:46:00', '2024-10-05 17:46:00', 'Consultation Room 2');
INSERT INTO `appointments` VALUES (16, 1, 1, '2024-10-05 15:25:00', '2024-10-05 16:26:00', 'Treatment Room A');
INSERT INTO `appointments` VALUES (17, 1, 2, '2024-10-05 15:25:00', '2024-10-05 15:25:00', 'Treatment Room A');
INSERT INTO `appointments` VALUES (18, 1, 1, '2024-10-05 15:25:00', '2024-10-05 15:25:00', 'Treatment Room A');
INSERT INTO `appointments` VALUES (19, 1, 1, '2024-10-05 14:24:00', '2024-10-05 15:25:00', 'Treatment Room A');
INSERT INTO `appointments` VALUES (20, 1, 1, '2024-10-06 18:07:00', '2024-10-06 20:09:00', 'Treatment Room A');

-- ----------------------------
-- Table structure for patients
-- ----------------------------
DROP TABLE IF EXISTS `patients`;
CREATE TABLE `patients`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `age` int(11) NOT NULL,
  `gender` enum('Male','Female') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `contact` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of patients
-- ----------------------------
INSERT INTO `patients` VALUES (1, 'John Doe', 30, 'Male', '12345678901');
INSERT INTO `patients` VALUES (2, 'Jane Smith', 25, 'Female', '10987654321');
INSERT INTO `patients` VALUES (3, 'Mike Johnson', 40, 'Male', '13579246810');
INSERT INTO `patients` VALUES (4, 'Emily Davis', 35, 'Female', '14625837901');
INSERT INTO `patients` VALUES (5, 'David Brown', 28, 'Male', '15975348620');
INSERT INTO `patients` VALUES (6, '张四1', 12, 'Female', '11111111111');
INSERT INTO `patients` VALUES (7, '张四', 23, 'Male', '11111111111');
INSERT INTO `patients` VALUES (8, '123w2', 33, 'Female', '11111111111');

-- ----------------------------
-- Table structure for rooms
-- ----------------------------
DROP TABLE IF EXISTS `rooms`;
CREATE TABLE `rooms`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rooms
-- ----------------------------
INSERT INTO `rooms` VALUES (1, 'Treatment Room A');
INSERT INTO `rooms` VALUES (2, 'Treatment Room B');
INSERT INTO `rooms` VALUES (3, 'Consultation Room 1');
INSERT INTO `rooms` VALUES (4, 'Consultation Room 2');
INSERT INTO `rooms` VALUES (5, 'Physical Therapy Room');
INSERT INTO `rooms` VALUES (6, 'Massage Room');

-- ----------------------------
-- Table structure for therapists
-- ----------------------------
DROP TABLE IF EXISTS `therapists`;
CREATE TABLE `therapists`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `specialization` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of therapists
-- ----------------------------
INSERT INTO `therapists` VALUES (1, 'Therapist A', 'Psychotherapy');
INSERT INTO `therapists` VALUES (2, 'Therapist B', 'Physical Therapy');
INSERT INTO `therapists` VALUES (3, 'Therapist C', 'Occupational Therapy');
INSERT INTO `therapists` VALUES (4, 'Therapist D', 'Speech Therapy');
INSERT INTO `therapists` VALUES (5, 'Therapist E', 'Acupuncture');

SET FOREIGN_KEY_CHECKS = 1;
