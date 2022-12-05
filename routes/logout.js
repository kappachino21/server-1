const express = require("express");
const app = express.Router();

app.delete("/", (req, res) => {
  const indexOf = req.state.findIndex((user) => {
    return user.token === Number(req.headers.token);
  });

  delete req.state[indexOf].token;

  res.send({ status: 1 });
});

module.exports = app;
