const express = require('express');
const userController = require('../controller/userController');
const borrowController = require('../controller/borrowController');

const router = express.Router();

router.route('/').get(userController.getAllUsers);

router.route('/:id').get(userController.getUserWithBooks);
router.route('/:userId/borrow/:bookId').post(borrowController.borrowBook);
router.route('/:userId/return/:bookId').post(borrowController.returnBook);

module.exports = router;
