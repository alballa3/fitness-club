import { hashSync } from "bcrypt";
import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema(
  {
    dateOfBirth: mongoose.Schema.Types.Date,
    gender: {type:String,enum:["male","female"]},
    height: Number,
    weight: Number,
    fitnessGoals: Array,
    targetWeight: Number,
    activityLevel: String,
    exerciseDays: Number,
  },
  { _id: false }
); // _id: false prevents creation of a nested _id field for sub-documents

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "member",
      enum: ["member", "admin", "coach"],
    }, // Add enum for role options if needed
    data: {
      type: userDataSchema,
      default: {
        dateOfBirth: new Date(),
        gender: "male",
        height: 0,
        weight: 0,
        fitnessGoals: [],
        targetWeight: undefined,
        activityLevel: "",
        exerciseDays: 0,
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);
userSchema.pre("save", function (next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (user.isModified("password")) {
    user.password = hashSync(user.password, 10);
  }

  next();
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
