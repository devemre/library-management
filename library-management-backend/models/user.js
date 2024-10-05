const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Book = require('./book');

const User = sequelize.define(
  'User',
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

User.belongsToMany(Book, { through: 'Borrow', foreignKey: 'user_id' });

module.exports = User;
