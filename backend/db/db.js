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

const User = mongoose.model("User", userSchema);

module.exports({
  User,
});
