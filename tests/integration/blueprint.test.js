const supertest = require("supertest");
const { app, get_common_headers } = require("./conf");

describe("Test getting blueprints", () => {
  test("Getting one blueprint should return status ok", async () => {
    const response = await supertest(app)
      .get("/blueprints/12ef95ef-ba8b-4251-b5ec-9c9421fc0692")
      .set(await get_common_headers());
    expect(response.statusCode).toBe(200);
  });

  test("Downloading one blueprint should return status ok", async () => {
    const response = await supertest(app)
      .get("/blueprints/12ef95ef-ba8b-4251-b5ec-9c9421fc0692/file")
      .set(await get_common_headers());
    expect(response.statusCode).toBe(200);
  });
});
