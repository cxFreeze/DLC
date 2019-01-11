const	http = require('http'),
		https = require('https'),
		mysql = require('mysql'),
		fs = require('fs');

const connection = mysql.createPool({
  connectionLimit : 100,
  host     : '148.60.11.202',
  user     : 'user',
  password : 'mypassword',
  database : 'db',
  debug    :  false
});

http.createServer(function (req, res) {
	req.url = req.url.replace("/app","");
	if(req.method === "POST"){
		var body = "";
			req.on("data", function (data) {
					body += data;
			});
			req.on("end", function(){
				try{
					const json = JSON.parse(body);
					if(req.url === "/searchMovie"){
						connection.query('SELECT * FROM `movies` WHERE `originalTitle` ORDER BY `movies.startYear` DESC like ? LIMIT 10', "%"+json['movie']+"%", (error, results, fields) => {
							if(error){
								res.writeHead(500, error, {"Content-Type": "text/plain"});
								res.end();
							}else{
								res.writeHead(200, "OK", {"Content-Type": "application/json"});
								res.write(JSON.stringify(results));
								res.end();								
							}
						});
					}else if(req.url === "/searchPerson"){
						throw "unknown";
					}else{
						throw "unknown";
					}
				}catch(e){
					console.log(e);
					res.writeHead(400, "Bad Request", {"Content-Type": "text/plain"});
					res.end();
				}
			});
	}else{
		if (req.url == '' || req.url=='/') {
			fs.readFile('index.html', function (err, data) {
				res.writeHead(200, "OK", { 'Content-Type': 'text/html' });
				res.write(data);
				res.end();
			});
		} else if (req.url == '/style.css') {
			fs.readFile('style.css', function (err, data) {
				res.writeHead(200, "OK", { 'Content-Type': 'text/css' });
				res.write(data);
				res.end();
			});
		} else if (req.url == '/script.js') {
			fs.readFile('script.js', function (err, data) {
				res.writeHead(200, "OK", { 'Content-Type': 'text/js' });
				res.write(data);
				res.end();
			});
		} else if (req.url == '/no-poster.jpg') {
			fs.readFile('no-poster.jpg', function (err, data) {
				res.writeHead(200, "OK", { 'Content-Type': 'image/jpeg' });
				res.write(data);
				res.end();
			});
		} else {
				res.writeHead(400, "Bad Request", {"Content-Type": "text/plain"});
				res.end();
		}
	}
}).listen(8000);
