const utils = require('../utils/utils');
const repository = require('../repositories/cliente-repository');

const NotFound = require('../utils/errors/NotFound');
const InvalidParameter = require('../utils/errors/InvalidParameter');

class ClienteController {
    add (cliente){
        return repository.getByEmail(cliente.email)
            .then(result => {
                if(result)
                    throw new Error("Já existe um Cliente com este E-mail");

                return repository.create(cliente);
            });
    }

    update (id, cliente){
        if(!id)
            return utils.throwErrorAsPromise(new InvalidParameter("id"));

        return repository.update(id, cliente)
            .then(result => {
                if(!result)
                    throw new NotFound("Nenhum cliente encontrado");

                return result[1];
            });
    }

    delete (id){
        if(!id)
            return utils.throwErrorAsPromise(new InvalidParameter("id"));
        
        return repository.delete(id)
            .then(result => {
                if(!result)
                    throw new NotFound("Nenhum cliente encontrado");
                
                return {};
            });
    }

    get (id){
        if(!id)
            return utils.throwErrorAsPromise(new InvalidParameter("id"));

        return repository.getById(id);
    }

    getAll (){
        return repository.getAll();
    } 
}

module.exports = new ClienteController();