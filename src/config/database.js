// Implementação do padrão de projeto SINGLETON, para garantir que haja somente uma instância do banco de dados em execução
// Impede múltiplas conexões abertas, problemas de concorrência e traz organização mdo código. Além disso, atua para centralizar o acesso ao banco de dados

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let instancia = null;

function getDatabase(){

    // A conexão somente será criada se ainda não existir
    if(!instancia){

        instancia = new sqlite3.Database(

            // O arquivo da base de dados database.db se encontrará na raiz do projeto
            path.resolve(__dirname, '../../database.db'),
            (err) => {

                if(err){

                    console.error('Erro ao estabelecer conexão com o banco de dados: ', err.message);

                } else{

                    console.log('Banco de dados conectado com sucesso!');

                }

            }

        );

    }

    return instancia;

}


module.exports = getDatabase;