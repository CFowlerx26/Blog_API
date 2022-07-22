const express = require("express");
const UserModel = require("../model/userSchema");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//* Creating Router
const router = express.Router();

//* Getting User
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

//Create or Register a new User
router.post(
  "/",
  [
    check("username", "Username is required from Middleware!").notEmpty(),
    check("email", "Please use a valid email from middleware").isEmail(),
    check("password", "Please enter a password").notEmpty(),
    check(
      "password",
      "Please enter a password with six or more characters."
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const userData = req.body;

    //Checks for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors.array());
    }

    //Write the user to the db
    try {
      //checking if there is a user with this email in the db
      const userExist = await UserModel.findOne({ email: userData.email });
      //if user exist we return!
      if (userExist) {
        return res.json({ msg: "User already exist" });
      }

      //*========Create a New User
      // Create the salt
      const SALT = await bcrypt.genSalt(12);
      // Use the salt to creat a hash with the user's password
      const hashedPassword = await bcrypt.hash(userData.password, SALT);
      // Assign the hashed password to the userData
      userData.password = hashedPassword;
      //Write the user to the db
      const user = await UserModel.create(userData);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json("You already created one");
    }
  }
);

//Update User By Id
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  newUsersData = req.body;
  try {
    //find the user by id
    const user = await UserModel.findByIdAndUpdate(id, newUsersData, {
      new: true,
    });
    res.status(202).json(user);
    console.log(user);
  } catch (error) {
    console.log(error);
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
