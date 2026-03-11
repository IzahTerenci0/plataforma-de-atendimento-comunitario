// Conectar rotas no arquivo principal
require('dotenv').config();

const express = require('express'); // Importando o módulo Express, esencial para criação de servidores e APIs
const app = express();

// Criando a conexão com o banco de dados
const getDatabase = require('./src/config/database');
getDatabase(); // força a conexão e execução do script SQL

const loggerMiddleware = require('./src/middlewares/loggerMiddleware');
const usuarioRoutes = require('./src/routes/usuarioRoutes');

// Primeiro vem o Middleware de JSON
app.use(express.json());
// Em seguida vem os outros Middlewares, se houver
app.use(loggerMiddleware);


// Depois dos Middlewares, vêm as rotas
app.use('/api/users', usuarioRoutes);


// Subindo a instância do servidor e apontando a porta de escuta do servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Servidor ativo - Executando na porta ${PORT}`);

});