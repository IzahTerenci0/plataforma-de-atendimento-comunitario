// Conectar rotas no arquivo principal
const usuarioRoutes = require('./routes/usuarioRoutes');
require('dotenv').config();


app.use(express.json());
app.use('/api/users', usuarioRoutes);


const loggerMiddleware = require('./src/middlewares/loggerMiddleware');
app.use(loggerMiddleware);