const express = require('express');
const router = express.Router();
const { celebrate } = require('celebrate');

const { index, store, destroy } = require('../controllers/IncidentController');

const { body, params, query } = require('../validators/incidentsValidators');
const { headers } = require('../validators/ongAuthValidators');

const { findIncident } = require('../middlewares/findIncident');

router.get('/', [celebrate({ query }), index]);
router.post('/', [celebrate({ headers, body }), findIncident, store]);
router.delete('/:id', [celebrate({ headers, params }), findIncident, destroy]);

module.exports = router;
