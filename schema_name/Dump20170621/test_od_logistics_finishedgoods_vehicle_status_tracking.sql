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
-- Table structure for table `od_logistics_finishedgoods_vehicle_status_tracking`
--

DROP TABLE IF EXISTS `od_logistics_finishedgoods_vehicle_status_tracking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `od_logistics_finishedgoods_vehicle_status_tracking` (
  `goods_vehicle_number` text,
  `goods_vehicle_name` text,
  `goods_vehicle_drivername` text,
  `goods_vehicle_driverphonenumber` text,
  `goods_vehicle_driverphonenumber2` text,
  `goods_vehicle_ownername` text,
  `goods_vehicle_ownerphonenumber` int(11) DEFAULT NULL,
  `goods_vehicle_intime` text,
  `goods_vehicle_outtime` text,
  `goods_vehicle_indate` text,
  `goods_vehicle_outdate` text,
  `status` text,
  `load_start` text,
  `load_end` text,
  `delivered` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `od_logistics_finishedgoods_vehicle_status_tracking`
--

LOCK TABLES `od_logistics_finishedgoods_vehicle_status_tracking` WRITE;
/*!40000 ALTER TABLE `od_logistics_finishedgoods_vehicle_status_tracking` DISABLE KEYS */;
INSERT INTO `od_logistics_finishedgoods_vehicle_status_tracking` VALUES ('TN 01 AB 7860','Lorry','Murugan','9789045567','9842577755','ria',987834333,'6:00PM','7:00PM','30-03-17','28-03-17','in','12-4-2017 12:08 PM','1-5-2017 1:08 PM','12:00 AM'),('TN 4545','TRUCK','Babu','0908989','09090909','xavier',90909099,'2.40pm','3.10pm','19-04-2017','19-04-2017','in','19-04-2017 2.40pm','19-04-2017 3.10pm','12.00AM');
/*!40000 ALTER TABLE `od_logistics_finishedgoods_vehicle_status_tracking` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-21 11:51:23
