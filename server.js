const http = require('http');
const fs = require("fs");


const server = http.createServer((req, res) => {
  // Your code here
  if (req.url.startsWith('/static')) {
    
    const routeParts = req.url.split('/');
    routeParts.splice(1, 1); // Remove 'static' from the array
    const filePath = './assets/' + routeParts.slice(1).join('/');
    const fileExtension = routeParts[routeParts.length - 1].split('.')[1];

    const mimeTypeMap = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png'
    };

    const mimeType = mimeTypeMap[fileExtension] || 'text/plain';

    fs.readFile(filePath, (err, data) => {
      if(err) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 Not Found');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', mimeType);
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid URL')
  }
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));