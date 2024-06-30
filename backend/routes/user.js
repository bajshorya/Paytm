// backend/routes/user.js
const express = require("express");

const router = express.Router();
const z = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const router = express.Router();

// Signup Schema
const signupSchema = z.object({
  username: z.string().email(),
  password: z.string(),
  lastName: z.string(),
  firstName: z.string(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
  });

  if (user) {
    return res.status(400).json({
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
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne(req.body, {
    id: req.userId,
  });

  res.json({
    message: "Updated successfully",
  });
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

export default router;
