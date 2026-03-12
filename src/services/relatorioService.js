/*
** Service aplica regras de negócio - Responsável por toda lógica relacionada a relatórios
** Transforma dados brutos em informação útil
*/


const getDatabase = require('../config/database');
const chamadoRepository = require('../repositories/chamadoRepository');


class RelatorioService {

    // Gera listagem de chamados com filtros
    async gerar(filtros){

        const db = getDatabase();

        // Construindo WHERE dinamicamente
        // Permite filtrar por status, categoria, data início e data fim
        let where = [];
        let params = [];

        if (filtros.status){

            where.push('c.status = ?');
            params.push(filtros.status);

        }

        if (filtros.categoria_id){

            where.push('c.categoria_id = ?');
            params.push(filtros.categoria_id);

        }

        if (filtros.data_inicio){

            where.push('c.data_criacao >= ?');
            params.push(filtros.data_inicio);

        }

        if (filtros.data_fim){

            where.push('c.data_criacao <= ?');
            params.push(filtros.data_fim);

        }

        const chamados = await chamadoRepository.buscaFiltro(filtros);

        return chamados;

    }


    // Consulta informações dos chamados, calcula uma média de tempo de conclusão dos chamados e retorna isso ao usuário
    async tempoMedioConclusao(){

        const resultado = await chamadoRepository.calcularTempoMedio();

        return resultado || 0;

    }


    // Estatística da categoria que teve maior quantidade de chamados registrados até o momento
    async categoriaMaisRecorrente(){

        const resultado = await chamadoRepository.buscarCategoriaRecorrente();

        return resultado || 0;

    }


    // Agrupamento de indicadores em um único objeto
    async obterIndicadores(){

        const media = await this.tempoMedioConclusao();
        const categoria = await this.categoriaMaisRecorrente();

        return{

            tempo_medio_conclusao_minutos: media,
            categoria_mais_recente: categoria

        };

    }


    // Gera relatório completo (listagem e indicadores juntos)
    async gerarRelCompleto(filtros){

        const chamados = await this.gerar(filtros);
        const indicadores = await this.obterIndicadores();

        return{

            chamados: chamados,
            tempo_medio_conclusao_minutos: indicadores.tempo_medio_conclusao_minutos,
            categoria_mais_recente: indicadores.categoria_mais_recente

        };

    }
    
}


module.exports = new RelatorioService();