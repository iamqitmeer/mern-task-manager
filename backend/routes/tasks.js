import express from "express";
import {
  addTask,
  deleteTasks,
  getAllTasks,
  updateTasks,
} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router
  .route("/task")
  .get(isAuthenticated, getAllTasks)
  .post(isAuthenticated, addTask);
router
  .route("/task/:id")
  .delete(isAuthenticated, deleteTasks)
  .put(isAuthenticated, updateTasks);

export default router;
