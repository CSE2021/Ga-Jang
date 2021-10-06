CREATE DATABASE IF NOT EXISTS cuk;
USE cuk;

-- Delete Current Table
DROP TABLE IF EXISTS cuk.participate;
DROP TABLE IF EXISTS cuk.chatroom;
DROP TABLE IF EXISTS cuk.board;
DROP TABLE IF EXISTS cuk.accounts;

-- Create Accounts Table
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
    wdate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    kind int NOT NULL,
    title VARCHAR(36) NOT NULL,
    people int NOT NULL,
    expiration DATE DEFAULT NULL,
    price int NOT NULL,
    content text,
    imgUrl VARCHAR(30) NOT NULL DEFAULT '',
    PRIMARY KEY (no),
    FOREIGN KEY (own) REFERENCES accounts(id) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

-- Create Chatroom Table
CREATE TABLE IF NOT EXISTS cuk.chatroom (
    bno int unsigned NOT NULL,
    rno int unsigned NOT NULL AUTO_INCREMENT,
    own VARCHAR(36) NOT NULL,
    cdate DATETIME NOT NULL, DEFAULT CURRENT_TIMESTAMP,
    content text,
    PRIMARY KEY (rno),
    FOREIGN KEY (bno) REFERENCES board(no) ON DELETE CASCADE,
    FOREIGN KEY (own) REFERENCES accounts(id) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

-- Create participate Table
-- Help management who(writer) : where(chatting room)
CREATE TABLE IF NOT EXISTS cuk.participate (
    pno int unsigned NOT NULL AUTO_INCREMENT,
    own VARCHAR(36) NOT NULL,
    rno int unsigned NOT NULL,
    PRIMARY KEY (pno),
    FOREIGN KEY (own) REFERENCES accounts(id) ON DELETE CASCADE,
    FOREIGN KEY (rno) REFERENCES chatroom(rno) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;