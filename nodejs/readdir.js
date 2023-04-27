var testFolder = './data'; // testFolder를 변수로 선언, 조사할 디렉터리 경로 지정
var fs = require('fs'); // 파일 시스템을 다루는 여러 기능이 담김 fs 모듈 사용

fs.readdir(testFolder, function(error, filelist) { // readdir 기능을 사용하여 지정한 디렉터리에 있는 파일 목록을 testFolder에 저장
    console.log(filelist);
});