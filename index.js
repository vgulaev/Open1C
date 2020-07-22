const http = require('http');

var counter = 0;
const server = http.createServer((req, res) => {
  setTimeout(() => {
    res.end('this is me');
  }, 10000 - counter * 1000);

  counter = 10;

  console.log(counter);
  // try {
  //   // respond(req, res);
  // } catch (err) {
  //   // console.log(err.message, err.stack)
  //   // empty(res, err.message + err.stack);
  // }
});

let port = 3080;

server.listen(port, '0.0.0.0', () => {
  console.log(`Сервер запущен port: ${port}`);
});
