const repository = require('../repositories/cliente-repository');
const validator = require('../utils/validator');

const NotFound = require('../utils/errors/NotFound');
const InvalidParameter = require('../utils/errors/InvalidParameter');
const InvalidFields = require('../utils/errors/InvalidFields');

class ClienteController {
    adicionar (cliente){
        const erros = this.validar(cliente);

        if(erros.length)
            return new Promise((res, rej) => rej(new InvalidFields(erros)));

        return repository.getByEmail(cliente.email)
            .then(resultado => {
                if(resultado)
                    throw new  Error("Já existe um Cliente com este E-mail");

                return repository.create(cliente);
            });
    }

    alterar (id, cliente){
        if(!id)
            return new Promise((res, rej) => rej(new InvalidParameter("id")));

        const erros = this.validar(cliente);

        if(erros.length)
            return new Promise((res, rej) => rej(new InvalidFields(erros)));

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
    
    validar(dados){
        let validacoes = {
            "nome": "required",
            "sobrenome": "required",
            "cpf": {
                type: "custom",
                message: "Documento Inválido",
                validate: (valor) => (valor && (valor.length == 11 || valor.length == 14))                
            },
            "email": "required",
            "telefone": "required",
            "logradouro": "required",
            "numero": "required",
            "bairro": "required",
            "cidade": "required",
            "cep": "required"
        };

        return validator.check(dados, validacoes);
    }
}

module.exports = new ClienteController();