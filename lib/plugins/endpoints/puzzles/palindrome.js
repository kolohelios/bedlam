'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/palindrome/{string}',
    config: {
      description: 'Return boolean of whether string is palindrome or not',
      validate: {
        params: {
          string: Joi.string().required()
        }
    },
      handler: function(request, reply){
        console.log('**************', request.params.string);
        var palArray = request.params.string.split('');
        var isPalindrome = true;
        var compareArray = palArray.filter(function(letter){
          if(letter !== ' '){
            return letter;
          }
        });
        var reversedArray = (JSON.parse(JSON.stringify(compareArray)));
        reversedArray.reverse();
        for(var i = 0; i < compareArray.length; i++){
          console.log('compare: ', compareArray[i], 'reversed: ', reversedArray[i]);
          if(compareArray[i] !== reversedArray[i]){
            isPalindrome = false;
          }
        }
        return reply({value: isPalindrome});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'puzzles.palindrome'
};
