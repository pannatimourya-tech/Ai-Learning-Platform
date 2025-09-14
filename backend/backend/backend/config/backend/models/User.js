// backend/models/User.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },
    profile: {
      degree: { type: String, default: "" },
      institution: { type: String, default: "" },
    },
    progress: [
      {
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
        completedLessons: { type: Number, default: 0 },
        score: { type: Number, default: 0 },
      },
    ],
    badges: [{ type: String }], // Gamification badges
  },
  { timestamps: true }
);

// Password comparison method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

// Pre-save hook to hash password if modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();
  const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT_ROUNDS) || 10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
