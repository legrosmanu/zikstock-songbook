import { Db, MongoClient } from 'mongodb';
import { IDbHandler } from './idb-handler';

export class MongoDbHandler implements IDbHandler {

    client: MongoClient;
    uri: string;
    db?: Db;

    constructor() {
        const dbHost = process.env.DB_HOST || "localhost";
        const dbPort = process.env.DB_PORT || 27017;
        this.uri = 'mongodb://' + dbHost + ':' + dbPort;
        this.client = new MongoClient(this.uri, { useUnifiedTopology: true });
    }

    async connect() {
        // Connect the client to the server
        await this.client.connect();
        const dbName = process.env.DB_NAME || "spot4zik";
        this.db = this.client.db(dbName);
        console.log("Connected successfully to server");
    }

    async close() {
        await this.client.close();
    }

}