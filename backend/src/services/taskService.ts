import { v4 as uuidv4 } from "uuid";
import { Task } from "../models/task";
import { adicionarTarefa, listarTarefas, atualizarTarefa, deletarTarefa, capturarTarefa, deletarTodasTarefas } from "../config/database";
import { addTaskSchema, editTaskSchema, AddTaskInput, EditTaskInput } from "../validators/taskValidator";

export const criarNovaTarefa = async (taskInput: AddTaskInput): Promise<void> => {
  const parsedTask = addTaskSchema.parse(taskInput);
  const task: Task = { ...parsedTask, id: uuidv4() };
  await adicionarTarefa(task);
};

export const obterTodasTarefas = async (status?: string): Promise<Task[]> => {
  return await listarTarefas(status);
};

export const buscarTarefaPorId = async (id: string): Promise<Task | null> => {
  return await capturarTarefa(id);
};

export const modificarTarefaPorId = async (id: string, taskInput: EditTaskInput): Promise<void> => {
  const parsedTask = editTaskSchema.parse(taskInput);
  await atualizarTarefa(id, parsedTask.name, parsedTask.description, parsedTask.status);
};

export const eliminarTarefa = async (id: string): Promise<void> => {
  await deletarTarefa(id);
};

export const eliminarTodasTarefas = async (): Promise<void> => {
  await deletarTodasTarefas();
};
