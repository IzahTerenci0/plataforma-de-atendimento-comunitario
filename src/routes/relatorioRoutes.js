/*
** Rotas de relatório
** Definindo quais URLs existem e para onde cada uma aponta, somente mapeia URLs para o controller
*/


const express = require('express');
const router = express.Router();
const relatorioService = require('../services/relatorioService');
const relatorioController =  require('../controllers/relatorioController');
const authMiddleware = require('../middlewares/authMiddleware');


// Todas as rotas abaixo exigem autenticação. Este trecho tira a necessidade de redundância de authMiddleware em cada rota descrita
router.use(authMiddleware);

// Rota genérica
// Rota de filtros e listagem de chamados
router.get('/', relatorioController.gerarRelatorio);

/*
router.get('/', authMiddleware, async (req, res) => {

    try{

        const filtros = {

            status: req.query.status,
            categoria_id: req.query.categoria_id,
            data_inicio: req.query.data_inicio,
            data_fim: req.query.data_fim

        };

        const dados = await relatorioService.gerar(filtros);
        const media = await relatorioService.tempoMedioConclusao();
        const categoria = await relatorioService.categoriaMaisRecorrente();

        res.json({

            chamados: dados,
            tempo_medio_conclusao_minutos: media,
            categoria_mais_recorrente: categoria

        });

    } catch(error){

        res.status(400).json({ error: error.message });

    }

});*/


// Rota de indicadores
// Retorna apenas indicadores consolidados
router.get('/indicadores', relatorioController.indicadores);

/*
router.get('/indicadores', authMiddleware, async (req, res) => {

    try{

        const media = await relatorioService.tempoMedioConclusao();
        const categoria = await relatorioService.categoriaMaisRecorrente();

        res.json({

            tempo_medio_conclusao_minutos: media,
            categoria_mais_recorrente: categoria

        });

    } catch (error){

        res.status(400).json({ error: error.message });

    }

});*/






module.exports = router;