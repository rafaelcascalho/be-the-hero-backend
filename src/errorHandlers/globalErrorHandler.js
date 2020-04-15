const { isCelebrate } = require('celebrate');

const errorStatus = (error) => {
  if (isCelebrate(error)) {
    return 400;
  }
  return error.statusCode || 500;
};

const errorMessage = (error) => {
  if (isCelebrate(error)) {
    return presentMessage(error.message);
  }
  return error.message || 'Server Internal Error';
};

const presentMessage = (message) => message.replace('"', '').replace('"', '');

exports.globalErrorHandler = async (error, request, response, next) => {
  console.log(error);

  let statusCode = errorStatus(error);
  let message = errorMessage(error);

  return response.status(statusCode).json({
    status: 'error',
    message: message,
  });
};
