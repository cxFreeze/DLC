var supertest = require("supertest");
var expect = require("expect");
const assert = require('assert');

// This agent refers to PORT where the program is running.

var server = supertest.agent("http://localhost/app");


// Requetes get
server
   .get("")
   .expect("Content-type",/text/)
   .expect(200) // THis is HTTP response
   .end(function(err,res){
      assert.strictEqual(null,err);
});

server
   .get("/nimportequoi")
   .expect("Content-type",/text/)
   .expect(400) // THis is HTTP response
   .end(function(err,res){
      assert.strictEqual(null,err);
});

server
   .get("/style.css")
   .expect("Content-type",/text/)
   .expect(200) // THis is HTTP response
   .end(function(err,res){
      assert.strictEqual(null,err);
});

server
   .get("/script.js")
   .expect("Content-type",/text/)
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

// Requetes Post
server
   .post("/nimportequoi")
   .expect("Content-type",/text/)
   .expect(400) // THis is HTTP response
   .end(function(err,res){
      assert.strictEqual(null,err);
});

server
   .post("/searchMovie")
   .send({"movie": "star wars"})
   .expect("Content-type",/json/)
   .expect(200) // THis is HTTP response
   .end(function(err,res){
      assert.strictEqual(null,err);
});

server
   .post("/getMovieDetails")
   .send({"movie": "star wars"})
   .expect("Content-type",/json/)
   .expect(200) // THis is HTTP response
   .end(function(err,res){
      assert.strictEqual(null,err);
});

server
   .post("/getPersonDetails")
   .send({"movie": "star wars"})
   .expect("Content-type",/json/)
   .expect(200) // THis is HTTP response
   .end(function(err,res){
      assert.strictEqual(null,err);
});
