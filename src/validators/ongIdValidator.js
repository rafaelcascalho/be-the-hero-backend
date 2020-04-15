const { Joi } = require('celebrate');

exports.ongIdValidator = Joi.string().uuid().required();
