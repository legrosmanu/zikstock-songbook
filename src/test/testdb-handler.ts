import { IDbHandler } from "../idb-handler";
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Db, MongoClient } from 'mongodb';

export class TestDbHandler implements IDbHandler {

    uri: string;
    server: MongoMemoryServer;
    client: any;
    db?: Db;
    collections: string[];

    constructor() {
        this.uri = "";
        this.server = new MongoMemoryServer();
        this.client = null;
        this.collections = ['zikresources'];
    }

    async connect() {
        this.uri = await this.server.getUri();
        this.client = new MongoClient(this.uri, { useUnifiedTopology: true });
        await this.client.connect();
        this.db = this.client.db(await this.server.getDbName());
    }

    async clear() {
        Promise.all(this.collections.map(c => this.db?.collection(c).deleteMany({})));
    }

    async close() {
        await this.db?.dropDatabase();
        await this.client.close();
        await this.server.stop();
    }
}