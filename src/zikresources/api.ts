import express, { Router, Request, Response, NextFunction } from 'express';
import { logger } from '../shared/logger';

import { getZikresourcesOfUser, createZikresource } from './service';
import { ZikstockError } from '../shared/api-error';

const router: Router = express.Router();

const getZikresources = async function (req: Request, res: Response, next: NextFunction) {
    try {
        let user: string;
        user = req.params.userId as string;
        if (!user) throw new ZikstockError({status: 400, message: `It is not possible to get the zikresources for {user}`});

        logger.debug(`Get zikresources of the user {user}`);
        const zikresources = await getZikresourcesOfUser(user);
        res.send(zikresources);

    } catch (err) {
        next(err);
    }
};
router.get('/:userId', getZikresources);

const postZikresource = async function(req: Request, res: Response, next: NextFunction) {
    try {
        await createZikresource(req.body, db);
    } catch (err) {
        next(err);
    }
};
router.post('/:userId', postZikresource);

export default router;
