const db =  require('../src/models');

class ClientesRepository {
  static getAll() {
    return db.Cliente.findAll();
  }

  static getById(id) {
    return db.Cliente.findOne({
        where: { id: Number(id) }
    });
  }

  static create(novo_cliente) {
    return db.Cliente.create(novo_cliente);
  }

  static update(id, novo_cliente) {
    return this.getById(id).then(result => {
        if(result) {
            return db.Cliente.update(novo_cliente, { where: { id: Number(id) } });
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

