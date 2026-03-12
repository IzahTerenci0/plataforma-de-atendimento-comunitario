const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Temporário - TESTE
const autenticaJWT = require('../middlewares/authMiddleware');


// Definição dos endpoints, as rotas que deveram ser registradas no servidor, para acesso
router.post('/register', (req, res) => usuarioController.cadastrar(req, res));
router.post('/login', (req, res) => usuarioController.login(req, res));


// Rota protegida de teste - Modificar depois!!
router.get('/teste-protegido', autenticaJWT, (req, res) => {

    res.json({

        message: 'Você acessou uma rota protegida!',
        usuarioId: req.userId
        
    });

});


module.exports = router;