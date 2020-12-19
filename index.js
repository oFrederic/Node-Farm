const fs = require('fs');
const http = require('http');
const url = require('url');

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

const replaceTemplate = (template, product) => {
  let output = template.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  return output;
};

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  switch (pathname) {
    case '/':
    case '/overview':
      res.writeHead(200, { 'Content-type': 'text/html' });
      const cardsHtml = dataObj
        .map(item => replaceTemplate(tempCard, item))
        .join('');
      const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
      res.end(output);
      break;
    case '/product':
      res.writeHead(200, { 'Content-type': 'text/html' });
      const product = dataObj[query.id];
      const productOutput = replaceTemplate(tempProduct, product);
      res.end(productOutput);
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
