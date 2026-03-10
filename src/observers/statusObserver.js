// Implementação do histórico automático de status dos chamados
// Sempre que o status mudar, será salvo o registro na tabela historico_status

const getDatabase = require('../config/database');

class StatusObserver{

    static async registrar(chamado_id, status_anterior, status_novo){

        const db = getDatabase();

        const sql = `
            INSERT INTO historico_status
            (chamado_id, status_anterior, status_novo)
            VALUES (?, ?, ?)
        `;

        return new Promise((resolve, reject) => {

            db.run(sql, [chamado_id, status_anterior, status_novo], function (err){

                if (err) reject(err);
                else resolve(true);

            });

        });

    }

}


module.exports = StatusObserver;