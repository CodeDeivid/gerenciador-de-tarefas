import { Request, Response } from "express";
import {
  criarNovaTarefa,
  obterTodasTarefas,
  eliminarTarefa,
  modificarTarefaPorId,
  buscarTarefaPorId,
  eliminarTodasTarefas,
} from "../services/taskService";
import { enviarRespostaDeSucesso, enviarRespostaDeErro } from "../utils/responseUtils";
import logger from "../utils/logger";

export const criarTarefa = async (req: Request, res: Response) => {
  try {
    const task = req.body;
    await criarNovaTarefa(task);
    enviarRespostaDeSucesso(res, `Tarefa '${task.name}' adicionada com sucesso`, {
      name: task.name,
      description: task.description,
      status: task.status,
    });
    logger.info(`Tarefa '${task.name}' adicionada com sucesso`);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    logger.error(`Erro ao criar tarefa: ${errorMessage}`);
    enviarRespostaDeErro(res, errorMessage, 400, { body: req.body });
  }
};

export const exibirTarefas = async (req: Request, res: Response) => {
  try {
    const status = req.params.status;
    const tasks = await obterTodasTarefas(status);
    enviarRespostaDeSucesso(res, "Tarefas buscadas com sucesso", tasks);
    logger.info(`Tarefas com status '${status}' buscadas com sucesso`);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    logger.error(`Erro ao buscar tarefas: ${errorMessage}`);
    enviarRespostaDeErro(res, errorMessage, 400, { params: req.params });
  }
};

export const exibirTarefaPorID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await buscarTarefaPorId(id);
    if (task) {
      enviarRespostaDeSucesso(res, "Tarefa encontrada", task);
      logger.info(`Tarefa com ID '${id}' encontrada`);
    } else {
      enviarRespostaDeErro(res, "Tarefa não encontrada", 404);
      logger.warn(`Tarefa com ID '${id}' não encontrada`);
    }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    logger.error(`Erro ao buscar tarefa com ID '${req.params.id}': ${errorMessage}`);
    enviarRespostaDeErro(res, errorMessage, 400, { params: req.params });
  }
};

export const excluirTarefa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await eliminarTarefa(id);
    enviarRespostaDeSucesso(res, "Tarefa deletada com sucesso");
    logger.info(`Tarefa com ID '${id}' deletada com sucesso`);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    logger.error(`Erro ao deletar tarefa com ID '${req.params.id}': ${errorMessage}`);
    enviarRespostaDeErro(res, errorMessage, 400, { params: req.params });
  }
};

export const excluirTodasTarefas = async (req: Request, res: Response) => {
  try {
    await eliminarTodasTarefas();
    enviarRespostaDeSucesso(res, "Todas as tarefas foram deletadas com sucesso");
    logger.info("Todas as tarefas foram deletadas com sucesso");
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    logger.error(`Erro ao deletar todas as tarefas: ${errorMessage}`);
    enviarRespostaDeErro(res, errorMessage, 400);
  }
};

export const editarTarefa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = req.body;
    await modificarTarefaPorId(id, task);
    enviarRespostaDeSucesso(res, "Tarefa atualizada com sucesso");
    logger.info(`Tarefa com ID '${id}' atualizada com sucesso`);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    logger.error(`Erro ao atualizar tarefa com ID '${req.params.id}': ${errorMessage}`);
    enviarRespostaDeErro(res, errorMessage, 400, { params: req.params, body: req.body });
  }
};
