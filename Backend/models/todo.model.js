import mongoose from "mongoose";

const todo = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    task: [
      {
        name: { type: String, required: true },
        isCompleted: { type: Boolean, default: false },
      },
    ],
    theme: {
      type: String,
      default: "green",
    },
    userAssigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);


export const todoTask = mongoose.model("todoTask", todo)