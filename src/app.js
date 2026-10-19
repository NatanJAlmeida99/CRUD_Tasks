import express from "express";
import taskRoutes from "./routes/taskRoutes.js";
import { initDb } from "./config/database.js";

const app = express();
app.use(express.json());

app.use("/tasks", taskRoutes);

const PORT = 3000;
app.listen(PORT, async () => {
  await initDb();
  console.log(`Servidor com Express rodando na porta ${PORT} 🚀`);
});
