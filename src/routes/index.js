const express = require('express');
const router = express.Router();

const ongsRoutes = require('./ongs.routes');
const incidentsRoutes = require('./incidents.routes');

const ProfileController = require('../controllers/ProfileController');
const SessionController = require('../controllers/SessionController');

const { findOng } = require('../middlewares/findOng');

router.use('/ongs', ongsRoutes);
router.use('/incidents', incidentsRoutes);

router.get('/profile', [findOng, ProfileController.index]);
router.post('/sessions', [findOng, SessionController.login]);

module.exports = router;
