const utils = require('../utils/utils');
const repository = require('../repositories/atendimento-repository');

const InvalidFields = require('../utils/errors/InvalidFields');
const NotFound = require('../utils/errors/NotFound');
const InvalidParameter = require('../utils/errors/InvalidParameter');

class AtendimentoController {

    add(atendimento){
        let errors = this.validateData(atendimento);
        let interval = 30; //Minutos de intervalo entre os atendimentos
        let date_inicial;
        let date_final;

        if(errors)
            return utils.throwErrorAsPromise(errors);
        
        atendimento = this.treatData(atendimento);

        //Verifica se tem atendimentos no horario marcado
        let date = atendimento.data_atendimento
        let minute = date.getMinutes();

        date_inicial = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), minute-interval);
        date_final = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), minute+interval+1);

        return repository.getByDateAndService(date_inicial, date_final, atendimento.servico)
            .then(result => {
                if(result){
                    let error = new InvalidFields();
                    error.addCustomError("data_atendimento","Existe um horário marcado conflituando com este atendimento.");
                    throw error;
                }
                    

                return repository.create(atendimento);
            });
    }

    delete(id, cliente_id){
        if(!id)
            return utils.throwErrorAsPromise(new InvalidParameter("id"));

        if(!cliente_id)
            return utils.throwErrorAsPromise(new InvalidParameter("cliente_id"));

        return repository.delete(id, cliente_id)
            .then(result => {
                if(!result)
                    throw new NotFound("Nenhum atendimento encontrado");
                
                return {};
            });
    }

    getAllByMonth(month, year, service){
        if(!year)
            return utils.throwErrorAsPromise(new InvalidFields("ano", "is_null"));

        if(!month)
            return utils.throwErrorAsPromise(new InvalidFields("mes", "is_null"));

        if(!service)
            return utils.throwErrorAsPromise(new InvalidFields("servico", "is_null"));

        let date_inicial = new Date(year, month-1, 1);
        let date_final = new Date((new Date(year, month-1, 1, 23,59,59)).setDate(0));

        return repository.getAllByDateAndService(date_inicial, date_final, service);
    }

    validateData(data){
        let errors = new InvalidFields();

        if(!data.servico) {
            errors.addField("servico", "is_null");
        }

        if(data.data) {
            let patternDate = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

            if(!patternDate.test(data.data)){
                errors.addCustomError("data", "Digite a data no formato dd/mm/aaaa");
            }
        } else {
            errors.addCustomError("data", "Digite a data no formato dd/mm/aaaa");
        }

        if(data.horario) {
            let patternTime = /^[0-9]{2}\:[0-9]{2}\:[0-9]{2}$/;

            if(!patternTime.test(data.horario)){
                errors.addCustomError("horario", "Digite o horário no formato hh:mi:ss");
            } else {
                let date_example = new Date("1900-01-01 "+data.horario);

                if(date_example < (new Date("1900-01-01 08:00:00")))
                    errors.addCustomError("horario", "O horário não pode ser antes das 08h");
                else if(date_example > (new Date("1900-01-01 18:00:00")))
                    errors.addCustomError("horario", "O horário não pode ser depois das 18h");
            }
        } else {
            errors.addCustomError("horario", "Digite o horário no formato hh:mi:ss");
        }

        return errors.fields.length ? errors : null;
    }

    treatData(data){
        if(data.data && data.horario) {
            let aux = data.data.split("/");
            let auxTime = data.horario.split(":");

            data.data_atendimento = new Date(aux[2], aux[1]-1, aux[0], auxTime[0], auxTime[1]);
        }

        return data;
    }
}

module.exports = new AtendimentoController();