class InvalidFields extends Error {
    constructor(field, key, args) {
        super();
        this.message = "Invalid Fields";
        this.fields = [];
        this.id_error = 2;

        if(field && key)
            this.addField(field, key, args);
    }

    addField(field, key, args){
        let item = {
            field,
            error: key ? this.proccessMessage(key, args) : null
        }

        this.fields.push(item);
    }

    addCustomError(field, error){
        let item = {
            field,
            error
        }

        this.fields.push(item);
    }

    proccessMessage(key, args) {
        if(key === "is_null") {
            return "Valor não pode ser nulo.";

        } else if(key === "notEmpty"){
            return "Valor não pode ser vazio.";

        } else if(key === "len"){
            if(args[0] <= 1){
                return `Tamanho do texto deve ser menor que ${args[1]}`;
            }

            return `Tamanho do texto deve ser entre ${args[0]} e ${args[1]}`;

        } else if(key === "isEmail"){
            return "Email inválido";

        } else if(key === "not_a_string"){
            return "Valor esperado é uma string.";

        } else if(key === "not_an_array"){
            return "Valor esperado é um Array";
        }

        console.log(key);
    }
}

module.exports = InvalidFields;