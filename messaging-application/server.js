const http = require('node:http');
const url = require('node:url');
const fs = require('node:fs');
const { unescape } = require('node:querystring');

const messages = ['testing'];
const clients = [];

const server = http.createServer((request, response) => {
  const urlParts = url.parse(request.url);
  // console.log(urlParts);

  if (urlParts.pathname === '/') {
    fs.readFile('index.html', (err, data) => {
      response.end(data);
    });
  } else if (urlParts.pathname.substring(0, 5) == 'poll') {

  } else if (urlParts.pathname.substring(0, 5) == '/msg/') {
    const msg = unescape(urlParts.pathname.substring(5));
    messages.push(msg);
    while (clients.length > 0) {
      const client = clients.pop();
      client.end(JSON.stringify({
        count: messages.length,
        append: msg + '\n'
      }));
    }
    response.end();
  }

  let count = urlParts.pathname.replace('/[^0-9]*/', '');
  console.log(count);

  if (messages.length > count) {
    response.end(JSON.stringify({
      count: messages.length,
      append: messages.slice(count).join('\n') + '\n'
    }));
  } else {
    clients.push(response);
  }
});

server
  .listen(8080, 'localhost')
  .on('listening', () => console.log('Server running on port 8080'));
