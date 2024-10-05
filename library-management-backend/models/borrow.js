const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Book = require('./book');

const Borrow = sequelize.define(
  'Borrow',
  {
    score: {
      type: DataTypes.INTEGER,
    },
    is_returned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Book,
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
  }
);

Borrow.belongsTo(Book, { foreignKey: 'book_id' });
Borrow.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Borrow;
