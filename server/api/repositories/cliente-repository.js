const db =  require('../src/models');

class ClientesRepository {
  static getAll() {
    return db.Cliente.findAll({
      attributes: { 
        exclude: ['criado_em', 'modificado_em']
      }
    });
  }

  static getById(id) {
    return db.Cliente.findOne({
        where: { id: Number(id) },
        attributes: { 
          exclude: ['criado_em', 'modificado_em']
        }
    });
  }

  static getByEmail(email) {
    return db.Cliente.findOne({
        where: { email },
        attributes: { 
          exclude: ['criado_em', 'modificado_em']
        }
    });
  }

  static create(novo_cliente) {
    return db.Cliente.create(novo_cliente, {
      fields: ["nome", "sobrenome", "cpf", "email", "telefone", "telefone_secundario", "logradouro", "numero", "bairro", "cidade", "complemento", "cep"],
      returning: ["id", "nome", "sobrenome", "cpf", "email", "telefone", "telefone_secundario", "logradouro", "numero", "bairro", "cidade", "complemento", "cep"]
    });
  }

  static update(id, novo_cliente) {
    return this.getById(id).then(result => {
        if(result) {
            return db.Cliente.update(novo_cliente, { 
              where: { id: Number(id) },
              fields: ["nome", "sobrenome", "telefone", "telefone_secundario", "logradouro", "numero", "bairro", "cidade", "complemento", "cep"],
              returning: ["id", "nome", "sobrenome", "cpf", "email", "telefone", "telefone_secundario", "logradouro", "numero", "bairro", "cidade", "complemento", "cep"]
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

