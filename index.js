require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

const blueprints = require("./api/endpoints/blueprint");
app.use("/blueprints", blueprints);

const auth = require("./api/endpoints/auth");
app.use("/auth", auth);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
