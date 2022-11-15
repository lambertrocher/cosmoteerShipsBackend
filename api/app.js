require("dotenv").config();
const express = require("express");
const blueprints = require("./endpoints/blueprint");
const auth = require("./endpoints/auth");

function createApp() {
  const app = express();

  app.use("/blueprints", blueprints);
  app.use("/auth", auth);
  return app;
}

module.exports = createApp;
