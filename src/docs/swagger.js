<<<<<<< HEAD
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Jitterbit Orders API',
      version: '1.0.0',
      description: 'API para gerenciar pedidos - desafio'
    },
    servers: [
      { url: 'http://localhost:3000' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: [] // documentação é criada programaticamente abaixo de forma simples
};

const swaggerSpec = swaggerJSDoc(options);

// Manual small additions (paths)
swaggerSpec.paths = {
  '/order': {
    post: {
      tags: ['order'],
      security: [{ bearerAuth: [] }],
      summary: 'Criar um novo pedido (requer JWT)',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                numeroPedido: { type: 'string' },
                valorTotal: { type: 'number' },
                dataCriacao: { type: 'string', format: 'date-time' },
                items: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      idItem: { type: 'string' },
                      quantidadeItem: { type: 'number' },
                      valorItem: { type: 'number' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      responses: {
        '201': { description: 'Created' },
        '400': { description: 'Invalid input' },
        '401': { description: 'Unauthorized' }
      }
    }
  },
  '/order/{orderId}': {
    get: {
      summary: 'Obter pedido por orderId',
      parameters: [{ name: 'orderId', in: 'path', required: true, schema: { type: 'string' } }],
      responses: { '200': { description: 'OK' }, '404': { description: 'Not found' } }
    },
    put: {
      summary: 'Atualizar pedido (requer JWT)',
      security: [{ bearerAuth: [] }],
      parameters: [{ name: 'orderId', in: 'path', required: true, schema: { type: 'string' } }],
      responses: { '200': { description: 'OK' } }
    },
    delete: {
      summary: 'Deletar pedido (requer JWT)',
      security: [{ bearerAuth: [] }],
      parameters: [{ name: 'orderId', in: 'path', required: true, schema: { type: 'string' } }],
      responses: { '200': { description: 'Deleted' } }
    }
  },
  '/order/list': {
    get: {
      summary: 'Listar todos pedidos',
      responses: { '200': { description: 'OK' } }
    }
  },
  '/order/auth/login': {
    post: {
      summary: 'Login demo para gerar JWT',
      requestBody: {
        content: {
          'application/json': {
            schema: { type: 'object', properties: { username: { type: 'string' }, password: { type: 'string' } } }
          }
        }
      },
      responses: { '200': { description: 'Token' }, '401': { description: 'Invalid credentials' } }
    }
  }
};

module.exports = swaggerSpec;
=======
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Jitterbit Orders API',
      version: '1.0.0',
      description: 'API para gerenciar pedidos - desafio'
    },
    servers: [
      { url: 'http://localhost:3000' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: [] // documentação é criada programaticamente abaixo de forma simples
};

const swaggerSpec = swaggerJSDoc(options);

// Manual small additions (paths)
swaggerSpec.paths = {
  '/order': {
    post: {
      tags: ['order'],
      security: [{ bearerAuth: [] }],
      summary: 'Criar um novo pedido (requer JWT)',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                numeroPedido: { type: 'string' },
                valorTotal: { type: 'number' },
                dataCriacao: { type: 'string', format: 'date-time' },
                items: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      idItem: { type: 'string' },
                      quantidadeItem: { type: 'number' },
                      valorItem: { type: 'number' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      responses: {
        '201': { description: 'Created' },
        '400': { description: 'Invalid input' },
        '401': { description: 'Unauthorized' }
      }
    }
  },
  '/order/{orderId}': {
    get: {
      summary: 'Obter pedido por orderId',
      parameters: [{ name: 'orderId', in: 'path', required: true, schema: { type: 'string' } }],
      responses: { '200': { description: 'OK' }, '404': { description: 'Not found' } }
    },
    put: {
      summary: 'Atualizar pedido (requer JWT)',
      security: [{ bearerAuth: [] }],
      parameters: [{ name: 'orderId', in: 'path', required: true, schema: { type: 'string' } }],
      responses: { '200': { description: 'OK' } }
    },
    delete: {
      summary: 'Deletar pedido (requer JWT)',
      security: [{ bearerAuth: [] }],
      parameters: [{ name: 'orderId', in: 'path', required: true, schema: { type: 'string' } }],
      responses: { '200': { description: 'Deleted' } }
    }
  },
  '/order/list': {
    get: {
      summary: 'Listar todos pedidos',
      responses: { '200': { description: 'OK' } }
    }
  },
  '/order/auth/login': {
    post: {
      summary: 'Login demo para gerar JWT',
      requestBody: {
        content: {
          'application/json': {
            schema: { type: 'object', properties: { username: { type: 'string' }, password: { type: 'string' } } }
          }
        }
      },
      responses: { '200': { description: 'Token' }, '401': { description: 'Invalid credentials' } }
    }
  }
};

module.exports = swaggerSpec;
>>>>>>> ab91d23330aff18fcf3b2b4296e683c7866dcc96
