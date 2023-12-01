const request = require("supertest");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");
const app = require("../../app");
describe("Review API", () => {
  beforeAll(async () => {
    await mongoConnect();
  }, 10000);
  describe("Test POST /review", () => {
    const validReviewData = {
      name: "Prakhar",
      desc: "sGood apple",
      rating: 4,
      productId: "6569dd578767340725d77575",
    };
    const reviewDataWithWrongProductId = {
      ame: "Prakhar",
      desc: "sGood apple",
      rating: 4,
      productId: "69aadd578767340725d77575",
    };
    test("It should respond with 201 ", async () => {
      const response = await request(app)
        .post("/v1/review")
        .send(validReviewData)
        .expect(201);
    });
    test("It should respond with 404 if product is not found", async () => {
      const response = await request(app)
        .post("/v1/review")
        .send(reviewDataWithWrongProductId)
        .expect(404);
    });
  });
  afterAll(async () => {
    await mongoDisconnect();
  });
});
