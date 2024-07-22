CREATE TABLE `book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ISBN` varchar(45) DEFAULT NULL,
  `bookname` varchar(100) DEFAULT NULL,
  `bookimgurl` varchar(100) DEFAULT NULL,
  `bookdonator` varchar(45) DEFAULT NULL,
  `author` varchar(45) DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  `avilable` varchar(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ISBN은 같고 다른 내용이 달라도 재고권수로는 하나로 검색되는 것 보이려고 ISBN만 맞춰 놓았습니다
insert into book(ISBN, bookname, bookdonator, author, date) values('9791198809964', '나비', '한만서', '고양이', '2024-01-01');

insert into book(ISBN, bookname, bookdonator, author, date) values('9791198809964', '고양이', '김김김', '나비', '2024-06-05');

insert into book(ISBN, bookname, bookdonator, author, date) values('9791198809964', '백수는 무엇으로 사는가', '사자', '백수의왕', '2024-07-07');
