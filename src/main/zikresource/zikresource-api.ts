import express, { Router, Request, Response, NextFunction } from 'express';
import { Zikresource } from './zikresource';
import { ZikresourceBLO } from './zikresource-blo';
import { ZikresourceDAO } from './zikresource-dao';

export class ZikresourceAPI {

    router: Router;
    blo: ZikresourceBLO;

    constructor(blo: ZikresourceBLO) {
        this.router = express.Router();
        this.router.use(express.json());
        this.router.post('/', this.createZikresource);
        this.router.get('/', this.getZikresources);
        this.router.get('/:id', this.getZikresource);
        this.router.delete('/:id', this.deleteZikresource);
        this.router.put('/:id', this.updateZikresource);
        this.blo = blo;
    }

    async createZikresource(req: Request, res: Response, next: NextFunction) {
        try {
            res.sendStatus(501);
        } catch (err) {
            next(err);
        }
    }

    async getZikresource(req: Request, res: Response, next: NextFunction) {
        try {
            res.sendStatus(501);
        } catch (err) {
            next(err);
        }
    }

    async getZikresources(req: Request, res: Response, next: NextFunction) {
        try {
            let zikResources = await this.blo.getZikresources();
            if (zikResources != null) {
                res.status(200).json(zikResources);
            } else {
                res.status(200).json([]);
            }
        } catch (err) {
            next(err);
        }
    }

    async deleteZikresource(req: Request, res: Response, next: NextFunction) {
        try {
            res.sendStatus(501);
        } catch (err) {
            next(err);
        }
    }

    async updateZikresource(req: Request, res: Response, next: NextFunction) {
        try {
            res.sendStatus(501);
        } catch (err) {
            next(err);
        }
    }

}
