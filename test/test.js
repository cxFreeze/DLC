var supertest = require("supertest");
var expect = require("expect");
const assert = require('assert');

// This agent refers to PORT where the program is running.

var server = supertest.agent("http://localhost/app");

server
   .get("/")
   .expect("Content-type",/text/)
   .expect(200) // THis is HTTP response
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
