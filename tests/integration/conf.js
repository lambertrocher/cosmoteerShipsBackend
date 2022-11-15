const createApp = require("../../app");
const supertest = require("supertest");

const app = createApp();

async function get_bearer_token() {
  const token = await supertest(app).post("/auth/login").send({
    email: "user@email.com",
    password: "password",
  });
  return `Bearer ${token.res.text}`;
}

async function get_common_headers() {
  return {
    Accept: "application/json",
    Authorization: await get_bearer_token(),
  };
}

module.exports = { app, get_common_headers };
