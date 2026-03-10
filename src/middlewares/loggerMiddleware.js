//


function loggerMiddleware(req, res, next){

    // Para calcular o tempo total da requisição em milissegundos
    const start = Date.now();

    // Garantir que o log mostre o status real da resposta
    res.on('finish', () => {

        console.log(
            `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} - ${Date.now() - start}ms`
        );

    });

    next();

}


module.exports = loggerMiddleware;