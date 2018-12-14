var supertest = require("supertest");
var should = require("should");
var expect = require("expect");

// This agent refers to PORT where the program is running.

var server = supertest.agent("http://localhost:80");

server
   .get("/")
   .expect("Content-type",/text/)
   .expect(200) // THis is HTTP response
   .end(function(err,res){
      console.log(err,res);
      res.status.should.equal(200);
      done();
    });
});
