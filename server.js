const	http = require('http'),
		https = require('https'),
		mysql = require('mysql'),
		fs = require('fs'),
		crypto = require('crypto'),
		express = require('express');

const poolCluster = mysql.createPoolCluster();

poolCluster.add('MASTER', {
  connectionLimit : 50,
  host     : '148.60.11.202',
  user     : 'user',
  password : 'mypassword',
  database : 'db'
});

poolCluster.add('SLAVE1', {
  connectionLimit : 50,
  host     : '148.60.11.76',
  user     : 'user',
  password : 'mypassword',
  database : 'db'
});

const app = express()

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use('/app', express.static(__dirname + '/public'));

app.post('/app2/searchMovie', function (req, res) {
	const json = req.body;
	poolCluster.getConnection(function (err, connection) {
		if(err){
			res.sendStatus(500);
			res.end();
			return;
		}
		connection.query('SELECT movies.*, GROUP_CONCAT(CONCAT(persons.nconst, "$", `primaryName`) ) AS cast FROM (SELECT * FROM movies WHERE `originalTitle` like ? ORDER BY CAST(`numVotes` AS UNSIGNED) DESC LIMIT 10) AS movies LEFT JOIN `principals` ON movies.tconst=principals.tconst LEFT JOIN `persons` ON principals.nconst=persons.nconst WHERE characters !="" OR characters IS NULL GROUP BY movies.tconst ORDER BY CAST(`numVotes` AS UNSIGNED) DESC', "%"+json['movie']+"%", 
		(error, results, fields) => {
			connection.release();
			error ? res.sendStatus(500) : res.json(results);
			res.end();								
		});
	});
})

app.post('/app2/getMovieDetails', function (req, res) {
	const json = req.body;
	poolCluster.getConnection(function (err, connection) {
		if(err){
			res.sendStatus(500);
			res.end();
			return;
		}
		connection.query('SELECT movies.*, persons.nconst, `primaryName`, `job`, `characters` FROM (SELECT * FROM movies WHERE `tconst` = ?) AS movies LEFT JOIN `principals` ON movies.tconst=principals.tconst LEFT JOIN `persons` ON principals.nconst=persons.nconst', json['movie'], 
		(error, results, fields) => {
			connection.release();
			error ? res.sendStatus(500) : res.json(results);
			res.end();
		});
	});
})

app.post('/app2/addMovie', function (req, res) {
	const json = req.body;
	poolCluster.getConnection(function (err, connection) {
		if(err){
			res.sendStatus(500);
			res.end();
			return;
		}
		connection.query('INSERT INTO movies(tconst, originalTitle, startYear, averageRating, runtimeMinutes, genres) values(?,?,?,?,?,?)', [crypto.randomBytes(8).toString("hex"), json['title'], json['year'],json['note'],json['time'],json['genres']], 
		(error, results, fields) => {
			connection.release();
			error ? res.sendStatus(500) : res.send("OK");
			res.end();
		});
	});
})

app.post('/app2/getPersonDetails', function (req, res) {
	const json = req.body;
	poolCluster.getConnection(function (err, connection) {
		if(err){
			res.sendStatus(500);
			res.end();
			return;
		}
		connection.query('SELECT persons.* FROM persons WHERE nconst=?', json['person'],
		(error, results, fields) => {
			if(error){
				connection.release();
				res.sendStatus(500);
				res.end();
			}else{
				if(results != undefined && results.length!=0){
				 tmp = results[0].knownForTitles.split(',')
				}
				else{
					connection.release();
					res.json(results);
					res.end();
					return
				}
				connection.query('SELECT tconst, originalTitle FROM movies WHERE tconst=? OR tconst=? OR tconst=? ', [tmp[1], tmp[2],tmp[3]],
				(error, results2, fields) => {
					if(!error){				
						results[0].movieNames = results2
					}
					connection.release();
					res.json(results);
					res.end();	
				});								
			}
		});
	});
})

app.listen(8000)
