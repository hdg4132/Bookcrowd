CREATE TABLE `rent` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `bookname` varchar(45) DEFAULT NULL,
  `ISBN` varchar(45) DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  `approval` int DEFAULT '1',
  `cause` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 해당 구문은 승인상태 초기화용 구문
update rent set approval = 1;


