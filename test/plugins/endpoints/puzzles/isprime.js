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


describe('GET /puzzles/isprime/{num}', function(){
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
  it('should return true for 199', function(done){
    server.inject({method: 'GET', url: '/puzzles/isprime/199', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(true);
      done();
    });
  });
  it('should return true for 16777213', function(done){
    server.inject({method: 'GET', url: '/puzzles/isprime/16777213', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(true);
      done();
    });
  });
  it('should return true for 8192', function(done){
    server.inject({method: 'GET', url: '/puzzles/isprime/8192', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(false);
      done();
    });
  });
  it('should return true for 1', function(done){
    server.inject({method: 'GET', url: '/puzzles/isprime/1', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(true);
      done();
    });
  });
  it('should return true for 2', function(done){
    server.inject({method: 'GET', url: '/puzzles/isprime/2', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(true);
      done();
    });
  });
  it('should return false for 45', function(done){
    server.inject({method: 'GET', url: '/puzzles/isprime/45', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(false);
      done();
    });
  });
  it('should return "Neither prime nor composite." for 0', function(done){
    server.inject({method: 'GET', url: '/puzzles/isprime/0', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal('Neither prime nor composite.');
      done();
    });
  });
  it('should return true for 3', function(done){
    server.inject({method: 'GET', url: '/puzzles/isprime/3', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(true);
      done();
    });
  });
  it('should return "Not a number." for x', function(done){
    server.inject({method: 'GET', url: '/puzzles/isprime/x', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal('Not a number.');
      done();
    });
  });
});
