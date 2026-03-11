/* Service aplica regras de negócio.
** Realiza validação de dados, verifica se e-mail já existe, gera hash da senha, compara senha no login
** e gera token JWT
*/

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioRepository = require('../repositories/usuarioRepository');
const SALT_ROUNDS = 10; // É o número de ciclos de processamento, quantas vezes o algoritmo vai trabalhar para gerar o hash da senha


class usuarioService{

    // Registro de usuário
    async cadastrar(dados){

        const { nome, email, senha } = dados;

        // Garante o preenchimento obrigatório de todos os campos, e a inserção do registro completo no banco
        if (!nome || !email || !senha) {

            throw new Error('Nome, email e senha são de preenchimento obrigatório.');

        }

        // Verifica se o e-mail não está duplicado no banco, evitando que existe mais de uma conta com o mesmo endereço de e-mail
        // Explicitando a regra de negócio na aplicação - Faz validação prévia para evitar erro no banco de dados
        const usuarioExistente = await usuarioRepository.buscaEmail(email);

        if (usuarioExistente) {

            throw new Error('Email já cadastrado.');
        
        }

        // Cria hash da senha para garantir segurança e que ela não possa ser quebrada
        const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);

        const novoUsuario = await usuarioRepository.criaUsuario({ nome, email, senha: senhaHash });

        return { id: novoUsuario.id, nome, email };

    }


    async login(dados){

        const { email, senha } = dados;

        if(!email || !senha){

            throw new Error('Email e senha são obrigatórios.');

        }

        const usuario = await usuarioRepository.buscaEmail(email);

        if(!usuario){

            throw new Error('Credenciais inválidas.');

        }

        // Comparando a senha que o usuário inseriu com o hash salvo no banco de dados
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if(!senhaValida){

            throw new Error('Credenciais inválidas.');

        }


        // Gerando um token assinado que contém o ID do usuário e a assinatura criptografica
        // Atende o requisito de rotas privadas protegidas com JWT  
        const token = jwt.sign(

            { id: usuario.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }

        );

        return {

            token

        };

    }

}


module.exports = new usuarioService();