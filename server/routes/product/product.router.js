const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductByFarmerId,
  getLatest,
} = require("./product.controller");
const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/id/:id", getProduct);
productRouter.get("/farmer/:id", getProductByFarmerId);
productRouter.get("/latest", getLatest);
productRouter.put("/", updateProduct);
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;
