// Construindo a persistência dos chamados

const getDatabase = require('../config/database');

class ChamadoRepository{

    // Responsável por gravar um chamado no banco de dados
    async criaChamado(chamado){

        const db = getDatabase();

        const sql = `
            INSERT INTO chamados 
            (usuario_id, categoria_id, descricao, cep, cidade, uf, prioridade, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        return new Promise((resolve, reject) => {

            db.run(
                sql,
                [
                    chamado.usuario_id,
                    chamado.categoria_id,
                    chamado.descricao,
                    chamado.cep,
                    chamado.cidade,
                    chamado.uf,
                    chamado.prioridade,
                    chamado.status
                ],

                function (err){

                    if(err){

                        reject(err);

                    } else{

                        resolve({ id: this.lastID });

                    }

                }

            );

        });

    }


    // Busca um chamado específico pelo número de ID dele
    // Vai ser utilizado para validar status atual do chamado e impedir mudança inválida, por meio do ID
    async buscaID(id){

        const db = getDatabase();

        const sql = `
            SELECT * FROM chamados WHERE id = ?
        `;

        return new Promise((resolve, reject) => {

            db.get(sql, [id], (err, row) => {

                if (err) reject(err);
                else resolve(row);

            });

        });

    }


    async atualizarStatus(id, novoStatus){

        const db = getDatabase();

        // Se o novo status for CONCLUÍDO, irá salvar a data de conclusão. Se não estiver concluído,
        // mantém a data atual. Cumpre requisito de indicadores
        const sql = `
            UPDATE chamados
            SET status = ?, 
                atualizado_em = CURRENT_TIMESTAMP,
                concluido_em = CASE 
                    WHEN ? = 'CONCLUÍDO' THEN CURRENT_TIMESTAMP 
                    ELSE concluido_em 
                END
            WHERE id = ?
        `;

        return new Promise((resolve, reject) => {

            db.run(sql, [novoStatus, novoStatus, id], function (err){

                if (err) reject(err);
                else resolve({ changes: this.changes });

            });

        });

    }


    // Opção de deletar com filtro seguro buscando pelo ID
    async delete(id){

        const db = getDatabase();

        const sql = `
            DELETE FROM chamados WHERE id = ?
        `;

        return new Promise((resolve, reject) => {

            db.run(sql, [id], function (err){

                if (err) reject(err);
                else resolve({ changes: this.changes });

            });

        });

    }


    // Utiliza JOIN para enriquecer dados do chamado com o nome da categoria
    async buscarCategoria(){

        const db = getDatabase();

        const sql = `
            SELECT 
                ch.id,
                ch.descricao,
                ch.status,
                ch.prioridade,
                ch.data_criacao,
                c.nome AS categoria
            FROM chamados ch
            JOIN categorias c ON ch.categoria_id = c.id
        `;

        return new Promise((resolve, reject) => {

            db.all(sql, [], (err, rows) => {

                if (err) reject(err);
                else resolve(rows);

            });

        });

    }


    async indicadores(){

        const db = getDatabase();

        const sql = `
            SELECT status, COUNT(*) as total
            FROM chamados
            GROUP BY status
        `;

        return new Promise((resolve, reject) => {

            db.all(sql, [], (err, rows) => {

                if (err) reject(err);
                else resolve(rows);
                
            });

        });

    }

}


module.exports = new ChamadoRepository();