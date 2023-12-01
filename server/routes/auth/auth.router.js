const express = require("express");
const { login, signup,getSingleUser } = require("./auth.controller");
const authRouter = express.Router();
authRouter.post("/login/", login);
authRouter.post("/signup/", signup);
authRouter.get("/:id", getSingleUser);
module.exports = authRouter;
