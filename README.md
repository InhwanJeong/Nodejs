# Nodejs
Nodejs practice <br>
[nodejs 튜토리얼](https://velopert.com/node-js-tutorials)

## 관련 기술
- 언어
  - JavaScript
  - ES6(ECMAScript6)
  - TypeScript
- 패키지 관리자
  - npm(Node Package Manager)
  - yarn
- 프레임워크
  - Express
  - koa
  - Hapi
- 템플릿 엔진
  - EJS
  - Jade 엔진
- 기타
  - ReactJS
  - AngularJS

# 목차
- [1. 기초 간단정리](#기초-간단-정리)
  - [Non Blocking Code](#callback-function)
  - [Event Driven](#event-driven)
- [2. Express 프레임워크 사용해보기](#express-프레임워크)
  - [EJS 템플릿 엔진](#ejs)
  - [RESTful API](#restful-api)

---

## 기초 간단 정리
- hello.js 파일 생성
```
console.log("Hello, World!");
```
- 파일 실행
```
node hello.js
```

#### callback function
- 함수를 매개변수로서 전달받은 함수에서 실행되게 되는 함수
- Non-Blocking code

```javascript
btn.click(function(){
  alert("btn clicked!")
});
```

###### Blocking Code
- 동기화 코드, 작업을 기다리고 다음 작업 실행

```javascript
var fs = require("fs");

var data = fs.readFileSync('input.txt');

console.log(data.toString());
console.log("Program has ended");
```

###### Non-Blocking Code
- 비동기화 코드, 작업을 실행하면서 동시에 바로 다음 작업 실행
- 다수의 요청에 더 빠른 작업속도를 보여줌

```javascript
var fs = require("fs");

fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log("Program has ended");
```

#### Event Driven
- 다른 기술들 보다 빠른 속도를 가진다.
- Nodejs 서버는 변수들을 초기화하고 함수를 선언한 후 이벤트가 발생하는 것을 기다린다.
- EventLoop -> 이벤트 감지시 callback 함수(EventHandler) 호출
- 옵저버 패턴으로 동작

- 사용법
  - events 모듈 사용
  - EventEmitter 객체 생성
  - EventHandler 함수 생성
  - 이벤트와 핸들러 연동(on)
  - 이벤트 발생(emit)

```javascript
// events 모듈 사용
var events = require('events');

// EventEmitter 객체 생성
var eventEmitter = new events.EventEmitter();

// EventHandler 함수 생성
var connectHandler = function connected(){
    console.log("Connection Successful");

    // data_recevied 이벤트를 발생시키기
    eventEmitter.emit("data_received");
}

// connection 이벤트와 connectHandler 이벤트 핸들러를 연동
eventEmitter.on('connection', connectHandler);

// data_received 이벤트와 익명 함수와 연동
// 함수를 변수안에 담는 대신에, .on() 메소드의 인자로 직접 함수를 전달
eventEmitter.on('data_received', function(){
    console.log("Data Received");
});

// connection 이벤트 발생시키기
eventEmitter.emit('connection');

console.log("Program has ended");

```


<br>
<br>

## Express 프레임워크
- 디렉토리 구조
```
express_tutorial/
├── package.json
├── public
│   └── css
│       └── style.css
├── router
│   └── main.js
├── server.js
└── views
 ├── about.html
 └── index.html
```

- 의존 패키지 설치
```
$ npm install //package-lock.json 자동 생성
```

#### 서버 생성
- server.js 파일 생성

```javascript
var express = require('express');
var app = express();
var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
})
```

#### 라우터 정의
- router/main.js 파일 생성
- request에 따라 작업 처리

```javascript
// module.exports는 server.js에서 가져가 사용할 수 있도록 해준다.
module.exports = function(app)
{
     app.get('/',function(req,res){
        res.render('index.html')
     });
     app.get('/about',function(req,res){
        res.render('about.html');
    });
}
```

#### HTML 페이지 저장
- views 디렉토리 생성
- index.html
```JavaScript
<html>
  <head>
    <title>Main</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
  </head>
  <body>
    Hey, this is index page
  </body>
</html>
```
- about.html
```JavaScript
<html>
  <head>
    <title>About</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
  </head>
  <body>
    About... what?
  </body>
</html>
```

#### 정적 파일 다루기
- js 파일 또는 css, image 파일 등
- public 디렉토리를 만든다
- css/style.css

```css
body{
	background-color: black;
	color: white;
}
```

#### 템플릿 적용 서버 수정
```JavaScript
var express = require('express');
var app = express();
var router = require('./router/main')(app);

// views 파일 세팅
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});

// 정적 파일 사용
app.use(express.static('public'));
```

<br>
<br>

## EJS
- 디렉토리 구조
```
ejs_tutorial/
├── data
│   └── user.json
├── node_modules
├── package.json
├── public
│   └── css
│       └── style.css
├── router
│   └── main.js
├── server.js
└── views
    ├── body.ejs
    ├── header.ejs
    └── index.ejs
```

#### 패키지 설치
- package.json 업데이트
- npm install
```
{
  "name": "express-tutorial",
  "version": "1.0.0",
  "dependencies":
  {
    "express": "~4.13.1",
    "ejs": "~2.4.1"    ,
    "body-parser": "~1.14.2",
    "express-session": "~1.13.0"
  }
}
```


#### sever.js

```JavaScript
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs")

// Express의 이전 버전에서는 cookie-parser 모듈도 불러와야했지만,
// 이젠 express-session 모듈이 직접 쿠키에 접근하므로
// cookie-parser 를 더이상 사용 할 필요가 없습니다.

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


var server = app.listen(3000, function(){
 console.log("Express server has started on port 3000")
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
 secret: '@#@$MYSIGN#@$#$',
 resave: false,
 saveUninitialized: true
}));


var router = require('./router/main')(app, fs);
```

#### session
- secret – 쿠키를 임의로 변조하는것을 방지하기 위한 sign 값 입니다. 원하는 값을 넣으면 됩니다.
- resave – 세션을 언제나 저장할 지 (변경되지 않아도) 정하는 값입니다. express-session documentation에서는 이 값을 false 로 하는것을 권장하고 필요에 따라 true로 설정합니다.
- saveUninitialized – uninitialized 세션이란 새로 생겼지만 변경되지 않은 세션을 의미합니다. Documentation에서 이 값을 true로 설정하는것을 권장합니다.


#### EJS 파일 분할하기
- 파일 불러오기: <% include FILENAME %>
- index.ejs
```JavaScript
<html>
  <head>
    <% include ./header.ejs %>
  </head>
  <body>
    <% include ./body.ejs %>
  </body>
</html>
```

- header.ejs
```JavaScript
<title>
     <%= title %>
 </title>
 <link rel="stylesheet" type="text/css" href="css/style.css">
 <script>
    console.log("HelloWorld");
 </script>
```

- body.ejs
```JavaScript
<h1>Loop it!</h1>
<ul>
    <% for(var i=0; i<length; i++){ %>
        <li>
            <%= "LOOP" + i %>
        </li>
    <% } %>
</ul>
```


<br>
<br>

## RESTful API
REST(Representational State Transfer): 하이퍼미디어 시스템 아키텍쳐, text, JSON, XML 형식으로 제공

GET – 조회
PUT –  생성 및 업데이트
DELETE – 제거
POST – 생성

- user.json

```json
{
    "first_user": {
        "password": "first_pass",
        "name": "abet"
    },
    "second_user":{
        "password": "second_pass",
        "name": "betty"
    }
}
```


<br>
<br>
