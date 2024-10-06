const User = require('../models/user');
const Book = require('../models/book');
const Borrow = require('../models/borrow');
const { get } = require('../routes/userRoutes');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getUserWithBooks = async (req, res) => {
  const userId = req.params.id;
  const idIncluded = req.query.idIncluded === 'true';

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json('User not found');
    }

    const borrows = await Borrow.findAll({
      where: { user_id: userId },
      include: {
        model: Book,
        attributes: ['name'],
      },
    });

    const past = borrows
      .filter((borrow) => borrow.is_returned)
      .map((borrow) => ({
        ...(idIncluded ? { id: borrow.book_id } : {}),
        name: borrow.Book.name,
        userScore: borrow.score,
      }));

    const present = borrows
      .filter((borrow) => !borrow.is_returned)
      .map((borrow) => ({
        ...(idIncluded ? { id: borrow.book_id } : {}),
        name: borrow.Book.name,
      }));

    const books = { past, present };

    res.status(200).json({
      id: user.id,
      name: user.name,
      books: books,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const createUser = async (req, res) => {
  const { name } = req.body;

  try {
    const newUser = await User.create({ name });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json('User not found');
    }

    user.name = name || user.name;
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json('User not found');
    }

    await user.destroy();

    res.status(204).json('User deleted successfully');
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  getAllUsers,
  getUserWithBooks,
  createUser,
  updateUser,
  deleteUser,
};
