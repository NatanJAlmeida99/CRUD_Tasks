import express from "express";
import {
  createTask,
  deleteTask,
  finishTask,
  readTasks,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);
router.get("/", readTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id", finishTask);

export default router;
