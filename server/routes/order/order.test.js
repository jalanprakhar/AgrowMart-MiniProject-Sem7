const request = require("supertest");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");
const app = require("../../app");
describe("Review API", () => {
let id="1";
  beforeAll(async () => {
    await mongoConnect();
  }, 10000);
  describe("Test POST /order", () => {
    const validOrder={
        orderObject:{
            productId: "6569dd578767340725d77575",
            quantity: 1,
            price: 50
        },
        totalAmount:50,
        farmerId:1,
        shopperId:2

    }
    
    test("It should respond with 201 ", async () => {
      const response = await request(app)
        .post("/v1/order")
        .send(validOrder)
        .expect(201);
    });
    
  });
  
  describe("Test Get /order", () => {
    
    
    test("It should respond with 200 ", async () => {
      const response = await request(app)
        .get("/v1/order")
        .expect(200);
    });
    
  });
  afterAll(async () => {
    await mongoDisconnect();
  });
});
