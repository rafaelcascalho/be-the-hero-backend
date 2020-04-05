module.exports = {
  async login(request, response, next) {
    if (!request.ong) {
      return response.status(404).json({
        status: 'error',
        message: 'ONG Not Found',
      });
    }

    try {
      return response.status(200).json({
        status: 'success',
        name: request.ong.name,
      });
    } catch (error) {
      return next(error);
    }
  },
};
