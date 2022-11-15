require("dotenv").config();
const express = require("express");
const blueprints = require("./api/endpoints/blueprint");
const auth = require("./api/endpoints/auth");

function createApp() {
  const app = express();

  app.use("/blueprints", blueprints);
  app.use("/auth", auth);

  app.get("/", (req, res) => {
    setTimeout(() => {
      console.log("Async code example.");
      throw new Error("Hello Error!");
    }, 1000);
  });
  return app;
}

module.exports = createApp;
