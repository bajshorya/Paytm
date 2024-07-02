const express = require("express");
const router = express.Router();
const z = require("zod");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db/db.js");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware"); // Update path
// Signup Schema
const signupSchema = z.object({
  username: z.string().email(),
  password: z.string(),
  lastName: z.string(),
  firstName: z.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken/Incorrect inputs",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});

// Signin Schema
const signinSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});

router.post("/signin", async (req, res) => {
  const result = signinSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
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

  res.status(400).json({
    message: "Error while logging in",
  });
});

const updateBody = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success, data } = updateBody.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: "Error while updating information",
    });
  }

  try {
    // Update user information based on userId from authMiddleware
    const updatedUser = await User.findByIdAndUpdate(req.userId, data, {
      new: true, // To return the updated document
    });

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "Updated successfully",
      user: updatedUser, // Optionally return updated user data
    });
  } catch (error) {
    console.error("Error while updating user:", error);
    res.status(500).json({
      message: "Server error while updating information",
    });
  }
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
