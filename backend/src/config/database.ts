import sqlite3 from "sqlite3";
import { Task } from "../models/task";

const db = new sqlite3.Database("./database.db");

export const criarTabela = () => {
  return new Promise<void>((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        status TEXT NOT NULL
      )`,
      (err) => {
        if (err) reject(err);
        else resolve();
      },
    );
  });
};

export const adicionarTarefa = (task: Task) => {
  return new Promise<void>((resolve, reject) => {
    const query = "INSERT INTO tasks (id, name, description, status) VALUES (?, ?, ?, ?)";
    db.run(query, [task.id, task.name, task.description, task.status], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

export const listarTarefas = (status?: string) => {
  return new Promise<Task[]>((resolve, reject) => {
    let query = "SELECT * FROM tasks";
    const params: string[] = [];
    if (status) {
      query += " WHERE status = ?";
      params.push(status);
    }

    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows as Task[]);
    });
  });
};

export const capturarTarefa = (id: string) => {
  return new Promise<Task | null>((resolve, reject) => {
    const query = "SELECT * FROM tasks WHERE id = ?";
    db.get(query, [id], (err, row) => {
      if (err) reject(err);
      else resolve(row ? (row as Task) : null);
    });
  });
};

export const atualizarTarefa = (id: string, name: string, description: string, status: string) => {
  return new Promise<void>((resolve, reject) => {
    const query = "UPDATE tasks SET name = ?, description = ?, status = ? WHERE id = ?";
    db.run(query, [name, description, status, id], function (err) {
      if (err) reject(err);
      else if (this.changes === 0) reject(new Error("Tarefa não encontrada"));
      else resolve();
    });
  });
};

export const deletarTarefa = (id: string) => {
  return new Promise<void>((resolve, reject) => {
    const query = "DELETE FROM tasks WHERE id = ?";
    db.run(query, [id], function (err) {
      if (err) reject(err);
      else if (this.changes === 0) reject(new Error("Tarefa não encontrada"));
      else resolve();
    });
  });
};

export const deletarTodasTarefas = () => {
  return new Promise<void>((resolve, reject) => {
    const query = "DELETE FROM tasks";
    db.run(query, function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
};

export default db;
