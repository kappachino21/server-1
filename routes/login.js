const express = require("express");
const app = express.Router();

app.post("/", (req, res) => {
  const { character, password } = req.body;

  const indexOf = req.state.findIndex(
    (user) => user.character === character && user.password === password
  );

  if (indexOf === -1) {
    res.send({
      status: 0,
      error: "Character or Password or both did not match",
    });
    return;
  }
  const token = Math.round(Math.random() * 100000000000);

  req.state[indexOf].token = token;

  res.send({ status: 1, token });
});

module.exports = app;
