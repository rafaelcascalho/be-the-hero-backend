const express = require('express');
const router = express.Router();
const { celebrate } = require('celebrate');

const { index, store, destroy } = require('../controllers/OngController');

const { body, params } = require('../validators/ongsValidators');

const { findOng } = require('../middlewares/findOng');

router.get('/', index);
router.post('/', [celebrate({ body }), findOng, store]);
router.delete('/:id', [celebrate({ params }), findOng, destroy]);

module.exports = router;
