const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');
const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'DELETE':
	if (pathname.includes('/') || pathname.includes('..')) {
    	res.statusCode = 400;
    	res.end('Nested paths are not allowed');
    	return;
  	}
	if (!filepath) {
        res.statusCode = 404;
        res.end('File not found');
        return;
	}else{
		fs.unlink(filepath, (err) => {
		if(err) {res.statusCode = 404;res.end('OK'); return;}
			res.statusCode = 200;
			res.end('OK');
		});
	}
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;