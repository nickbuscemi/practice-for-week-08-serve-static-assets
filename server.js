const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Your code here
  const dogImage = fs.readFileSync('assets/images/dog.jpg');

  res.statusCode = 200;
  res.setHeader('Content-Type', 'image/png');
  res.end(dogImage);
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));