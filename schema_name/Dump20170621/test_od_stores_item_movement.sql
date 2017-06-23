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
-- Table structure for table `od_stores_item_movement`
--

DROP TABLE IF EXISTS `od_stores_item_movement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `od_stores_item_movement` (
  `item_movement_id` text,
  `requisition_number` text,
  `container_quantity` int(11) DEFAULT NULL,
  `item_movement_quantity` int(11) DEFAULT NULL,
  `item_movement_date_time` text,
  `status` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `od_stores_item_movement`
--

LOCK TABLES `od_stores_item_movement` WRITE;
/*!40000 ALTER TABLE `od_stores_item_movement` DISABLE KEYS */;
INSERT INTO `od_stores_item_movement` VALUES ('itemmove685','int684',1,300,'2017-05-25 17:18:01','Partially Fulfilled'),('itemmove724','int723',2,1000,'2017-05-26 12:42:50','Fulfilled'),('undefined','req878',100,100,'2017-05-31 18:40:31','Fulfilled'),('undefined','req880',5,50,'2017-06-02 12:02:23','Partially Fulfilled'),('undefined','int673',5,200,'2017-06-02 12:09:27','Partially Fulfilled'),('itemmove1432','req1431',5,25,'2017-06-13 15:41:08','Partially Fulfilled'),('itemmove1437','req1436',6,50,'2017-06-13 15:45:43','Fulfilled'),('itemmove1972','req1971',5,100,'2017-06-19 18:41:13','Fulfilled');
/*!40000 ALTER TABLE `od_stores_item_movement` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-21 11:51:37
