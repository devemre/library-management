const User = require('../models/user');
const Book = require('../models/book');
const Borrow = require('../models/borrow');

const borrowBook = async (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;

  try {
    const user = await User.findByPk(userId);
    const book = await Book.findByPk(bookId);

    if (!user || !book) {
      return res.status(404).json('User or book not found');
    }

    const existingBorrow = await Borrow.findOne({
      where: {
        book_id: bookId,
        is_returned: false,
      },
    });

    if (existingBorrow) {
      return res.status(400).json('Book already borrowed');
    }

    await Borrow.create({
      user_id: userId,
      book_id: bookId,
    });

    res.status(204).json();
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const returnBook = async (req, res) => {
  const userId = req.params.userId;
  const bookId = req.params.bookId;

  const { score } = req.body;

  if (!score) {
    return res.status(400).json('Score is required');
  }

  try {
    const borrow = await Borrow.findOne({
      where: { user_id: userId, book_id: bookId, is_returned: false },
    });

    if (!borrow) {
      return res.status(404).json('Borrow not found');
    }

    borrow.is_returned = true;
    borrow.score = score;
    await borrow.save();

    res.status(204).json();
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { borrowBook, returnBook };
