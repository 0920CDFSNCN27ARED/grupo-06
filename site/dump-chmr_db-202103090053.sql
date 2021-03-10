-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: chmr_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.17-MariaDB

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Memorias'),(2,'Procesadores'),(3,'Discos'),(4,'Motherboards'),(6,'Placas de Video'),(7,'Gabinetes'),(8,'Fuentes');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `group` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='				';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `price` float NOT NULL,
  `img` varchar(200) NOT NULL,
  `category_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_products_catergorys_idx` (`category_id`),
  CONSTRAINT `fk_products_catergories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COMMENT='				';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (9,'Temp','Sed sagittis.',5432,'',1),(10,'Home Ing','Morbi non lectus.',8024,'',1),(15,'Viva','Morbi non quam nec dui luctus rutrum.',7658,'',1),(17,'Zamit','Integer ac neque.',4046,'',1),(22,'Holdlamis','In sagittis dui vel nisl. Duis ac nibh.',9734,'',1),(24,'Keylex','Duis bibendum.',8336,'',1),(27,'Fixflex','Pellentesque eget nunc.',3235,'',1),(34,'Wrapsafe','Integer tincidunt ante vel ipsum.',5068,'',1),(45,'Keylex','Cras pellentesque volutpat dui.',7970,'',1),(46,'Keylex','Nulla tempus.',5653,'',1),(47,'Duobam','Nulla mollis molestie lorem.',9792,'',1),(49,'i9','Intel i9',500000,'',2),(50,'i9 PRO','Intel i9 PRO',100000,'',2),(51,'i9 Pro Max','i9 Pro Max',2000,'..\\public\\images\\products\\img-1615054086472.j',2),(52,'i9 Pro Max2','i9 Pro Max2',2000,'',2);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(300) NOT NULL,
  `group_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_groups_idx` (`group_id`),
  CONSTRAINT `fk_users_groups` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'thowgill0@gmpg.org','Ll2ih5vYb',NULL),(2,'ydoget1@oaic.gov.au','vSmY46KCG3',NULL),(3,'jshaefer2@bbc.co.uk','aX84hNFIrwDX',NULL),(4,'ngwinn3@sphinn.com','xiuU5Rtx',NULL),(5,'igonsalvo4@unc.edu','9vgz8Q',NULL),(6,'hmeaton5@google.es','cLOKj1j',NULL),(7,'sdenning6@parallels.com','HNmDnp6',NULL),(8,'bdowe7@bing.com','jNhQP4Up',NULL),(9,'ystandage8@tiny.cc','WJkxaN3VP6c',NULL),(10,'acarlino9@engadget.com','f2wnXw',NULL),(11,'mjilkesa@nymag.com','huHncOwW',NULL),(12,'bbrownbridgeb@hud.gov','5ZToW49AZd',NULL),(13,'cculchethc@bloglines.com','LLmEq6s6',NULL),(14,'keffordd@networksolutions.com','a06dMsaU4p',NULL),(15,'egilfoye@house.gov','Jw927UHWnDcs',NULL),(16,'sdeethf@g.co','PV1NAFsvwdN',NULL),(17,'lswinnardg@globo.com','qpNweVW8iF',NULL),(18,'preefh@cloudflare.com','Dlgbj6Qr6L',NULL),(19,'hrenneyi@timesonline.co.uk','VNrne6L7tm',NULL),(20,'hfranktonj@digg.com','z37AkSK8MC6k',NULL),(21,'lvenmorek@over-blog.com','n5erZZLOR',NULL),(22,'rgonetl@mayoclinic.com','AmO2pgQ',NULL),(23,'crewcastlem@illinois.edu','bTbifzP',NULL),(24,'cbebbingtonn@vistaprint.com','HLPvnJvR',NULL),(25,'pmoffato@cbc.ca','XOPQvHI',NULL),(26,'dmagowanp@bizjournals.com','plmZ07ur8',NULL),(27,'abarrowcliffeq@seattletimes.com','Dl4sldeq',NULL),(28,'gmyfordr@dailymail.co.uk','UopHGUFA',NULL),(29,'rvarnalss@goodreads.com','dBH2YcEzzq',NULL),(30,'lmilburnet@jugem.jp','nEtNTFgK0Gmo',NULL),(31,'cdavioudu@eventbrite.com','pU2shR',NULL),(32,'rgrishechkinv@si.edu','tjNxSUipt',NULL),(33,'kmidghallw@yelp.com','kbpBdmf49ncz',NULL),(34,'lbullentx@shareasale.com','95wnfnIF3',NULL),(35,'mconneauy@guardian.co.uk','ocHYES',NULL),(36,'kpellingtonz@slideshare.net','rTmGV2',NULL),(37,'rterrill10@google.pl','hZtBf2p5S3M',NULL),(38,'tmackaig11@google.co.uk','FncSO59j4',NULL),(39,'phugonin12@amazon.de','k2ul8fe6',NULL),(40,'mheenan13@uol.com.br','bhfN8FH',NULL),(41,'dwestpfel14@rambler.ru','5thPhpI',NULL),(42,'kscadden15@wufoo.com','JuG4zMxYwxo',NULL),(43,'dstores16@naver.com','hbeqR7fFb',NULL),(44,'fcraster17@paypal.com','nRdNle',NULL),(45,'ctipens18@answers.com','8C0uao75sc',NULL),(46,'kpieper19@vimeo.com','zspDi0oZ0eP',NULL),(47,'lhebson1a@msu.edu','9q7425',NULL),(48,'jmcsperron1b@cdc.gov','h40Lq5tmjmN',NULL),(49,'bdevin1c@squidoo.com','o2p1es',NULL),(50,'abarnewall1d@free.fr','BjPOuypWwHuC',NULL),(51,'jiguastello@hotmail.com','$2b$10$wz3yeASJyZ2GMs8woXsXu.7H6eoFgWLHcwpVK./Q39URHunDfOtAW',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_products_edited`
--

DROP TABLE IF EXISTS `users_products_edited`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_products_edited` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `products_id` int(11) DEFAULT NULL,
  `users_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_products_id` FOREIGN KEY (`id`) REFERENCES `products` (`id`),
  CONSTRAINT `fk_users_id` FOREIGN KEY (`id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_products_edited`
--

LOCK TABLES `users_products_edited` WRITE;
/*!40000 ALTER TABLE `users_products_edited` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_products_edited` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'chmr_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-09  0:53:04
