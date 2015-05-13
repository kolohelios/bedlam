'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/gcd/{nums}',
    config: {
      description: 'Get GCD of two positive integers',
      validate: {
        params: {
          nums: Joi.string().required()
        }
    },
      handler: function(request, reply){
        var num1 = request.params.nums.split(',')[0];
        var num2 = request.params.nums.split(',')[1];
        num1 = parseInt(num1, 0);
        num2 = parseInt(num2, 0);
        if(isNaN(num1) || isNaN(num2)){
          return reply({value: 'One argument is not a number.'});
        }
        var largerNum, smallerNum;
        if(num1 > num2){
          largerNum = num1;
          smallerNum = num2;
        }else{
          largerNum = num2;
          smallerNum = num1;
        }
        function gcd(a, b){
          if(a === 0 || b === 0){
            return 0;
          }
          for(var i = a; i > 0; i--){
            if(a % i === 0){
              if(b % i === 0){
                return i;
              }
            }
          }
        }
        var gcdNum = gcd(smallerNum, largerNum);
        if(num1 < 0 || num2 < 0){
          gcdNum = 'One argument is not a positive integer.';
        }
        return reply({value: gcdNum});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'puzzles.gcd'
};
