const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req.url);
  if ('/' == req.url) {
    let content = fs.readFileSync('templates/main.html');
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=UTF-8'
    });
    res.end(content);
    return;
  }
  if ('/' == req.url) {
    let content = fs.readFileSync('templates/main.html');
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=UTF-8'
    });
    res.end(content);
    return;
  }

  let path = decodeURIComponent(req.url);

  let ar = path.split('/');

  if (-1 != ['Справочники', 'Документы'].indexOf(ar[1])) {
    let viewPath = ['bussinesUnit', ar[1], ar[2]];
    if ('list' == ar[3]) {
      viewPath.push('view');
      viewPath.push('list.html');
    }
    let content = fs.readFileSync(viewPath.join('/'));

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=UTF-8'
    });
    res.end(content);

    return;
  }

  res.writeHead(200, {
    'Content-Type': 'text/html; charset=UTF-8'
  });
  res.end(`${decodeURIComponent(req.url)} should be inproved`);
});

let port = 3080;

server.listen(port, '0.0.0.0', () => {
  console.log(`Сервер запущен port: ${port}`);
});
