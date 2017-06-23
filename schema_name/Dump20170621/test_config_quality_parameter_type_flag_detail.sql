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
-- Table structure for table `config_quality_parameter_type_flag_detail`
--

DROP TABLE IF EXISTS `config_quality_parameter_type_flag_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `config_quality_parameter_type_flag_detail` (
  `quality_parameter_id` text,
  `item_id` text,
  `quality_parameter_type_flag` int(11) DEFAULT NULL,
  `status` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config_quality_parameter_type_flag_detail`
--

LOCK TABLES `config_quality_parameter_type_flag_detail` WRITE;
/*!40000 ALTER TABLE `config_quality_parameter_type_flag_detail` DISABLE KEYS */;
INSERT INTO `config_quality_parameter_type_flag_detail` VALUES ('QPARAM0101','ITEM124',1,'active'),('QPARAM0101','ITEM126',2,'active'),('QPARAM964','BEA01',2,'active'),('QPARAM972','DIE01',1,'active'),('QPARAM972','DIE01',1,'active'),('QPARAM973','DIE01',0,'active'),('QPARAM984','BEA01',0,'active'),('QPARAM985','BEA08',0,'active'),('QPARAM987','BEA08',0,'active'),('QPARAM988','BEA08',0,'inactive'),('QPARAM0101','ITEM125',0,'active'),('QPARAM1009','TAT01',0,''),('QPARAM1019','TAT01',2,''),('QPARAM1057','TAT01',1,''),('QPARAM1058','',1,''),('QPARAM1058','',2,''),('QPARAM1061','',2,''),('QPARAM1068','',1,''),('QPARAM1074','PAC05',1,''),('QPARAM1074','PAC05',1,''),('QPARAM1074','PAC05',0,''),('QPARAM1074','PAC05',0,''),('QPARAM1076','LUB02',0,''),('QPARAM1088','PAC05',0,''),('QPARAM1088','DIE03',1,''),('QPARAM1088','DIE03',1,''),('QPARAM1088','TAT01',2,''),('QPARAM1161','TAT01',1,''),('QPARAM1161','',2,''),('QPARAM1169','MIG01',1,''),('QPARAM1170','CON01',1,''),('QPARAM1170','CON01',1,''),('QPARAM1170','FLUX02',1,''),('QPARAM1170','FLUX02',1,''),('QPARAM1171','FLUX02',1,''),('QPARAM1171','FLUX02',1,''),('QPARAM1176','TAT01',1,''),('QPARAM1176','TAT01',1,''),('QPARAM1176','TAT01',1,''),('QPARAM1176','TAT01',1,''),('QPARAM1176','TAT01',1,''),('QPARAM1176','TAT01',1,''),('QPARAM1178','TAT01',1,''),('QPARAM1207','',2,''),('QPARAM1227','TAT01',1,''),('QPARAM1227','TAT01',1,''),('QPARAM1233','TAT01',1,''),('QPARAM1233','TAT01',1,''),('QPARAM1233','TAT01',1,''),('QPARAM1290','',2,''),('QPARAM1317','TAT01',2,''),('QPARAM2123','FLUX01',0,'');
/*!40000 ALTER TABLE `config_quality_parameter_type_flag_detail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-21 11:51:39
