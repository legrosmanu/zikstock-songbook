import { ObjectId } from "mongodb";

export class Secret {
    
    _id?: ObjectId;
    key: string;
    values: string[];

    constructor(key: string, values: string[]) {
        this.key = key;
        this.values = values;
    }

}