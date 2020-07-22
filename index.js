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

  let body = '';

  req.on('data', function (data) {
    body += data;
    if (body.length > 1e6)
        req.connection.destroy();
  });

  req.on('end', function () {
    callBack(req, res, body);
  });
}

const simple = (res, msg) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=UTF-8'
  });
  res.end(msg);
}

const server = http.createServer((req, res) => {
  if ("POST" == req.method) {
    return postResponse(req, res);
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
    // if ('list' == ar[3]) {
      viewPath.push('view');
      viewPath.push(ar[3] + '.html');
    // }

    if (fs.existsSync(viewPath.join('/'))) {
      let content = fs.readFileSync(viewPath.join('/'));

      res.writeHead(200, {
        'Content-Type': 'text/html; charset=UTF-8'
      });
      res.end(content);
    } else {
      return simple(res, `${viewPath.join('/')} does\'n exist`);
    }

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
