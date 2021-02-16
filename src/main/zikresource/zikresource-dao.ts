import { Collection, Db, ObjectId } from "mongodb";
import { DbHandlerFactory } from "../db-handler-factory";
import { ZikStockError } from "../zikstock-error/zikstock-error";
import { Zikresource } from "./zikresource";

export class ZikresourceDAO {

    collection?: Collection<Zikresource>;

    constructor() {
        let db: Db|undefined = DbHandlerFactory.getDb();
        this.collection = db?.collection('zikresources');
    }

    async save(zikresource: Zikresource): Promise<Zikresource> {
        let result = await this.collection?.insertOne(zikresource);
        if (!result || result.insertedCount === 0) {
            throw new ZikStockError("500-2");
        } // TODO : add logs if result.insertedCount > 1
        return result.ops[0];
        
    }

    async delete(zikresource: Zikresource): Promise<boolean> {
        let result = await this.collection?.deleteOne({_id: zikresource._id});
        return result?.deletedCount === 1;
    }

    async retrieveOneById(id: string): Promise<Zikresource|null|undefined> {
        return await this.collection?.findOne({_id: new ObjectId(id)});
    }

    async retrieveAll(): Promise<Zikresource[]|undefined> {
        return await this.collection?.find({}).toArray();
    }

    async updateOne(id: string, zikresource: Zikresource): Promise<Zikresource|undefined> {
        let result = await this.collection?.replaceOne({_id: new ObjectId(zikresource._id)}, zikresource, { upsert: false });
        return result?.ops[0];
    }

}
