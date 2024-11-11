import { Router } from "express";
import * as taskController from "../controllers/taskController";
import { validarParametros } from "../validators/validate";
import { taskIdSchema, taskStatusSchema, addTaskSchema, editTaskSchema } from "../validators/taskValidator";

const router = Router();

router.post("/adicionar-tarefa", validarParametros(addTaskSchema), taskController.criarTarefa);

router.put("/editar-tarefa/:id", validarParametros(taskIdSchema), validarParametros(editTaskSchema), taskController.editarTarefa);

router.get("/listar-tarefas", taskController.exibirTarefas);

router.get("/listar-tarefas/:status", validarParametros(taskStatusSchema), taskController.exibirTarefas);

router.get("/obter-tarefa/:id", validarParametros(taskIdSchema), taskController.exibirTarefaPorID);

router.delete("/deletar-tarefa/:id", validarParametros(taskIdSchema), taskController.excluirTarefa);

router.delete("/deletar-todas-tarefas", taskController.excluirTodasTarefas);

export default router;
