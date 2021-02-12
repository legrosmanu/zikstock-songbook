import { Collection, Db, ObjectId } from "mongodb";
import { ZikStockError } from "../zikstock-error/zikstock-error";
import { Zikresource } from "./zikresource";

export class ZikresourceDAO {

    collection: Collection<Zikresource>;

    constructor(db: Db) {
        this.collection = db.collection('zikresources');
    }

    async save(zikresource: Zikresource): Promise<Zikresource> {
        let result = await this.collection.insertOne(zikresource);
        if (result.insertedCount === 0) {
            throw new ZikStockError("500-2");
        } // TODO : add logs if result.insertedCount > 1
        return result.ops[0];
        
    }

    async delete(zikresource: Zikresource): Promise<boolean> {
        let result = await this.collection.deleteOne({_id: zikresource._id});
        return result.deletedCount === 1;
    }

    async retrieveOneById(id: any): Promise<Zikresource|null> {
        return await this.collection.findOne({_id: id});
    }

    async retrieveAll(): Promise<Zikresource[]> {
        return await this.collection.find({}).toArray();
    }

    async updateOne(id: string, zikresource: Zikresource): Promise<Zikresource> {
        let result = await this.collection.replaceOne({_id: zikresource._id}, zikresource, { upsert: false });
        return result.ops[0];
    }

}
