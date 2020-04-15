const { Segments, Joi } = require('celebrate');
const { ongIdValidator } = require('./ongIdValidator');

module.exports = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    whatsapp: Joi.number().min(100000000).max(99999999999).required(),
    city: Joi.string().required(),
    uf: Joi.string().length(2).required(),
  }),

  [Segments.PARAMS]: {
    id: ongIdValidator,
  },
};
