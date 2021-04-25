const utils = require("../utils/utils");
const repository = require("../repositories/pet-repository");

const NotFound = require("../utils/errors/NotFound");
const InvalidFields = require("../utils/errors/InvalidFields");
const InvalidParameter = require("../utils/errors/InvalidParameter");

class PetController {

    add(pet){
        let errors = this.validadeData(pet);

        if(errors)
            return utils.throwErrorAsPromise(errors);
        
        pet = this.treatData(pet);

        return repository.create(pet);
    }

    update(id, cliente_id, pet) {
        let errors;

        if(!id)
            return utils.throwErrorAsPromise(new InvalidParameter("id"));

        if(!cliente_id)
            return utils.throwErrorAsPromise(new InvalidParameter("cliente_id"));

        errors = this.validadeData(pet);

        if(errors)
            return utils.throwErrorAsPromise(errors);
        
        pet = this.treatData(pet);

        return repository.update(id, cliente_id, pet)
            .then(result => {
                if(!result)
                    throw new NotFound("Nenhum pet encontrado");

                return result[1];
            });
    }

    delete (id, cliente_id) {
        if(!id)
            return utils.throwErrorAsPromise(new InvalidParameter("id"));

        if(!cliente_id)
            return utils.throwErrorAsPromise(new InvalidParameter("cliente_id"));
        
        return repository.delete(id, cliente_id)
            .then(result => {
                if(!result)
                    throw new NotFound("Nenhum pet encontrado");
                
                return {};
            });
    }

    get(id, cliente_id){
        if(!id)
            return utils.throwErrorAsPromise(new InvalidParameter("id"));
        
        if(!cliente_id)
            return utils.throwErrorAsPromise(new InvalidParameter("cliente_id"));

        return repository.getById(id, cliente_id)
            .then(result => {
                if(result && result.comportamento)
                    result.comportamento = result.comportamento.split(",");

                return result;
            });
    }

    getAllByClienteId(cliente_id){
        if(!cliente_id)
            return utils.throwErrorAsPromise(new InvalidParameter("cliente_id"));

        return repository.getAllByClienteId(cliente_id)
            .then(result => {
                if(result.length)
                    result = result.map(item => {
                        if(item.comportamento) item.comportamento = item.comportamento.split(",");

                        return item;
                    });

                return result;
            });
    }

    validadeData(data){
        let errors = new InvalidFields();

        if(data.comportamento) {
            if(!Array.isArray(data.comportamento))
                errors.addField("comportamento", "not_an_array");
        }

        if(data.data_nascimento) {
            let patternData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
            if(!patternData.test(data.data_nascimento)){
                errors.addCustomError("data_nascimento", "Digite a data no formato Dia/Mês/Ano");
            }
        }

        return errors.fields.length ? errors : null;
    }

    treatData(data){
        if(data.comportamento) {
            data.comportamento = data.comportamento.join(",");
        }

        if(data.data_nascimento) {
            let aux = data.data_nascimento.split("/");
            data.data_nascimento = new Date(aux[2], aux[1]-1, aux[0]);
        }

        return data;
    }
}

module.exports = new PetController();
