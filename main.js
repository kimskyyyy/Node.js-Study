var http = require('http');
var fs = require('fs'); // Node.js에게 fs 이라는 모듈을 요청한 것
var url = require('url'); // Node.js에게 url 이라는 모듈을 요청한 것

var app = http.createServer(function(request,response){
    var _url = request.url; // 사용자가 웹 브라우저를 통해 요청한 URL
    var queryData = url.parse(_url, true).query; // _url에서 쿼리 스트링을 추출하여 객체로 반환
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;
    console.log(url.parse(_url, true)); // 사용자가 입력한 URL 정보를 분석하기 위한 코드

    if(pathname === '/') { // 루트라면 기존 코드 실행
      if(queryData.id === undefined) { // 홈 인 경우
        
          var title = 'Welcom'; // 제목 입력
          var description = 'Hello , Node.js'; // 내용 입력
          var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB - ${title}</title>
            <meta charset="utf-8">
            <link rel="stylesheet" href="style.css">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            <div id="grid">
              <ul>
                <li><a href="/?id=HTML">HTML</a></li>
                <li><a href="/?id=CSS">CSS</a></li>
                <li><a href="/?id=JavaScript">JavaScript</a></li>
              </ul>
              <div id="article">
                <h2>${title}</h2>
                <p>${description}</p>
                <p>
                  Hypertext Markup Language (HTML) is the standard markup language for creating web pages and web applications. With Cascading Style Sheets (CSS) and JavaScript it forms a triad of cornerstone technologies for the World Wide Web.[2] Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
                </p>
              </div>
            </div>
            </body>
            </html>
          `;
          response.writeHead(200);
          response.end(template);

      } else { // 홈이 아닌 경우
        fs.readFile(`data/${queryData.id}`,'utf8',function(err, description) { // 파일의 내용을 description 변수에 저장
          var title = queryData.id; // 쿼리 스트링에서 제목을 가져옴
          var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB - ${title}</title>
            <meta charset="utf-8">
            <link rel="stylesheet" href="style.css">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            <div id="grid">
              <ul>
                <li><a href="/?id=HTML">HTML</a></li>
                <li><a href="/?id=CSS">CSS</a></li>
                <li><a href="/?id=JavaScript">JavaScript</a></li>
              </ul>
              <div id="article">
                <h2>${title}</h2>
                <p>${description}</p>
                <p>
                  Hypertext Markup Language (HTML) is the standard markup language for creating web pages and web applications. With Cascading Style Sheets (CSS) and JavaScript it forms a triad of cornerstone technologies for the World Wide Web.[2] Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
                </p>
              </div>
            </div>
            </body>
            </html>
          `;
          response.writeHead(200);
          response.end(template);
        });
      }
      
    } else { // 루트가 아니라면 새로운 코드 실행
      response.writeHead(404);
      response.end('Not found');
    }

   
    
   
 
});

// 3000번 포트에 Node.js 서버 실행
app.listen(3000);