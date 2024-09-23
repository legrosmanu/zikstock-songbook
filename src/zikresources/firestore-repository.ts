import { Firestore } from '@google-cloud/firestore';
//TODOimport { db } from '../shared/db';
import { db } from '../shared/db-mock';
import { logger } from '../shared/logger';
import { Zikresource } from './zikresource';

const getDb = async function(): Promise<Firestore> {
    const dbconfig = (process.env.platform === 'test') ? '../shared/db-mock' : '../shared/db';
    return import(dbconfig);
}

const findByCreatedBy = async function(createdBy: string): Promise<Zikresource[] | null> {
    logger.debug(`Retrieve zikresources from DB for the user ${createdBy}`);
    //TODOconst db = await getDb();
    
    const results = await db.collection('zikresources').where('createdBy', '==', createdBy).get();
    
    if (results.empty) return null;

    return results.docs.map(doc => doc.data() as Zikresource);
}

const persist = async function(zikresource: Zikresource): Promise<void> {
    logger.debug(`Create a zikresource {zikresource}`);
    //TODOconst db = await getDb();
    db.collection('zikresources').doc(`{zikresource.createdBy}-{url}`).set(zikresource);
};

export {
    findByCreatedBy,
    persist
};

