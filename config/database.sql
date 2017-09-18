/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50634
Source Host           : localhost:3306
Source Database       : tpapp

Target Server Type    : MYSQL
Target Server Version : 50634
File Encoding         : 65001

Date: 2017-09-18 17:04:55
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `accounts`
-- ----------------------------
DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `grade` varchar(255) NOT NULL DEFAULT 'user',
  `registerDate` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of accounts
-- ----------------------------
INSERT INTO `accounts` VALUES ('1', 'zoukilama', 'd033e22ae348aeb5660fc2140aec35850c4da997', 'zouki.dev@gmail.com', 'admin', '15/09/2017');

-- ----------------------------
-- Table structure for `festivals`
-- ----------------------------
DROP TABLE IF EXISTS `festivals`;
CREATE TABLE `festivals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `date_debut` varchar(255) NOT NULL,
  `date_fin` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `latitude` varchar(255) NOT NULL,
  `longitude` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of festivals
-- ----------------------------
INSERT INTO `festivals` VALUES ('1', 'Pole emploi', 'Service pour aider à la recherche d\'emploi', '2017-09-14', '2017-09-23', 'http://127.0.0.1/appFestival/images/001-businessman.png', '42.67473720139164', '2.8018569946289062', 'reggae');
INSERT INTO `festivals` VALUES ('2', 'Test', 'Test', '2017-09-14', '2017-09-25', 'http://127.0.0.1/appFestival/images/002-businesswoman.png', '42.672930786132812', '2.7661930786132812', 'rock');

-- ----------------------------
-- Table structure for `subscribeevents`
-- ----------------------------
DROP TABLE IF EXISTS `subscribeevents`;
CREATE TABLE `subscribeevents` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `eventId` int(12) NOT NULL,
  `userId` int(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of subscribeevents
-- ----------------------------
INSERT INTO `subscribeevents` VALUES ('76', '2', '1');
