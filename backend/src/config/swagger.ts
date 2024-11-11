import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";
import swaggerDoc from "../doc/swaggerDoc";

const opcoes = {
  definition: swaggerDoc,
  apis: [],
};

const swaggerSpec = swaggerJsdoc(opcoes);

export const setupSwagger = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
