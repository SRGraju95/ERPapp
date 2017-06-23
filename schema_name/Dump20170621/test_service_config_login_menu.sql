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
-- Table structure for table `service_config_login_menu`
--

DROP TABLE IF EXISTS `service_config_login_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service_config_login_menu` (
  `menu_id` int(11) DEFAULT NULL,
  `ui_component` text,
  `ui_menuname` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_config_login_menu`
--

LOCK TABLES `service_config_login_menu` WRITE;
/*!40000 ALTER TABLE `service_config_login_menu` DISABLE KEYS */;
INSERT INTO `service_config_login_menu` VALUES (1,'call-add-customer','Add Customer'),(5,'vehicle-in-process','vehicle in process'),(5,'call-security-card','security'),(6,'vehicleorder-summary','vehicleorder-summary'),(11,'grn-stores','stores'),(12,'grn-purchase','purchase'),(22,'grn-quality','quality'),(2,'call-add-item','Create Item'),(10,'vehicle-in-process','vehicle in process'),(7,'specification-in-detail','Specifications'),(9,'call-add-supplier','Add Supplier'),(15,'shopping-category','Shopping'),(10,'call-ceo-card','New Items'),(16,'quality-testing-process','Quality testing'),(29,'requisition-process','Create Requisition'),(3,'salesorder-summary','salesorder summary'),(4,'sales-projection','sales projection'),(8,'salesorder-projection','salesorder projection'),(14,'salesorder-summary-logistics','salesorder summary logistics'),(36,'call-purchase-request-approval','Approve Purchase Request'),(13,'sales-order','sales order'),(3,'salesprojection-summary','salesprojection summary'),(34,'purchase-request-process','Create Purchase Request'),(35,'call-requisition-approval','New Requisition'),(37,'purchase-order','Create Purchase Order'),(38,'requisition-stores','Requisition'),(45,'stores-salesorder-summary','stores salesorder summary'),(46,'stores-salesorder','stores salesorder'),(47,'stores-salesorder-summary-logistics','stores salesorder summary logistics'),(50,'test-file','demo test'),(48,'sales-vehicle-process','sales vehicle process'),(51,'item-quality-testing','item quality testing'),(52,'quantity-service','quantity');
/*!40000 ALTER TABLE `service_config_login_menu` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-21 11:51:30
