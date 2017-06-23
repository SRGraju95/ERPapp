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
-- Table structure for table `od_item_container_detail`
--

DROP TABLE IF EXISTS `od_item_container_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `od_item_container_detail` (
  `container_id` text,
  `container_number` text,
  `inward_register_number` text,
  `heat_number` text,
  `batch_number` text,
  `quantity` text,
  `po_number` text,
  `po_date` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `od_item_container_detail`
--

LOCK TABLES `od_item_container_detail` WRITE;
/*!40000 ALTER TABLE `od_item_container_detail` DISABLE KEYS */;
INSERT INTO `od_item_container_detail` VALUES ('coil','9999','irn24','','btno22','1','',''),('coil','con7','irn24','','btno23','1','',''),('coil','con1','irn24','','btno73','10','',''),('coil','con2','irn24','','btno74','20','',''),('','','','','','','',''),('','','','','','','',''),('coil','9999','irn24','','btno22','1','',''),('coil','con7','irn24','','btno23','1','',''),('coil','9999','irn24','','btno22','1','',''),('coil','con7','irn24','','btno23','1','',''),('coil','9999','irn24','','btno22','1','',''),('coil','con7','irn24','','btno23','1','',''),('coil','9999','irn24','','btno22','1','',''),('coil','con7','irn24','','btno23','1','',''),('coil','9999','irn24','','btno22','1','',''),('coil','con7','irn24','','btno23','1','',''),('coil','110011','irn264','2222','btno538','10','',''),('coil','220022','irn264','3333','btno539','30','',''),('coil','330033','irn264','4444','btno542','30','',''),('coil','330033','irn264','4444','btno542','30','',''),('coil','330033','irn264','4444','btno542','30','',''),('coil','12345','irn264','555','btno552','12','',''),('coil','11222','irn264','333','btno554','10','',''),('coil','445555','irn264','333','btno554','10','',''),('coil','234324','irn264','5677','btno557','21','',''),('coil','324234','irn264','5666','btno558','10','',''),('box','234adsa','irn265','','','10','pono345','345'),('box','13123','irn265','','','10','pono345','3453'),('box','con45232','irn268','','','10','pono345','124312'),('box','12313','irn268','','','50','pono345','234234'),('box','13123','irn265','','','10','pono345','3453'),('box','234adsa','irn265','','','10','pono345','345');
/*!40000 ALTER TABLE `od_item_container_detail` ENABLE KEYS */;
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
