Jitterbit Orders API  
API REST construída em Node.js com MongoDB, JWT e Swagger — baseada no desafio técnico.

---

## Sobre o Projeto
Esta API gerencia **pedidos (orders)** seguindo todas as regras do desafio:

- Estrutura de entrada com nomes em português (`numeroPedido`, `valorTotal`, `dataCriacao`, `items`)
- **Mapeamento automático** para o formato de banco (`orderId`, `value`, `creationDate`, `items[]`)
- Persistência em **MongoDB** usando Mongoose
- **CRUD completo**
- Proteção com **JWT** (login de exemplo incluído)
- Documentação **Swagger** acessível via `/api-docs`
- Validações com **Joi**
- Estrutura modular, organizada e pronta para escalar

---

## Arquitetura

src/
├─ index.js # Entry-point da aplicação
├─ config/
│ └─ db.js # Conexão MongoDB
├─ models/
│ └─ order.model.js # Schema e model Mongoose
├─ routes/
│ └─ order.routes.js # Todas as rotas da API
├─ middleware/
│ └─ auth.js # Middleware de autenticação JWT
└─ docs/
└─ swagger.js # Configuração da documentação Swagger


---

## ⚙️ Tecnologias Utilizadas
- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **JWT (jsonwebtoken)**
- **Joi (validações)**
- **Swagger (swagger-jsdoc e swagger-ui-express)**
- **dotenv**
- **Nodemon (dev)**

---

## Como Rodar o Projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/lisboainformatica/jitterbit-order-api.git
cd jitterbit-order-api

###Instalar dependências

npm install

### Criar arquivo .env
#Crie um arquivo .env na raiz

PORT=3000
MONGO_URI=mongodb://localhost:27017/jitterbit_orders
JWT_SECRET=uma_chave_segura
JWT_EXPIRES_IN=1d
AUTH_USER=admin
AUTH_PASS=senha123


### Iniciar servidor

npm run dev


### Modo produção:

npm start

### Servidor ativo em:

http://localhost:3000

###Documentação Swagger:

http://localhost:3000/api-docs

