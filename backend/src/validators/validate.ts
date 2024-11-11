import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import logger from "../utils/logger";

const traduzirErros = (message: string): string => {
  if (message.includes("Invalid enum value")) return "Valor do status inválido.";
  if (message.includes("Expected string")) return "O valor deve ser uma string válida.";
  return message;
};

export const validarParametros = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      ...req.params,
      ...req.body,
    });
    logger.info(`Validação bem-sucedida para ${req.method} ${req.url}`);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      const formatarErros = err.errors.map((error) => ({
        path: error.path.join("."),
        message: traduzirErros(error.message.replace(/"/g, "")),
      }));
      logger.error(`Erro de validação para ${req.method} ${req.url}`, { errors: formatarErros });
      res.status(400).json({ success: false, errors: formatarErros });
    } else {
      logger.error(`Erro desconhecido durante a validação para ${req.method} ${req.url}: ${err}`);
      res.status(400).json({ success: false, error: "Erro Desconhecido" });
    }
  }
};
