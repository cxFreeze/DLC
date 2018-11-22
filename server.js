const	http = require('http'),
		fs = require('fs');


http.createServer(function (req, res) {
  if (req.url == '/') {
    fs.readFile('index.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  } else if (req.url == '/style.css') {
    fs.readFile('style.css', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.write(data);
      res.end();
    });
  } else if (req.url == '/script.js') {
    fs.readFile('script.js', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/js' });
      res.write(data);
      res.end();
    });
  } else {
	  res.end();
  }
}).listen(8080);
