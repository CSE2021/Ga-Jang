# 집단지성 RESTFul-API

![Generic badge](https://img.shields.io/badge/Node.js-14.7.5-green.svg) ![Generic badge](https://img.shields.io/badge/NPM-6.14.14-red.svg)![Generic badge](https://img.shields.io/badge/MariaDB-10.3.29-blue.svg) 

Catholic University CSE - Team Project

## !!UPDATE!!

##### 2021/11/19

+ 라우터를 컨트롤 할 모듈을 따로 만들어서 mapping 폴더안에 집어넣음. 여기서 모든 리퀘스트에 대한 라우팅을 지정함
+ 원래 db에 접근하는 것들 끼리 집단으로 묶어서 코드를 작성하였다면, 라우팅을 세분화하면서 각각의 펑션에 대해서 다 따로 모듈을 작성하였음.
+ 이미지를 넘겨받는 형태(form-data) 형식을 swagger에서도 테스트 할 수 있도록 코드를 수정하였음

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



## 프로젝트 소개

We Uploaded a Video that Introduce our project!! Follow that Link and Watch Our Video!!!

[![집단지성팀 - GaJang](http://img.youtube.com/vi/gkDq_8E4apw/0.jpg)](https://youtu.be/gkDq_8E4apw)



## Database 설계

![캡처](https://github.com/CSE2021/server/blob/main/database/ERD.png)



## How To Use..

Swagger를 사용하였습니다.

/api-docs 페이지에서 원하는 데이터에 따라 필요한 파라미터값과 url요청, 반환값의 기본적인 형태를 확인할 수 있습니다. 

<Sample>

![캡처](https://github.com/CSE2021/server/blob/main/swagger/example.png)