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


describe('GET /puzzles/distance/{coords}', function(){
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
  it('calculate sum of hypotenuses rounded to two decimal places', function(done){
    server.inject({method: 'GET', url: '/puzzles/distance/[0,0]/[0,0]/[0,0]/[0,0]', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(0);
      done();
    });
  });
  it('calculate sum of hypotenuses rounded to two decimal places', function(done){
    server.inject({method: 'GET', url: '/puzzles/distance/[2,3]/[4,6]/[9,2]/[8,3]', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(11.42);
      done();
    });
  });
});
