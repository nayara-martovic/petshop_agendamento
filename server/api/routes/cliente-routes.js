const router = require('express').Router();
const resp = require('../utils/response');

const ClienteController = require('../controllers/cliente-controller');
const NotFound = require('../utils/errors/NotFound');

router.get('/', (req, res) => {
    ClienteController.obterTodos()
        .then(resposta => {
            if(!resposta)
                throw new NotFound("Nenhum cliente encontrado");

            resp.sendCreated(res, "Clientes obtidos com sucesso", resposta)
        })
        .catch(erro => resp.sendError(res, "Erro ao listar os clientes", erro));
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);

    ClienteController.obter(id)
        .then(resposta => {
            if(!resposta)
                throw new NotFound("Nenhum cliente encontrado");

            resp.sendSucess(res, "Cliente obtido com sucesso", resposta)
        })
        .catch(erro => resp.sendError(res, "Erro ao obter o cliente", erro));
});

router.post('/', (req, res) => {
    const dados = req.body;

    ClienteController.adicionar(dados)
        .then(resposta => resp.sendCreated(res, "Cliente criado com sucesso", resposta))
        .catch(erro => resp.sendError(res, "Erro ao criar cliente", erro));
});

router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const dados = req.body;

    ClienteController.alterar(id, dados)
        .then(resposta => resp.sendSuccess(res, "Cliente alterado com sucesso", resposta))
        .catch(erro => resp.sendError(res, "Erro ao alterar cliente", erro));
});

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);

    ClienteController.deletar(id)
        .then(resposta => resp.sendSucess(res, "Cliente deletado com sucesso", resposta))
        .catch(erro => resp.sendError(res, "Erro ao deletar cliente", erro));
});

module.exports = router;