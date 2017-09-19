/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50634
Source Host           : localhost:3306
Source Database       : tpapp

Target Server Type    : MYSQL
Target Server Version : 50634
File Encoding         : 65001

Date: 2017-09-19 16:40:43
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of festivals
-- ----------------------------
INSERT INTO `festivals` VALUES ('9', 'Electrobeach', 'Evènement musical', '2017/09/19', '2018/09/23', 'images/type/01.png', '42.79706176043431', '3.0313661601394415', 'house hiphop');
INSERT INTO `festivals` VALUES ('14', 'Nouveau test', 'Ceci est rien du tout à part un teste', '2017/09/20', '2017/09/25', 'images/type/02.png', '42.77776339867919', '2.9034805297851562', 'hiphop');

-- ----------------------------
-- Table structure for `subscribeevents`
-- ----------------------------
DROP TABLE IF EXISTS `subscribeevents`;
CREATE TABLE `subscribeevents` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `eventId` int(12) NOT NULL,
  `userId` int(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of subscribeevents
-- ----------------------------
INSERT INTO `subscribeevents` VALUES ('77', '2', '1');
INSERT INTO `subscribeevents` VALUES ('80', '9', '1');
INSERT INTO `subscribeevents` VALUES ('81', '12', '1');
INSERT INTO `subscribeevents` VALUES ('82', '14', '1');
