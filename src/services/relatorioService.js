/*
** Service aplica regras de negócio - Responsável por toda lógica relacionada a relatórios
** Transforma dados brutos em informação útil
*/


const getDatabase = require('../config/database');


class RelatorioService {

    async gerar(filtros = {}){

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


        const whereSQL = where.length ? 'WHERE ' + where.join(' AND ') : '';

        // Consulta principal
        // julianday -> converter para permitir calcular a diferença em dias
        const sql = `
            SELECT 
                c.id,
                c.descricao,
                cat.nome AS categoria,
                c.status,
                c.data_criacao,
                c.concluido_em,
                (julianday(c.concluido_em) - julianday(c.data_criacao)) * 24*60 AS duracao_minutos
            FROM chamados c
            JOIN categorias cat ON c.categoria_id = cat.id
            ${whereSQL}
        `;

        return new Promise((resolve, reject) => {

            // Execução da query SQL, para retornar todas as linhas compatíveis
            db.all(sql, params, (err, rows) => {

                if (err) reject(err);
                else resolve(rows);

            });

        });

    }


    // Consulta informações dos chamados, calcula uma média de tempo de conclusão dos chamados e retorna isso ao usuário
    async tempoMedioConclusao(){

        const db = getDatabase();

        const sql = `
            SELECT AVG((julianday(concluido_em) - julianday(data_criacao)) * 24*60) AS media_minutos
            FROM chamados
            WHERE status = 'CONCLUIDO'
        `;

        return new Promise((resolve, reject) => {

            // Execução da query SQL, esperando retornar somente uma linha
            db.get(sql, [], (err, row) => {

                if(err){

                    reject(err);

                } else{

                    // Refinamento: Fazer o arredondamento do valor de média para 0 casas decimais
                    // O intuito é ficar mais palatável o retorno para apresentação - Poderia ser feito por quem irá consumir essa API
                    let mediaMinutosArr = null;

                    if(row.media_minutos !== null && row.media_minutos !== undefined){

                        mediaMinutosArr = Math.round(row.media_minutos);

                    }

                    // Resolve a Promise com o valor
                    resolve(mediaMinutosArr);

                }

            });

        });

    }


    // Estatística da categoria que teve maior quantidade de chamados registrados até o momento
    async categoriaMaisRecorrente(){

        const db = getDatabase();

        const sql = `
            SELECT cat.nome, COUNT(*) AS total
            FROM chamados c
            JOIN categorias cat ON c.categoria_id = cat.id
            GROUP BY c.categoria_id
            ORDER BY total DESC
            LIMIT 1
        `;

        return new Promise((resolve, reject) => {

            // Execução da query SQL, esperando retornar somente uma linha
            db.get(sql, [], (err, row) => {

                if (err) reject(err);
                else resolve(row);

            });

        });

    }
    
}


module.exports = new RelatorioService();