const errorMessages = require('./zikstock-error-messages.js'); // must be replace by a document in MongodDB

class ZikStockError extends Error {

    constructor(code) {
        super();
        this.code = code;
        if (code && code.length >= 3) { this.status =  parseInt(code.substring(0, 3)); }
        this.message = this.getMessage();
    }

    getMessage() {
        let message = "";
        let error = errorMessages.find(element => element.code === this.code);
        if (error != null) {
            message = error.message;
        }
        return message;
    }
}

module.exports = ZikStockError;
