// Implementação do padrão FACTORY - Criação padronizada de chamados

// Aqui centraliza a criação do objeto chamado
class ChamadoFactory{

    static criar(info){

        // Todo chamado já é criado com status incial ABERTO
        return{

            usuario_id: info.usuario_id,
            categoria_id: info.categoria_id,
            descricao: info.descricao,
            cep: info.cep,
            cidade: info.cidade,
            uf: info.uf,
            prioridade: info.prioridade,
            status: 'ABERTO'

        };

    }

}


module.exports = ChamadoFactory;