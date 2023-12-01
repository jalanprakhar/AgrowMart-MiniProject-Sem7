const express = require("express");
const { addReview, getReview } = require("./review.controller");
const reviewRouter = express.Router();
reviewRouter.post("/", addReview);
reviewRouter.get("/:id", getReview);
module.exports = reviewRouter;
