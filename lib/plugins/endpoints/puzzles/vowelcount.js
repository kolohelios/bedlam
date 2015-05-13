'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/vowelcount/{text}',
    config: {
      description: 'Return count of vowels in a text string',
      validate: {
        params: {
          text: Joi.string().required()
        }
    },
      handler: function(request, reply){
        var utterance = request.params.text.split('');
        var vowelCount = 0;
        utterance.forEach(function(letter){
          if(letter === 'a' || letter === 'e' || letter === 'i' || letter === 'o' || letter === 'u'){
            vowelCount++;
          }
          return vowelCount;
        });
        console.log('vowelCount', vowelCount);
        return reply({value: vowelCount});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'puzzles.vowelcount'
};
