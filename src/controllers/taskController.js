// Importamos a função de conexão com o banco
import { openDb } from "../config/database.js";

// O array let tasks = [] e a função findTaskIndex foram apagados!

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const db = await openDb();

    // db.run é usado para ações que modificam o banco (INSERT, UPDATE, DELETE)
    // Usamos '?' para evitar ataques de SQL Injection
    const result = await db.run(
      `INSERT INTO tasks (title, description) VALUES (?, ?)`,
      [title, description]
    );

    // db.get busca apenas uma linha. Aqui pegamos a task que acabou de ser criada usando o ID gerado (result.lastID)
    const newTask = await db.get(`SELECT * FROM tasks WHERE id = ?`, [result.lastID]);

    return res.status(201).json({
      mensagem: "Task cadastrada com sucesso!",
      task: newTask,
    });
  } catch (erro) {
    return res.status(500).json({ erro: "Erro interno ao criar a task." });
  }
};

export const readTasks = async (req, res) => {
  try {
    const { search } = req.query;
    const db = await openDb();
    let resultado;

    if (search) {
      // O '%' funciona como um curinga no SQL para buscar pedaços de palavras
      const term = `%${search}%`;
      // db.all busca múltiplas linhas
      resultado = await db.all(
        `SELECT * FROM tasks WHERE title LIKE ? OR description LIKE ?`,
        [term, term]
      );
    } else {
      resultado = await db.all(`SELECT * FROM tasks`);
    }

    res.json(resultado);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar as tasks." });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const db = await openDb();

    // No SQLite, as datas podem ser atualizadas chamando CURRENT_TIMESTAMP
    const result = await db.run(
      `UPDATE tasks SET title = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [title, description, id]
    );

    // result.changes nos diz quantas linhas foram alteradas. Se for 0, o ID não existe.
    if (result.changes === 0) {
      return res.status(404).json({ erro: "Task não encontrada" });
    }

    const taskAtualizada = await db.get(`SELECT * FROM tasks WHERE id = ?`, [id]);

    return res.json({
      mensagem: "Task atualizada com sucesso!",
      task: taskAtualizada,
    });
  } catch (erro) {
    return res.status(500).json({ erro: "Erro ao atualizar a task." });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await openDb();

    const result = await db.run(`DELETE FROM tasks WHERE id = ?`, [id]);

    if (result.changes === 0) {
      return res.status(404).json({ erro: "Task não encontrada" });
    }

    return res.json({ mensagem: "Task deletada com sucesso!" });
  } catch (erro) {
    return res.status(500).json({ erro: "Erro ao deletar a task." });
  }
};

export const finishTask = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await openDb();

    // Primeiro, buscamos a task atual para saber o status dela
    const taskAtual = await db.get(`SELECT * FROM tasks WHERE id = ?`, [id]);

    if (!taskAtual) {
      return res.status(404).json({ erro: "Task não encontrada" });
    }

    // Se tiver data de conclusão, nós anulamos (NULL). Se for NULL, nós preenchemos com a data atual.
    const novoStatus = taskAtual.completed_at ? null : new Date().toISOString();

    await db.run(
      `UPDATE tasks SET completed_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [novoStatus, id]
    );

    const taskAtualizada = await db.get(`SELECT * FROM tasks WHERE id = ?`, [id]);

    return res.status(200).json(taskAtualizada);
  } catch (erro) {
    return res.status(500).json({ erro: "Erro ao alterar status da task." });
  }
};