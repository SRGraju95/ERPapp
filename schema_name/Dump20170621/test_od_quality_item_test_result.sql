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
-- Table structure for table `od_quality_item_test_result`
--

DROP TABLE IF EXISTS `od_quality_item_test_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `od_quality_item_test_result` (
  `test_id` text,
  `item_id` text,
  `actual_value` text,
  `status` text,
  `inward_register_number` text,
  `container_no` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `od_quality_item_test_result`
--

LOCK TABLES `od_quality_item_test_result` WRITE;
/*!40000 ALTER TABLE `od_quality_item_test_result` DISABLE KEYS */;
INSERT INTO `od_quality_item_test_result` VALUES ('qtest36','TAT02','1.19','pass','irn24','undefined'),('qtest36','TAT02','pass','pass','irn24','undefined'),('qtest36','TAT02','pass','pass','irn24','undefined'),('qtest36','TAT02','0','pass','irn24','undefined'),('qtest36','TAT02','600','pass','irn24','undefined'),('qtest36','TAT02','1.19','pass','irn24','undefined'),('qtest36','TAT02','0','pass','irn24','undefined'),('qtest36','TAT02','fail','pass','irn24','undefined'),('qtest36','TAT02','pass','pass','irn24','undefined'),('qtest36','TAT02','650','pass','irn24','undefined'),('qtest1453','TAT02','5.8','pass','irn265','undefined'),('qtest1453','TAT02','5.8','pass','irn265','undefined'),('qtest1453','TAT02','5.8','pass','irn265','undefined'),('qtest1454','TAT02','5.6','pass','irn265','undefined'),('qtest1455','TAT02','5.8','pass','irn265','undefined'),('qtest1455','TAT02','5.8','fail','irn265','undefined'),('qtest1455','TAT02','5.8','fail','irn265','undefined'),('qtest1516','ITEM126','pass','undefined','irn268','undefined'),('qtest1516','ITEM126','undefined','undefined','irn268','undefined'),('qtest1518','ITEM126','pass','undefined','irn268','undefined'),('qtest1518','ITEM126','undefined','undefined','irn268','undefined'),('qtest1518','ITEM126','undefined','undefined','irn268','undefined'),('qtest1518','ITEM126','undefined','undefined','irn268','undefined'),('qtest1518','ITEM126','undefined','undefined','irn268','undefined'),('qtest1526','ITEM126','pass','undefined','irn268','undefined'),('qtest1526','ITEM126','undefined','undefined','irn268','undefined'),('qtest1542','ITEM126','pass','pass','irn268','undefined'),('qtest1542','ITEM126','pass','pass','irn268','undefined'),('qtest1544','TAT02','5.6','pass','irn265','undefined'),('qtest1559','ITEM126','fail','pass','irn268','undefined'),('qtest1559','ITEM126','pass','pass','irn268','undefined'),('qtest1561','TAT02','5.7','pass','irn265','undefined'),('qtest1564','TAT02','6.9','pass','irn265','undefined'),('qtest1565','TAT02','6.9','pass','irn265','undefined'),('qtest1565','TAT02','undefined','pass','irn265','undefined'),('qtest1566','TAT02','5.7','pass','irn265','undefined'),('qtest1567','TAT02','5.8','pass','irn265','undefined'),('qtest1568','TAT02','5.7','pass','irn265','123123');
/*!40000 ALTER TABLE `od_quality_item_test_result` ENABLE KEYS */;
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
