const { Segments, Joi } = require('celebrate');
const { ongIdValidator } = require('./ongIdValidator');

module.exports = {
  [Segments.HEADERS]: Joi.object({
    authorization: ongIdValidator,
  }).unknown(),
};
