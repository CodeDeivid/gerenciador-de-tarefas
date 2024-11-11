const swaggerDoc = {
  openapi: "3.0.0",
  info: {
    title: "API Gerenciador de Tarefas",
    version: "1.0.0",
    description: "API para gerenciamento de tarefas",
  },
  paths: {
    "/adicionar-tarefa": {
      post: {
        summary: "Adiciona uma nova tarefa",
        tags: ["Tarefas"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "Teste",
                  },
                  description: {
                    type: "string",
                    example: "Teste Desc",
                  },
                  status: {
                    type: "string",
                    enum: ["pending", "in_progress"],
                    example: "pending",
                  },
                },
                required: ["name", "description", "status"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Tarefa adicionada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Tarefa 'Teste' adicionada com sucesso",
                    },
                    data: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        description: {
                          type: "string",
                        },
                        status: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Erro na requisição",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: false,
                    },
                    error: {
                      type: "string",
                      example: "Erro na requisição",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/listar-tarefas": {
      get: {
        summary: "Lista todas as tarefas",
        tags: ["Tarefas"],
        responses: {
          200: {
            description: "Lista de tarefas",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      name: {
                        type: "string",
                      },
                      description: {
                        type: "string",
                      },
                      status: {
                        type: "string",
                        enum: ["pending", "in_progress", "done"],
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Erro na requisição",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: false,
                    },
                    error: {
                      type: "string",
                      example: "Erro na requisição",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/listar-tarefas/{status}": {
      get: {
        summary: "Lista as tarefas por status",
        tags: ["Tarefas"],
        parameters: [
          {
            in: "path",
            name: "status",
            schema: {
              type: "string",
              enum: ["pending", "in_progress", "done"],
            },
            required: true,
            description: "Status das tarefas a serem listadas",
          },
        ],
        responses: {
          200: {
            description: "Lista de tarefas filtradas por status",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      name: {
                        type: "string",
                      },
                      description: {
                        type: "string",
                      },
                      status: {
                        type: "string",
                        enum: ["pending", "in_progress", "done"],
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Erro na requisição",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: false,
                    },
                    error: {
                      type: "string",
                      example: "Erro na requisição",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/obter-tarefa/{id}": {
      get: {
        summary: "Busca uma tarefa por ID",
        tags: ["Tarefas"],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "string",
            },
            required: true,
            description: "ID da tarefa",
          },
        ],
        responses: {
          200: {
            description: "Tarefa encontrada",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                    name: {
                      type: "string",
                    },
                    description: {
                      type: "string",
                    },
                    status: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Tarefa não encontrada",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: false,
                    },
                    error: {
                      type: "string",
                      example: "Tarefa não encontrada",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Erro na requisição",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: false,
                    },
                    error: {
                      type: "string",
                      example: "Erro na requisição",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/editar-tarefa/{id}": {
      put: {
        summary: "Atualiza uma tarefa por ID",
        tags: ["Tarefas"],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "string",
            },
            required: true,
            description: "ID da tarefa",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "Teste Atualizado",
                  },
                  description: {
                    type: "string",
                    example: "Teste Desc Atualizada",
                  },
                  status: {
                    type: "string",
                    enum: ["pending", "in_progress", "done"],
                    example: "in_progress",
                  },
                },
                required: ["name", "description", "status"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Tarefa atualizada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Tarefa atualizada com sucesso",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Tarefa não encontrada",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: false,
                    },
                    error: {
                      type: "string",
                      example: "Tarefa não encontrada",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Erro na requisição",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: false,
                    },
                    error: {
                      type: "string",
                      example: "Erro na requisição",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/deletar-tarefa/{id}": {
      delete: {
        summary: "Deleta uma tarefa por ID",
        tags: ["Tarefas"],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "string",
            },
            required: true,
            description: "ID da tarefa",
          },
        ],
        responses: {
          200: {
            description: "Tarefa deletada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Tarefa deletada com sucesso",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Tarefa não encontrada",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: false,
                    },
                    error: {
                      type: "string",
                      example: "Tarefa não encontrada",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Erro na requisição",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: false,
                    },
                    error: {
                      type: "string",
                      example: "Erro na requisição",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/deletar-todas-tarefas": {
      delete: {
        summary: "Deleta todas as tarefas",
        tags: ["Tarefas"],
        responses: {
          200: {
            description: "Todas as tarefas foram deletadas com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Todas as tarefas foram deletadas com sucesso",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Erro na requisição",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: false,
                    },
                    error: {
                      type: "string",
                      example: "Erro na requisição",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default swaggerDoc;
