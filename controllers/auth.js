const { User } = require("../sequelizeConnect");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { JWT_SECRET } = process.env;

router.post("/authenticate", async (req, res) => {
  try {
    const { fname, email, password } = req.body;

    const checkData = await User.findOne({ where: { fname } });
    if (checkData) {
      return res.status(500).json({ message: "fname is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      fname: fname,
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: "1h" });

    return res.status(201).json({
      message: "User successfully created",
      username: fname,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
