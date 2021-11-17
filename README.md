# 집단지성 RESTFul-API

![Generic badge](https://img.shields.io/badge/Node.js-14.7.5-green.svg) ![Generic badge](https://img.shields.io/badge/NPM-6.14.14-red.svg)![Generic badge](https://img.shields.io/badge/MariaDB-10.3.29-blue.svg) 

Catholic University CSE - Team Project

## !!UPDATE!!

##### 2021/10/28

+ CORS Policy 때문에 프론트 웹 브라우저에서 API 리소스에 접근하지 못하는 경우가 발생하여, CORS 모듈을 설치하고 접근 권한을 허용해줌으로 해결했음.
+ 프론트에서의 API 도큐멘테이션을 깔끔하게 하기 위해서 Swagger를 이용하여 정리하는중(~ing)
+ 문제점: Swagger를 js에 같이 작성하게 되면, 사용설명서로는 잘 나올지 모르나, 실제 코드가 엄청 길어져서 가독성이 떨어짐.

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