import { findByCreatedBy, persist } from './firestore-repository';
import { Zikresource } from "./zikresource";

async function getZikresourcesOfUser(userId: string): Promise<Zikresource[] | null> {
    return findByCreatedBy(userId); 
};

async function createZikresource(zikresource: Zikresource): Promise<void> {
    persist(zikresource);
};

export {
    getZikresourcesOfUser,
    createZikresource
}