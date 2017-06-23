-- MySQL dump 10.13  Distrib 5.7.12, for Win32 (AMD64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `md_sales_finishedgoods_item_detail`
--

DROP TABLE IF EXISTS `md_sales_finishedgoods_item_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `md_sales_finishedgoods_item_detail` (
  `item_id` text,
  `item_name` text,
  `item_description` text,
  `item_specification1` text,
  `item_specification2` text,
  `container_id` text,
  `unit_of_measure_id` text,
  `item_group` text,
  `item_type_id` text,
  `item_status` text,
  `item_purchase_type` int(11) DEFAULT NULL,
  `warehouse_location` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `md_sales_finishedgoods_item_detail`
--

LOCK TABLES `md_sales_finishedgoods_item_detail` WRITE;
/*!40000 ALTER TABLE `md_sales_finishedgoods_item_detail` DISABLE KEYS */;
INSERT INTO `md_sales_finishedgoods_item_detail` VALUES ('FCW01','E71T1 1.20MM','E71T1 1.20MM, AWS SFA 5.20 E71T1','','','spool','kg','FCW','FG','approve',0,''),('FCW02','E71T1 1.60MM','E71T1 1.60MM, AWS SFA 5.20 E71T1','','','spool','kg','FCW','FG','Inactive',0,''),('FCW03','E71T5 1.60MM','E71T5 1.60MM, AWS SFA 5.20 E71T5','','','spool','kg','FCW','FG','Created',0,''),('FCW04','E81T1B2 1.20MM','E81T1B2 1.20MM, AWS SFA 5.29 E81T1B2','','','spool','kg','FCW','FG','Created',0,''),('FCW05','E81T1B2 1.60MM','E81T1B2 1.60MM, AWS SFA 5.29 E81T1B2','','','spool','kg','FCW','FG','Created',0,''),('FLUX01','SAW Flux F7A0 - EL8','SAW Flux F7A0-EL8 AWS SFA 5.17 ','','','bag','kg','FLU','FG','Created',0,''),('FLUX02','SAW Flux F7A2 -EL8','SAW Flux F7A2-EL8 AWS SFA 5.17','','','bag','kg','FLU','FG','Created',0,''),('FLUX03','SAW Flux F7A4 -EM12K','SAW Flux F7A4-EM12K AWS SFA 5.17','','','bag','kg','FLU','FG','Created',0,''),('FLUX04','SAW Flux F7A0 -EA2','SAW Flux F7A0 -EA2 AWS SFA 5.23','','','bag','kg','FLU','FG','Created',0,''),('FLUX05','SS 430 Flux','SS 430 Flux AWS SFA 5.9 ER 430','','','bag','kg','FLU','FG','Created',0,''),('MIG01','MIG/MAG Weld Wire 0.8MM Layer','MIG/MAG Welding Wire 0.8MM Layer, AWS SFA 5.18 ER70S6','','','spool','kg','MIG','FG','Created',0,''),('MIG02','MIG/MAG Weld Wire 0.8MM Random','MIG/MAG Welding Wire 0.8MM Random, AWS SFA 5.18 ER70S6','','','spool','kg','MIG','FG','Created',0,''),('MIG03','MIG/MAG Weld Wire 1.00MM','MIG/MAG Welding Wire 1.00MM, AWS SFA 5.18 ER70S6','','','spool','kg','MIG','FG','Created',0,''),('MIG04','MIG/MAG Weld Wire 1.00MM Pile Pack','MIG/MAG Welding Wire 1.00MM Pile Pack, AWS SFA 5.18 ER70S6','','','spool','kg','MIG','FG','Created',0,''),('MIG05','MIG/MAG Weld Wire 1.2MM','MIG/MAG Welding Wire 1.2MM, AWS SFA 5.18 ER70S6','','','spool','kg','MIG','FG','Created',0,''),('MIG06','MIG/MAG Weld Wire 1.2MM Pile Pack','MIG/MAG Welding Wire 1.2MM Pile Pack, AWS SFA 5.18 ER70S6','','','drum','kg','MIG','FG','Created',0,''),('MIG07','MIG/MAG Weld Wire 1.6MM','MIG/MAG Welding Wire 1.6MM, AWS SFA 5.18 ER70S6','','','spool','kg','MIG','FG','Created',0,''),('MIG08','MIG/MAG Weld Wire 2.0MM','MIG/MAG Welding Sire 2.0 AWS SFA 5.18 ER70S6','','','spool','kg','MIG','FG','Created',0,''),('MIG09','MIG/MAG Weld Wire 2.50MM','MIG/MAG Welding Wire 2.50MM AWS SFA 5.18 ER70S6','','','coil','kg','MIG','FG','Created',0,''),('MIG10','MIG/MAG Weld Wire 3.15MM','MIG/MAG Welding Wire 3.15MM, AWS SFA 5.18 ER70S6','','','drum','kg','MIG','FG','Created',0,''),('SAW01','SAW Wire 4.0MM EL8','SAW Wire 4.0MM EL8, AWS SFA 5.17 EL8','','','coil','kg','SAW','FG','Created',0,''),('SAW02','SAW Wire 3.15MM EL8','SAW Wire 3.15MM EL8, AWS SFA 5.17 EL8','','','coil','kg','SAW','FG','Created',0,''),('SAW03','SAW Wire 2.5MM EL8','SAW Wire 2.5MM EL8, AWS SFA 5.17 EL8','','','coil','kg','SAW','FG','Created',0,''),('SAW04','SAW Wire 2.0MM EL8','SAW Wire 2.00MM EL8, AWS SFA 5.17 EL8','','','coil','kg','SAW','FG','Created',0,''),('SAW05','SAW Wire 4.80MM EL8','SAW Wire 4.80MM EL8, AWS SFA 5.17 EL8','','','coil','kg','SAW','FG','Created',0,''),('SAW06','SAW Wire 4.80MM EL8','SAW Wire 4.80MM EL8, AWS SFA 5.17 EL8','','','drum','kg','SAW','FG','Created',0,''),('SAW07','SAW Wire 4.80MM EM12K','SAW Wire 4.80MM EM12K, AWS SFA 5.17 EM12K','','','drum','kg','SAW','FG','Created',0,''),('SAW08','SAW Wire 4.0MM EM12K','SAW Wire 4.0MM EM12K, AWS SFA 5.17 EM12K','','','coil','kg','SAW','FG','Created',0,''),('SAW09','SAW Wire 3.15MM EM12K','SAW Wire 3.15MM EM12K, AWS SFA 5.17 EM12K','','','coil','kg','SAW','FG','Created',0,''),('SAW10','SAW Wire 1.60 MM EM12K','SAW Wire 1.60 MM EM12K, AWS SFA 5.17 EM12K','','','coil','kg','SAW','FG','Created',0,''),('SR0003','Steal Rod 4MM 2.7 MM','Steal Rod 4MM 2.7 MM','','','coil','kg','EL2222','FG','Created',0,'stores5');
/*!40000 ALTER TABLE `md_sales_finishedgoods_item_detail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-21 11:51:38
