import { ZikStockError } from './zikstock-error';

export class ZikStockErrorDAO {

    messages: ZikStockError[];

    constructor() { // For now, the messages are here before being the database
        this.messages = [];
        let error = new ZikStockError("400-1");
        error.message = "ZikResource validation failed: must have at least a title and a url.";
        this.messages.push(error);
        error = new ZikStockError("400-2");
        error.message = "ZikResource validation failed: can't have more than 10 tags.";
        this.messages.push(error);
        error = new ZikStockError("404-1");
        error.message = "The ZikResource doesn't exist.";
        this.messages.push(error);
        error = new ZikStockError("500-2");
        error.message = "Error during the insertion into the database.";
        this.messages.push(error);
    }

    findByCode(code:string) {
        let error = this.messages.find((element: ZikStockError) => element.code === code);
        if (error == null) {
            error = new ZikStockError("500-1");
            error.message  = "Error unknown";
        }
        return error;
    }

}
