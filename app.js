const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
require("dotenv").config();

const { MONGO_BASE_URL } = process.env;

const usersRouter = require('./routes/api/users');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(express.json());

app.use('/api/users', usersRouter);


mongoose.set("strictQuery", true);
mongoose.connect(MONGO_BASE_URL, () => console.log("DB is connect"));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
