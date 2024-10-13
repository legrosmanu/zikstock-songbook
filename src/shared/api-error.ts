import { Request, Response } from 'express';
import { logger } from './logger';

export type ApiError = {
    status: number;
    message: string;
};

export class ZikstockError extends Error {
    error: ApiError;
    constructor(apiError: ApiError) {
        super(apiError.message);
        this.error = apiError;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isApiError = (error: any): error is ApiError => {
    return typeof error.status === 'number' && typeof error.message === 'string';
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
                message: "Unknown server error"
            }
        }
    }
    logger.error(res);
    res.status(status).json(error);
};
