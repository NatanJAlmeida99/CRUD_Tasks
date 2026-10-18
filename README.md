# API de Gerenciamento de Tarefas (In-Memory)

Uma API RESTful desenvolvida em Node.js com Express para realizar operações CRUD completas de tarefas. O projeto é estruturado em camadas (Controllers e Routes) e utiliza armazenamento de dados em memória.

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express**

## 📁 Estrutura do Projeto

O projeto adota uma arquitetura limpa, separando responsabilidades:

- `src/app.js`: Configuração e inicialização do servidor.
- `src/routes/taskRoutes.js`: Definição de endpoints e métodos HTTP.
- `src/controllers/taskController.js`: Lógica de negócio e manipulação dos dados.

## 🛠️ Como Executar

1. Clone este repositório.
2. Acesse a pasta do projeto no terminal.
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor:
   ```bash
   node src/app.js
   ```

O servidor estará rodando em `http://localhost:3000`.

## 📌 Rotas da API (Endpoints)

| Método | Endpoint     | Descrição                              | Parâmetros/Body                                 |
| ------ | ------------ | -------------------------------------- | ----------------------------------------------- |
| POST   | `/tasks`     | Cria uma nova tarefa                   | JSON body: `title`, `description`               |
| GET    | `/tasks`     | Lista todas as tarefas                 | Query (opcional): `?search=termo`               |
| PUT    | `/tasks/:id` | Atualiza o título e descrição          | Param: `id` / JSON body: `title`, `description` |
| PATCH  | `/tasks/:id` | Alterna o status (completa/incompleta) | Param: `id`                                     |
| DELETE | `/tasks/:id` | Remove a tarefa                        | Param: `id`                                     |

## 📨 Exemplo de Requisição (POST)

```json
{
  "title": "Estudar Node.js",
  "description": "Praticar rotas e controllers com Express"
}
```

## ⚠️ Observações

- Os dados são armazenados **em memória**: ao reiniciar o servidor, todas as tarefas são perdidas.