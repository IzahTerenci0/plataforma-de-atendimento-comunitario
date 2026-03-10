// Seed inicial do banco, para categorias e usuários de teste

const getDatabase = require('./database');
const bcrypt = require('bcrypt');

async function iniciaSeed(){

    const db = getDatabase();

    // Inserindo categorias básicas - Categorias são obrigatórias
    const categorias = ['Energia', 'Água', 'Árvores', 'Trânsito'];

    categorias.forEach(cat => {

        db.run(`INSERT OR IGNORE INTO categorias (nome) VALUES (?)`, [cat]);

    });

    // Insere usuário de teste
    const senhaHash = bcrypt.hashSync('123456', 10); // Senha de teste - Transforma a senha em hash antes de salvar, garantindo segurança

    // INSERT OR IGNORE evita duplicação caso esse seed seja executado mais de uma vez
    db.run(`
        INSERT OR IGNORE INTO usuarios (nome, email, senha)
        VALUES (?, ?, ?)
    `, ['Admin Teste', 'admin@teste.com', senhaHash]);

    console.log('Seed inicial executada com sucesso!');

}

// Exportando o módulo
module.exports = iniciaSeed;