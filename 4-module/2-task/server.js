const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');
const LimitSizeStream = require('./LimitSizeStream');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'POST':
	if (pathname.includes('/')) {
    		res.statusCode = 400;
    		res.end('internal path is not allowed');
  	}
	fs.writeFile(filepath, req.body, (err) => {
	// throws an error, you could also catch it here
    	if (err){ 
			res.statusCode = 500;
			throw err;
		}
		
    	// success case, the file was saved
		res.statusCode = 200;
		res.end('Saved!');
	}).pipe(LimitSizeStream)
	.on('error', err=>{
		if(err) throw err;
	});
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
