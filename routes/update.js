const express = require("express");
const app = express.Router();

app.put("/", (req, res) => {
  const { character, password } = req.body;
  if (!character || !password) {
    res.send({ status: 0 });
    return;
  }
  const indexOfNewUser = req.state.findIndex(
    (user) => user.character === character
  );
  if (indexOfNewUser >= 0) {
    res.send({ status: 0, error: "Existing Character" });
    return;
  }

  const indexOfExistingUser = req.state.findIndex(
    (user) => user.token === Number(req.headers.token)
  );

  req.state[indexOfExistingUser] = {
    character,
    password,
    token: req.currentUser.token,
  };

  res.send({ status: 1 });
});

module.exports = app;
