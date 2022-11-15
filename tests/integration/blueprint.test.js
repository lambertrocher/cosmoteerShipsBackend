const supertest = require("supertest");
const { app, get_common_headers } = require("./conf");

describe("Test getting blueprints", () => {
  test("Getting one blueprint should return status ok", async () => {
    const response = await supertest(app)
      .get("/blueprints/7175f5be-47f2-48f9-b655-11269e1dc936")
      .set(await get_common_headers());
    expect(response.statusCode).toBe(200);
  });

  test("Getting one blueprint that does not exsit should return not found status", async () => {
    const response = await supertest(app)
      .get("/blueprints/22be791b-a880-4f3c-92bd-8f4dde075b54")
      .set(await get_common_headers());
    expect(response.statusCode).toBe(404);
  });

  test("Downloading one blueprint with not file uploaded should return not found status", async () => {
    const response = await supertest(app)
      .get("/blueprints/7175f5be-47f2-48f9-b655-11269e1dc936/file")
      .set(await get_common_headers());
    expect(response.statusCode).toBe(404);
  });
});
