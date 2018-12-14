var supertest = require("supertest");
var expect = require("expect");
const assert = require('assert');

// This agent refers to PORT where the program is running.

var server = supertest.agent("http://localhost:80");

server
   .get("/")
   .expect("Content-type",/text/)
   .expect(200) // THis is HTTP response
   .end(function(err,res){
      
      assert.strictEqual(null,err);
});
