USE `planner`;


-- --------------------------------------------------------

--
-- Table structure for table `calendar`
--

CREATE TABLE IF NOT EXISTS `calendar` (
`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `start` varchar(48) NOT NULL,
  `end` varchar(48) NOT NULL,
  `allDay` tinyint(1) NOT NULL DEFAULT '0'
);