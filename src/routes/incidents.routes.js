const express = require('express');
const router = express.Router();

const IncidentController = require('../controllers/IncidentController');

const { findIncident } = require('../middlewares/findIncident');

router.get('/', IncidentController.index);
router.post('/', [findIncident, IncidentController.store]);
router.delete('/:id', [findIncident, IncidentController.destroy]);

module.exports = router;
