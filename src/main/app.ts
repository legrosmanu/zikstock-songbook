import express, { Request, Response, NextFunction } from 'express';

import passport from 'passport';

import * as AuthenticationFactory from './user/authentication-factory';

import bodyParser from 'body-parser';

import { ZikStockError } from "./zikstock-error/zikstock-error";
import { ZikresourceAPI } from './zikresource/zikresource-api';
import { SecretDAO } from './helpers/secret-dao';
import { UserAPI } from './user/user-api';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

passport.use(AuthenticationFactory.getLocalStrategy());

// We use the localstrategy to authenticate the User. But, after, instead of a session
// we use a JWT.
const secretDao = new SecretDAO();
secretDao.getJwtSecret().then(async (secretKey: string | null) => {
    if (secretKey == null) {
        throw new ZikStockError("500-6");
    }
    passport.use(AuthenticationFactory.getJwtStrategy(secretKey));
});

const userAPI = new UserAPI();
app.use('/api/users', userAPI.router);
const zikresourceAPI = new ZikresourceAPI();
app.use('/api/zikresources', zikresourceAPI.router);

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
