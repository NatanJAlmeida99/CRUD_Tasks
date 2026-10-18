import express from "express";

const app = express();
app.use(express.json());

let users = [];

// CREATE
app.post("/tasks", (req, res) => {
  const { title, description } = req.body;
  const now = new Date();

  const newTask = {
    id: users.length + 1,
    title,
    description,
    completed_at: null,
    created_at: now,
    upddated_at: now,
  };
  users.push(newTask);

  return res.status(201).json({
    mensagem: "Task cadastrada com sucesso!",
    task: newTask,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor com Express rodando na porta ${PORT} 🚀`);
});
