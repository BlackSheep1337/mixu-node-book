const http = require('node:http');
const url = require('node:url');
const fs = require('node:fs');


const messages = ['testing'];
const clients = [];

const server = http.createServer((request, response) => {
  const urlParts = url.parse(request.url);
  console.log(urlParts);

  if (urlParts.pathname === '/') {
    fs.readFile('index.html', (err, data) => {
      response.end(data);
    });
  } else if (urlParts.pathname.substring(0, 5) == 'poll') {

  }
});

server
  .listen(8080, 'localhost')
  .on('listening', () => console.log('Server running on port 8080'));
