const express = require("express");
const UserModel = require("../model/userSchema");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

//* --Create User

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
});
// Getting User By ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
});

// Creating User
router.post("/", async (req, res) => {
  const userData = req.body;
  try {
    const userExist = await UserModel.findOne({ email: userData.email });

    if (userExist) {
      return res.json({ msg: "User already exist" });
    }
    const SALT = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(userData.password, SALT);
    userData.password = hashedPassword;
    const user = await UserModel.create(userData);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json("You already created one");
  }
});

// Deleting User
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findByIdAndDelete(id);
    res.status(204).json(user);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
