const express = require('express');
const router = express.Router();
const { celebrate } = require('celebrate');

const { login } = require('../controllers/SessionController');

const { body } = require('../validators/sessionsValidators');

const { findOng } = require('../middlewares/findOng');

router.post('/sessions', [celebrate({ body }), findOng, login]);

module.exports = router;
