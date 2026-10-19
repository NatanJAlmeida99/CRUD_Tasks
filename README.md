# 📝 Task Manager API

Uma API RESTful desenvolvida em Node.js e Express para gerenciamento de tarefas, utilizando SQLite para persistência relacional. O projeto foi construído do zero adotando boas práticas de arquitetura em camadas, validação via middlewares, tratamento assíncrono e segurança contra SQL Injection.

---

## 🎯 Sobre o Projeto

A **Task Manager API** resolve o gerenciamento de tarefas diárias oferecendo endpoints seguros e padronizados para criação, listagem com busca por filtro, atualização, alteração de status de conclusão e remoção de registros.

---

## 🛠️ Tecnologias Utilizadas

* **Node.js** (Ambiente de execução)
* **Express.js** (Framework web para roteamento e middlewares)
* **SQLite3** & **sqlite** (Banco de dados relacional e driver baseado em Promises)
* **CORS** (Controle de acesso às rotas da API)
* **Dotenv** (Gerenciamento seguro de variáveis de ambiente)

---

## 🏗️ Arquitetura e Estrutura do Projeto

A aplicação adota o padrão de **Separação de Responsabilidades (Clean Architecture/Layers)**, mantendo o código modular, testável e de fácil manutenção.

```text
meu-projeto/
├── src/
│   ├── config/
│   │   └── database.js      # Conexão e inicialização das tabelas no SQLite
│   ├── controllers/
│   │   └── taskController.js # Lógica de negócio e queries SQL
│   ├── middlewares/
│   │   └── validarTask.js   # Interceptação e validação de payload
│   ├── routes/
│   │   └── taskRoutes.js    # Mapeamento e roteamento dos endpoints
│   └── app.js               # Servidor e middlewares globais
├── .env                     # Variáveis de ambiente (não commitado)
├── .env.example             # Modelo de configuração de ambiente
├── database.sqlite          # Arquivo do banco de dados relacional
└── package.json
```

---

## ✨ Funcionalidades

- [x] **Criar tarefa (`POST`):** Cadastro com validação de campos obrigatórios (`title` e `description`).
- [x] **Listar tarefas (`GET`):** Retorno de todas as tarefas ou filtradas dinamicamente via *query params* (`?search=termo`).
- [x] **Atualizar tarefa (`PUT`):** Edição de título e descrição com atualização automática de timestamp (`updated_at`).
- [x] **Alternar status (`PATCH`):** Marcação de tarefa como concluída/pendente (`completed_at`).
- [x] **Deletar tarefa (`DELETE`):** Remoção permanente do banco de dados.

---

## 📌 Endpoints da API

| Método | Endpoint | Descrição | Parâmetros / Body | Status Sucesso |
|---|---|---|---|---|
| **POST** | `/tasks` | Cria uma nova tarefa | `body: { title, description }` | `201 Created` |
| **GET** | `/tasks` | Lista tarefas (com ou sem filtro) | `query (opcional): ?search=termo` | `200 OK` |
| **PUT** | `/tasks/:id` | Atualiza título e descrição | `params: id`, `body: { title, description }` | `200 OK` |
| **PATCH** | `/tasks/:id` | Alterna status (concluída/pendente) | `params: id` | `200 OK` |
| **DELETE** | `/tasks/:id` | Remove uma tarefa | `params: id` | `200 OK` |

---

## 🧠 Aprendizados e Destaques Técnicos

* **Arquitetura Desacoplada:** Isolamento claro entre Roteamento (`Routes`), Lógica de Aplicação (`Controllers`), Validações (`Middlewares`) e Configuração do Banco (`Config`).
* **Segurança no Banco de Dados:** Uso rigoroso de *Parameterized Queries* (`?`) nas instruções SQL para prevenção contra ataques de **SQL Injection**.
* **Validação de Requisições:** Middleware customizado para interceptar dados incorretos ou incompletos antes da camada de persistência, retornando o status `400 Bad Request`.
* **Tratamento de Assincronismo e Erros:** Uso padronizado de `async/await` com blocos `try/catch` para tratamento de exceções, evitando *crashes* da aplicação e devolvendo respostas padronizadas em JSON (`500 Internal Server Error`).
* **Boas Práticas de Configuração:** Uso do `dotenv` para evitar valores de portas e segredos expostos no código-fonte.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
* **Node.js** (v18 ou superior)
* **Git**

### 1. Clonar o repositório
```bash
git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
cd NOME_DO_REPOSITORIO
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:
```env
PORT=3000
```

### 4. Iniciar o servidor
```bash
node src/app.js
```

> O servidor iniciará em `http://localhost:3000` e o arquivo `database.sqlite` será gerado automaticamente.

---

## 👤 Autor

Desenvolvido por **Seu Nome**  
* [LinkedIn] https://www.linkedin.com/in/natan-almeida-5215a6444/
* [GitHub] https://github.com/NatanJAlmeida99