const express = require('express');
const bookController = require('../controller/bookController');

const router = express.Router();

router.route('/').get(bookController.getAllBooks);

module.exports = router;
