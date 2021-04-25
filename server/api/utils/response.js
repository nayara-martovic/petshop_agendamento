
const BadRequest = require("./errors/BadRequest");
const InvalidFields = require("./errors/InvalidFields");
const NotFound = require('./errors/NotFound');
const InvalidParameter = require("./errors/InvalidParameter");
const { ValidationError } = require("sequelize");

const status = {
    //Sucesso
    SUCCESS: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    //Erros
    ERROR: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
}
  
Object.freeze(status);

class Response {
    //Senders

    static sendSuccess (res, message, data) {
        res.status(status.SUCCESS).json({ status: status.SUCCESS, message: message, data: data });
    }

    static sendCreated (res, message, data) {
        res.status(status.CREATED).json({ status: status.CREATED, message: message, data: data });
    }

    static sendUnauthorized (res, message) {
        res.status(status.UNAUTHORIZED).json({ status: status.UNAUTHORIZED, message: message, data: { auth: false } });
    }

    static send(res, data) {
        res.status(data.status).json(data);
    }

    static sendError (res, message, error) {
        let status_code = status.INTERNAL_SERVER_ERROR;
        let data = error;

        if (error instanceof BadRequest) {
            status_code = status.ERROR;
            message = error.message;
            data = null;

        } else if (error instanceof NotFound) {
            status_code = status.NOT_FOUND;
            data = { code: error.id_error, message: error.message };

        } else if (error instanceof InvalidParameter) {
            status_code = status.ERROR;
            data = { code: error.id_error, message: error.message };

        } else if (error instanceof InvalidFields) {
            status_code = status.ERROR;
            data = { code: error.id_error, message: error.message, details: error.fields};

        } else if (error instanceof ValidationError) {
            let new_error = new InvalidFields();
            status_code = status.ERROR;
            error.errors.forEach(error => new_error.addField(error.path, error.validatorKey, error.validatorArgs));

            data = { code: new_error.id_error, message: new_error.message, details: new_error.fields};

        } else if (error instanceof Error){
            data = { code: -1, message: error.message };
        }

        res.status(status_code).json({ status: status_code, message: message, error: data });
    }
}

module.exports = Response;