const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/auth", async (req, res) => {
  try {
    const { email, password, passwordVerify } = req.body;

    // validate input
    if (!email || !password || !passwordVerify) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Please use a password with at least 6 characters" });
    }

    if (password !== passwordVerify) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // validate existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "An account with this email already exists" });
    }

    // hash password and save user

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();

    // generate JWT

    const jwtData = {
      id: savedUser._id,
    };

    const token = jwt.sign(jwtData, process.env.JWT_SECRET);

    // return token and data

    return res
      .status(200)
      .cookie("token", token, { httpOnly: true, maxAge: 90000000 })
      .json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill in a username and a password" });
    }

    const loginUser = await User.findOne({ email });

    if (!loginUser) {
      return res
        .status(401)
        .json({ message: "Incorrect user and/or password" });
    }

    const correctPassword = await bcrypt.compare(password, loginUser.password);

    if (!correctPassword) {
      return res
        .status(401)
        .json({ message: "Incorrect user and/or password" });
    }

    // generate JWT

    const jwtData = {
      id: loginUser._id,
    };

    const token = jwt.sign(jwtData, process.env.JWT_SECRET);

    // return token and data

    return res
      .status(200)
      .cookie("token", token, { httpOnly: true, maxAge: 90000000 })
      .json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/auth/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.json(null);
    const validatedUser = jwt.verify(token, process.env.JWT_SECRET);
    return res.json(validatedUser.id);
  } catch (error) {
    return res.json();
  }
});

router.get("/auth/logOut", (req, res) => {
  try {
    return res.clearCookie("token").json({ message: "logged out" });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
});

module.exports = router;
