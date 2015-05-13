'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/isprime/{num}',
    config: {
      description: 'Get GCD of two numbers',
      validate: {
        params: {
          num: Joi.string().required()
        }
    },
      handler: function(request, reply){
        var num = parseInt(request.params.num, 10);
        function isPrime(numToTest){
          if(isNaN(num)){
            return 'Not a number.';
          }
          if(numToTest === 0){
            return 'Neither prime nor composite.';
          }
          if(numToTest === 2){
            return true;
          }
          if(!(numToTest % 2)){
            return false;
          }
          for(var i = 3; i < numToTest / 2; i += 2){
            if(!(num % i)){
              return false;
            }
          }
          return true;
        }
        var primeornot = isPrime(num);
        return reply({value: primeornot});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'puzzles.isprime'
};
