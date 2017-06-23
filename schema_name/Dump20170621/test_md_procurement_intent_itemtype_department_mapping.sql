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
-- Table structure for table `md_procurement_intent_itemtype_department_mapping`
--

DROP TABLE IF EXISTS `md_procurement_intent_itemtype_department_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `md_procurement_intent_itemtype_department_mapping` (
  `item_type_id` text,
  `item_owner_department` text,
  `intent_approver_department` text,
  `intent_reviewer_department` text,
  `intent_po_create_department` text,
  `intent_item_supplier_department` text,
  `intent_item_acceptor_department` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `md_procurement_intent_itemtype_department_mapping`
--

LOCK TABLES `md_procurement_intent_itemtype_department_mapping` WRITE;
/*!40000 ALTER TABLE `md_procurement_intent_itemtype_department_mapping` DISABLE KEYS */;
INSERT INTO `md_procurement_intent_itemtype_department_mapping` VALUES ('CAP','EXEC','EXEC','CEO','PURC','STOR','PURC'),('CI','STOR','PROD','ADMI','PURC','STOR','PURC'),('CON','STOR','PROD','PROD','PURC','STOR','PURC'),('MP','MAIN','MAIN','MAIN','PURC','STOR','PURC'),('PM','STOR','PROD','PROD','PURC','STOR','PURC'),('RM','STOR','PROD','CEO','PURC','STOR','PURC'),('TP','TOOL','TOOL','MAIN','PURC','STOR','PURC'),('RMFL','STOR','PROD','ADMI','PURC','PURC','PURC');
/*!40000 ALTER TABLE `md_procurement_intent_itemtype_department_mapping` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-21 11:51:32
