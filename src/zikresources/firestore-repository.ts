import { db } from '../shared/db';
import { logger } from '../shared/logger';
import { Zikresource } from './zikresource';
import { v4 as uuidv4 } from 'uuid';

const findByCreatedBy = async function(createdBy: string): Promise<Zikresource[] | null> {
    logger.debug(`Retrieve zikresources from DB for the user ${createdBy}`);
    
    const query = db.collection('zikresources').where("createdBy", "==", createdBy);
    const response = await query.get();

    if (response.empty) return null;
    return response.docs.map(doc => doc.data() as Zikresource);
}

const persist = async function(zikresource: Zikresource): Promise<void> {
    logger.debug(`Create a zikresource {zikresource}`);
    db.collection('zikresources').doc(uuidv4()).set(zikresource);
};

export {
    findByCreatedBy,
    persist
};

