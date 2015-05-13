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


describe('GET /puzzles/gcd/{arrofnums} where nums are positive', function(){
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
  it('should return 64 for 128 and 1216', function(done){
    server.inject({method: 'GET', url: '/puzzles/gcd/128,1216', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(64);
      done();
    });
  });
  it('should return 5 for 15 and 20', function(done){
    server.inject({method: 'GET', url: '/puzzles/gcd/15,20', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(5);
      done();
    });
  });
  it('should return 5 for 20 and 15', function(done){
    server.inject({method: 'GET', url: '/puzzles/gcd/20,15', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(5);
      done();
    });
  });
  it('should return 500 for 5500 and 60000', function(done){
    server.inject({method: 'GET', url: '/puzzles/gcd/5500,60000', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(500);
      done();
    });
  });
  it('should return "One argument is a not a number." for 215 and x', function(done){
    server.inject({method: 'GET', url: '/puzzles/gcd/215,x', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal('One argument is not a number.');
      done();
    });
  });
  it('should return "One argument is a not a number." for x and 301', function(done){
    server.inject({method: 'GET', url: '/puzzles/gcd/x,301', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal('One argument is not a number.');
      done();
    });
  });
  it('should return 0 for 0 and 5', function(done){
    server.inject({method: 'GET', url: '/puzzles/gcd/0,5', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(0);
      done();
    });
  });
  it('should return 1 for 1 and 1', function(done){
    server.inject({method: 'GET', url: '/puzzles/gcd/1,1', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(1);
      done();
    });
  });
  it('should return "One argument is not a positive integer." for -1 and -10', function(done){
    server.inject({method: 'GET', url: '/puzzles/gcd/-1,-10', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal('One argument is not a positive integer.');
      done();
    });
  });
});
