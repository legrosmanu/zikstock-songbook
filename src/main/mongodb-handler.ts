import { Db, MongoClient } from 'mongodb';
import { IDbHandler } from '../idb-handler';

export class MongoDbHandler implements IDbHandler{

    client: MongoClient;
    uri: string;
    db?: Db;

    constructor() { // TODO : change the URI
        this.uri = 'mongodb://localhost:27017';
        this.client = new MongoClient(this.uri, { useUnifiedTopology: true });
    }

    async connect() {
        try {
            // Connect the client to the server
            await this.client.connect();
            // Establish and verify connection
            await this.client.db("zikstock").command({ ping: 1 });
            this.db = this.client.db("zikstock");
            console.log("Connected successfully to server");
        } finally {
            // Ensures that the client will close when you finish/error
            await this.close();
        }
    }

    async close() {
        await this.client.close();
    }

}