// O repository conversa diretamente com o banco de dados.


const { resolve } = require('node:dns');
const getDatabase = require('../config/database');
const { get } = require('node:http');


class UsuarioRepository{

    async criaUsuario(usuario){

        const db = getDatabase();

        const sql = `INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)`;

        return new Promise((resolve, reject) => {

            db.run(sql, [usuario.nome, usuario.email, usuario.senha], function(err){

                if(err){

                    reject(err);

                } else{

                    resolve({ id: this.lastId });

                }

            });

        });

    }


    async buscaEmail(email){

        const db = getDatabase();
        const sql = `SELECT * FROM usuarios WHERE email = ?`;

        return new Promise((resolve, reject) => {

            db.get(sql, [email], (err, row) => {

                if(err){

                    reject(err);

                } else{

                    resolve(row);

                }

            });

        });

    }


    async buscaId(id){

        const db = getDatabase();
        const sql = `SELECT id, nome, email, data_criacao FROM usuarios WHERE id = ?`;

        return new Promise((resolve, reject) => {

            db.get(sql, [id], (err, row) => {

                if(err){

                    reject(err);

                } else{

                    resolve(row);

                }

            });

        });

    }

}


module.exports = new UsuarioRepository();