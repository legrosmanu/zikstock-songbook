import { Request, Response, NextFunction } from 'express';
import { logger } from './logger';

export type ApiError = {
    code: string;
    status: number;
    message: string;
};

export const isApiError = (error: any): error is ApiError => {
    return typeof error.status === 'number' && typeof error.code === 'string' && typeof error.message === 'string';
};

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    let status = 500;
    let error = null;
    if (err != null) {
        logger.error(err);
        if (isApiError(err)) {
            status = err.status;
            error = err;
        } else {
            error = {
                status,
                code: "500-1",
                message: "Unknown server error"
            }
        }
    }
    res.status(status).json(error);
};
