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
-- Table structure for table `od_procurement_requisition`
--

DROP TABLE IF EXISTS `od_procurement_requisition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `od_procurement_requisition` (
  `requisition_number` text,
  `requisition_date` text,
  `requisition_type_id` text,
  `item_id` text,
  `item_quantity` int(11) DEFAULT NULL,
  `warehouse_stores_id` text,
  `status` text,
  `item_required_date` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `od_procurement_requisition`
--

LOCK TABLES `od_procurement_requisition` WRITE;
/*!40000 ALTER TABLE `od_procurement_requisition` DISABLE KEYS */;
INSERT INTO `od_procurement_requisition` VALUES ('int67','2017-05-18','PM','PAC01',100,'stores1','active','2017-05-18'),('int302','2017-05-20','PM','PAC01',1000,'stores1','Created','2017-05-19'),('int582','2017-05-23','CON','ite484',1000,'stores1','active','2017-05-24'),('int673','2017-05-25','CON','ite17',500,'stores1','Partially Fulfilled','2017-05-26'),('int682','2017-05-25','CON','ite17',200,'stores1','Fulfilled','2017-05-31'),('int684','2017-05-25','CON','ite17',400,'stores1','Partially Fulfilled','2017-05-31'),('int723','2017-05-26','PM','ite712',1000,'stores1','Fulfilled','2017-05-27'),('undefined','2017-05-26','PM','ite712',2,'stores1','inactive','2017-05-26'),('undefined','2017-05-26','PM','ite712',3,'stores1','inactive','2017-05-26'),('undefined','2017-05-26','PM','ite712',4,'stores1','inactive','2017-05-26'),('int788','2017-05-26','PM','ite712',5,'stores1','Created','2017-05-26'),('req789','2017-05-26','CON','ite17',10,'stores1','active','2017-05-26'),('req801','2017-05-27','CON','ite17',10,'stores1','active','2017-05-28'),('req840','2017-05-27','CON','ite839',100,'stores2','active','2017-05-28'),('req843','2017-05-29','CON','ite842',100,'stores3','Partially Fulfilled','2017-05-30'),('req872','2017-05-31','undefined','undefined',1000,'undefined','Created','2017-06-01'),('req873','2017-05-31','undefined','undefined',123,'undefined','Created','2017-05-31'),('req878','2017-05-31','CON','ite877',100,'stores2','Fulfilled','2017-06-02'),('req880','2017-06-02','CON','ite879',100,'stores3','Partially Fulfilled','2017-06-03'),('req883','2017-06-02','PM','ite882',100,'stores3','active','2017-06-03'),('req1431','2017-06-13','CON','ite1430',50,'stores3','Partially Fulfilled','2017-06-15'),('req1436','2017-06-13','CON','ite1430',50,'stores3','Fulfilled','2017-06-13'),('req1971','2017-06-19','CON','ite1970',100,'stores1','Fulfilled','2017-06-27');
/*!40000 ALTER TABLE `od_procurement_requisition` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-21 11:51:31
