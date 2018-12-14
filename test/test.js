var supertest = require("supertest");
var should = require("should");
var describe = require("describe");
// This agent refers to PORT where the program is running.

var server = supertest.agent("http://localhost");
console.log('test');
// UNIT test begin

describe("SAMPLE unit test",function(){
  // #1 should return home page
  console.log('test2')
  it("should return home page",function(done){
    // calling home page
    server
    .get("/")
    .expect("Content-type",/text/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      console.log(err,res);
      // HTTP status should be 200
      res.status.should.equal(200);
      done();
    });
  });

});
