const router = require('express').Router();
const resp = require('../utils/response');

const ClienteController = require('../controllers/cliente-controller');
const NotFound = require('../utils/errors/NotFound');

const PetRoutes = require('../routes/pet-routes');

router.get('/', (req, res) => {
    ClienteController.getAll()
        .then(result => {
            if(!result.length)
                throw new NotFound("Nenhum cliente encontrado");

            resp.sendSuccess(res, "Clientes obtidos com sucesso", result)
        })
        .catch(error => resp.sendError(res, "Erro ao listar os clientes", error));
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);

    ClienteController.get(id)
        .then(result => {
            if(!result)
                throw new NotFound("Nenhum cliente encontrado");

            resp.sendSuccess(res, "Cliente obtido com sucesso", result)
        })
        .catch(error => resp.sendError(res, "Erro ao obter o cliente", error));
});

router.post('/', (req, res) => {
    const data = req.body;

    ClienteController.add(data)
        .then(result => resp.sendCreated(res, "Cliente criado com sucesso", result))
        .catch(error => resp.sendError(res, "Erro ao criar cliente", error));
});

router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const data = req.body;

    ClienteController.update(id, data)
        .then(result => resp.sendSuccess(res, "Cliente alterado com sucesso", result))
        .catch(error => resp.sendError(res, "Erro ao alterar cliente", error));
});

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);

    ClienteController.delete(id)
        .then(result => resp.sendSuccess(res, "Cliente deletado com sucesso", result))
        .catch(error => resp.sendError(res, "Erro ao deletar cliente", error));
});

router.use("/:cliente_id/pets", PetRoutes);

module.exports = router;