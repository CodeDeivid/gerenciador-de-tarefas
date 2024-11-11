/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";
import { criarTabela } from "./config/database";
import { setupSwagger } from "./config/swagger";
import logger from "./utils/logger";

const app: Application = express();
const PORT: number = 3000;

app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

setupSwagger(app);

app.use("/api", taskRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error("Error:", err.message);
  res.status(500).json({
    message: "Erro Interno do Servidor. Por favor, tente novamente mais tarde.",
  });
});

app.listen(PORT, async () => {
  try {
    await criarTabela();
    logger.info(`Servidor está rodando em http://localhost:${PORT}`);
  } catch (error) {
    logger.error("Erro ao iniciar servidor:", error);
  }
});
