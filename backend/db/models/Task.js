import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    priority: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

export const TaskModel = mongoose.model("Task", TaskSchema);
