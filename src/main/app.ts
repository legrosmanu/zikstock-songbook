import express, { Request, Response, NextFunction } from 'express';

import passport from 'passport';
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import bodyParser from 'body-parser';

import { ZikStockError } from "./zikstock-error/zikstock-error";
import { ZikresourceAPI } from './zikresource/zikresource-api';


import { UserBLO } from './user/user-blo';
import { UserAPI } from './user/user-api';
import { User } from './user/user';
import { UserDAO } from './user/user-dao';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

passport.use(
    new LocalStrategy(
        async (username: string, password: string, done) => {
            try {
                const userBLO = new UserBLO();
                const existingUser = await userBLO.canLogIn(username, password);
                if (existingUser == null) {
                    return done(null, false);
                }
                return done(null, existingUser);
            } catch (err) {
                return done(err);
            }
        }
    )
);

const zikresourceAPI = new ZikresourceAPI();
app.use('/api/zikresources', zikresourceAPI.router);
const userAPI = new UserAPI();
app.use('/api/users', userAPI.router);

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
            error = new ZikStockError("500-1");
        }
    }
    res.status(status).json(error);
});
/* eslint-enable */

module.exports = app;
