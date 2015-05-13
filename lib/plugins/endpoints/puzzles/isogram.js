'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/isogram/{word}',
    config: {
      description: 'Find isograms',
      validate: {
        params: {
          word: Joi.string().required()
        }
      },
      handler: function(request, reply){
        var sepLetters = request.params.word.split('');
        var isIsogram = true;
        var histogram = {};
        isIsogram = sepLetters.every(function(letter){
          if(histogram[letter]){
            // not empty now!
          }else{
            histogram[letter] = 1;
            return true;
          }
        });
        console.log('*************', isIsogram);
        return reply({value: isIsogram});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'puzzles.isogram'
};
