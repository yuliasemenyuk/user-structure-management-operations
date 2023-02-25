const express = require("express");

const usersRouter = require('./routes/api/users');

const app = express();

app.use('/api/users', usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
