import { hashSync } from "bcrypt";
import mongoose from "mongoose";
const userSchama = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true,default:"member" },
  createdAt: { type: Date, default: Date.now },
});
userSchama.pre("save", function (next) {
  const user = this;
  const passwordHashed = hashSync(user.password, 10);
  user.password = passwordHashed;
  next();
});
const User = mongoose.models.User || mongoose.model("User", userSchama);
export default User;