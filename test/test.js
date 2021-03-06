var supertest = require("supertest");
var expect = require("expect");
const assert = require('assert');

// This agent refers to PORT where the program is running.
var server = supertest.agent("http://localhost:8000/app");
var server2 = supertest.agent("http://localhost:8000/app2");


// Requetes get
server
   .get("/")
   .expect("Content-type",/text/)
   .expect(200) // THis is HTTP response
   .end(function(err,res){
      assert.strictEqual(null,err);
});

server
   .get("/nimportequoi")
   .expect("Content-type",/text/)
   .expect(404) // THis is HTTP response
   .end(function(err,res){
      assert.strictEqual(null,err);
});

server
   .get("/style.css")
   .expect("Content-type",/css/)
   .expect(200) // THis is HTTP response
   .end(function(err,res){
      assert.strictEqual(null,err);
});

server
   .get("/script.js")
   .expect("Content-type",/javascript/)
   .expect(200) // THis is HTTP response
   .end(function(err,res){
      assert.strictEqual(null,err);
});

server
   .get("/no-poster.jpg")
   .expect("Content-type",/image/)
   .expect(200) // THis is HTTP response
   .end(function(err,res){
      assert.strictEqual(null,err);
});

server
   .get("/logo.png")
   .expect("Content-type",/image/)
   .expect(200) // THis is HTTP response
   .end(function(err,res){
      assert.strictEqual(null,err);
});

server
   .get("/spinner.svg")
   .expect("Content-type",/image/)
   .expect(200) // THis is HTTP response
   .end(function(err,res){
      assert.strictEqual(null,err);
});

// // Requetes Post
server2
   .post("/nimportequoi")
   .expect("Content-type",/text/)
   .expect(404) // THis is HTTP response
   .end(function(err,res){
      assert.strictEqual(null,err);
});

server2
   .post("/searchMovie")
   .send({"movie": "star wars"})
   .expect("Content-type",/json/)
   .expect(200) // THis is HTTP response
   .end(function(err,res){
      assert.strictEqual(null,err);
});

server2
   .post("/getMovieDetails")
   .send({"movie": "tt1485796"})
   .expect("Content-type",/json/)
   .expect(200) // THis is HTTP response
   .end(function(err,res){
      assert.strictEqual(null,err);
});

server2
   .post("/getPersonDetails")
   .send({"person": "nm0413168"})
   .expect("Content-type",/json/)
   .expect(200) // THis is HTTP response
   .end(function(err,res){
      assert.strictEqual(null,err);
});
