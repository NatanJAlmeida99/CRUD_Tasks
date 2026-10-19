import express from "express";
import {
  createTask,
  deleteTask,
  finishTask,
  readTasks,
  updateTask,
} from "../controllers/taskController.js";

import { validarDadosTask } from "../middlewares/validarTask.js"

const router = express.Router();

router.post("/", validarDadosTask, createTask);
router.get("/", readTasks);
router.put("/:id", validarDadosTask, updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id", finishTask);

export default router;
