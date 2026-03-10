const express = require('express');
const router = express.Router();
const chamadoController = require('../controllers/chamadoController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/', authMiddleware, (req, res) => chamadoController.criar(req, res));
router.put('/:id/status', authMiddleware, (req, res) => chamadoController.atualizarStatus(req, res));
router.get('/', authMiddleware, (req, res) => chamadoController.listar(req, res));
router.delete('/:id', authMiddleware, (req, res) => chamadoController.excluir(req, res));


router.get('/indicadores', authMiddleware, async (req, res) => {

    const dados = await chamadoService.indicadores();
    res.json(dados);

});


module.exports = router;