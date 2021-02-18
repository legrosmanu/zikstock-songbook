import { ObjectId } from "mongodb";

export class User {

    _id?: ObjectId;
    email: string;
    displayName: string;
    firstName?: string;
    lastName?: string;
    password: string;

    constructor(email: string, displayName: string, password: string) {
        this.email = email;
        this.displayName = displayName;
        this.password = password;
    }

}