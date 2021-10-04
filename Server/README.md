# 집단지성 RESTFul-API

![Generic badge](https://img.shields.io/badge/Node.js-14.7.5-green.svg) ![Generic badge](https://img.shields.io/badge/NPM-6.14.14-red.svg)![Generic badge](https://img.shields.io/badge/MariaDB-10.3.29-blue.svg)

Catholic University CSE - Team Project

## !!UPDATE!!

##### 2021/10/04

+ sql 파일 좀 더 보강(foreign key에 제약조건 설정(update, delete))
+ board 테이블 api 제작, users 테이블 업데이트 가능
+ (~ing) 유저정보 암호화, api 사용 토큰 발급 공부(jwt?)

## Install & Execution

```bash
$ node index.js
```

or

```bash
$ npm start
```

을 입력하여 로컬에서 작동시킬 수 있습니다.



따로 Server에서 작동시키기 위해서는 Docker 이미지를 빌드할 수 있습니다.

```bash
$ docker build --network=host . -t <사용자이름>/<이미지별명>
```

로 이미지를 빌드한후

```bash
$ docker run -p <로컬포트>:<내부포트> -d <위에서 설정한 태그명>
```

로 컨테이너를 실행하여 작동시킬 수 있습니다.



## Database 설계

![캡처](https://github.com/CSE2021/Ga-Jang/blob/server/Server/database/ERD.png)



## How To Use..

: accounts 테이블

| 종류   | 매핑               | 설명                                                      |
| ------ | ------------------ | --------------------------------------------------------- |
| Get    | /users/            | Test용 데이터 출력                                        |
| Get    | /users/list        | accounts 테이블 내의 모든 정보 가져오기                   |
| Get    | /users/list/:id    | accounts 테이블 내에서 id값에 해당하는 유저 정보 가져오기 |
| Post   | /users/add         | accounts 테이블에 회원정보 추가                           |
| Post   | /users/edit-name   | accounts 테이블에서 닉네임 변경                           |
| Post   | /users/edit-loc    | accounts 테이블에서 지역 변경                             |
| Post   | /users/edit-lating | accounts 테이블에서 매너지수 변경                         |
| Delete | /users/del/:id     | accounts 테이블 내에서 id값에 해당하는 유저 정보 삭제     |

```json
// Post -> /users/add
{
	"id" : string,
	"loc" : string,
	"name" : string,
	"lating" : int,
}
```

```json
// Post -> /users/edit-name
{
    "id" : string,
    "name" : string
}
```

```json
//Post -> /users/edit-loc
{
    "id" : string,
    "loc" : string
}
```

```json
//Post -> /users/edit-lating
{
    "id" : string,
    "lating" : string
}
```



: board 테이블

| 종류   | 매핑              | 설명                                                   |
| ------ | ----------------- | ------------------------------------------------------ |
| Get    | /board/           | Test용 데이터 출력                                     |
| Get    | /board/list       | board 테이블 내의 모든 정보 가져오기                   |
| Get    | /board/kind/:type | board 테이블 내에서 kind 값에 해당하는 게시글 가져오기 |
| Get    | /board/:no        | board 테이블 내에서 no에 해당하는 게시글 정보 보기     |
| Post   | /board/add        | board 테이블 내에 정보 삽입(게시글 작성)               |
| Post   | /board/edit       | board 테이블 내에 게시글 정보 수정                     |
| Delete | /board/del/:no    | board 테이블 내에서 no값에 해당하는 유저 정보 삭제     |

```json
//Post /board/add
{
    "own" : string,
    "kind" : int,
    "title" : string,
    "people" : int,
    "expiration" : date(ex 1999-09-31),
    "price" : int,
    "content" : string,
    "imgUrl" : string
}
```

```json
//Post /board/edit
{
    "own" : string,
    "no" : int,
    "kind" : int,
    "title" : string,
    "people" : int,
    "expiration" : date(ex 1999-09-31),
    "price" : int,
    "content" : string,
    "imgUrl" : string
}
```

