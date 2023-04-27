var fs = require('fs'); // require 기능을 사용해 fs(File System) 모듈을 사용하겠다는 의미
fs.readFile('sample.txt', 'utf8', function(err, data){
    console.log(data);
});