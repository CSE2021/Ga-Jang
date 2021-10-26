CREATE DATABASE IF NOT EXISTS gajang;
USE gajang;

-- Delete Current Table
DROP TABLE IF EXISTS gajang.participate;
DROP TABLE IF EXISTS gajang.chat;
DROP TABLE IF EXISTS gajang.chatlist;
DROP TABLE IF EXISTS gajang.imgurl;
DROP TABLE IF EXISTS gajang.customerinfo;
DROP TABLE IF EXISTS gajang.content;
DROP TABLE IF EXISTS gajang.board;
DROP TABLE IF EXISTS gajang.accounts;

-- Create Accounts Table
CREATE TABLE IF NOT EXISTS gajang.accounts (
    id VARCHAR(36) NOT NULL,
    loc VARCHAR(36) NOT NULL,
    name VARCHAR(16) NOT NULL,
    rating int(10) NOT NULL,
    PRIMARY KEY(id)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

-- Create Board Tabel
CREATE TABLE IF NOT EXISTS gajang.board (
    bid int unsigned NOT NULL AUTO_INCREMENT,
    wid VARCHAR(36) NOT NULL,
    title VARCHAR(36) NOT NULL,
    wdate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    edate DATETIME NOT NULL,
    kind int(5) unsigned NOT NULL,
    price int unsigned NOT NULL,
    thumbnail VARCHAR(36) DEFAULT '',
    tstate int(5) unsigned NOT NULL DEFAULT 0,
    process VARCHAR(16) DEFAULT 'reservation',
    PRIMARY KEY (bid),
    FOREIGN KEY (wid) REFERENCES accounts(id) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

-- Create Content Table
CREATE TABLE IF NOT EXISTS gajang.content (
    bid int unsigned NOT NULL,
    fresh VARCHAR(10) NOT NULL,
    view int unsigned NOT NULL DEFAULT 0,
    deadline DATE,
    content text,
    unit VARCHAR(10) NOT NULL DEFAULT '',
    remain int unsigned NOT NULL CHECK (remain > 0),
    minsize int unsigned NOT NULL CHECK (minsize > 0),
    FOREIGN KEY (bid) REFERENCES board(bid) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

-- Create Customer Info Table
CREATE TABLE IF NOT EXISTS gajang.customerinfo (
    bid int unsigned NOT NULL,
    cid VARCHAR(36) NOT NULL,
    amount int unsigned NOT NULL CHECK (amount > 0),
    dTime DATETIME NOT NULL,
    deposit int(5) unsigned NOT NULL DEFAULT 0,
    FOREIGN KEY (bid) REFERENCES board(bid) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (cid) REFERENCES accounts(id) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

-- Create img url table
CREATE TABLE IF NOT EXISTS gajang.imgurl (
    bid int unsigned NOT NULL,
    imgurl VARCHAR(36) NOT NULL,
    FOREIGN KEY (bid) REFERENCES board(bid) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS gajang.comment (

)

CREATE EVENT
    IF NOt EXISTS 'deleteExpirationData'
ON SCHEDULE
    EVERY 1 DAY
ON COMPLETION NOT PRESERVE
    ENABLE
COMMENT '공구 기간 만료 데이터 삭제'
    DO
    'DELETE FROM board WHERE edate = CURDATE();'
    END