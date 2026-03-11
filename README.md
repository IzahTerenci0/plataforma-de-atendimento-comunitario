# Plataforma de Atendimento Comunitário

API REST desenvolvida em Node.js + Express + SQLite3 para gerenciamento de chamados comunitários.

---

## 📌 Tecnologias Utilizadas

- Node.js
- Express
- SQLite3
- JSON Web Token (JWT)
- Bcrypt
- Axios (Integração com ViaCEP)

---

## 📂 Estrutura do Projeto
src/
├── config/
├── controllers/
├── services/
├── repositories/
├── middlewares/
├── factories/
├── observers/
└── routes/
app.js
package.json
README.md



---

## ⚙️ Pré-requisitos

- Node.js versão 18+ instalada
- NPM instalado

Verificar versões:

```bash
node -v
npm -v


📦 Instalação

Clone o repositório:

git clone <URL_DO_REPOSITORIO>

Entre na pasta do projeto:

cd nome-do-projeto

Instale as dependências:

npm install


🔐 Variáveis de Ambiente

Crie um arquivo chamado .env na raiz do projeto.

Exemplo:

PORT=3000
JWT_SECRET=sua_chave_super_secreta
Explicação das variáveis:

PORT → Porta onde a aplicação será executada.

JWT_SECRET → Chave usada para assinar e validar os tokens JWT.

Pode ser qualquer string segura.

Nunca deve ser versionada em produção.


🗄️ Banco de Dados

O projeto utiliza SQLite3.

O arquivo do banco será criado automaticamente ao iniciar o projeto, caso não exista.

🌱 Seed Inicial

O projeto possui seed automático contendo:

Categorias padrão:

Energia

Água

Árvores

Trânsito

Usuário de teste:

Email: admin@teste.com

Senha: 123456

Caso o seed esteja configurado manualmente, execute o script correspondente antes de rodar a aplicação.

▶️ Executando o Projeto

Para iniciar o servidor:

node app.js

Ou, se estiver usando nodemon:

npx nodemon app.js

Se tudo estiver correto, o terminal exibirá:
Servidor rodando na porta 3000
🔑 Fluxo de Autenticação

Criar usuário → POST /usuarios

Realizar login → POST /login

Receber token JWT

Enviar token no header das rotas protegidas:

Authorization: Bearer SEU_TOKEN_AQUI

📌 Fluxo Obrigatório de Status

Os chamados seguem a regra:

ABERTO → EM_ATENDIMENTO → CONCLUÍDO

Transições inválidas são bloqueadas pelo sistema.

📊 Endpoints Principais
Usuários

POST /usuarios

POST /login

Chamados

POST /chamados

GET /chamados

PUT /chamados/:id/status

DELETE /chamados/:id

Relatórios

GET /relatorios

Filtros opcionais:

status

categoria_id

data_inicio

data_fim

Exemplo:

GET /relatorios?status=CONCLUÍDO&data_inicio=2026-03-01&data_fim=2026-03-31
📜 Logs

A aplicação possui middleware de log que registra:

Data da requisição

Método HTTP

Rota acessada

Status da resposta

Tempo de execução

🧠 Padrões Utilizados

Singleton → Conexão com banco

Factory → Criação de chamados

Observer → Registro automático de histórico de status

👩‍💻 Autor

Projeto desenvolvido como Atividade Final Integradora.