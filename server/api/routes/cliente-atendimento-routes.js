const router = require('express').Router({ mergeParams: true });
const resp = require('../utils/response');

const AtendimentoController = require('../controllers/atendimento-controller');
const ClienteController = require('../controllers/cliente-controller');
const NotFound = require('../utils/errors/NotFound');

router.post('/', verifyClient, (req, res) => {
    let cliente_id = Number(req.params.cliente_id);
    let data = req.body;

    data.cliente_id = cliente_id;

    AtendimentoController.add(data)
        .then(result => resp.sendCreated(res, "Atendimento criado com sucesso", result))
        .catch(error => resp.sendError(res, "Erro ao criar atendimento", error));
});

router.delete('/:id', verifyClient, (req, res) => {
    let cliente_id = Number(req.params.cliente_id);
    let id = Number(req.params.id);

    AtendimentoController.delete(id, cliente_id)
        .then(result => resp.sendSuccess(res, "Atendimento deletado com sucesso", result))
        .catch(error => resp.sendError(res, "Erro ao deletar atendimento", error));
});

function verifyClient(req, res, next){
    let id = Number(req.params.cliente_id);

    ClienteController.get(id)
        .then(result => {
            if(!result)
                throw new NotFound("Cliente não encontrado");

            next();
        })
        .catch(error => resp.sendError(res, "Erro ao obter o atendimento", error));
}

module.exports = router;