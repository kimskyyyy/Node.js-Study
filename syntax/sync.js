var fs = require('fs'); // require를 이용해 파일 시스템에 관한 기능이 담긴 fs 모듈을 불러와서 fs 변수에 담음

// readFileSync(동기처리 방식)
// console.log('A');
// var result = fs.readFileSync('Syntax/sample.txt', 'utf8'); // 동기 처리 방식으로 동작하는 readFileSync 기능을 사용하여 sample.txt파일을 utf8형식으로 읽어서 result 변수에 담음
// console.log(result);
// console.log('C');

// readFile(비동기 처리 방식) default
console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', function(err, result) { // 비동기 처리 방식으로 동작하는 readFile 기능은 결과값을 반환하지 않음, 변수에 담아서 사용할 수 없고 대신 callback 자리에 전달한 함수 이용
    console.log(result)
});
console.log('C');