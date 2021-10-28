# 집단지성 RESTFul-API

![Generic badge](https://img.shields.io/badge/Node.js-14.7.5-green.svg) ![Generic badge](https://img.shields.io/badge/NPM-6.14.14-red.svg)![Generic badge](https://img.shields.io/badge/MariaDB-10.3.29-blue.svg) 

Catholic University CSE - Team Project

## !!UPDATE!!

##### 2021/10/28

+ 웹 채팅 삭제 -> 특별한 소통이 필요없고, 요즘은 추가적인 SNS 이미 발달되어있음. 웹에서의 채팅은 무의미 하다고 여겨서 덧글, 또는 다른 방식으로 서비스를 제공할 필요가 있어보임. 오히려 채팅 없이 사용자가 필요한 모든 정보를 제공함으로 사용자의 편리성을 증가시킬 수 있도록 설계
+ 데이터베이스의 테이블의 세부 컬럼 변경 및 테이블 삭제 및 추가(알림 관리용 테이블이 추가).
+ API 내부의 SQL 문 수정(컬럼이 변경되었기 때문,,)
+ 데이터베이스 내부적으로 이벤트 스케줄러를 사용하여 필요없는 데이터는 주기적으로 삭제
+ ERD 수정,,,

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

![캡처](https://github.com/CSE2021/server/blob/main/Server/database/ERD.png)



## How To Use..

: accounts 테이블

| 종류   | 매핑               | 설명                                                      |
| ------ | ------------------ | --------------------------------------------------------- |
| Get    | /users/            | Test용 데이터 출력                                        |
| Get    | /users/list        | accounts 테이블 내에서 위에서 5개의 정보만 가져옴         |
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

| 종류 | 매핑              | 설명                                                         |
| ---- | ----------------- | ------------------------------------------------------------ |
| Get  | /board/           | Test용 데이터 출력                                           |
| Get  | /board/list/:page | board 테이블 내의 페이지별로 정보 가져오기(1페이지당 10개의 정보) |
| Get  | /board/kind       | board 테이블 내에서 kind 값에 해당하는 게시글 페이지 별로 가져오기 |

```json
//Post /board/kind
{
    "kind", int,
    "page", int
}
```



: content 테이블

| 종류   | 매핑          | 설명                           |
| ------ | ------------- | ------------------------------ |
| Get    | /content/:bid | bid에 해당하는 게시글 가져오기 |
| Get    | /content/add  | 게시글 작성 시 내용 삽입       |
| Post   | /content/edit | 게시글 수정                    |
| Delete | /board/:bid   | bid에 해당하는 게시글 삭제     |

```json
//Post /content/add
{
    "wid" : "1",
    "title" : "키보드",
    "kind" : 1,
    "price" : 2000,
    "thumbnail" : "",
    "fresh" : "s",
    "deadline" : "2021-10-30",
    "content" : "사랑해요 연애가중계",
    "unit" : "개",
    "remain" : 3,
    "minsize" : 1
}
```

```json
{
	"bid" : "1",
    "wid" : "1",
    "title" : "키보드",
    "kind" : 1,
    "price" : 2000,
    "thumbnail" : "",
    "fresh" : "s",
    "deadline" : "2021-10-30",
    "content" : "사랑해요 연애가중계",
    "unit" : "개",
    "remain" : 3,
    "minsize" : 1
}
```

