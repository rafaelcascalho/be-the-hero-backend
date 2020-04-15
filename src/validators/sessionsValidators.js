const { Segments, Joi } = require('celebrate');
const { ongIdValidator } = require('./ongIdValidator');

module.exports = {
  [Segments.BODY]: Joi.object().keys({
    id: ongIdValidator,
  }),
};
