const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');


// Definição dos endpoints
router.post('/register', (req, res) => usuarioController.cadastrar(req, res));
router.post('/login', (req, res) => usuarioController.login(req, res));


module.exports = router;