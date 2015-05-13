'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/math/computearea/rectangle/{width}/{height}',
    config: {
      description: 'Find area of a rectangle',
      validate: {
        params: {
          width: Joi.number().required(),
          height: Joi.number().required()
        }
      },
      handler: function(request, reply){
        return reply({value: request.params.width * request.params.height});
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'math.computeAreaRectangle'
};
