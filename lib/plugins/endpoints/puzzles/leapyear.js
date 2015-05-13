'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/leapyear/{year}',
    config: {
      description: 'Get GCD of two numbers',
      validate: {
        params: {
          year: Joi.string().required()
        }
    },
      handler: function(request, reply){
        var year = parseInt(request.params.year, 10);
        if(isNaN(year)){
          return reply({value: 'invalid year'});
        }
        var isLeapYear;
        if(year % 4){
          isLeapYear = false;
        }else if(year % 100){
          isLeapYear = true;
        }else if(year % 400){
          isLeapYear = false;
        }else{
          isLeapYear = true;
        }
        return reply({value: isLeapYear});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'puzzles.leapyear'
};


// if (year is not exactly divisible by 4) then (it is a common year)
// else
// if (year is not exactly divisible by 100) then (it is a leap year)
// else
// if (year is not exactly divisible by 400) then (it is a common year)
// else (it is a leap year)
