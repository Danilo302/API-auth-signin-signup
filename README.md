# Projeto de Autenticação e Gerenciamento de Usuários

Este projeto consiste em um sistema de autenticação de usuários utilizando Node.js, Express e MongoDB, que permite o cadastro, autenticação e gerenciamento de usuários através de endpoints RESTful.

## Configuração e Implementação

### Pré-requisitos
- Node.js e npm instalados
- MongoDB configurado

### Passos para Execução

1. Clone o repositório do projeto para sua máquina local:

    ```bash
    git clone https://github.com/Danilo302/API-auth-signin-signup
    ```

2. Instale as dependências do projeto:

    ```bash
    npm install
    ```

3. Configure as variáveis de ambiente:
   
   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

    ```plaintext
    DB_USER=seu_usuario_db
    DB_PASS=sua_senha_db
    PORT=3000
    ```

4. Inicie o servidor:

    ```bash
    npm start
    ```

## Estrutura do Projeto

O projeto está dividido em diferentes arquivos:

- `app.js`: Arquivo principal que configura o servidor Express, estabelece conexão com o banco de dados MongoDB e define as rotas para autenticação e gerenciamento de usuários.

- `authRoutes.js` e `userRoutes.js`: Arquivos de rotas que definem os endpoints para autenticação de usuários e gerenciamento de dados do usuário, respectivamente.

- `authController.js` e `userController.js`: Controladores que implementam as lógicas de autenticação de usuários, criação e recuperação de dados dos usuários no banco de dados.

- `User.js`: Modelo de dados Mongoose para usuários, que define a estrutura e os campos do documento do usuário no banco de dados MongoDB.

- `authUtils.js`: Utilitários para geração e verificação de tokens JWT (JSON Web Tokens) utilizados para autenticação.

## Como Usar

- **Cadastro de Usuário** (`/auth/signup`): Registra um novo usuário no sistema. Os campos obrigatórios são `nome`, `email`, `senha` e `telefones`.

- **Login de Usuário** (`/auth/signin`): Realiza a autenticação de um usuário cadastrado. É necessário fornecer `email` e `senha`.

- **Recuperar Dados do Usuário por ID** (`/user/:id`): Recupera as informações de um usuário específico com base no ID fornecido.
