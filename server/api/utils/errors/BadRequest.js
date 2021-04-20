class BadRequest extends Error {
    constructor() {
        super();
        this.message = "Invalid Request";
        this.id_error = 3;
    }
}

module.exports = BadRequest;