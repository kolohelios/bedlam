/* eslint no-unused-expressions: 0 */
'use strict';

var Chai = require('chai');
var Lab = require('lab');
var Config = require('../lib/config');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Chai.expect;
var it = lab.test;

describe('config', function(){
  it('should erase all env variables', function(done){
    Server.init(function(err, server){
      expect(err).to.not.be.ok;
      expect(server).to.be.ok;
      server.stop(function(){
        Mongoose.disconnect(done);
      });
    });
  });
});
