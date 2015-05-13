/* eslint no-unused-expressions: 0 */
'use strict';

var Chai = require('chai');
var Lab = require('lab');
var Mongoose = require('mongoose');
var Server = require('../../../../lib/server');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Chai.expect;
var it = lab.test;

var before = lab.before;
var after = lab.after;

var server;


describe('GET /puzzles/getvowels/{text}', function(){
  before(function(done){
    Server.init(function(err, srvr){
      if(err){ throw err; }
      server = srvr;
      done();
    });
  });
  after(function(done){
    server.stop(function(){
      Mongoose.disconnect(done);
    });
  });
  it('should return 1 for dog', function(done){
    server.inject({method: 'GET', url: '/puzzles/vowelcount/dog', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(1);
      done();
    });
  });
  it('should return 3 for coding house', function(done){
    server.inject({method: 'GET', url: '/puzzles/vowelcount/coding house', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(5);
      done();
    });
  });
  it('should return 0 for rhythym', function(done){
    server.inject({method: 'GET', url: '/puzzles/vowelcount/rythym', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(0);
      done();
    });
  });
  it('should return 5 for education (and one of each vowel)', function(done){
    server.inject({method: 'GET', url: '/puzzles/vowelcount/education', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(5);
      done();
    });
  });
});
