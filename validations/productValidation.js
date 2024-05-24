const Joi = require('joi');

exports.createProductSchema = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.number().integer().required(),
  description: Joi.string().required(),
});
