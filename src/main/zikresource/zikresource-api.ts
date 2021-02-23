import express, { Router, Request, Response, NextFunction } from 'express';
import { Zikresource } from './zikresource';
import { ZikresourceBLO } from './zikresource-blo';

import * as AuthenticationFactory from '../user/authentication-factory';

export class ZikresourceAPI {

    router: Router;
    blo: ZikresourceBLO;

    constructor() {
        this.router = express.Router();
        this.router.use(express.json());
        this.router.post('/', AuthenticationFactory.jwtAuthentication, (req: Request, res: Response, next: NextFunction) => this.createZikresource(req, res, next));
        this.router.get('/', AuthenticationFactory.jwtAuthentication, (req: Request, res: Response, next: NextFunction) => this.getZikresources(req, res, next));
        this.router.get('/:id', AuthenticationFactory.jwtAuthentication, (req: Request, res: Response, next: NextFunction) => this.getZikresource(req, res, next));
        this.router.delete('/:id', AuthenticationFactory.jwtAuthentication, (req: Request, res: Response, next: NextFunction) => this.deleteZikresource(req, res, next));
        this.router.put('/:id', AuthenticationFactory.jwtAuthentication, (req: Request, res: Response, next: NextFunction) => this.updateZikresource(req, res, next));
        this.blo = new ZikresourceBLO();
    }

    async createZikresource(req: Request, res: Response, next: NextFunction) {
        try {
            let zikresource: Zikresource = await this.blo.createZikresource(
                {
                    ...req.user,
                    ...req.body
                });
            res.status(201).json(zikresource);
        } catch (err) {
            next(err);
        }
    }

    async getZikresource(req: Request, res: Response, next: NextFunction) {
        try {
            let zikresource: Zikresource | null = await this.blo.getOneZikresourceById(req.params.id);
            if (zikresource != null) {
                res.status(200).json(zikresource);
            } else {
                res.sendStatus(404);
            }
        } catch (err) {
            next(err);
        }
    }

    async getZikresources(req: Request, res: Response, next: NextFunction) {
        try {
            let zikresources: Zikresource[] = await this.blo.getZikresources();
            res.status(200).json(zikresources);
        } catch (err) {
            next(err);
        }
    }

    async deleteZikresource(req: Request, res: Response, next: NextFunction) {
        try {
            await this.blo.deleteOneZikresource(req.params.id, req.user);
            res.sendStatus(204);
        } catch (err) {
            next(err);
        }
    }

    async updateZikresource(req: Request, res: Response, next: NextFunction) {
        try {
            let zikresource = await this.blo.updateOneZikresource(req.params.id, {
                ...req.user,
                ...req.body
            });
            if (zikresource != null) {
                res.status(200).json(zikresource);
            } else {
                res.sendStatus(404);
            }
        } catch (err) {
            next(err);
        }
    }

}
