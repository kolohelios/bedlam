'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/zigzag/{arrofnums}',
    config: {
      description: 'Find zigzag',
      validate: {
        params: {
          arrofnums: Joi.string().required()
        }
      },
      handler: function(request, reply){
        var arrayToBeZigzagged = request.params.arrofnums.split(',');
        arrayToBeZigzagged = arrayToBeZigzagged.map(function(num){
          return parseFloat(num);
        });
        for(var i = arrayToBeZigzagged.length; i > 0; i--){
          if(isNaN(arrayToBeZigzagged[i])){
            arrayToBeZigzagged.splice(i, 1);
          }
          console.log(arrayToBeZigzagged);
        }
        arrayToBeZigzagged = arrayToBeZigzagged.sort(function(a, b){
          return a - b;
        });
        // arrayToBeZigzagged.forEach(function(i){
        //
        //   i !== *[0-9] ? i.splice(i, 1) : continue;
        // });
        var zigzag = [];
        while(arrayToBeZigzagged.length > 0){
          zigzag.push(arrayToBeZigzagged.pop());
          zigzag.push(arrayToBeZigzagged.shift());
        }
        return reply({value: zigzag});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'puzzles.zigzag'
};
