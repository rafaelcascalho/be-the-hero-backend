exports.globalErrorHandler = async (error, request, response, next) => {
  const status = error.status || 500;
  const message = error.message || 'Server Internal Error';

  return response.status(status).json({
    status: 'error',
    message: message,
  });
};
