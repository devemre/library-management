const sequelize = require('../config/db');
const Book = require('../models/book');
const Borrow = require('../models/borrow');
const User = require('../models/user');

const getAllBooks = async (req, res) => {
  const attributes = ['id', 'name'];
  const { includeAuthor, includeYear } = req.query;

  if (includeAuthor === 'true') {
    attributes.push('author');
  }
  if (includeYear === 'true') {
    attributes.push('year');
  }

  try {
    const books = await Book.findAll({ attributes });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getBookWithAverageScore = async (req, res) => {
  const bookId = req.params.id;
  const { includeAuthor, includeYear, includeCurrentOwner } = req.query;

  try {
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json('Book not found');
    }

    const avgScore = await Borrow.findOne({
      attributes: [[sequelize.fn('AVG', sequelize.col('score')), 'avgScore']],
      where: { book_id: bookId },
      raw: true,
    });

    const currentBorrow = await Borrow.findOne({
      where: { book_id: bookId, is_returned: false },
      include: { model: User, attributes: ['id', 'name'] },
    });

    console.log(currentBorrow);

    const response = {
      id: book.id,
      name: book.name,
      score:
        avgScore && avgScore.avgScore !== null
          ? parseFloat(avgScore.avgScore).toFixed(2)
          : -1,
    };

    if (includeAuthor === 'true') {
      response.author = book.author;
    }

    if (includeYear === 'true') {
      response.year = book.year;
    }

    if (includeCurrentOwner === 'true' && currentBorrow !== null) {
      response.currentOwner = currentBorrow.User;
    }

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  getAllBooks,
  getBookWithAverageScore,
};
