const supertest = require("supertest");
const { app } = require("./conf");

//todo truncate table after signup to avoid test failing when running a second time
describe("Test authentication routes", () => {
  test("Signup should return ok status", async () => {
    return supertest(app)
      .post("/auth/signup")
      .send({
        email: "testsignup@email.com",
        password: "password",
      })
      .expect(200);
  });

  test("Signup again with same email should return 409", async () => {
    return supertest(app)
      .post("/auth/signup")
      .send({
        email: "testsignup@email.com",
        password: "password",
      })
      .expect(409);
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
