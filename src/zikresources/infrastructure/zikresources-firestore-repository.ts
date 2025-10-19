import { db } from '../../shared/db';
import { logger } from '../../shared/logger';
import { ZikResource } from '../domain/zikresource';
import { v4 as uuidv4 } from 'uuid';

const findByCreatedBy = async function(createdBy: string): Promise<ZikResource[]> {
    logger.debug(`Retrieve zikresources from DB for the user ${createdBy}`);
    
    const query = db.collection('zikresources').where("createdBy", "==", createdBy);
    const response = await query.get();

    if (response.empty) return [];
    return response.docs.map(doc => doc.data() as ZikResource);
}

const persist = async function(zikresource: ZikResource): Promise<ZikResource> {
    logger.debug(`Create a zikresource {zikresource}`);
    await db.collection('zikresources').doc(uuidv4()).set(zikresource);
    return zikresource;
};

const zikResourcesFirestoreRepository = {
    findByCreatedBy,
    persist
};

export default zikResourcesFirestoreRepository;

