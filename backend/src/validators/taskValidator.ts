import { z } from "zod";

const statusEnum = z.enum(["pending", "in_progress", "done"]);

const emptyMessage = "não pode estar vazio";
const maxLengthMessage = (field: string, max: number) => `${field} não pode ter mais de ${max} caracteres`;

const nomeSchema = z
  .string()
  .trim()
  .min(1, { message: `O nome ${emptyMessage}` })
  .max(128, { message: maxLengthMessage("O nome", 128) });

const descSchema = z
  .string()
  .trim()
  .min(1, { message: `A descrição ${emptyMessage}` })
  .max(255, { message: maxLengthMessage("A descrição", 255) });

const baseTaskSchema = z.object({
  name: nomeSchema,
  description: descSchema,
});

export const addTaskSchema = baseTaskSchema.extend({
  status: statusEnum.refine((status) => status !== statusEnum.enum.done, {
    message: "Não é possível criar uma tarefa com status 'done' tente 'pending' ou 'in_progress'",
  }),
});

export const editTaskSchema = baseTaskSchema.extend({
  status: statusEnum,
});

export const taskIdSchema = z.object({
  id: z.string().uuid({ message: "O ID fornecido não é válido" }),
});

export const taskStatusSchema = z.object({
  status: statusEnum,
});

export type AddTaskInput = z.infer<typeof addTaskSchema>;
export type EditTaskInput = z.infer<typeof editTaskSchema>;
export type TaskIdParams = z.infer<typeof taskIdSchema>;
export type TaskStatusParams = z.infer<typeof taskStatusSchema>;
