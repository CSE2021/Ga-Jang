# 집단지성 RESTFul-API

![Generic badge](https://img.shields.io/badge/Node.js-14.7.5-green.svg) ![Generic badge](https://img.shields.io/badge/NPM-6.14.14-red.svg)![Generic badge](https://img.shields.io/badge/MariaDB-10.3.29-blue.svg)

Catholic University CSE - Team Project

## !!UPDATE!!

##### 2021/09/24

+ index.js 에서 특정요청에 따라 라우팅 되도록 하였습니다.
+ db 관련 설정들을 database 폴더안으로 넣었습니다.
+ mysql 모듈을 설치하고, 효율적으로 db에 접근할 수 있도록 커넥션 풀을 만들었습니다.
+ 개인 서버에서 mariadb를 편리하게 지원하고 있어서 rdb로 MariaDB를 사용하였습니다.
+ (~ing) 회원정보 암호화, 데이터 베이스 설계, 회원가입 & 로그인 기본 API 제작

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

![캡처](/database/ERD.png)



## How To Use..

| 종류   | 매핑            | 설명                                                      |
| ------ | --------------- | --------------------------------------------------------- |
| Get    | /               | Test용 데이터 출력                                        |
| Get    | /users/list     | accounts 테이블 내의 모든 정보 가져오기                   |
| Get    | /users/list/:id | accounts 테이블 내에서 id값에 해당하는 유저 정보 가져오기 |
| Post   | /users/add      | accounts 테이블에 회원정보 추가                           |
| Delete | /users/del/:id  | accounts 테이블 내에서 id값에 해당하는 유저 정보 삭제     |

#### <POST : User 정보 추가>

다음과 같은 형태로 json을 전달(id : 고유키, loc : 위치정보, name : 닉네임, lating : 매너지수)

```json
{
	"id" : string,
	"loc" : string,
	"name" : string,
	"lating" : int,
}
```

