const repository = require('../repositories/cliente-repository');

const NotFound = require('../utils/errors/NotFound');
const InvalidParameter = require('../utils/errors/InvalidParameter');
const InvalidFields = require('../utils/errors/InvalidFields');

class ClienteController {
    adicionar (cliente){
        const erros = this.validar(cliente);

        if(erros.length)
            return new Promise((res, rej) => rej(new InvalidFields(erros)));

        return repository.create(cliente);
    }

    alterar (id, cliente){
        if(!id)
            return new Promise((res, rej) => rej(new InvalidParameter("id")));

        const erros = this.validar(cliente, false);

        if(erros.length)
            return new Promise((res, rej) => rej(erros));

        return repository.update(id, cliente)
            .then(resultado => {
                if(!resultado)
                    throw new NotFound("Nenhum cliente encontrado");

                return cliente;
            });
    }

    deletar (id){
        if(!id)
            return new Promise((res, rej) => rej(new InvalidParameter("id")));
        
        return repository.delete(id)
            .then(resultado => {
                if(!resultado)
                    throw new NotFound("Nenhum cliente encontrado");
                
                return {};
            });
    }

    obter (id){
        if(!id)
            return new Promise((res, rej) => rej(new InvalidParameter("id")));

        return repository.getById(id);
    }

    obterTodos (){
        return repository.getAll();
    } 
    
    validar(dados, insercao=true){
        const validacoes = [{
            mensagem: "Campo obrigatório nulo", 
            campo: "nome",
            valido: (valor) => (valor) ? true : false
        },
        {
            mensagem: "Campo obrigatório nulo", 
            campo: "sobrenome",
            valido: (valor) => (valor) ? true : false
        },
        {
            mensagem: "Documento Inválido", 
            campo: "cpf",
            valido: (valor) => (valor && (valor.length == 11 || valor.length == 14))
        },
        {
            mensagem: "Campo obrigatório nulo", 
            campo: "email",
            valido: (valor) => (valor) ? true : false
        },
        {
            mensagem: "Campo obrigatório nulo", 
            campo: "telefone",
            valido: (valor) => (valor) ? true : false
        },
        {
            mensagem: "Campo obrigatório nulo", 
            campo: "cep",
            valido: (valor) => (valor) ? true : false
        }];

        // Retornar campos invalidos
        return validacoes.filter((validacao) => {
            let valor = dados[validacao.campo];
                      
            // Caso nao seja insercao libera os campos nao encontrados no objeto
            if (!insercao && valor == undefined) return false;

            return !validacao.valido(valor);
        });
    }
}

module.exports = new ClienteController();