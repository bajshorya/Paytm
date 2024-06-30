import mongoose from "mongoose";
const { Schema } = mongoose;

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://admin:Y6aH3nOuK2E7y9vc@cluster0.51xfrcy.mongodb.net/paytm"
);

const userSchema = new Schema({
  // Schema definition here
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});
const accountSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports({
  User,
  Account,
});
