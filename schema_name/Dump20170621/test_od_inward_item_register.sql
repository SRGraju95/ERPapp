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
-- Table structure for table `od_inward_item_register`
--

DROP TABLE IF EXISTS `od_inward_item_register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `od_inward_item_register` (
  `supplier_id` text,
  `inward_register_number` text,
  `item_id` text,
  `container_id` text,
  `unit_of_measure_id` text,
  `remarks` text,
  `container_quantity` int(11) DEFAULT NULL,
  `item_quantity` int(11) DEFAULT NULL,
  `status` text,
  `po_number` text,
  `po_date` text,
  `accepted_container_quantity` text,
  `accepted_item_quantity` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `od_inward_item_register`
--

LOCK TABLES `od_inward_item_register` WRITE;
/*!40000 ALTER TABLE `od_inward_item_register` DISABLE KEYS */;
INSERT INTO `od_inward_item_register` VALUES ('sup001','irn259','TAT02','box','tonne','gud',1,2,'','','','',''),('TAT','irn262','WIR02','coil','tonne','good',1,1,'','','','',''),('NAT','irn263','WIR07','coil','tonne','fair',1,3,'','','','',''),('MUK','irn264','WIR03','coil','tonne','gud',1,3,'stores_history','','','',''),('sup001','irn265','TAT02','box','tonne','gud',1,3,'stores_history','','','',''),('sup001','irn630','TAT02','box','tonne','good',0,2,'stores','','','',''),('MUK','irn264','WIR03','coil','tonne','gud',1,3,'quality_history','pono6655','22/5/17','20','2'),('MUK','irn264','WIR03','coil','tonne','gud',1,3,'purchase','pono6655','22/5/17','31','2'),('MUK','irn265','ITEM125','box','kg','good',98,100,'stores_history','pono6656','5/6/17','31','2'),('MUK','irn267','ITEM124','box','kg','good',2,100,'stores','535636','5/5/17','2','70'),('MUK','irn268','ITEM126','box','kg','good',2,3,'stores_history','pono6655','5/6/17','1','2'),('sup001','irn265','TAT02','box','tonne','gud',1,3,'quality','pono345','345','20','2'),('MUK','irn268','ITEM126','box','kg','good',2,3,'quality','pono345','124312','80','4'),('MUK','irn1522','WIR03','coil','tonn','gud',0,2,'stores','','','',''),('MUK','irn1523','WIR03','coil','tonn','gud',6,5,'stores','','','',''),('sup001','irn1524','TAT02','box','undefined','gud',2,4,'stores','','','',''),('sup001','irn1552','ite484','coil','tonn','gud',1,3,'stores','','','',''),('sup001','irn1553','ite882','box','numbers','gud',0,2,'stores','','','',''),('sup001','irn1569','ite17','box','undefined','gud',1,3,'stores','','','',''),('sup001','irn1571','ite17','box','undefined','gud',0,2,'stores','','','',''),('sup001','irn1574','ite484','box','undefined','gud',1,2,'stores','','','',''),('sup001','irn1575','ite882','box','numbers','gud',1,3,'stores','','','',''),('sup001','irn1577','ite484','box','undefined','gud',1,1,'stores','','','',''),('sup001','irn1579','TAT01','box','undefined','gud',0,2,'stores','','','',''),('sup001','irn1581','ite484','box','undefined','gud',1,1,'stores','','','',''),('MUK','irn1583','WIR03','coil','tonn','gud',0,2,'stores','','','',''),('sup001','irn1585','ite484','box','undefined','gud',1,3,'stores','','','',''),('MUK','irn1587','WIR03','coil','tonn','gud',1,4,'stores','','','',''),('sup001','irn1589','ite484','box','numbers','gud',0,2,'stores','','','',''),('sup001','irn1591','ite17','box','undefined','gud',1,3,'stores','','','',''),('MUK','irn1593','WIR03','coil','tonn','gud',2,5,'stores','','','',''),('sup001','irn1595','ite882','box','numbers','gud',2,4,'stores','','','',''),('sup001','irn1597','ite17','box','undefined','gud',2,4,'stores','','','',''),('sup001','irn1599','ite484','box','undefined','gud',1,3,'stores','','','',''),('MUK','irn1602','WIR03','coil','tonn','gud',4,6,'stores','','','',''),('MUK','irn1605','WIR03','coil','tonn','gud',2,4,'stores','','','',''),('MUK','irn1611','WIR03','coil','tonn','gud',2,4,'stores','','','',''),('MUK','irn1613','WIR03','coil','tonn','gud',2,4,'stores','','','',''),('MUK','irn1619','WIR03','coil','tonn','gud',4,6,'stores','','','',''),('MUK','irn1623','WIR03','coil','','gud',1,3,'stores','','','',''),('sup001','irn1625','ite879','','','gud',1,3,'stores','','','',''),('sup001','irn1646','ite484','box','undefined','gud',2,4,'stores','','','',''),('MUK','irn1648','WIR03','coil','tonn','gud',1,3,'stores','','','',''),('MUK','irn1650','WIR03','coil','tonn','gud',2,4,'stores','','','',''),('MUK','irn1652','WIR03','coil','tonn','gud',1,3,'stores','','','',''),('sup001','irn1654','ite484','box','undefined','gud',2,4,'stores','','','',''),('MUK','irn1656','WIR03','coil','tonn','gud',3,5,'stores','','','',''),('MUK','irn1660','WIR03','coil','tonn','gud',1,3,'stores','','','',''),('NID','irn1676','sample001','undefined','tonn','gud',1,3,'stores','','','',''),('MUK','irn1678','sample1','coil','tonn','gud',1,4,'stores','','','',''),('MUK','irn1679','WIR03','coil','tonn','gud',5,9,'stores','','','',''),('sup001','irn1688','ite484','box','undefined','gud',1,3,'stores','','','',''),('MUK','irn1692','WIR03','coil','tonn','gud',1,3,'stores','','','',''),('MUK','irn1700','sample1','coil','tonn','gud',1,3,'stores','','','',''),('MUK','irn1708','WIR03','coil','tonn','gud',4,6,'stores','','','',''),('MUK','irn1712','WIR03','coil','tonn','gud',2,4,'stores','','','',''),('MUK','irn1717','sample1','coil','tonn','gud',2,4,'stores','','','',''),('MUK','irn1721','WIR03','coil','tonn','gud',1,3,'stores','','','',''),('MUK','irn1723','WIR03','coil','tonn','gud',2,4,'stores','','','',''),('MUK','irn1726','WIR03','coil','tonn','erg',1,3,'stores','','','',''),('MUK','irn1730','WIR03','coil','tonn','gud',1,33,'stores','','','',''),('MUK','irn1733','WIR03','coil','tonn','gud',22,2,'stores','','','',''),('MUK','irn1737','WIR03','coil','tonn','gud',1,3,'stores','','','',''),('MUK','irn1740','WIR03','coil','tonn','gud',31,4,'stores','','','',''),('MUK','irn1758','WIR03','coil','tonn','gud',4,5,'stores','','','',''),('MUK','irn1760','WIR03','coil','tonn','gud',9,7,'stores','','','',''),('NID','irn1772','PAC05','bag','Kg','gud',2,3,'stores','','','',''),('MUK','irn1774','WIR03','coil','tonn','gud',3,4,'stores','','','',''),('MUK','irn1775','WIR03','coil','tonn','gud',3,4,'stores','','','',''),('MUK','irn1777','WIR03','coil','tonn','gud',3,4,'stores','','','',''),('MUK','irn1787','WIR03','coil','tonn','gud',23,45,'stores','','','',''),('MUK','irn1789','WIR03','coil','tonn','gud',2,3,'stores','','','',''),('MUK','irn1850','sample1','coil','tonn','gud',3,4,'stores','','','',''),('MUK','irn1854','sample2','coil','tonn','gud',3,5,'stores','','','',''),('MUK','irn1859','sample1','coil','tonn','gud',1,2,'stores','','','',''),('NID','irn1887','PAC05','bag','Kg','gud',2,4,'stores','','','',''),('NID','irn1887','PAC05','bag','Kg','gud',2,4,'stores','','','',''),('NID','irn1890','PAC05','bag','Kg','gud',2,4,'stores','','','',''),('NID','irn1890','PAC05','bag','Kg','gud',2,4,'stores','','','',''),('NID','irn1892','sample001','undefined','tonn','gud',2,3,'stores','','','',''),('NID','irn1894','sample001','undefined','tonn','gud',45,5,'stores','','','',''),('sup001','irn1910','ite484','box','undefined','gud',2,3,'stores','','','',''),('NID','irn1913','PAC05','box','Kg','gud',3,4,'stores','','','',''),('NID','irn1913','PAC05','box','Kg','gud',3,4,'stores','','','',''),('MUK','irn1916','WIR03','coil','tonn','gud',23,3,'stores','','','',''),('MUK','irn1916','WIR03','coil','tonn','gud',23,3,'stores','','','',''),('MUK','irn1918','sample2','coil','tonn','gud',2,4,'stores','','','',''),('MUK','irn1920','WIR03','coil','tonn','gud',2,3,'stores','','','',''),('NID','irn1973','PAC05','bag','Kg','gud',2,34,'stores','','','',''),('NID','irn1973','PAC05','bag','Kg','gud',2,34,'stores','','','',''),('NID','irn1975','sample001','undefined','tonn','gud',12,4,'stores','','','',''),('MUK','irn2009','WIR03','coil','tonn','gud',5,6,'stores','','','',''),('MUK','irn2009','WIR03','coil','tonn','gud',5,6,'stores','','','',''),('MUK','irn2012','sample1','coil','tonn','fair',9,10,'stores','','','',''),('MUK','irn2026','WIR03','coil','tonn','gud',5,6,'stores','','','',''),('MUK','irn2026','WIR03','coil','tonn','gud',5,6,'stores','','','',''),('MUK','irn2034','WIR03','coil','tonn','gud',5,6,'stores','','','',''),('MUK','irn2034','WIR03','coil','tonn','gud',5,6,'stores','','','',''),('MUK','irn2037','sample1','coil','tonn','fair',3,5,'stores','','','',''),('MUK','irn2040','WIR03','coil','tonn','gud',67,7,'stores','','','',''),('MUK','irn2043','WIR03','coil','tonn','gud',5,6,'stores','','','',''),('MUK','irn2045','WIR03','coil','tonn','gud',3,4,'stores','','','',''),('MUK','irn2047','WIR03','coil','tonn','gud',3,4,'stores','','','',''),('MUK','irn2049','WIR03','coil','tonn','gud',5,6,'stores','','','',''),('MUK','irn2049','WIR03','coil','tonn','gud',5,6,'stores','','','',''),('MUK','irn2052','sample1','coil','tonn','gud',4,5,'stores','','','',''),('NID','irn2054','PAC05','bag','Kg','gud',4,5,'stores','','','',''),('NID','irn2057','sample001','undefined','tonn','gud',3,4,'stores','','','',''),('MUK','irn2077','WIR03','undefined','undefined','gud',3,45,'','','','',''),('MUK','irn2077','WIR03','undefined','undefined','gud',3,45,'stores','','','',''),('MUK','irn2077','WIR03','undefined','undefined','gud',2,4,'','','','',''),('MUK','irn2077','WIR03','undefined','undefined','gud',4,5,'stores','','','',''),('MUK','irn2077','WIR03','undefined','undefined','gud',4,5,'stores','','','',''),('NID','irn2090','PAC05','bag','Kg','gud',3,4,'stores','','','',''),('MUK','irn2092','WIR03','coil','tonn','gud',3,4,'stores','','','',''),('MUK','irn2092','WIR03','coil','tonn','gud',3,4,'stores','','','',''),('MUK','irn2094','WIR03','coil','tonn','gud',6,7,'stores','','','',''),('MUK','irn2096','WIR03','coil','tonn','gud',4,5,'stores','','','',''),('MUK','irn2098','WIR03','coil','tonn','gud',4,6,'stores','','','',''),('MUK','irn2126','WIR03','coil','tonn','gud',2,4,'stores','','','',''),('MUK','irn2126','WIR03','coil','tonn','gud',2,4,'stores','','','',''),('MUK','irn2129','sample1','coil','tonn','gud',2,4,'stores','','','','');
/*!40000 ALTER TABLE `od_inward_item_register` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-21 11:51:29
