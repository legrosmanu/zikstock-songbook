import express, { Router, Request, Response, NextFunction } from 'express';
import { ZikStockError } from "./zikstock-error/zikstock-error";
import { ZikresourceAPI } from './zikresource/zikresource-api';
import passport from 'passport';
import passportLocal from 'passport-local';
import { UserDAO } from './user/user-dao';
import { UserBLO } from './user/user-blo';
const LocalStrategy = passportLocal.Strategy;

const app = express();

const zikresourceAPI = new ZikresourceAPI();
app.use('/api/zikresources', zikresourceAPI.router);

passport.use(
    new LocalStrategy(
        async (email: string, password: string, done) => {
            const userBLO = new UserBLO();
            const existingUser = await userBLO.canLogIn(email, password);
            if (existingUser == null) {
                return done(null, false);
            }
            return done(null, existingUser);
        }
    )
);

/* eslint-disable */
// Error handling. Express expects to have the 4 parameters, so, need to disable eslint.
// This error handling is because by default Express manage the HTML responses, not the JSON errors.
app.use((err: ZikStockError, req: Request, res: Response, next: NextFunction) => {
    let status = 500;
    let error = null;
    if (err) {
        if (err instanceof ZikStockError) {
            status = err.status;
            error = err;
        } else {
            console.log(err);
            error = new ZikStockError("500-1");
        }
    }
    res.status(status).json(error);
});
/* eslint-enable */

module.exports = app;
