const Order = require("../../models/order");

async function addOrder(req, res) {
  const { orderObject, totalAmount, farmerId, shopperId } = req.body;
  const newOrder = new Order({
    orderObject,
    totalAmount,
    farmerId,
    shopperId,
    orderDate: new Date(Date.now()),
  });
  try {
    const insertedOrder = await newOrder.save();
    return res.status(201).send(insertedOrder);
  } catch (e) {
    console.log(e);
    res.status(401).send(e);
  }
}
async function markOrderCompleted(req, res) {
  const { orderId } = req.body;
  const updation = {
    $set: {
      isCompleted: true,
    },
  };
  try {
    await Order.updateOne({ _id: orderId }, updation);
  } catch (e) {
    console.log(e);
    res.status(401).send(e);
  }
}

async function getAllOrdersByShopper(req, res) {
  const { shopperId } = req.query;
  try {
    const orders = await Order.find({ shopperId }).sort({ isCompleted: 1 });
    return res.status(200).send(orders);
  } catch (e) {
    return res.status(401).send(e);
  }
}
async function getAllOrdersByFarmer(req, res) {
  const { farmerId } = req.query;
  try {
    const orders = await Order.find({ farmerId }).sort({ isCompleted: 1 });
    return res.status(200).send(orders);
  } catch (e) {
    return res.status(401).send(e);
  }
}

async function getAllOrders(req, res) {
  try {
    const orders = await Order.find();
    return res.status(200).send(orders);
  } catch (e) {
    return res.status(401).send(e);
  }
}
module.exports = {
  addOrder,
  markOrderCompleted,
  getAllOrdersByFarmer,
  getAllOrdersByShopper,
  getAllOrders,
};
