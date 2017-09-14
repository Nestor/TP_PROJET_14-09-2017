/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50634
Source Host           : localhost:3306
Source Database       : tpapp

Target Server Type    : MYSQL
Target Server Version : 50634
File Encoding         : 65001

Date: 2017-09-14 16:52:57
*/

SET FOREIGN_KEY_CHECKS=0;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of festivals
-- ----------------------------
INSERT INTO `festivals` VALUES ('1', 'Pole emploi', 'Service pour aider à la recherche d\'emploi', '14/09/2017', '20/09/2017', 'http://127.0.0.1/appFestival/images/001-businessman.png', '42.67473720139164', '2.8018569946289062');
INSERT INTO `festivals` VALUES ('2', 'Test', 'Test', '14/09/2017', '23/09/2017', 'http://127.0.0.1/appFestival/images/002-businesswoman.png', '42.672930786132812', '2.7661930786132812');
