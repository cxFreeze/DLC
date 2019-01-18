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
						connection.query('SELECT movies.*, GROUP_CONCAT(CONCAT(persons.nconst, "$", `primaryName`) ) AS cast FROM (SELECT * FROM movies WHERE `originalTitle` like ? ORDER BY CAST(`numVotes` AS UNSIGNED) DESC LIMIT 10) AS movies LEFT JOIN `principals` ON movies.tconst=principals.tconst LEFT JOIN `persons` ON principals.nconst=persons.nconst WHERE characters !="" OR characters IS NULL GROUP BY movies.tconst ORDER BY CAST(`numVotes` AS UNSIGNED) DESC', "%"+json['movie']+"%", 
						(error, results, fields) => {
							if(error){
								res.writeHead(500, error, {"Content-Type": "text/plain"});
								res.end();
							}else{
								res.writeHead(200, "OK", {"Content-Type": "application/json"});
								res.write(JSON.stringify(results));
								res.end();								
							}
						});
					}
					else if(req.url === "/getMovieDetails"){
						connection.query('SELECT movies.*, persons.nconst, `primaryName`, `job`, `characters` FROM (SELECT * FROM movies WHERE `tconst` = ?) AS movies LEFT JOIN `principals` ON movies.tconst=principals.tconst LEFT JOIN `persons` ON principals.nconst=persons.nconst', json['movie'], 
						(error, results, fields) => {
							if(error){
								res.writeHead(500, error, {"Content-Type": "text/plain"});
								res.end();
							}else{
								res.writeHead(200, "OK", {"Content-Type": "application/json"});
								res.write(JSON.stringify(results));
								res.end();								
							}
						});
					}
					else if(req.url === "/getPersonDetails"){
						connection.query('SELECT persons.* FROM persons WHERE nconst=?', json['person'],
						(error, results, fields) => {
							if(error){
								res.writeHead(500, error, {"Content-Type": "text/plain"});
								res.end();
							}else{
								if(results != undefined && results.length!=0){
								 tmp = results[0].knownForTitles.split(',')
								}
								else{
									res.writeHead(200, "OK", {"Content-Type": "application/json"});
									res.write(JSON.stringify(results));
									res.end();
									return
								}
								connection.query('SELECT tconst, originalTitle FROM movies WHERE tconst=? OR tconst=? OR tconst=? ', [tmp[1], tmp[2],tmp[3]],
								(error, results2, fields) => {
									if(error){
									}else{
										results[0].movieNames = results2
									}
									res.writeHead(200, "OK", {"Content-Type": "application/json"});
									res.write(JSON.stringify(results));
									res.end();	
								})						
							}
						});
					}
				}catch(e){
					console.error(e);
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
		} else if (req.url == '/logo.png') {
			fs.readFile('logo.png', function (err, data) {
				res.writeHead(200, "OK", { 'Content-Type': 'image/png' });
				res.write(data);
				res.end();
			});
		} else if (req.url == '/spinner.svg') {
			fs.readFile('spinner.svg', function (err, data) {
				res.writeHead(200, "OK", { 'Content-Type': 'image/svg+xml' });
				res.write(data);
				res.end();
			});
		} else {
				res.writeHead(400, "Bad Request", {"Content-Type": "text/plain"});
				res.end();
		}
	}
}).listen(8000);
