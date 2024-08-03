import { Request, Response } from 'express';
import { logger } from './logger';

export type ApiError = {
    code: string;
    status: number;
    message: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isApiError = (error: any): error is ApiError => {
    return typeof error.status === 'number' && typeof error.code === 'string' && typeof error.message === 'string';
};

export const errorMiddleware = (err: unknown, req: Request, res: Response, next: Function) => {
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
    console.log(res);
    res.status(status).json(error);
};
