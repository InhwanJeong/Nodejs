# Nodejs
Nodejs practice
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
- 기타
  - ReactJS
  - AngularJS

# 목차
- [1. 기초 간단정리](#기초-간단-정리)
  - [Non Blocking Code](#callback-function)
  - [Event Driven](#Event-Driven)
[로그인 기능](#로그인-기능)
[게시판 기능](#게시판-기능)

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

## 로그인 기능

## 게시판 기능
- sequelize
