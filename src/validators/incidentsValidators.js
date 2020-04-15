const { Segments, Joi } = require('celebrate');

module.exports = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().optional(),
  }),

  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().min(8).required(),
    value: Joi.number().min(0).required(),
    description: Joi.string().min(15).required(),
  }),
  [Segments.PARAMS]: {
    id: Joi.number().required(),
  },
};
