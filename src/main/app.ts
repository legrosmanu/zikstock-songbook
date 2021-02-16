import express, { Router, Request, Response, NextFunction } from 'express';
import { ZikStockError } from "./zikstock-error/zikstock-error";
import { ZikresourceAPI } from './zikresource/zikresource-api';

const app = express();

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
