const express = require('express');
const router = express.Router();

const OngController = require('../controllers/OngController');
const { findOng } = require('../middlewares/findOng');

router.get('/', OngController.index);
router.post('/', [findOng, OngController.store]);
router.delete('/:id', [findOng, OngController.destroy]);

module.exports = router;
