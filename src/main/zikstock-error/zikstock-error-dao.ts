import { ZikStockError } from './zikstock-error';

export class ZikStockErrorDAO {

    messages: ZikStockError[];

    constructor() { // For now, the messages are here before being the database
        this.messages = [];
        let error = new ZikStockError("400-1");
        error.setMessage("ZikResource validation failed: the data are not correct to create a zikresource.");
        this.messages.push(error);
        error = new ZikStockError("404-1");
        error.setMessage("The ZikResource doesn't exist.");
        this.messages.push(error);
    }

    findByCode(code:string) {
        let error = this.messages.find((element: ZikStockError) => element.code === code);
        if (error == null) {
            error = new ZikStockError("500-1");
            error.setMessage("Error unknown");
        }
        return error;
    }

}
