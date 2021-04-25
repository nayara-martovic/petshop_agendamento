const router = require('express').Router();
const resp = require('../utils/response');

const AtendimentoController = require('../controllers/atendimento-controller');
const NotFound = require('../utils/errors/NotFound');

router.get('/:servico/:ano/:mes', (req, res) => {
    let servico = req.params.servico;
    let ano = req.params.ano;
    let mes = req.params.mes;

    AtendimentoController.getAllByMonth(mes, ano, servico)
        .then(result => {
            if(!result.length)
                throw new NotFound("Nenhum atendimento encontrado");

            resp.sendSuccess(res, "Atendimentos obtidos com sucesso", result)})
        .catch(error => resp.sendError(res, "Erro ao listar os atendimentos", error));
});

module.exports = router;