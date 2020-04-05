const IncidentsRepository = require('../repositories/IncidentsRepository');

module.exports = {
  async index(request, response, next) {
    if (!request.ong) {
      return response.status(404).json({
        status: 'error',
        message: 'ONG Not Found',
      });
    }

    try {
      const incidents = await IncidentsRepository.find(request.ong.id);

      return response.status(200).json({
        status: 'success',
        incidents: incidents,
      });
    } catch (error) {
      return next(error);
    }
  },
};
