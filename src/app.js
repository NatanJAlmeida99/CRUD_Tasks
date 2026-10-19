import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import { initDb } from "./config/database.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await initDb();
  console.log(`Servidor com Express rodando na porta ${PORT} 🚀`);
});
