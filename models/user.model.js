import mongoose from "mongoose";



const newUsers = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Invalid email format"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { 
    timestamps: { createdAt: true, updatedAt: false } // only createdAt field
  }
);

export const user = mongoose.model("user", newUsers);
