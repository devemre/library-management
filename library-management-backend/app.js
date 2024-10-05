const express = require('express');
const userRouter = require('./routes/userRoutes');
const bookRouter = require('./routes/bookRoutes');

const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/books', bookRouter);

module.exports = app;
