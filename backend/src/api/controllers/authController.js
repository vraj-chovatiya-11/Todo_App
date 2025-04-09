const { User } = require("../../database/models/User");
const jwt = require("jsonwebtoken");
const {
  validationLoginInput,
  validationRegisterInput,
} = require("../../utils/validation");
const fs = require("fs");
const path = require("path");
const { exit } = require("process");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const { errors, isValid } = validationRegisterInput(
      username,
      email,
      password
    );
    if (!isValid) {
      return res.status(400).json({ errors });
    }

    // Check if user already exists
    const existingEmail = await User.findByEmail(email);
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const existingUsername = await User.findByUsername(username);
    if (existingUsername) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Create new user
    const userId = await User.create({
      username,
      email,
      password,
      // profileImage
    });

    if (userId) {
      console.log("userId :", userId);
      console.log("User :", req.body);
    }
    res.status(201).json({ message: "User registered successfully..." });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("user try to login :", req.body);

    const isvalid = validationLoginInput(email, password);
    if (isvalid.isValid === false) {
      console.log(isvalid);
      return res.status(400).json({ message: "invalid data." });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const dbPassword = await User.password(email);

    const isMatch = await User.comparePassword(password, dbPassword.password);

    // console.log("isPassword Match : ", isMatch);
    console.log("User logged In id :", dbPassword.id);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credential.!" });
    }

    const payload = {
      user: {
        id: User.id,
      },
    };

    // console.log("User id : ",dbPassword.id);
    const token = jwt.sign(
      {
        id: dbPassword.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    if (token) {
      res.status(201).json({ message: "Login Successfully", Token: token });
    }

    console.log("Token", token);
  } catch (error) {
    console.log("Login error..");
    res.status(400).json({ message: "Invalid Credential" });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    console.log("-------------------------------");
    const uId = req.user;
    const user = await User.findById(uId);
    if (!user) {
      return res.status(404).json({ message: "User not found.!" });
    }
    res.json(user);
  } catch (err) {
    console.log("user side error");
    res.status(500).json({ message: "server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userFound = await User.findById(userId);

    if (!userFound) {
      return res.status(404).json({ message: "User not found..!" });
    }

    const deleteUser = await User.deleteUser(userId);

    if (!deleteUser) {
      res.status(500).json({ message: "user not deleted..." });
    } else {
      res.status(200).json({ message: "User Deleted Successfully.." });
    }
  } catch (err) {
    console.log("Delete user error..!");
    res.status(500).json({ message: "Server Error" });
  }
};
