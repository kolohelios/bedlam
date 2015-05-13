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
        var num = request.params.num;
        function isPrime(num){
          if(!(num % 2)){
            return false;
          }
          for(var i = 3; i < num / 2; i += 2){
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
