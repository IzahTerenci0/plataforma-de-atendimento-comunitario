const axios = require('axios');
const chamadoRepository = require('../repositories/chamadoRepository');
const ChamadoFactory = require('../factories/chamadoFactory');
const StatusObserver = require('../observers/statusObserver');


class ChamadoService{

    async criar(dados, usuarioId){

        if(!dados.categoria_id || !dados.descricao || !dados.cep || !dados.prioridade){

            throw new Error('Campos obrigatórios não informados.');
        
        }

        const response = await axios.get(`https://viacep.com.br/ws/${dados.cep}/json/`);

        const { localidade, uf } = response.data;

        const chamado = ChamadoFactory.criar({

            ...dados,
            usuario_id: usuarioId,
            cidade: localidade,
            uf: uf

        });

        const novo = await chamadoRepository.create(chamado);

        return novo;
    }


    async atualizarStatus(id, novoStatus){

        const chamado = await chamadoRepository.findById(id);

        if(!chamado){

            throw new Error('Chamado não encontrado.');

        }

        const statusAtual = chamado.status;

        // REGRA DE FLUXO OBRIGATÓRIA
        if(

            (statusAtual === 'ABERTO' && novoStatus !== 'EM_ATENDIMENTO') ||
            (statusAtual === 'EM_ATENDIMENTO' && novoStatus !== 'CONCLUÍDO') ||
            statusAtual === 'CONCLUÍDO'

        ){ throw new Error('Fluxo de status inválido.'); }

        await chamadoRepository.updateStatus(id, novoStatus);

        await StatusObserver.registrar(id, statusAtual, novoStatus);

        return { mensagem: 'Status atualizado com sucesso.' };
    }


    async listar(){

        return chamadoRepository.findAllWithCategoria();

    }


    async excluir(id){

        return chamadoRepository.delete(id);

    }

    
    async indicadores(){

        return chamadoRepository.indicadores();

    }

}


module.exports = new ChamadoService();