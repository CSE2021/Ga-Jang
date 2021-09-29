CREATE DATABASE IF NOT EXISTS cuk;
USE cuk;

-- Create Accounts Table
DROP TABLE IF EXISTS cuk.accounts;

CREATE TABLE IF NOT EXISTS cuk.accounts (
    id VARCHAR(36) NOT NULL,
    loc VARCHAR(36) NOT NULL,
    name VARCHAR(16) NOT NULL,
    lating int(10) NOT NULL,
    PRIMARY KEY(id)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

-- Create Board Tabel
CREATE TABLE IF NOT EXISTS cuk.board (
    own VARCHAR(36) NOT NULL,
    no int unsigned NOT NULL AUTO_INCREMENT,
    wdate date NOT NULL,
    kind int NOT NULL,
    title VARCHAR(36) NOT NULL,
    people int NOT NULL,
    expiration DATE,
    price int NOT NULL,
    content text,
    imgUrl VARCHAR(30) DEFAULT '',
    PRIMARY KEY (no),
    FOREIGN KEY (own) REFERENCES accounts(id)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

-- Create Chatroom Table
CREATE TABLE IF NOT EXISTS cuk.chatroom (
    bno int unsigned NOT NULL,
    rno int unsigned NOT NULL AUTO_INCREMENT,
    own VARCHAR(36) NOT NULL,
    cdate date NOT NULL,
    content text,
    PRIMARY KEY (rno),
    FOREIGN KEY (bno) REFERENCES board(no),
    FOREIGN KEY (own) REFERENCES accounts(id)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

-- Create participate Table
-- Help management who(writer) : where(chatting room)
CREATE TABLE IF NOT EXISTS cuk.participate (
    pno int unsigned NOT NULL AUTO_INCREMENT,
    own VARCHAR(36) NOT NULL,
    rno int unsigned NOT NULL,
    PRIMARY KEY (pno),
    FOREIGN KEY (own) REFERENCES accounts(id),
    FOREIGN KEY (rno) REFERENCES chatroom(rno)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;