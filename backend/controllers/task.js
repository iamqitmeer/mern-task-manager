import { TaskModel } from "../db/models/Task.js";

export const addTask = async (req, res) => {
  const { title, description, priority } = req.body;

  if (!title || !description || !priority) {
    return res.status(400).json({
      message: "All fields are required.",
      success: false,
    });
  }

  let task = {
    title,
    description,
    priority,
  };

  let addTaskToMONGODB = new TaskModel(task);
  await addTaskToMONGODB.save();

  return res.status(201).json({
    message: "Task added succesfully.",
    success: true,
    task: addTaskToMONGODB,
  });
};

export const getAllTasks = async (req, res) => {
  const tasks = await TaskModel.find();

  return res.status(200).json({
    message: "Task Fetched succesfully.",
    success: true,
    tasks,
  });
};

export const deleteTasks = async (req, res) => {
  const id = req.params.id;

  await TaskModel.findByIdAndDelete(id);

  return res.status(200).json({
    message: "Task Deleted succesfully.",
    success: true,
  });
};

export const updateTasks = async (req, res) => {
  const id = req.params.id;

  const { title, description, priority } = req.body;

  if (!title || !description || !priority) {
    return res.status(400).json({
      message: "All fields are required.",
      success: false,
    });
  }

  let task = {
    title,
    description,
    priority,
  };

  await TaskModel.findByIdAndUpdate(id, task);

  return res.status(200).json({
    message: "Task Deleted succesfully.",
    success: true,
  });
};
