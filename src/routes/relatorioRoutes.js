/*
** Rotas de relatório
** Definindo quais URLs existem e para onde cada uma aponta
*/


const express = require('express');
const router = express.Router();
const relatorioService = require('../services/relatorioService');
const authMiddleware = require('../middlewares/authMiddleware');

// Rota genérica
// Rota de filtros e listagem de chamados
// Ambas rotas usam authMiddleware, então necessário enviar o token no header
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

});


// Rota de indicadores
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

});






module.exports = router;