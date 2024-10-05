const express = require('express');
const bookController = require('../controller/bookController');

const router = express.Router();

router.route('/').get(bookController.getAllBooks);

router.route('/:id').get(bookController.getBookWithAverageScore);

module.exports = router;
