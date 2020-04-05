const IncidentsRepository = require('../repositories/IncidentsRepository');

module.exports = {
  async index(request, response, next) {
    const { page = 1 } = request.query;

    try {
      const [{ count }] = await IncidentsRepository.count();
      const incidents = await IncidentsRepository.all(page);

      response.header('X-Total-Count', count['count(*)']);

      return response.status(200).json({
        status: 'success',
        incidents: incidents,
      });
    } catch (error) {
      return next(error);
    }
  },

  async store(request, response, next) {
    if (request.incident) {
      return response.status(409).json({
        status: 'error',
        message: 'Incident Already Exists',
      });
    }

    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    try {
      const [id] = await IncidentsRepository.create({
        title,
        description,
        value,
        ong_id,
      });

      return response.status(201).json({
        status: 'success',
        id: id,
      });
    } catch (error) {
      return next(error);
    }
  },

  async destroy(request, response, next) {
    if (!request.incident) {
      return response.status(404).json({
        status: 'error',
        message: 'Incident Not Found',
      });
    }

    const { id } = request.incident;
    const ong_id = request.headers.authorization;

    if (request.incident.ong_id !== ong_id) {
      return response.status(401).json({
        status: 'error',
        message: 'Operation Not Permitted',
      });
    }

    try {
      await IncidentsRepository.delete(id);
      return response.status(200).json({
        status: 'success',
      });
    } catch (error) {
      return next(error);
    }
  },
};
