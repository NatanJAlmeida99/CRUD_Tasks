import express from "express";

const app = express();
app.use(express.json());

let tasks = [];

// CREATE
app.post("/tasks", (req, res) => {
  const { title, description } = req.body;
  const now = new Date();

  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    completed_at: null,
    created_at: now,
    upddated_at: now,
  };
  tasks.push(newTask);

  return res.status(201).json({
    mensagem: "Task cadastrada com sucesso!",
    task: newTask,
  });
});

// READ
app.get("/tasks", (req, res) => {
  const { search } = req.query;

  if (!search) {
    return res.json(tasks);
  }

  const term = search.toLowerCase();

  const resultado = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(term) ||
      task.description.toLowerCase().includes(term),
  );
  res.json(resultado);
});

// UPDATE
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const index = tasks.findIndex((task) => task.id === Number(id));

  if (index < 0) {
    return res.status(404).json({ erro: "Task não encontrada" });
  }

  tasks[index] = {
    id: Number(id),
    title,
    description,
  };

  return res.json({
    mensagem: "Task ataualizado com sucesso!",
    task: tasks[index],
  });
});

// DELETE
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((task) => task.id === Number(id));

  if (index < 0) {
    return res.status(404).json({ erro: "Task não encontrada" });
  }

  tasks.splice(index, 1);
  return res.json({ mensagem: "Task deletada com sucesso! " });
});

// PATCH
app.patch("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((task) => task.id === Number(id));

  if (index < 0) {
    return res.status(404).json({ erro: "Task não encontrada" });
  }

  const task = tasks[index];

  task.completed_at = task.completed_at ? "Completada" : "Não completa";

  return res.status(200).json(task);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor com Express rodando na porta ${PORT} 🚀`);
});
