const express = require('express');
const router = express.Router();

const ongsRoutes = require('./ongsRoutes');
const incidentsRoutes = require('./incidentsRoutes');
const profileRoutes = require('./profileRoutes');
const sessionsRoutes = require('./sessionsRoutes');

router.use('/ongs', ongsRoutes);
router.use('/incidents', incidentsRoutes);
router.use(profileRoutes);
router.use(sessionsRoutes);

module.exports = router;
