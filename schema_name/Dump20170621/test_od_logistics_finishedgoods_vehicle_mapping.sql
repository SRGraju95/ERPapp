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
-- Table structure for table `od_logistics_finishedgoods_vehicle_mapping`
--

DROP TABLE IF EXISTS `od_logistics_finishedgoods_vehicle_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `od_logistics_finishedgoods_vehicle_mapping` (
  `vehicle_name` text,
  `vehicle_number` text,
  `driver_name` text,
  `driver_number` int(11) DEFAULT NULL,
  `inward_register_number` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `od_logistics_finishedgoods_vehicle_mapping`
--

LOCK TABLES `od_logistics_finishedgoods_vehicle_mapping` WRITE;
/*!40000 ALTER TABLE `od_logistics_finishedgoods_vehicle_mapping` DISABLE KEYS */;
INSERT INTO `od_logistics_finishedgoods_vehicle_mapping` VALUES ('lorry','TN 6767','murugan',90909090,'irn16'),('lorry','TN 6767','murugan',90909090,'irn16'),('lorry','TN 7878','murugan',9090898,'irn17'),('lorry','TN 7878','murugan',9090898,'irn17'),('lorry','TN 7878','murugan',909989,'irn18'),('lorry','TN 6767','murugan',90787878,'irn20'),('lorry','TN 5656','murugan',90909434,'irn24'),('lorry','TN 6767','sanmugam',90878787,'irn259'),('truck','TN 6767','logu',90978767,'irn262'),('truck','TN 7676','bogan',908989787,'irn263'),('lorry','TN 7878','murugan',987766555,'irn264'),('JCP','TN 8989','logu',9090909,'irn265'),('lorry','TN 6767','murugan',65654545,'irn1484'),('lorry','TN 65656','murugan',907787,'irn1490'),('lorry','TN 7877','logu',98989898,'irn1491'),('lorry','TN 78878','murugan',97757878,'irn1522'),('lorry','TN 78878','murugan',97757878,'irn1523'),('lorry','TN 6565','logu',908675857,'irn1552'),('lorry','TN 6565','logu',908675857,'irn1553'),('lorry','TN 7878','vel',9088888,'irn1569'),('lorry','TN 7878','logu',90768678,'irn1571'),('lorry','tn 7676','logu',898989676,'irn1574'),('lorry','tn 7676','logu',898989676,'irn1575'),('lorry','TN 6767','logu',907777,'irn1577'),('lorry','tn 5656','murugan',90908790,'irn1579'),('lorry','TN 7878','murugan',9088787,'irn1581'),('lorry','tn 5454','lorry',678678,'irn1583'),('lorry','tn 5454','murugan',907878,'irn1587'),('lorry','tn 65464','murugan',90768678,'irn1591'),('lorry','tn 65656','logu',906758,'irn1597'),('lorry','tn 6565','logu',9090980,'irn1619'),('lorry','7867','vjhfj',90090,'irn1623'),('lorry','567567','gukg',657,'irn1625'),('yukiyuj','678','hjk',678,'irn1650'),('fdghdfgh','456','dfthg',356,'irn1652'),('lorry','67645','gyjgh',4674657,'irn1654'),('rthyu','67','ythfj',467,'irn1656'),('edrfg','45','dsfg',345,'irn1660'),('lorry','TN 89889','murugan',90887777,'irn1676'),('lorry','TN 89889','xavier',9088888,'irn1678'),('lorry','TN 89889','xavier',9088888,'irn1679'),('lorry','5687','567',5467,'irn1688'),('fdghfg','353','sdh',245,'irn1700'),('lorry','98989','logan',9088889,'irn1708'),('fgrdh','356','sdh',245,'irn1712'),('lorry','345','ertg',435,'irn1717'),('lorry','Tn 7888','dfg',5645,'irn1721'),('dfg','4356','fgvs',456356,'irn1730'),('lorry','tn 8989','murugan',9099898,'irn1760'),('lorry','TN 8989','logan',909090909,'irn1774'),('lorry','TN 8989','logan',909090909,'irn1775'),('lorry','TN 7878','murugan',909090909,'irn1777'),('dfgdfg','345','dsfag',3456,'irn1789'),('dswefdswf','sdaf','sdaf',2,'irn1833'),('ewrft','435','dfg',67,'irn1847'),('lorry','tn 6777','logan',90909999,'irn1850'),('lorry','tn 56454','logu',657647,'irn1854'),('tyu','657','gfj',56,'irn1860'),('lorry','tn 5454','mukund',9098888,'irn1869'),('lorrry','tn 4567647','mukund',756767,'irn1871'),('lorrry','tn 4567647','mukund',756767,'irn1871'),('lorry','5467','ghj',58,'irn1873'),('lorry','5467','ghj',58,'irn1873'),('yujk','4657','tguj',567,'irn1890'),('yujk','4657','tguj',567,'irn1892'),('lorry','tn 65464','logu',907897898,'irn1894'),('lorry','tn 5454','hfgh',568755,'irn1920'),('lorry','tn 7878','murugan',99878787,'irn2009'),('lorry','tn 7878','murugan',99878787,'irn2012'),('lorry','tn 7677','logu',89898,'irn2026'),('lorry','tn 5656','logu',9090909,'irn2034'),('lorry','tn 5656','logu',9090909,'irn2037'),('lorry','tn 4545','yjuk',78,'irn2040'),('lorry','tn 6565','hgdfg',768,'irn2047'),('lorry','tn 5656','murugan',657,'irn2049'),('lorry','tn 5656','murugan',657,'irn2052'),('lorry','tn 56757','murugan',98989,'irn2054'),('lorry','tn 56757','murugan',98989,'irn2056'),('lorry','tn 56757','murugan',98989,'irn2057'),('lorry','tn 5555','logu',546456456,'irn2077'),('lorry','tn 5555','logu',546456456,'irn2077'),('lorry','tn 5555','logu',546456456,'irn2077'),('lorry','tn 5454','logu',898989898,'irn2090'),('lorry','tn 89898','logu',9088988,'irn2126'),('lorry','tn 89898','logu',9088988,'irn2129');
/*!40000 ALTER TABLE `od_logistics_finishedgoods_vehicle_mapping` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-21 11:51:38
