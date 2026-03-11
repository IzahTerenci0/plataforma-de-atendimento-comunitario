const usuarioService = require('../services/usuarioService');


class usuarioController{

    // Função assíncrona para cadastro de usuário
    async cadastrar(req, res){

        // Tratamento de erros para não quebrar a API e o servidor parar
        try{

            console.log("BODY RECEBIDO:", req.body); // Teste
            const resultado = await usuarioService.cadastrar(req.body);
            return res.status(201).json(resultado);

        } catch(error){

            // Padronização da resposta de erro em JSON
            return res.status(400).json({

                error: error.message

            });

        }

    }


    // Função assíncrona para login de usuário
    async login(req, res){

        // Tratamento de erros para não quebrar a API e o servidor parar
        try{

            const resultado = await usuarioService.login(req.body);
            return res.status(200).json(resultado);

        } catch(error){

            // Padronização da resposta de erro em JSON
            return res.status(401).json({

                error: error.message

            });

        }

    }

}


module.exports = new usuarioController