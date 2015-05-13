'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/distance/{point1}/{point2}/{point3}/{point4}',
    config: {
      description: 'Return distance between any number of points, accumulated',
      validate: {
        params: {
          point1: Joi.array().required(),
          point2: Joi.array().required(),
          point3: Joi.array(),
          point4: Joi.array()
        }
    },
      handler: function(request, reply){
        var deltaX = Math.pow(request.params.point1[0] - request.params.point2[0], 2);
        var deltaY = Math.pow(request.params.point1[1] - request.params.point2[1], 2);
        var set1 = Math.sqrt(deltaX + deltaY);
        var deltaX2 = Math.pow(request.params.point2[0] - request.params.point3[0], 2);
        var deltaY2 = Math.pow(request.params.point2[1] - request.params.point3[1], 2);
        var set2 = Math.sqrt(deltaX2 + deltaY2);
        var deltaX3 = Math.pow(request.params.point3[0] - request.params.point4[0], 2);
        var deltaY3 = Math.pow(request.params.point3[1] - request.params.point4[1], 2);
        var set3 = Math.sqrt(deltaX3 + deltaY3);
        console.log(set1, set2, set3);
        var distance = set1 + set2 + set3;
        distance = distance.toFixed(2);
        distance = parseFloat(distance);
        return reply({value: distance});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'puzzles.distance'
};
