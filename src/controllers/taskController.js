let tasks = [];

const findTaskIndex = (id) => tasks.findIndex((task) => task.id === Number(id));

export const createTask = (req, res) => {
  const { title, description } = req.body;
  const now = new Date();

  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    completed_at: null,
    created_at: now,
    updated_at: now,
  };
  tasks.push(newTask);

  return res.status(201).json({
    mensagem: "Task cadastrada com sucesso!",
    task: newTask,
  });
};

export const readTasks = (req, res) => {
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
};

export const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const index = findTaskIndex(id);

  if (index < 0) {
    return res.status(404).json({
      erro: "Task não encontrada",
    });
  }

  tasks[index] = {
    ...tasks[index],
    title,
    description,
    updated_at: new Date(),
  };

  return res.json({
    mensagem: "Task atualizada com sucesso!",
    task: tasks[index],
  });
};

export const deleteTask = (req, res) => {
  const { id } = req.params;
  const index = findTaskIndex(id);

  if (index < 0) {
    return res.status(404).json({ erro: "Task não encotrada" });
  }

  tasks.splice(index, 1);
  return res.json({ messagem: "Task deletada com sucesso! " });
};

export const finishTask = (req, res) => {
  const { id } = req.params;
  const index = findTaskIndex(id);

  if (index < 0) {
    return res.status(404).json({ erro: "Task não encontrada" });
  }

  const task = tasks[index];

  task.completed_at = task.completed_at ? "Completada" : "Não completada";

  return res.status(200).json(task);
};
