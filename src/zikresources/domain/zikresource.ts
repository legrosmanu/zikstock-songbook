export interface Tag {
    label: string;
    value: string;
}

export interface ZikResource {
    url: string;
    title: string;
    artist?: string;
    tags?: Tag[];
    createdBy: string;
}
