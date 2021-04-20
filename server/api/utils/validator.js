
class Validator {
    constructor (){
        this.messages = {
            "required": "Este campo é obrigatório",
            "len": "Tamanho Inválido"
        }

        this.validation = {
            "required": (value, options) => (value != undefined && value),
            "len": (value, options) => (value && (value.length >= options.min && value.length < options.max))
        }
          
        Object.freeze(this.messages);
    }

    check(data, options){
        return Object.keys(options).map((field) => {
            return this.validate(field, data[field], options[field]);
        })
        .filter(el => el != null);
    }

    validate(field, value, options){
        let type;
        let custom_message;
        let custom_validation;

        if (typeof(options) != "string") {
            type = options.type ? options.type : "custom";
            custom_message = options.message;
            custom_validation = options.validate;
        } else {
            type = options;
        }

        if(type == "custom"){
            if(custom_validation != undefined && !custom_validation(value)) {
                return {
                    campo: field,
                    erro: custom_message
                };
            }
        }
        else if(!this.validation[type](value)) {
            return {
                campo: field,
                erro: (custom_message) ? custom_message : this.messages[type]
            };
        }

        return;
    }

}

module.exports = new Validator;