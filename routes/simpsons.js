const express = require("express");
const app = express.Router();

app.delete("/", (req, res) => {
  const indexOf = req.state.findIndex(
    (user) => user.token === req.headers.token
  );

  req.state.splice(indexOf, 1);

  res.send({ status: 1 });
});

module.exports = app;
