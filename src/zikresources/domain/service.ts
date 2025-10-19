import zikResourcesFirestoreRepository from '../infrastructure/zikresources-firestore-repository';
import { ZikResource } from "./zikresource";

async function getZikresourcesOfUser(userId: string): Promise<ZikResource[] | null> {
    return zikResourcesFirestoreRepository.findByCreatedBy(userId);
};

async function createZikresource(zikresource: ZikResource): Promise<void> {
    zikResourcesFirestoreRepository.persist(zikresource);
};

export {
    getZikresourcesOfUser,
    createZikresource
}