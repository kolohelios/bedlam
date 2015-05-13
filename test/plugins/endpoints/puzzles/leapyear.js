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


describe('GET /puzzles/leapyear/{year}', function(){
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
  it('should return false for year 1900', function(done){
    server.inject({method: 'GET', url: '/puzzles/leapyear/1900', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(false);
      done();
    });
  });
  it('should return true for year 2000', function(done){
    server.inject({method: 'GET', url: '/puzzles/leapyear/2000', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(true);
      done();
    });
  });
  it('should return false for year 1999', function(done){
    server.inject({method: 'GET', url: '/puzzles/leapyear/1999', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(false);
      done();
    });
  });
  it('should return "invalid year" for string "ziggy"', function(done){
    server.inject({method: 'GET', url: '/puzzles/leapyear/ziggy', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal('invalid year');
      done();
    });
  });
  it('should return true for year 1800', function(done){
    server.inject({method: 'GET', url: '/puzzles/leapyear/1800', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(false);
      done();
    });
  });
});
