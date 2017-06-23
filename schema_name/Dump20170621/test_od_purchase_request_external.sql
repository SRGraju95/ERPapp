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
-- Table structure for table `od_purchase_request_external`
--

DROP TABLE IF EXISTS `od_purchase_request_external`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `od_purchase_request_external` (
  `purchase_request_number` text,
  `purchase_request_date` text,
  `purchase_request_type_id` text,
  `item_id` text,
  `item_quantity` int(11) DEFAULT NULL,
  `container_quantity` int(11) DEFAULT NULL,
  `warehouse_stores_id` text,
  `status` text,
  `item_required_date` text,
  `supplier_name` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `od_purchase_request_external`
--

LOCK TABLES `od_purchase_request_external` WRITE;
/*!40000 ALTER TABLE `od_purchase_request_external` DISABLE KEYS */;
INSERT INTO `od_purchase_request_external` VALUES ('int579','2017-05-23','PM','PAC02',345,3945,'stores2','active','2017-05-23','Mithra Mercantile'),('int583','2017-05-23','PM','PAC02',1000,31223,'stores2','active','2017-05-23','Suprabha Productive '),('int584','2017-05-23','PM','PAC02',566,70070,'stores2','active','2017-05-23','Mithra Mercantile'),('int660','2017-05-25','PM','PAC02',30000,2500,'stores2','active','2017-05-25','Suprabha Productive ');
/*!40000 ALTER TABLE `od_purchase_request_external` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-21 11:51:28
