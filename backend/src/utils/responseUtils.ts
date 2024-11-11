import { Response } from "express";
import logger from "../utils/logger";

export const enviarRespostaDeSucesso = (res: Response, message: string, data?: unknown) => {
  logger.info(`Resposta de sucesso: ${message}`, { data });
  res.status(200).json({
    sucess: true,
    message,
    data,
  });
};

export const enviarRespostaDeErro = (res: Response, error: Error | string, statusCode: number = 400, additionalInfo?: Record<string, unknown>) => {
  const errorMessage = error instanceof Error ? error.message : error;
  logger.error(`Resposta de erro: ${errorMessage}`, { statusCode, additionalInfo });

  res.status(statusCode).json({
    sucess: false,
    error: errorMessage,
  });
};
