const sequelize = require('../config/db');
const Book = require('../models/book');
const Borrow = require('../models/borrow');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getBookWithAverageScore = async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json('Book not found');
    }

    const avgScore = await Borrow.findOne({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('score')), 'avgScore'], // Use sequelize correctly
      ],
      where: { book_id: bookId },
      raw: true,
    });

    res.status(200).json({
      id: book.id,
      name: book.name,
      score:
        avgScore && avgScore.avgScore !== null
          ? parseFloat(avgScore.avgScore).toFixed(2)
          : -1,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  getAllBooks,
  getBookWithAverageScore,
};
