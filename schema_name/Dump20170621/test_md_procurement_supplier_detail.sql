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
-- Table structure for table `md_procurement_supplier_detail`
--

DROP TABLE IF EXISTS `md_procurement_supplier_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `md_procurement_supplier_detail` (
  `supplier_id` text,
  `supplier_name` text,
  `address_1` text,
  `address_2` text,
  `address_3` text,
  `city` text,
  `state` text,
  `country` text,
  `pincode` text,
  `mobile_1` text,
  `mobile_2` text,
  `email` text,
  `status` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `md_procurement_supplier_detail`
--

LOCK TABLES `md_procurement_supplier_detail` WRITE;
/*!40000 ALTER TABLE `md_procurement_supplier_detail` DISABLE KEYS */;
INSERT INTO `md_procurement_supplier_detail` VALUES ('sup4','abcdef','add1','add2','add3','madurai','Manitoba','Canada','234123','4354356356','1234564567','add@ad.sdf','created'),('sup001','TATA steel','21,bbc colony','near airport','lake road','Madurai','tamilnadu','india','625090','9089897','90897867','tatasteel@gmail.com','created'),('sup5','sup_abc','add1','add2','add3','madurai','Manitoba','Canada','345365','2334543543','3456346547','asd@dfa.fgh','created'),('NID','Nidhi Packages','','','','Chennai','Tamilnadu','India','','','','','approval'),('NEY','Neyama Enterprises','','','','Bangalore','Karnataka','India','','','','','approval'),('NCJ','N.C Jain & Company','','','','Bangalore','Karnataka','india','','','','','approval'),('NAT','The National Small Industries Corp Ltd','','','','Coimbatore','Tamilnadu','India','','','','','approval'),('MUK','Mukund Ltd - Chennai','','','','Chennai','Tamilnadu','','','','','','approval'),('MPC','The Metal Powder Company Ltd','','','','Thirumangalam','Tamilnadu','India','','','','','approval'),('MON','SREE Manohari Chemicals','','','','Salem','Tamilnadu','India','','','','','approval'),('MIT','Mithra Mercantile','','','','Erode','Tamilnadu','India','','','','','approval'),('MAN','Manjula Agencies','','','','','','','','','','','approval'),('MAH','Sri Mahalaxmi Scientific Company','','','','Coimbatore','','','','','','','approval'),('LUB','LUBESCO','','','','Mumbai','Maharasthra','India','','','','','approval'),('KRI','Krishna Rubber Product','','','','Coimbatore','Tamilnadu','India','','','','','approval'),('KAY','Kay Pee Dies India Pvt Ltd','','','','Ghaziabad','Uttar Pradesh','India','','','','','approval'),('JSWC','JSW Steel Ltd - Coimbatore','','','','Coimbatore','Tamilnadu','India','','','','','approval'),('JAY','Jayachandra Bearing','','','','Kangayam','Tamilnadu','India','','','','','approval'),('JAN','Jan Enterprises','','','','Chennai','Tamilnadu','India','','','','','approval'),('JAI','Jailani','','','','Hosur','Tamilnadu','India','','','','','approval'),('IREM','Indian Rare Earths Ltd','','','','Manavalakurichi','Tamilnadu','India','','','','','approval'),('GOV','Govindaraja Mudaliyar & Sons Pvt Ltd','','','','Chennai','Tamilnadu','India','','','','','approval'),('GOO','Good Earth Agro Chem P Ltd','','','','Nagpur','Maharashtra','India','','','','','approval'),('ENE','Energyspin','','','','Rajapalayam','Tamilnadu','India','','','','','approval'),('BHM','Bhandra Minerals','','','','Nagpur','Maharashtra','India','','','','','approval'),('BHA','Sri Bharani Packaging','','','','Paramathi','Tamilnadu','India','','','','','approval'),('AVR','AVR Industries','','','','Coimbatore','Tamilnadu','India','','','','','approval'),('AMP','Advance Metal Powder','','','','Mumbai','Maharashtra','India','','','','','approval'),('ALB','Albert & Co','','','','Coimbatore','Tamilnadu','India','','','','','approval'),('ADI','Aditya Packaging Industries','','','','Puducherry','Puducherry','India','','','','','approval'),('ABC','Aditya Better Container Pvt Ltd','','','','Puducherry','Puducherry','India','','','','','approval'),('NSP','New Super Pack','','','','Mumbai','Maharasthra','India','','','','','approval'),('PAC','Pacchaiappan & Co','','','','Kangeyam','Tamilnadu','India','','','','','approval'),('PED','Peddington Lubrimetal Pvt Ltd','','','','Mumbai','Maharastra','India','','','','','approval'),('POL','Polymer Products','','','','Coimbatore','Tamilnadu','India','','','','','approval'),('PPM','P & P Mettalloys Pvt Ltd','','','','Tricy','Tamilnadu','India','','','','','approval'),('RAC','Rajalakshmi Chemicals','','','','Salem','Tamilnadu','India','','','','','approval'),('RAJ','Sri Raja Rajeswari Plastic Industries','','','','Chennai','Tamilnadu','India','','','','','approval'),('RIN','RINL - Coimbatore','','','','','','','','','','','approval'),('RON','Ronak Industries','','','','Mumbai','Maharashtra','India','','','','','approval'),('ROY','Royal Chem Industries','','','','Ghaziabad','Uttar Pradesh','','','','','','approval'),('SAT','Sri Satya Sai Enterprises','','','','Hosur','Tamilnadu','India','','','','','approval'),('SBC','S.B Chemicals','','','','','Gujarat','India','','','','','approval'),('SRC','SRC Chemical','','','','Vizag','','India','','','','','approval'),('SUP','Suprabha Productive Products','address1','address2','address3','Pune','Maharasthra','India','434523','976834521','875672345','ABC@gmail.com','approval'),('TAT','TATA Steel Ltd - Chennai','','','','Chennai','Tamilnadu','India','','','','','approval'),('USH','Usha Martin Pvt Ltd ','','','','Chennai','Tamilnadu','India','','','','','approval'),('VAR','Sri Vari Paper Conversion','','','','Coimbatore','Tamilnadu','India','','','','','approval'),('VEN','Venkateshwara Chemicals','','','','Erode','Tamilnadu','India','','','','','approval'),('IREK','Indian Rare Earths Ltd Kollam','','','','Kollam','Kerala','India','','','','','approval'),('JSWB','Jsw Steel Ltd-Bellary','','','','Bellary','Karnataka','India','','','','','approval'),('JSWS','JSW Steel Ltd - Salem','','','','Salem','Tamilnadu','India','','','','','approval'),('SUN','Sunrise Chemical','','','','Rohtak','Haryana','India','','','','','approval'),('VIN','Vinardax Enterprises','','','','Bangalore','Karnataka','India','','','','','approval'),('PSC','Plastic Scrap','','','','','','','','','','',''),('SUP','ABCDEF','','','','','undefined','undefined','','','','','created');
/*!40000 ALTER TABLE `md_procurement_supplier_detail` ENABLE KEYS */;
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
