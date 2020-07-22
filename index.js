const http = require('http');
const fs = require('fs');
const { schema } = require('./db/metadata/schema');

const post = {
  'Справочники': {}, 'Документы': {}
};

const loadPostModules = () => {
  ['Справочники', 'Документы'].forEach((t1) => {
    Object.keys(schema[t1]).forEach((t2) => {
      post[t1][t2] = {};
      fs.readdirSync(`bussinesUnit/${t1}/${t2}/postrequest`).forEach((file) => {
        let callBack = file.substr(0, file.length - 3);
        post[t1][t2][callBack] = require(`./bussinesUnit/${t1}/${t2}/postrequest/${callBack}`)[callBack];
      });
    });
  });
}

loadPostModules();

const postResponse = (req, res) => {
  let path = decodeURIComponent(req.url);
  let ar = path.split('/');
  ar.shift();
  let callBack = post;
  ar.forEach((e) => {
    callBack = callBack[e];
  });
  callBack(req, res);
}

const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(req.method);
  if ("POST" == req.method) {
    postResponse(req, res);
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
  } else if ('js' == ar[1]) {
    let content = fs.readFileSync(`client${path}`);

    res.writeHead(200, {
      'Content-Type': 'application/javascript'
    });

    res.end(content);
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
