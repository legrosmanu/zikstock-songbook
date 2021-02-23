import { Collection, Db } from "mongodb";
import { ZikStockError } from "../zikstock-error/zikstock-error";
import { DbHandlerFactory } from "./db-handler-factory";
import { Secret } from "./secret";

export class SecretDAO {

    collection?: Collection<Secret>;

    constructor() {
        let db: Db|undefined = DbHandlerFactory.getDb();
        this.collection = db?.collection('secrets');
    }

    async getJwtSecret(): Promise<string|null> {
        const secret = await this.collection?.findOne({key: 'jwt'});
        let secretKey = null;
        if (secret != null) {
            secretKey = secret.values[0];
        }
        return secretKey;
    }

}