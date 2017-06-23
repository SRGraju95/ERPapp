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
-- Table structure for table `od_quality_parameter_id_range_mapping`
--

DROP TABLE IF EXISTS `od_quality_parameter_id_range_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `od_quality_parameter_id_range_mapping` (
  `quality_parameter_id` text,
  `item_id` text,
  `quality_parameter_range_value` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `od_quality_parameter_id_range_mapping`
--

LOCK TABLES `od_quality_parameter_id_range_mapping` WRITE;
/*!40000 ALTER TABLE `od_quality_parameter_id_range_mapping` DISABLE KEYS */;
INSERT INTO `od_quality_parameter_id_range_mapping` VALUES ('QPARAM0101','ITEM124','small'),('QPARAM972','DIE01','sdf'),('QPARAM972','DIE01','sdfasf'),('QPARAM1057','TAT01','small'),('QPARAM1058','','ghb'),('QPARAM1068','','small'),('QPARAM1074','PAC05','small'),('QPARAM1088','DIE03','small'),('QPARAM1161','TAT01','s'),('QPARAM1169','MIG01','small'),('QPARAM1170','CON01',''),('QPARAM1170','CON01',''),('QPARAM1170','FLUX02',''),('QPARAM1170','FLUX02',''),('QPARAM1171','FLUX02',''),('QPARAM1171','FLUX02',''),('QPARAM1176','TAT01','rger'),('QPARAM1176','TAT01','sarfgdrfg'),('QPARAM1176','TAT01','sdfwsdf'),('QPARAM1176','TAT01','rger'),('QPARAM1176','TAT01','sarfgdrfg'),('QPARAM1176','TAT01','sdfwsdf'),('QPARAM1178','TAT01','dfg'),('QPARAM1227','TAT01','ty'),('QPARAM1227','TAT01','nmjm'),('QPARAM1233','TAT01','small'),('QPARAM1233','TAT01','xfghgh'),('QPARAM0101','ITEM124','medium'),('QPARAM0101','ITEM124','large');
/*!40000 ALTER TABLE `od_quality_parameter_id_range_mapping` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-21 11:51:35
