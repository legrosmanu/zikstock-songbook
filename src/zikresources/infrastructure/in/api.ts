import express, { Router, Request, Response, NextFunction } from 'express';
import { logger } from '../../../shared/logger';

const router: Router = express.Router();

const getZikresources = async function(req: Request, res: Response, next: NextFunction) {
    try {
        logger.info("Will come soon");
        res.sendStatus(501);
    } catch (err) {
        next(err);
    }
};
router.get('/', getZikresources);

export default router;
