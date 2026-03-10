// Implementação do endpoint de relatório que atenda aos requisitos do enunciado

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

            where.push('c.created_at >= ?');
            params.push(filtros.data_inicio);

        }

        if (filtros.data_fim){

            where.push('c.created_at <= ?');
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
                c.created_at,
                c.concluido_em,
                (julianday(c.concluido_em) - julianday(c.created_at)) * 24*60 AS duracao_minutos
            FROM chamados c
            JOIN categorias cat ON c.categoria_id = cat.id
            ${whereSQL}
        `;

        return new Promise((resolve, reject) => {

            db.all(sql, params, (err, rows) => {

                if (err) reject(err);
                else resolve(rows);

            });

        });

    }

    async tempoMedioConclusao(){

        const db = getDatabase();

        const sql = `
            SELECT AVG((julianday(concluido_em) - julianday(created_at)) * 24*60) AS media_minutos
            FROM chamados
            WHERE status = 'CONCLUÍDO'
        `;

        return new Promise((resolve, reject) => {

            db.get(sql, [], (err, row) => {

                if (err) reject(err);
                else resolve(row.media_minutos);

            });

        });

    }

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

            db.get(sql, [], (err, row) => {

                if (err) reject(err);
                else resolve(row);

            });

        });

    }
    
}


module.exports = new RelatorioService();