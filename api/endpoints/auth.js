const express = require("express");

const router = express.Router();

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const { login, signup } = require("../services/auth");

/**
 * Login using email and password, returns a jwt token
 */
router.post("/login", jsonParser, async (req, res, next) => {
  let { email, password } = req.body;
  try {
    res.send(await login(email, password));
  } catch (error) {
    if (error.name === "AuthenticationError") {
      return res
        .status(401)
        .send("Unable to authenticate you, incorrect email or password");
    }
    return next(error);
  }
});

/**
 * Signup using email and password
 */
router.post("/signup", jsonParser, async (req, res, next) => {
  const { email, password } = req.body;
  try {
    await signup(email, password);
    return res.send("Signup successful.");
  } catch (error) {
    if (error.name === "DuplicatedUserEmailError") {
      return res.status(409).send("Email already used.");
    }
    next(error);
  }
});

module.exports = router;
