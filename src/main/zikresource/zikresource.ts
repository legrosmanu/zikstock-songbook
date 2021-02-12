import { ObjectId } from "mongodb";

export class Tag {
    label: string;
    value: string;
    constructor(label: string, value: string) {
        this.label = label || "";
        this.value = value || "";
    }
}

export class Zikresource {

    _id?: ObjectId;
    url: string;
    title: string;
    type?: string;
    artist?: string;
    tags?: Tag[];
    addedBy?: string;

    constructor(url: string, title: string) {
        this.url = url || "";
        this.title = title || "";
    }
}