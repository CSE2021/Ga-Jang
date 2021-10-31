CREATE DATABASE IF NOT EXISTS gajang;
USE gajang;

-- Delete Current Table
DROP TABLE IF EXISTS gajang.notice;
DROP TABLE IF EXISTS gajang.imgurl;
DROP TABLE IF EXISTS gajang.customerinfo;
DROP TABLE IF EXISTS gajang.content;
DROP TABLE IF EXISTS gajang.board;
DROP TABLE IF EXISTS gajang.accounts;

-- Create Accounts Table
CREATE TABLE IF NOT EXISTS gajang.accounts (
    id VARCHAR(36) NOT NULL,
    email VARCHAR(64) NOT NULL,
    loc VARCHAR(36) NOT NULL,
    name VARCHAR(16) NOT NULL,
    rating int(10) NOT NULL,
    accountNo VARCHAR(36) NOT NULL,
    PRIMARY KEY(id)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

-- Create Board Tabel
CREATE TABLE IF NOT EXISTS gajang.board (
    bid int unsigned NOT NULL AUTO_INCREMENT,
    wid VARCHAR(36) NOT NULL,
    thumbnail VARCHAR(255) DEFAULT '',
    title VARCHAR(36) NOT NULL,
    wdate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    process smallint NOT NULL DEFAULT 0,
    recruit DATE NOT NULL,
    recruite DATE NOT NULL,
    ship DATE NOT NULL,
    shipe DATE NOT NULL,
    share DATE NOT NULL,
    sharee DATE NOT NULL,
    place VARCHAR(36) NOT NULL,
    sharetime TIME NOT NULL DEFAULT '000000',
    mPrice int unsigned NOT NULL CHECK (mprice > 0),
    remain int unsigned NOT NULL CHECK (remain > 0),
    siteurl VARCHAR(255) DEFAUlT '',
    view int unsigned NOT NULL DEFAULT 0,
    goal int NOT NULL CHECK(goal > 0),
    collect int NOT NULL DEFAULT 0,
    content text,
    cnt int unsigned NOT NULL DEFAULT 0,
    PRIMARY KEY (bid),
    FOREIGN KEY (wid) REFERENCES accounts(id) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

-- Create Customer Info Table
CREATE TABLE IF NOT EXISTS gajang.customerinfo (
    bid int unsigned NOT NULL,
    cid VARCHAR(36) NOT NULL,
    quantity int NOT NULL,
    oprice int unsigned NOT NULL CHECK (oprice > 0),
    dTime DATETIME NOT NULL,
    dstate int unsigned NOT NULL DEFAULT 0,
    getitem int unsigned NOT NULL DEFAULT 0,
    PRIMARY KEY (bid, cid),
    FOREIGN KEY (bid) REFERENCES board(bid) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (cid) REFERENCES accounts(id) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

-- Create img url table
CREATE TABLE IF NOT EXISTS gajang.imgurl (
    bid int unsigned NOT NULL,
    imgurl VARCHAR(36) NOT NULL,
    FOREIGN KEY (bid) REFERENCES board(bid) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS gajang.notice (
    id VARCHAR(36) NOT NULL,
    bid int unsigned NOT NULL,
    wdate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    content VARCHAR(255) NOT NULL DEFAULT 'error',
    href VARCHAR(255),
    readch int unsigned NOT NULL DEFAULT 0,
    FOREIGN KEY (bid) REFERENCES board(bid) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id) REFERENCES accounts(id) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;

/*
-- Database OPT Event
CREATE EVENT IF NOT EXISTS postStatusChange
    ON SCHEDULE
        EVERY 1 DAY
        STARTS CURRENT_TIMESTAMP
    ON COMPLETION PRESERVE
    ENABLE
    COMMENT '모집 기간 만료 데이터 상태 변경'
    DO
    UPDATE board SET process=1 WHERE edate=CURDATE();

CREATE EVENT IF NOT EXISTS noticeDelete
    ON SCHEDULE
        EVERY 1 DAY
        STARTS CURRENT_TIMESTAMP
    ON COMPLETION PRESERVE
    ENABLE
    COMMENT '7일이 지난 알림은 삭제됩니다.'
    DO
    DELETE FROM notice where wdate <= date_sub(CURDATE(), INTERVAL 7 DAY)
*/