const express = require("express");
const router = express.Router();
import { string, z } from "zod";
const jwt = require("jsonwebtoken");
const { User } = require("../db");
//signup
// creating a schema
const signupSchema = z.object({
  username: z.string().email(),
  password: z.string(),
  lastName: z.string(),
  firstName: z.string(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  const user = await User.findOne({
    username: req.body.username,
  });
  if (user._id) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  const dbUser = await User.create(body);
  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_SECRET
  );
  res.json({
    message: "User created Successfully",
    token: token,
  });
});

//signin
//creating schema

const signinSchema = z.object({
  username: z.string().email(),
  password: string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
    return;
  }
  res.status(411).json({
    message: "Error while logging in",
  });
});
module.exports = router;
