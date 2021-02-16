import { Db } from "mongodb";
import { IDbHandler } from "../idb-handler";
import { TestDbHandler } from "../test/testdb-handler";
import { MongoDbHandler } from "./mongodb-handler";

export class DbHandlerFactory {

    private static dbHandler: IDbHandler;

    private constructor() {
    }

    static async build() : Promise<IDbHandler> {
        if (process.env.NODE_ENV !== 'test') {
            DbHandlerFactory.dbHandler = new MongoDbHandler();
        } else {
            DbHandlerFactory.dbHandler = new TestDbHandler();
        }
        await DbHandlerFactory.dbHandler.connect();
        return DbHandlerFactory.dbHandler;
    }

    static getDb(): Db | undefined {
        return DbHandlerFactory.dbHandler.db;
    }

}
