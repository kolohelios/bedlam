'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/converters/currency/{amount}/{locale}',
    config: {
      description: 'Get currency formatted for a particular locale',
      validate: {
        params: {
          amount: Joi.string().required(),
          locale: Joi.string().required()
        }
    },
      handler: function(request, reply){
        var locale = request.params.locale;
        var locales = {
          malaysia: {
            symbol: 'R',
            delimiter: ',',
            decimal: '.'
          },
          spain: {
            symbol: '€',
            delimiter: '.',
            decimal: ','
          }
        };
        var numToFormat = request.params.amount;
        numToFormat = numToFormat.split('');
        numToFormat.push(locales[locale].symbol);
        for(var i = numToFormat.length - 3; i > 0; i -= 3){
          var char = (numToFormat.length - i - 1) >= 3 ? locales[locale].delimiter : locales[locale].decimal;
          numToFormat.splice(i, 0, char);
        }
        numToFormat = numToFormat.join('');
        console.log('this is output: ', numToFormat);
        return reply({value: numToFormat});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'converters.currency'
};
