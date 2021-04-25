const router = require('express').Router({ mergeParams: true });
const resp = require('../utils/response');

const PetController = require('../controllers/pet-controller');
const ClienteController = require('../controllers/cliente-controller');
const NotFound = require('../utils/errors/NotFound');
       
router.get('/', verifyClient, (req, res) => {
    const cliente_id = Number(req.params.cliente_id);

    PetController.getAllByClienteId(cliente_id)
        .then(result => {
            if(!result.length)
                throw new NotFound("Nenhum pet encontrado");

            resp.sendSuccess(res, "Pets obtidos com sucesso", result);
        })
        .catch(error => resp.sendError(res, "Erro ao listar os pets", error));
});

router.get('/:id', verifyClient, (req, res) => {
    const cliente_id = Number(req.params.cliente_id);
    const id = Number(req.params.id);

    PetController.get(id, cliente_id)
        .then(result => {
            if(!result)
                throw new NotFound("Nenhum pet encontrado");

            resp.sendSuccess(res, "Pet obtido com sucesso", result)
        })
        .catch(error => resp.sendError(res, "Erro ao obter o pet", error));
});

router.post('/', verifyClient, (req, res) => {
    const cliente_id = Number(req.params.cliente_id);
    const data = req.body;

    data.cliente_id = cliente_id;

    PetController.add(data)
        .then(result => resp.sendCreated(res, "Pet criado com sucesso", result))
        .catch(error => resp.sendError(res, "Erro ao criar pet", error));
});

router.put('/:id', verifyClient, (req, res) => {
    const cliente_id = Number(req.params.cliente_id);
    const id = Number(req.params.id);
    const data = req.body;

    PetController.update(id, cliente_id, data)
        .then(result => resp.sendSuccess(res, "Pet alterado com sucesso", result))
        .catch(error => resp.sendError(res, "Erro ao alterar pet", error));
});

router.delete('/:id', (req, res) => {
    const cliente_id = Number(req.params.cliente_id);
    const id = Number(req.params.id);

    PetController.delete(id, cliente_id)
        .then(result => resp.sendSuccess(res, "Pet deletado com sucesso", result))
        .catch(error => resp.sendError(res, "Erro ao deletar pet", error));
});

function verifyClient(req, res, next){
    const id = Number(req.params.cliente_id);

    ClienteController.get(id)
        .then(result => {
            if(!result)
                throw new NotFound("Cliente não encontrado");

            next();
        })
        .catch(error => resp.sendError(res, "Erro ao obter o pet", error));
}

module.exports = router;