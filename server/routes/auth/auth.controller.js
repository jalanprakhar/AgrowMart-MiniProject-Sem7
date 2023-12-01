require("dotenv").config();
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).send("Missing email or password");
    return;
  }

  try {
    const sanitizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: sanitizedEmail });
    let correctPassword = false;
    if (existingUser) {
      correctPassword = await bcrypt.compare(password, existingUser.password);
    }
    if (correctPassword) {
      const token = jwt.sign(
        { user_id: existingUser.user_id },
        process.env.JWT_KEY,
        { expiresIn: "1d" }
      );
      res.status(200).json({ token, userId: existingUser._id });
      return;
    }
    res.status(401).send("Invalid Credentials");
  } catch (e) {
    res.status(400).send(e.message);
    console.log(e.message);
  }
}

async function signup(req, res) {
  const { email, password, name, role, phone_number } = req.body;

  console.log(email, password, name, role, phone_number);

  if (!email || !password || !role) {
    res.status(409).send("Missing email, role or password");
    return;
  }
  const hashed_password = await bcrypt.hash(password, 10);
  try {
    const sanitizedEmail = email.toLowerCase();
    const existingUser = await User.find({ email: sanitizedEmail });
    if (existingUser.length > 0) {
      return res.status(409).send("User already exists, Please Login");
    }
    const newUser = new User({
      email: sanitizedEmail,
      name: name,
      password: hashed_password,
      role: role,
      phone_number: phone_number,
    });
    1;

    const insertedUser = await newUser.save();

    const token = jwt.sign({ user_id: insertedUser._id }, process.env.JWT_KEY, {
      expiresIn: "8d",
    });
    res.status(201).json({ token, userId: insertedUser._id });
  } catch (e) {
    console.log(e);
    res.status(409).send(e.message);
  }
}
async function getSingleUser(req,res){
  const {id}=req.params;
  try{
    const user=await User.findById(id);
    return res.status(200).send(user);

  }catch(e){
    return res.status(401).send(e);
  }
}

module.exports = {
  login,
  signup,
  getSingleUser
};
