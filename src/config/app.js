const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./logger');
const app = express();

const routes = require('../routes');

const { globalErrorHandler } = require('../handlers/globalErrorHandler');

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use('/api/v1', routes);
app.use(errorLogger);
app.use(globalErrorHandler);

module.exports = app;
