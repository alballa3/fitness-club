import { connectToDatabase } from "@/lib/db/mongodb";
import User from "@/lib/db/user";

export default async function handler(req, res) {
  const { name, email, password, userdata } =JSON.parse(req.body)
  await connectToDatabase();
  try {
    // Create a new User instance
    const user = new User({
      email: email,
      name: name,
      password: password,
      data: {
        dateOfBirth: userdata.dateOfBirth,
        gender: userdata.gender,
        height: userdata.height,
        weight: userdata.weight,
        fitnessGoals: userdata.fitnessGoals,
        targetWeight: userdata.targetWeight,
        activityLevel: userdata.activityLevel,
        exerciseDays: userdata.exerciseDays,
      },
    });

    // Save the user to the database
    const savedUser = await user.save();

    // Return the saved user (excluding sensitive info like password)
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: savedUser._id,
        email: savedUser.email,
        name: savedUser.name,
        data: savedUser.data,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error saving user:", error);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
}
