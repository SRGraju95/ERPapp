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
-- Table structure for table `od_sales_sales_order_detail`
--

DROP TABLE IF EXISTS `od_sales_sales_order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `od_sales_sales_order_detail` (
  `salesorder_id` int(11) DEFAULT NULL,
  `salesorder_date` text,
  `customer_id` text,
  `item_id` text,
  `item_description` text,
  `item_specification` text,
  `container_quantity` int(11) DEFAULT NULL,
  `order_quantity` int(11) DEFAULT NULL,
  `delivered_quantity` int(11) DEFAULT NULL,
  `required_delivery_date` text,
  `status` text,
  `emp_id` text,
  `billing_id` text,
  `shipping_id` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `od_sales_sales_order_detail`
--

LOCK TABLES `od_sales_sales_order_detail` WRITE;
/*!40000 ALTER TABLE `od_sales_sales_order_detail` DISABLE KEYS */;
INSERT INTO `od_sales_sales_order_detail` VALUES (1,'20-04-2017','CUS0001','FCWO1','good','wire',1000,600,900,'2028-03-17','Order placed','purchase','',''),(2,'19-02-2017','cus1','FLUX02','wire','5.5 inch',2,700,90,'0000-00-00','fullfilled','3','',''),(3,'29-02-2017','CUS0007','WIR02','rod','5.5 inch',2,800,90,'0000-00-00','Order placed','3','',''),(4,'13-02-2017','CUS0007','MIG01','metal','5.5 inch',2,1000,90,'0000-00-00','Order placed','ceo','',''),(3,'29-02-2017','CUS0007','WIR02','wire','5.5 inch',2,800,90,'0000-00-00','Created','3','',''),(2,'19-02-2017','cus1','FLUX02','wire','5.5 inch',2,700,90,'0000-00-00','fullfilled','3','',''),(2,'19-02-2017','cus1','FLUX02','wire','5.5 inch',2,700,90,'0000-00-00','fullfilled','3','','');
/*!40000 ALTER TABLE `od_sales_sales_order_detail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-21 11:51:36
