const errorMessages = require('./zik-stock-error-messages.json').messages; // must be replace by a document in MongodDB

class ZikStockError extends Error {

    constructor(code) {
        super();
        this.code = code;
        this.message = this.getMessage();
    }

    getMessage() {
        let message = errorMessages.find(element => element.code === this.code);
        if (message === undefined) {
            message = "";
        }
        return message;
    }
}

module.exports = ZikStockError;
