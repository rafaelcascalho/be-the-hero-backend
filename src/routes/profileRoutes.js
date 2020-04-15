const express = require('express');
const router = express.Router();
const { celebrate } = require('celebrate');

const { index } = require('../controllers/ProfileController');

const { headers } = require('../validators/ongAuthValidators');

const { findOng } = require('../middlewares/findOng');

router.get('/profile', [celebrate({ headers }), findOng, index]);

module.exports = router;
