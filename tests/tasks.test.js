import request from 'supertest';
import app from '../src/app.js';

describe('Testes da API de Tasks', () => {
  let createdTaskId;

  it('Deve criar uma nova tarefa com sucesso (POST /tasks)', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({
        title: 'Estudar Testes Automatizados',
        description: 'Aprender Jest e Supertest para o portfólio'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('task');
    expect(response.body.task).toHaveProperty('id');
    expect(response.body.task.title).toBe('Estudar Testes Automatizados');

    createdTaskId = response.body.task.id;
  });

  it('Não deve criar uma tarefa sem título (POST /tasks)', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({
        description: 'Faltando o título'
      });

    expect(response.status).toBe(400);
  });

  it('Deve listar todas as tarefas (GET /tasks)', async () => {
    const response = await request(app).get('/tasks');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Deve atualizar uma tarefa existente (PUT /tasks/:id)', async () => {
    const response = await request(app)
      .put(`/tasks/${createdTaskId}`)
      .send({
        title: 'Tarefa Atualizada',
        description: 'Descrição atualizada com sucesso'
      });

    expect(response.status).toBe(200);
    expect(response.body.task.title).toBe('Tarefa Atualizada');
    expect(response.body.task.description).toBe('Descrição atualizada com sucesso');
  });

  it('Deve alternar o status da tarefa (PATCH /tasks/:id)', async () => {
    const response = await request(app)
      .patch(`/tasks/${createdTaskId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('completed_at');
    expect(response.body.completed_at).not.toBeNull();
  });

  it('Deve deletar uma tarefa (DELETE /tasks/:id)', async () => {
    const response = await request(app)
      .delete(`/tasks/${createdTaskId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('mensagem');
  });
});