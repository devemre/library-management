const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Book = sequelize.define(
  'Book',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Book.belongsToMany(User, { through: 'Borrow', foreignKey: 'book_id' });

module.exports = Book;
