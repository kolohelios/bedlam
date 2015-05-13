'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/gcd/{nums}',
    config: {
      description: 'Get GCD of two numbers',
      validate: {
        params: {
          nums: Joi.string().required()
        }
    },
      handler: function(request, reply){
        var num1 = request.params.nums.split(',')[0];
        var num2 = request.params.nums.split(',')[1];
        function gcd(a, b){
          for(var i = a / 2; i > 0; i--){
            if(a % i === 0){
              if(b % i === 0){
                return i;
              }
            }
          }
        }
        var gcdNum = gcd(num1, num2);
        return reply({value: gcdNum});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'puzzles.gcd'
};
