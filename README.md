# Gerenciador de Tarefas

Este é um projeto de API para gerenciamento de tarefas. A API permite criar, listar, atualizar e deletar tarefas. A documentação da API está disponível via Swagger.

## Pré-requisitos

- Node.js (versão 16 ou superior)
- npm (versão 7 ou superior)

## Instalação

1. Clone o repositório:

```sh
git clone https://github.com/CodeDeivid/gerenciador-de-tarefas
cd backend
```

2. Instale as dependências:

```sh
npm install
```

## Iniciando o Projeto

Para iniciar o servidor em modo de desenvolvimento, execute:

```sh
npm run dev
```

O servidor estará rodando em `http://localhost:3000`.

## Documentação da API

A documentação da API está disponível via Swagger. Para acessá-la, inicie o servidor e navegue até:

```
http://localhost:3000/api-docs
```

## Endpoints

### 1. Adicionar Tarefa

- **URL:** `/api/adicionar-tarefa`
- **Método:** `POST`
- **Body:**
  ```json
  {
    "name": "Nome da Tarefa",
    "description": "Descrição da Tarefa",
    "status": "pending"
  }
  ```
- **Respostas:**
  - `200 OK`: Tarefa adicionada com sucesso
  - `400 Bad Request`: Erro na requisição

### 2. Listar Tarefas

- **URL:** `/api/listar-tarefas`
- **Método:** `GET`
- **Respostas:**
  - `200 OK`: Lista de tarefas
  - `400 Bad Request`: Erro na requisição

### 3. Listar Tarefas por Status

- **URL:** `/api/listar-tarefas/:status`
- **Método:** `GET`
- **Parâmetros de URL:**
  - `status`: O status das tarefas a serem listadas (por exemplo: `pending`, `in_progress`, `done`).
- **Respostas:**
  - `200 OK`: Lista de tarefas filtradas pelo status
  - `400 Bad Request`: Erro na requisição
  - `404 Not Found`: Nenhuma tarefa encontrada para o status especificado

### 4. Atualizar Tarefa

- **URL:** `/api/editar-tarefa/:id`
- **Método:** `PUT`
- **Body:**
  ```json
  {
    "name": "Nome Atualizado",
    "description": "Descrição Atualizada",
    "status": "in_progress"
  }
  ```
- **Respostas:**
  - `200 OK`: Tarefa atualizada com sucesso
  - `404 Not Found`: Tarefa não encontrada
  - `400 Bad Request`: Erro na requisição

### 5. Deletar Tarefa

- **URL:** `/api/deletar-tarefa/:id`
- **Método:** `DELETE`
- **Respostas:**
  - `200 OK`: Tarefa deletada com sucesso
  - `404 Not Found`: Tarefa não encontrada
  - `400 Bad Request`: Erro na requisição

### 6. Deletar Todas as Tarefas

- **URL:** `/api/deletar-todas-tarefas`
- **Método:** `DELETE`
- **Respostas:**
  - `200 OK`: Todas as tarefas foram deletadas com sucesso
  - `400 Bad Request`: Erro na requisição

### 7. Obter Tarefa por ID

- **URL:** `/api/obter-tarefa/:id`
- **Método:** `GET`
- **Parâmetros de URL:**
  - `id`: O ID da tarefa a ser obtida.
- **Respostas:**
  - `200 OK`: Tarefa encontrada
  - `404 Not Found`: Tarefa não encontrada
  - `400 Bad Request`: Erro na requisição

## Logs

Os logs de execução são armazenados nos arquivos `backend/logs/combined.log` e `backend/logs/error.log`.