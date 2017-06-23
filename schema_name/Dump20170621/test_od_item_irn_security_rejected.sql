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
-- Table structure for table `od_item_irn_security_rejected`
--

DROP TABLE IF EXISTS `od_item_irn_security_rejected`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `od_item_irn_security_rejected` (
  `inward_register_number` text,
  `item_id` text,
  `container_quantity` int(11) DEFAULT NULL,
  `item_quantity` int(11) DEFAULT NULL,
  `remarks` text,
  `reason_id` text,
  `status` text,
  `container_id` text,
  `unit_of_measure_id` text,
  `supplier_id` text,
  `emp_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `od_item_irn_security_rejected`
--

LOCK TABLES `od_item_irn_security_rejected` WRITE;
/*!40000 ALTER TABLE `od_item_irn_security_rejected` DISABLE KEYS */;
INSERT INTO `od_item_irn_security_rejected` VALUES ('irn2126','WIR03',10,2,'fair','reason002','rejected','coil','tonn','MUK',10),('irn2129','sample1',1,2,'gud','reason001','rejected','coil','tonn','MUK',10),('irn2129','sample1',1,2,'gud','reason001','accepted','coil','tonn','MUK',16),('irn2126','WIR03',10,2,'fair','reason002','rejected','coil','tonn','MUK',16);
/*!40000 ALTER TABLE `od_item_irn_security_rejected` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-21 11:51:27
