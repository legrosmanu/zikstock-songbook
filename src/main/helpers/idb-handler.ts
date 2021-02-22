import { Db } from "mongodb";

// Interface to abstract the database used during unit tests (memory DB) and the other cases
export interface IDbHandler {

    uri: string;
    db?: Db;

    connect(): Promise<void>;

    close(): Promise<void>;

}
