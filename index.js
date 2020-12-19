const fs = require('fs');
const http = require('http');

const tempOverview = fs.readFileSync(
  './templates/template-overview.html',
  'utf-8'
);
const tempCard = fs.readFileSync('./templates/template-card.html', 'utf-8');
const tempProduct = fs.readFileSync(
  './templates/template-product.html',
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  switch (pathName) {
    case '/':
    case '/overview':
      res.writeHead(200, { 'Content-type': 'text/html' });
      res.end(tempOverview);
      break;
    case '/product':
      res.writeHead(200, { 'Content-type': 'text/html' });
      res.end(tempProduct);
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
