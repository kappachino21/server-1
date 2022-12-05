const express = require("express");
const app = express();
const simpsons = require("./simpsons.json");
const bodyParser = require("body-parser");

const state = [...simpsons];

app.use(bodyParser.json());

app.use(function (req, res, next) {
  req.state = state;
  next();
});

const auth = (req, res, next) => {
  const indexOf = state.findIndex((user) => {
    return user.token === Number(req.headers.token);
  });

  if (indexOf === -1) {
    res.send({ status: 0, error: "Token was not found" });
    return;
  }
  req.currentUser = state[indexOf];

  next();
};
app.use("/add", require("./routes/add"));
app.use("/", require("./routes/simpsons"));
app.use("/get", auth, require("./routes/get"));
app.use("/login", require("./routes/login"));
app.use("/update", auth, require("./routes/update"));
app.use("/logout", auth, require("./routes/logout"));

app.use(bodyParser.json());

const port = process.env.PORT || 6001;
app.listen(port, () => {
  console.log("Server started on port: " + port);
});
