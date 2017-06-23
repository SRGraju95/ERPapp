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
-- Table structure for table `od_purchase_purchase_register`
--

DROP TABLE IF EXISTS `od_purchase_purchase_register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `od_purchase_purchase_register` (
  `purchase_order_number` text,
  `purchase_order_date` text,
  `purchase_order_type_id` text,
  `item_id` text,
  `item_quantity` int(11) DEFAULT NULL,
  `warehouse_stores_id` text,
  `status` text,
  `supplier_id` text,
  `reference_id` text,
  `po_price` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `od_purchase_purchase_register`
--

LOCK TABLES `od_purchase_purchase_register` WRITE;
/*!40000 ALTER TABLE `od_purchase_purchase_register` DISABLE KEYS */;
INSERT INTO `od_purchase_purchase_register` VALUES ('123','2017-05-27','PM','PAC02',100,'stores2','order created','SUP','int583',1.25),('2222','2017-05-27','PM','PAC02',10,'stores2','order created','SUP','int583',1.25),('5555','2017-05-27','PM','PAC02',890,'stores2','order created','SUP','int583',0),('6666','2017-05-27','PM','PAC02',1000,'stores2','order created','SUP','int583',1.25),('','2017-05-27','PM','PAC02',1000,'stores2','order created','SUP','int583',2),('','2017-05-27','PM','PAC02',1000,'stores2','order created','SUP','int583',2),('123','2017-05-27','PM','PAC02',1000,'stores2','order created','SUP','int583',2),('12121313','2017-05-30','PM','PAC02',1000,'stores2','order created','SUP','int583',2),('12345','2017-05-30','PM','PAC02',1000,'stores2','order created','SUP','int583',2),('pono345','10/6/17','145','ITEM126',1000,'stores2','order created','sup','int583',2),('pono345','10/6/17','1234','ITEM125',1000,'stores2','order created','sup','int583',2);
/*!40000 ALTER TABLE `od_purchase_purchase_register` ENABLE KEYS */;
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
