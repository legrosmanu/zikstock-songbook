module.exports = class HttpError {

    constructor(error) {

        this.code = error.code;
        
        this.info = error.info;

        if (error.message === undefined) {
            this.message = "Ooopppssss. An unkown error";
        } else {
            this.message = error.message;
        }

        if (error.httpCode === undefined) {
            this.httpCode = 500;
        } else {
            this.httpCode = error.httpCode;
        }

    }
};
