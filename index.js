const fs = require('fs');
const http = require('http');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  switch (pathName) {
    case '/':
    case '/overview':
      res.end('OVERVIEW');
      break;
    case '/product':
      res.end('PRODUCT');
      break;
    case '/api':
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(data);
      break;
    default:
      res.writeHead(404, { 'Content-type': 'text/html' });
      res.end('<h1>Page not found!<h1>');
      break;
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
