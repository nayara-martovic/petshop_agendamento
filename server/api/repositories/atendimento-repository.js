const db = require('../src/models');
const {and, gt, lt} = require('sequelize').Op;

const accepted_fields = ["cliente_id", "pet_id", "servico", "data_atendimento"];

class AtendimentoRepository {

    static getAll(timestamps=false){
        return db.Atendimento.findAll({
            attributes: { 
                exclude: timestamps ? [] : ["criado_em", "modificado_em"]
            },
            order: ["id"]
        });
    }

    static getAllByDateAndService(date_inicial, date_final, service){
        return db.Atendimento.findAll({
            where: { 
                servico: service,
                [and]: [
                    {data_atendimento: {[gt]: date_inicial}},
                    {data_atendimento: {[lt]: date_final}}
                ]
            },
            attributes: { 
                exclude: ["cliente_id", "pet_id", "criado_em", "modificado_em"]
            },
            order: ["id"]
        });
    }

    static getById(id, timestamps=false) {
        return db.Atendimento.findOne({
            where: { id: Number(id) },
            attributes: { 
                exclude: timestamps ? [] : ["criado_em", "modificado_em"]
            },
        });
    }

    static getByDateAndService(date_inicial, date_final, service){
        return db.Atendimento.findOne({
            where: { 
                servico: service,
                [and]: [
                    {data_atendimento: {[gt]: date_inicial}},
                    {data_atendimento: {[lt]: date_final}}
                ]
            },
            attributes: { 
                exclude: ["cliente_id", "pet_id", "criado_em", "modificado_em"]
            },
        });
    }

    static create(atendimento){
        return db.Atendimento.create(atendimento, {
            fields: accepted_fields
        }).then(result => {
            if(result) {
                let new_result = {};
                ["id", ...accepted_fields].forEach(field => new_result[field] = result[field]);
                return new_result;
            }
            return result;
        });
    }

    static delete(id, cliente_id) {
        return this.getById(id).then(result => {
            if(result) {
                return db.Atendimento.destroy({ where: { id: Number(id), cliente_id: Number(cliente_id) } });
            }
    
            return null;
        });
    }
}

module.exports = AtendimentoRepository;