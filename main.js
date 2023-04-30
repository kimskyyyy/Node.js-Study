var express = require('express');
var app = express();
var fs = require('fs');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var qs = require('querystring');



// get 메서드의 첫번째 인자는 경로, 두번째 인자는 콜백함수가 들어감
// 화살표 함수
// app.get('/', (req, res) => res.send('Hello World!'))

app.get('/', function(request, response) {
  fs.readdir('./data', function(error, filelist){ // 파일 목록 가져오기
    var title = 'Welcom'; // 제목 입력
    var description = 'Hello , Node.js'; // 내용 입력
    var list = template.list(filelist);
    var html = template.HTML(title, list,
       `<h2>${title}</h2>${description}`
       );
       response.send(html)
  });
});


// 경로를 매개변수로 받아서 응답해주는 방식
app.get('/page/:pageId', function(request, response) {
  fs.readdir('./data', function(error, filelist){ // 파일 목록 가져오기
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`,'utf8',function(err, description) { // 파일의 내용을 description 변수에 저장
      var title = request.params.pageId; // 쿼리 스트링에서 제목을 가져옴
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description, {
        allowedTags:['h1']
      });
      var list = template.list(filelist);
      var html = template.HTML(sanitizedTitle, list,
         `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
         `<a href="/create">create</a>
          <a href="/update/${sanitizedTitle}">update</a>
          <form action="/delete_process" method="post">
          <input type="hidden" name="id" value="${sanitizedTitle}">
          <input type="submit" value="delete">
          </form>
         `
         );
      response.send(html);
      });
    });
});

// 새 글 작성(create)
app.get('/create', function(request, response) {
  fs.readdir('./data', function(error, filelist) {
    var title = 'WEB - create';
    var list = template.list(filelist);
    var html = template.HTML(title, list, `
    <form action="/create_process" method ="post">
    <p><input type="text" name="title" placeholder="title"></p>
    <p>
      <textarea name="description" placeholder="description"></textarea>
    </p>
    <p>
      <input type="submit">
    </p>
    </form>
    `, '');
    response.send(html);
  })
})

// 새 글 작성 처리(create process)
app.post('/create_process', function(request, response) {
  var body = '';
  request.on('data', function(data) {
    body = body + data;
  });
  request.on('end', function() {
    var post = qs.parse(body);
    var title = post.title;
    var description = post.description;
    fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
      response.writeHead(302, {Location:`/?=${title}`});
      response.end();
    });
  });
});

// 글 수정(update)
app.get('/update/:pageId', function(request, response) {
  fs.readdir('./data', function(error, filelist) {
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {
      var title = request.params.pageId;
      var list = template.list(filelist);
      var html = template.HTML(title, list,
        `
        <form action="/update_process" method="post">
        <input type="hidden" name="id" value=${title}>
        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
        <p>
          <textarea name="description" placeholder="description">${description}</textarea>
        </p>
        <p>
          <input type="submit">
        </p>
        </form>
        `,
        `<a href="/create">create</a> <a href="/update/${title}">update</a>`
        );
        response.send(html);
    });
  });
});

// 글 수정 처리(update process)
app.post('/update_process', function(request, response) {
  var body = '';
  request.on('data', function(data) {
    body = body + data;
  });
  request.on('end', function() {
    var post = qs.parse(body);
    var id = post.id;
    var title = post.title;
    var description = post.description;
    fs.rename(`data/${id}`, `data/${title}`, function(error) {
      fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
      response.writeHead(302, {Location:`/?=${title}`});
      response.end();
      response.redirect(`/?=${title}`);
      
    });
    });
  });
});


// 글 삭제 처리(delete process)
app.post('/delete_process', function(request, response) {
  var body = '';
  request.on('data', function(data) {
    body = body + data;
  });
  request.on('end', function() {
    var post = qs.parse(body);
    var id = post.id;
    var filteredId = path.parse(id).base;
    fs.unlink(`data/${filteredId}`, function(error) {
      response.redirect('/');
    });
  });
});




app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});





/*
var http = require('http');
var fs = require('fs'); // Node.js에게 fs 이라는 모듈을 요청한 것
var url = require('url'); // Node.js에게 url 이라는 모듈을 요청한 것

// 중복 코드 templateHTML 함수로 만들기
function templateHTML(title, list, body) {
  return `
  <!doctype html>
  <html>
    <head>
      <title>WEB - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${body}
    </body>
  </html>
  `;
}

// 중복 코드 templateList 함수로 만들기
function templateList(filelist) {
  var list = '<ul>'; // list 변수 선언
  var i = 0; // 반복 횟수를 위한 변수 i 선언하고 0으로 초기화
  while(i < filelist.length) { // filelist에 담긴 원소 개수만큼 반복
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + '</ul>'; // list 변수를 이용해서 <ul></ul> 태그 만들기
  return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url; // 사용자가 웹 브라우저를 통해 요청한 URL
    var queryData = url.parse(_url, true).query; // _url에서 쿼리 스트링을 추출하여 객체로 반환
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/') { // 루트라면 기존 코드 실행
      if(queryData.id === undefined) { // 홈 인 경우
        fs.readdir('./data', function(error, filelist){ // 파일 목록 가져오기
          var title = 'Welcom'; // 제목 입력
          var description = 'Hello , Node.js'; // 내용 입력
          var list = templateList(filelist);
          templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
        });
      } else { // 홈이 아닌 경우
         fs.readdir('./data', function(error, filelist){ // 파일 목록 가져오기
            fs.readFile(`data/${queryData.id}`,'utf8',function(err, description) { // 파일의 내용을 description 변수에 저장
              var title = queryData.id; // 쿼리 스트링에서 제목을 가져옴
              var list = templateList(filelist);
              templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);

              response.writeHead(200);
              response.end(template);
        });
      });
      }
    } else { // 루트가 아니라면 새로운 코드 실행
      response.writeHead(404);
      response.end('Not found');
    }
 
});

// 3000번 포트에 Node.js 서버 실행
app.listen(3000);
*/