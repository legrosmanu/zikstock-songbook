import express, { NextFunction, Request, Response, Router } from "express";
import passport from 'passport';
import { UserWithoutPassword } from "./user";
import { UserBLO } from "./user-blo";

export class UserAPI {

    router: Router;
    blo: UserBLO;

    constructor() {
        this.router = express.Router();
        this.router.use(express.json());
        this.router.post('/login', passport.authenticate('local', {session:false}), (req: Request, res: Response, next: NextFunction) => this.login(req, res, next));
        this.router.post('/', (req: Request, res: Response, next: NextFunction) => this.createUser(req, res, next));
        this.blo = new UserBLO();
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const token = await this.blo.getToken(req.user);
            res.status(200).json(token);
        } catch (err) {
            next(err);
        }
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.blo.createUser(req.body);
            res.status(201).json(new UserWithoutPassword(user));
        } catch (err) {
            next(err);
        }
    }

}
