# 집단지성 RESTFul-API

![Generic badge](https://img.shields.io/badge/Node.js-14.7.5-green.svg) ![Generic badge](https://img.shields.io/badge/NPM-6.14.14-red.svg)

Catholic University CSE - Team Project

## Install & Execution

```bash
node index.js
```

or

```bash
npm start
```

을 입력하여 로컬에서 작동시킬 수 있습니다.



따로 Server에서 작동시키기 위해서는 Docker 이미지를 빌드할 수 있습니다.

```bash
docker build --network=host . -t <사용자이름>/<이미지별명>
```

로 이미지를 빌드한후

```bash
docker run -p <로컬포트>:<내부포트> -d <위에서 설정한 태그명>
```

로 컨테이너를 실행하여 작동시킬 수 있습니다.

## How To Use..

| 종류 | 매핑 | 설명               |
| ---- | ---- | ------------------ |
| Get  | /    | Test용 데이터 출력 |