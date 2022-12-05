const express = require("express");
const app = express.Router();

app.post("/", (req, res) => {
  const { character, password } = req.body;

  if (!character || !password) {
    res.send({ status: 0 });
  }

  const indexOf = req.state.findIndex((user) => user.character === character);
  if (indexOf >= 0) {
    res.send({ staus: 0, error: "Existing Character" });
    return;
  }
  req.state.push({ character, password });
  res.send({ status: 1 });
});

module.exports = app;
