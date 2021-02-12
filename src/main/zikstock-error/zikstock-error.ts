export class ZikStockError extends Error {

    code: string;
    status: number;
    message: string;

    constructor(code: string) {
        super();
        this.code = code;
        if (code && code.length >= 3) { 
            this.status =  parseInt(code.substring(0, 3));
        } else {
            this.status = 500;
        }
        this.message = "";
    }

}
