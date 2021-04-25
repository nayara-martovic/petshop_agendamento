const db =  require('../src/models');

const accepted_fields = ["nome", "sobrenome", "cpf", "email", "telefone", "telefone_secundario", "logradouro", "numero", "bairro", "cidade", "complemento", "cep"];
const updated_fields = accepted_fields.filter(field => field !== "cpf" && field !== "email");

class ClientesRepository {
  static getAll(timestamps=false) {
    return db.Cliente.findAll({
      attributes: { 
        exclude: timestamps ? [] : ['criado_em', 'modificado_em']
      },
      order: ["id"]
    });
  }

  static getById(id, timestamps=false) {
    return db.Cliente.findOne({
        where: { id: Number(id) },
        attributes: { 
          exclude: timestamps ? [] : ['criado_em', 'modificado_em']
        }
    });
  }

  static getByEmail(email, timestamps=false) {
    return db.Cliente.findOne({
        where: { email },
        attributes: { 
          exclude: timestamps ? [] : ['criado_em', 'modificado_em']
        }
    });
  }

  static create(novo_cliente) {
    return db.Cliente.create(novo_cliente, {
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

  static update(id, novo_cliente) {
    return this.getById(id).then(result => {
        if(result) {
            return db.Cliente.update(novo_cliente, { 
              where: { id: Number(id) },
              fields: updated_fields
            }).then(result => {
                if(result) {
                    let new_result = {};
                    ["id", ...accepted_fields].forEach(field => new_result[field] = result[field]);
                    return new_result;
                }
                return result;
            });
        }

        return null;
    });
  }

  static delete(id) {
    return this.getById(id).then(result => {
        if(result) {
            return db.Cliente.destroy({ where: { id: Number(id) } });
        }

        return null;
    });
  }
}

module.exports = ClientesRepository;

