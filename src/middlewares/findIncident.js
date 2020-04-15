const IncidentsRepository = require('../repositories/IncidentsRepository');

const args = (request) => {
  const { id } = request.params;
  if (id) {
    return { id };
  }
  return { title: request.body.title };
};

exports.findIncident = async (request, response, next) => {
  const incident = await IncidentsRepository.findOne(args(request));

  if (incident) {
    request.incident = incident;
  }
  next();
};
