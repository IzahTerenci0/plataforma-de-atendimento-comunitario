// Importando o service para chamada dos métodos
const { indicadores } = require('../repositories/chamadoRepository');
const relatorioService = require('../services/relatorioService');


    // Função que extrai filtros da query
    function extraiFiltros(query){

        return{

            status: query.status,
            categoria_id: query.categoria_id,
            data_inicio: query.data_inicio,
            data_fim: query.data_fim

        };

    }

    
// Classe que agrupa todas as ações relacionadas a chamados
class RelatorioController{

    // GET relatórios
    async gerarRelatorio(req, res){

        try{

            const filtros = extraiFiltros(req.query);
            const resultado = await relatorioService.gerarRelCompleto(filtros);

            return res.json(resultado);

        }catch(error){

            return res.status(400).json({

                error: error.message

            });

        }

    }


    // GET /relatorios/indicadores
    async indicadores(req, res){

        try{

            const resultado = await relatorioService.obterIndicadores();

            return res.json(resultado);

        } catch(error){

            return res.status(400).json({

                error: error.message

            });

        }

    }

}


// Exportando o módulo
module.exports = new RelatorioController();