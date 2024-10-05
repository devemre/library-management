const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

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

module.exports = Book;
