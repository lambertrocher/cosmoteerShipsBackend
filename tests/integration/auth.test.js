const supertest = require("supertest");
const { app } = require("./conf");

describe("Test authentication routes", () => {
  test("Signup should return ok status", async () => {
    return supertest(app)
      .post("/auth/signup")
      .send({
        email: "test@email.com",
        password: "password",
      })
      .expect(200);
  });

  test("Login should return ok status", async () => {
    return supertest(app)
      .post("/auth/login")
      .send({
        email: "test@email.com",
        password: "password",
      })
      .expect(200);
  });
});
