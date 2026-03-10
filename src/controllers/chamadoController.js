// O controller não acessa o banco direto; ele só chama métodos do service

const chamadoService = require('../services/chamadoService');

// Classe que agrupa todas as ações relacionadas a chamados
class ChamadoController{

    async criar(req, res){

        try{

            // Dados enviados pelo cliente (JSON) para criar o chamado
            const resultado = await chamadoService.criar(req.body, req.userId);
            return res.status(201).json(resultado);

        } catch(error){

            return res.status(400).json({ error: error.message });

        }

    }


    async atualizarStatus(req, res){

        try{

            const { id } = req.params;
            const { status } = req.body;

            const resultado = await chamadoService.atualizarStatus(id, status);
            return res.status(200).json(resultado);

        } catch(error){

            return res.status(400).json({ error: error.message });

        }

    }


    async listar(req, res){

        const chamados = await chamadoService.listar();
        return res.json(chamados);

    }


    async excluir(req, res){

        const { id } = req.params;
        await chamadoService.excluir(id);
        return res.json({ mensagem: 'Chamado removido.' });

    }

}


module.exports = new ChamadoController();