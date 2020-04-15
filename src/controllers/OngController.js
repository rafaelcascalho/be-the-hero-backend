const uuid = require('uuid');
const OngsRepository = require('../repositories/OngsRepository');

module.exports = {
  async index(request, response, next) {
    try {
      const ongs = await OngsRepository.all();
      return response.status(200).json({
        status: 'success',
        ongs: ongs,
      });
    } catch (error) {
      return next(error);
    }
  },

  async store(request, response, next) {
    if (request.ong) {
      return response.status(409).json({
        status: 'error',
        message: 'ONG Already Exists',
      });
    }

    const { name, email, whatsapp, city, uf } = request.body;
    const id = uuid.v4();
    try {
      await OngsRepository.create({ id, name, email, whatsapp, city, uf });
      return response.status(201).json({ status: 'success', id });
    } catch (error) {
      return next(error);
    }
  },

  async destroy(request, response, next) {
    try {
      if (!request.ong) {
        return response.status(404).json({
          status: 'error',
          message: 'ONG Not Found',
        });
      }

      await OngsRepository.delete(request.ong.id);

      return response.status(200).json({ status: 'success' });
    } catch (error) {
      return next(error);
    }
  },
};
