const express = require("express");
const {
  addOrder,
  getAllOrdersByShopper,
  getAllOrdersByFarmer,
  getAllOrders,
  markOrderCompleted
} = require("./order.controller");
const orderRouter = express.Router();
orderRouter.post("/", addOrder);
orderRouter.put("/",markOrderCompleted);
orderRouter.get("/", getAllOrders);
orderRouter.get("/shopper", getAllOrdersByShopper);
orderRouter.get("/farmer", getAllOrdersByFarmer);
module.exports = orderRouter;
