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

function getPoster(movieName) {
	https.get("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + movieName + "&callback=?", (json) => {
		console.log("JSON =" + movieName + json);
		if (!json.results || !json.results[0] || !json.results[0].poster_path || !json.results[0].poster_path==null) {
			return 'app/no-poster.jpg';
		}
		return 'http://image.tmdb.org/t/p/w500/' + json.results[0].poster_path;
	})
}

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
						connection.query('SELECT * FROM `movies` WHERE `originalTitle` like ? LIMIT 10', "%"+json['movie']+"%", async (error, results, fields) => {
							if(error){
								res.writeHead(500, "Internal Server Error", {"Content-Type": "text/plain"});
								res.end();
							}else{
								for (i in results){
									console.log(results[i])
									results[i].poster = await getPoster(results[i].originalTitle)
								}
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
