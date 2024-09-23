export interface Tag {
    label: string;
    value: string;
}

export interface Zikresource {
    url: string;
    title: string;
    artist?: string;
    tags?: Tag[];
    createdBy: string;
}
