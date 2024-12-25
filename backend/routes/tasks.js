import express from "express";
import {
  addTask,
  deleteTasks,
  getAllTasks,
  updateTasks,
} from "../controllers/task.js";

const router = express.Router();

router.route("/task").get(getAllTasks).post(addTask);
router.route("/task/:id").delete(deleteTasks).put(updateTasks);

export default router;
