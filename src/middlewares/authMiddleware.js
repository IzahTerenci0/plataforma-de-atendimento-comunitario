// Esse Middleware irá ler o token enviado no header, verificar se ele é válido, permitir o acesso se estiver
// correto, e bloquear o acesso se não estiver correto.

const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next){

    // Recebendo o token que o cliente manda na requisição, que vem no header
    const authHeader = req.headers.authorization;

    if (!authHeader){

        return res.status(401).json({

            error: 'Token não fornecido.'

        });

    }

    // Separa a string que vem da requisição, para pegar somente o token.
    // Split separa a string e gera um array, o token está na posição 1 do array
    const token = authHeader.split(' ')[1];

    try{

        // Verificando se a assinatura bate com o segredo, se ela não expirou e decodifica o payload
        // Em caso de algo dar errado, é lançado erro abaixo
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Recupera o ID do usuário que está vinculado ao token, e anexa ele na requisição
        // Assim qualquer rota protegida pode saber quem é o usuário autenticado
        req.userId = decoded.id;

        // Permite o Express continuar para o controller - Se não existir, a requisição morre aqui!
        next();

    } catch(error){

        return res.status(401).json({

            error: 'Token inválido ou expirado.'

        });

    }

}


module.exports = authMiddleware;