import { Collection, Db, ObjectId } from "mongodb";
import { DbHandlerFactory } from "../db-handler-factory";
import { ZikStockError } from "../zikstock-error/zikstock-error";
import { User } from "./user";

export class UserDAO {

    collection?: Collection<User>;

    constructor() {
        let db: Db|undefined = DbHandlerFactory.getDb();
        this.collection = db?.collection('users');
    }

    async create(user: User): Promise<User> {
        let result = await this.collection?.insertOne(user);
        if (!result || result.insertedCount !== 1) {
            throw new ZikStockError("500-5");
        }
        return result.ops[0];
    }

    async retrieveOneById(id: string): Promise<User|null|undefined> {
        return await this.collection?.findOne({_id: new ObjectId(id)});
    }

    async retrieveOneByEmail(email: string): Promise<User|null|undefined> {
        return await this.collection?.findOne({email: email});
    }

}