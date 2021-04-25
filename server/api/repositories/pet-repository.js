const db = require('../src/models');

const accepted_fields = ["nome", "cliente_id", "especie", "raca", "data_nascimento", "comportamento", "observacao"];
const updated_fields = accepted_fields.filter(field => field !== "cliente_id");

class PetRepository {

    static getAll(timestamps=false){
        return db.Pet.findAll({
            attributes: { 
                exclude: timestamps ? [] : ['criado_em', 'modificado_em']
            },
            order: ["id"]
        });
    }

    static getAllByClienteId(cliente_id, timestamps=false){
        return db.Pet.findAll({
            where: { cliente_id: Number(cliente_id) },
            attributes: { 
                exclude: timestamps ? [] : ['criado_em', 'modificado_em']
            },
            order: ["id"]
        });
    }

    static getById(id, cliente_id, timestamps=false){
        return db.Pet.findOne({
            where: { id: Number(id), cliente_id: Number(cliente_id) },
            attributes: { 
                exclude: timestamps ? [] : ['criado_em', 'modificado_em']
            }
        });
    }

    static create(novo_pet){
        return db.Pet.create(novo_pet, {
            fields: accepted_fields,
            returning: ["id", ...accepted_fields]
        });
    }

    static update(id, cliente_id, novo_pet){
        return this.getById(id, cliente_id).then(result => {
            if(result) {
                return db.Pet.update(novo_pet, {
                    where: { id: Number(id), cliente_id: Number(cliente_id) },
                    fields: updated_fields,
                    returning: ["id", ...accepted_fields]
                });
            }

            return null;
        });
    }

    static delete(id, cliente_id){
        return this.getById(id).then(result => {
            if(result) {
                return db.Pet.destroy({ where: { id: Number(id), cliente_id: Number(cliente_id) } });
            }

            return null;
        });
    }
}

module.exports = PetRepository;