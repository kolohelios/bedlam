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


describe('GET /puzzles/zigzag/{arrofnums}', function(){
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
  it('should return a "zig-zagged" array', function(done){
    server.inject({method: 'GET', url: '/puzzles/zigzag/1,2,3,4,5,6', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.deep.equal([6, 1, 5, 2, 4, 3]);
      done();
    });
  });
  it('should return a correctly "zig-zagged" array', function(done){
    server.inject({method: 'GET', url: '/puzzles/zigzag/10,2.2,132,43,05,62', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.deep.equal([132, 2.2, 62, 5, 43, 10]);
      done();
    });
  });
  it('should return a correctly "zig-zagged" array', function(done){
    server.inject({method: 'GET', url: '/puzzles/zigzag/10,d,6,43,8,z', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.deep.equal([43, 6, 10, 8]);
      done();
    });
  });
});
