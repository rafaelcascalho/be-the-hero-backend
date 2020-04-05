const OngsRepository = require('../repositories/OngsRepository');

const findOngId = request => {
  return request.params.id || request.body.id || request.headers.authorization;
};

const args = request => {
  const id = findOngId(request);
  if (id) {
    return { id: id };
  }
  return { name: request.body.name };
};

exports.findOng = async (request, response, next) => {
  const ong = await OngsRepository.findOne(args(request));

  if (ong) {
    request.ong = ong;
  }
  next();
};
