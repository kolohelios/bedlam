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


describe('GET /converters/currency/{amount}', function(){
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
  it('should return amount as correctly formatted €', function(done){
    server.inject({method: 'GET', url: '/converters/currency/1234980/spain', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal('12.349,80€');
      done();
    });
  });
  it('should return amount as correctly formatted for the country', function(done){
    server.inject({method: 'GET', url: '/converters/currency/1234980/malaysia', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal('12,349.80R');
      done();
    });
  });
});
